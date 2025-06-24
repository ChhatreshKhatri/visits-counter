import { NextResponse } from "next/server";
import { VisitsCount } from "../lib/mongo";
import { SvgBadge } from "../components/SvgBadge";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const uniqueID = url.pathname.startsWith('/')? url.pathname.slice(1) : url.pathname;
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

    // Validate inputs
    if (!uniqueID || !setIDCount || !passKey) {
      return new NextResponse("Bad Request: Missing required parameters", { status: 400 });
    }
    const visitsCount = await VisitsCount(uniqueID, setIDCount, passKey);
    // set each property for SvgBadge
    const svgbadge = SvgBadge(label, visitsCount, swap, shadowOpacity, shadowLabel, shadowCount, labelBGColor, countBGColor, labelTextColor, countTextColor);
    return new NextResponse(svgbadge, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, immutable",
      },
    });
  } catch (error) {
    console.error("Error generating badge:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
