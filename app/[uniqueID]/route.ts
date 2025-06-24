// app/[uniqueID]/route.ts
import { NextResponse } from "next/server";
import { SvgBadge } from "../components/SvgBadge";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const uniqueID = url.pathname.replace(/^\/+/, "");
    const setIDCount = url.searchParams.get("SETC") || "0";
    const passKey = url.searchParams.get("PK") || uniqueID;
    const labelBGColor = url.searchParams.get("LBGC") || "484848";
    const countBGColor = url.searchParams.get("CBGC") || "1CA2F1";
    const labelTextColor = url.searchParams.get("LTC") || "ffffff";
    const countTextColor = url.searchParams.get("CTC") || "ffffff";
    const shadowLabel = url.searchParams.get("LSHW") || "1";
    const shadowCount = url.searchParams.get("CSHW") || "1";
    const shadowOpacity = url.searchParams.get("SHWO") || "30";
    const label = url.searchParams.get("label") || "Visits";
    const swap = url.searchParams.get("swap") || "0";

    if (!uniqueID || !setIDCount || !passKey) {
      return new NextResponse("Bad Request: Missing required parameters", { status: 400 });
    }

    // 👇 Replace this URL with your real backend or MongoDB Data API
    const res = await fetch("http://localhost:3000/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uniqueID, setIDCount, passKey }),
    });

    if (!res.ok) throw new Error("Failed to fetch visit count");

    const { visitsCount } = (await res.json()) as { visitsCount: number };

    const svg = SvgBadge(label, visitsCount, swap, shadowOpacity, shadowLabel, shadowCount, labelBGColor, countBGColor, labelTextColor, countTextColor);

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, immutable",
      },
    });
  } catch (error) {
    console.error("Error in edge badge route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
