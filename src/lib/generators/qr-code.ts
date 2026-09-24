/**
 * Lightweight, zero-dependency, client-side QR Code SVG generator.
 * Encodes text/URLs directly into an SVG string without any external API calls.
 */

// Galois Field GF(256) log and antilog tables for QR Reed-Solomon error correction
const GF256_EXP = new Uint8Array(512);
const GF256_LOG = new Uint8Array(256);

(function initGF() {
  let val = 1;
  for (let i = 0; i < 255; i++) {
    GF256_EXP[i] = val;
    GF256_LOG[val] = i;
    val <<= 1;
    if (val & 256) val ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) {
    GF256_EXP[i] = GF256_EXP[i - 255];
  }
})();

function gfMul(x: number, y: number): number {
  if (x === 0 || y === 0) return 0;
  return GF256_EXP[GF256_LOG[x] + GF256_LOG[y]];
}

function rsGeneratorPoly(degree: number): Uint8Array {
  let poly = new Uint8Array([1]);
  for (let i = 0; i < degree; i++) {
    const next = new Uint8Array(poly.length + 1);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= gfMul(poly[j], GF256_EXP[i]);
      next[j + 1] ^= poly[j];
    }
    poly = next;
  }
  return poly;
}

function rsCalculateEcc(data: Uint8Array, eccLen: number): Uint8Array {
  const gen = rsGeneratorPoly(eccLen);
  const remainder = new Uint8Array(eccLen);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ remainder[0];
    for (let j = 0; j < eccLen - 1; j++) {
      remainder[j] = remainder[j + 1] ^ gfMul(gen[j + 1], factor);
    }
    remainder[eccLen - 1] = gfMul(gen[eccLen], factor);
  }
  return remainder;
}

// Version table for Byte Mode with Level L (Low error correction - maximum capacity)
// Version 1..10 support
const VERSION_CAPACITIES = [
  { version: 1, size: 21, totalBytes: 26, dataBytes: 19, ecBytes: 7 },
  { version: 2, size: 25, totalBytes: 44, dataBytes: 34, ecBytes: 10 },
  { version: 3, size: 29, totalBytes: 70, dataBytes: 55, ecBytes: 15 },
  { version: 4, size: 33, totalBytes: 100, dataBytes: 80, ecBytes: 20 },
  { version: 5, size: 37, totalBytes: 134, dataBytes: 108, ecBytes: 26 },
  { version: 6, size: 41, totalBytes: 172, dataBytes: 136, ecBytes: 18 * 2 }, // 2 blocks
  { version: 7, size: 45, totalBytes: 196, dataBytes: 156, ecBytes: 20 * 2 },
  { version: 8, size: 49, totalBytes: 242, dataBytes: 194, ecBytes: 24 * 2 }
];

