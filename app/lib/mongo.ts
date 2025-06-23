import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not set in the environment variables.");
}

if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGODB_URI).catch(err => {
    console.error("MongoDB connection error:", err);
    throw err;
  });
}

const visitsBadgeSchema = new mongoose.Schema({
  uniqueID: String,
  passKey: String,
  visitsCount: { type: Number, default: 0 },
});

const VisitsBadge =
  mongoose.models.visitsBadge || mongoose.model("visitsBadge", visitsBadgeSchema);

export async function VisitsCount(
  uniqueID: string,
  setIDCount: string,
  passKey: string
): Promise<number> {
  try {
    const filter = { uniqueID };
    const existing = await VisitsBadge.findOne(filter);
    const update = {
      $setOnInsert: { uniqueID, passKey },
      $set:
        setIDCount !== "0" && passKey === existing?.passKey
          ? { visitsCount: parseInt(setIDCount) }
          : {},
      $inc:
        setIDCount === "0" || passKey !== existing?.passKey
          ? { visitsCount: 1 }
          : {},
    };
    const options = { new: true, upsert: true };
    const result = await VisitsBadge.findOneAndUpdate(filter, update, options).select({
      visitsCount: 1,
    });
    return result.visitsCount;
  } catch (err) {
    console.error("Error in visitsBadge:", err);
    throw err;
  }
}
