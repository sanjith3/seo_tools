import { isValidPublisherClient, formatPublisherClient } from "@/config/adsense";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const envAdsTxt = (process.env.ADSENSE_ADS_TXT || "").trim();

  // If explicit ADSENSE_ADS_TXT is configured
  if (envAdsTxt && !envAdsTxt.includes("0000") && !envAdsTxt.includes("123456")) {
    return new Response(`${envAdsTxt}\n`, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }

  // If a valid publisher client is configured via NEXT_PUBLIC_ADSENSE_CLIENT
  const rawClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
  const formattedClient = formatPublisherClient(rawClient);

  if (isValidPublisherClient(formattedClient)) {
    const pubId = formattedClient.replace(/^ca-/, "");
    const content = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
    return new Response(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }

  // When monetization is not yet active: return informational comment without fake IDs
  const inactiveNotice = [
    "# Zenvuk ads.txt",
    "# Advertising monetization is not currently active.",
    "# Authorized digital seller entries will be published upon AdSense account approval.",
  ].join("\n") + "\n";

  return new Response(inactiveNotice, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
