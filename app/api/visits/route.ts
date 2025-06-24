// app/api/visits/route.ts
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

if (mongoose.connection.readyState === 0) {
  mongoose.connect(MONGODB_URI).catch(console.error);
}

const visitsBadgeSchema = new mongoose.Schema({
  uniqueID: String,
  passKey: String,
  visitsCount: { type: Number, default: 0 },
});
const VisitsBadge = mongoose.models.visitsBadge || mongoose.model("visitsBadge", visitsBadgeSchema);

export async function POST(req: Request) {
  try {
    const { uniqueID, setIDCount, passKey } = (await req.json()) as { uniqueID: string; setIDCount: string; passKey: string };

    if (!uniqueID || !passKey) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await VisitsBadge.findOne({ uniqueID });
    const update = {
      $setOnInsert: { uniqueID, passKey },
      $set: setIDCount !== "0" && passKey === existing?.passKey ? { visitsCount: parseInt(setIDCount) } : {},
      $inc: setIDCount === "0" || passKey !== existing?.passKey ? { visitsCount: 1 } : {},
    };
    const options = { new: true, upsert: true };
    const result = await VisitsBadge.findOneAndUpdate({ uniqueID }, update, options).select({ visitsCount: 1 });

    return NextResponse.json({ visitsCount: result.visitsCount });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
