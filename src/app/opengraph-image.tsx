import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #122033 0%, #1e3557 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#4967e8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "32px",
              fontWeight: 800
            }}
          >
            Z
          </div>
          <span style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.02em" }}>
            {siteConfig.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#6ee7b7"
            }}
          >
            Free Marketing & SEO Utility Platform
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em"
            }}
          >
            Practical tools built for real SEO work.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              lineHeight: 1.4
            }}
          >
            FAQ Schema • Product Titles • Meta Descriptions • Product Names • UTM Builder
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "18px",
            color: "#64748b"
          }}
        >
          <span>Free to Use</span>
          <span>•</span>
          <span>No Login Required</span>
          <span>•</span>
          <span>In-Browser Client Execution</span>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
