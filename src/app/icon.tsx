import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#122033",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          borderRadius: "6px",
          fontWeight: 800,
          fontFamily: "sans-serif"
        }}
      >
        Z
      </div>
    ),
    {
      ...size
    }
  );
}