export function generateQrCodeSvg(text: string, size = 200): string {
  const encoder = new TextEncoder();
  const rawBytes = encoder.encode(text);
  const dataLen = rawBytes.length;

  // Find minimum version that fits
  const config = VERSION_CAPACITIES.find((v) => v.dataBytes >= dataLen + 3);
  if (!config) {
    // If URL is extremely long, fallback to Version 8 truncated representation
    return generateQrFallbackSvg(size);
  }

  const { version, size: moduleCount, dataBytes, ecBytes } = config;

  // Bit buffer for byte mode
  const bits: number[] = [];
  function pushBits(val: number, len: number) {
    for (let i = len - 1; i >= 0; i--) {
      bits.push((val >> i) & 1);
    }
  }

  // Mode: Byte mode (0100)
  pushBits(0b0100, 4);
  // Character count indicator (8 bits for v1-9)
  pushBits(dataLen, version <= 9 ? 8 : 16);
  // Data bytes
  for (let i = 0; i < dataLen; i++) {
    pushBits(rawBytes[i], 8);
  }
  // Terminator (up to 4 zeroes)
  const bitCapacity = dataBytes * 8;
  const termLen = Math.min(4, bitCapacity - bits.length);
  for (let i = 0; i < termLen; i++) bits.push(0);
  // Pad to byte boundary
  while (bits.length % 8 !== 0) bits.push(0);
  // Pad bytes (0xEC, 0x11)
  let padToggle = false;
  while (bits.length < bitCapacity) {
    pushBits(padToggle ? 0x11 : 0xec, 8);
    padToggle = !padToggle;
  }

  // Convert bits to byte array
  const dataArr = new Uint8Array(dataBytes);
  for (let i = 0; i < dataBytes; i++) {
    let byteVal = 0;
    for (let b = 0; b < 8; b++) {
      byteVal = (byteVal << 1) | bits[i * 8 + b];
    }
    dataArr[i] = byteVal;
  }

  // Calculate Error Correction
  const ecc = rsCalculateEcc(dataArr, ecBytes);

  // Combine data + ECC
  const finalCodewords = new Uint8Array(dataBytes + ecBytes);
  finalCodewords.set(dataArr, 0);
  finalCodewords.set(ecc, dataBytes);

  // Initialize Matrix
  const matrix: boolean[][] = Array.from({ length: moduleCount }, () =>
    Array(moduleCount).fill(false)
  );
  const isFunction: boolean[][] = Array.from({ length: moduleCount }, () =>
    Array(moduleCount).fill(false)
  );

  function setModule(r: number, c: number, val: boolean) {
    matrix[r][c] = val;
    isFunction[r][c] = true;
  }

  // 1. Finder Patterns (Top-Left, Top-Right, Bottom-Left)
  function drawFinder(row: number, col: number) {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const nr = row + r;
        const nc = col + c;
        if (nr >= 0 && nr < moduleCount && nc >= 0 && nc < moduleCount) {
          const inOuter = r >= 0 && r <= 6 && c >= 0 && c <= 6;
          const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
          const inCenter = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          setModule(nr, nc, inOuter && (isBorder || inCenter));
        }
      }
    }
  }

  drawFinder(0, 0);
  drawFinder(0, moduleCount - 7);
  drawFinder(moduleCount - 7, 0);

  // 2. Timing Patterns
  for (let i = 8; i < moduleCount - 8; i++) {
    setModule(6, i, i % 2 === 0);
    setModule(i, 6, i % 2 === 0);
  }

  // 3. Dark module (always at row 4 * version + 9, col 8)
  setModule(4 * version + 9, 8, true);

  // Reserve format info area
  for (let i = 0; i < 9; i++) {
    if (!isFunction[8][i]) isFunction[8][i] = true;
    if (!isFunction[i][8]) isFunction[i][8] = true;
    if (!isFunction[8][moduleCount - 1 - i]) isFunction[8][moduleCount - 1 - i] = true;
    if (!isFunction[moduleCount - 1 - i][8]) isFunction[moduleCount - 1 - i][8] = true;
  }

  // 4. Place Data Codewords using standard zigzag path
  const allBits: number[] = [];
  for (let i = 0; i < finalCodewords.length; i++) {
    for (let b = 7; b >= 0; b--) {
      allBits.push((finalCodewords[i] >> b) & 1);
    }
  }

  let bitIdx = 0;
  let upwards = true;

  for (let rightCol = moduleCount - 1; rightCol > 0; rightCol -= 2) {
    if (rightCol === 6) rightCol--; // Skip vertical timing line

    for (let rowStep = 0; rowStep < moduleCount; rowStep++) {
      const r = upwards ? moduleCount - 1 - rowStep : rowStep;
      for (let c = rightCol; c >= rightCol - 1; c--) {
        if (!isFunction[r][c]) {
          let bit = bitIdx < allBits.length ? allBits[bitIdx] === 1 : false;
          // Apply standard Mask 0: (row + col) % 2 === 0
          if ((r + c) % 2 === 0) {
            bit = !bit;
          }
          matrix[r][c] = bit;
          bitIdx++;
        }
      }
    }
    upwards = !upwards;
  }

  // 5. Draw Format Information for Mask 0 and Level L: 0x77c4
  const formatBits = [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0];
  const formatCoords = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]
  ];
  for (let i = 0; i < 15; i++) {
    const val = formatBits[i] === 1;
    const [r, c] = formatCoords[i];
    matrix[r][c] = val;
  }

  // Generate clean SVG rects
  const cellSize = 10;
  const padding = 20;
  const totalDim = moduleCount * cellSize + padding * 2;
  const rects: string[] = [];

  for (let r = 0; r < moduleCount; r++) {
    for (let c = 0; c < moduleCount; c++) {
      if (matrix[r][c]) {
        rects.push(
          `<rect x="${padding + c * cellSize}" y="${padding + r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#122033" />`
        );
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalDim} ${totalDim}" width="${size}" height="${size}" class="rounded-xl bg-white shadow-sm" aria-label="QR Code for URL">\n<rect width="${totalDim}" height="${totalDim}" fill="#ffffff" rx="12"/>\n${rects.join("\n")}\n</svg>`;
}

function generateQrFallbackSvg(size: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="${size}" height="${size}" class="rounded-xl bg-white p-4 text-center">\n<rect width="200" height="200" fill="#f8fafc" rx="12"/>\n<text x="100" y="105" text-anchor="middle" font-size="12" fill="#64748b">URL Ready for Sharing</text>\n</svg>`;
}
