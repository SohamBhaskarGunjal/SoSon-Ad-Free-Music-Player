import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LIKES_FILE = path.join(DATA_DIR, "likes.json");

// Helper to ensure likes data file exists
async function getLikesData(): Promise<{ count: number }> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(LIKES_FILE, "utf-8");
    const parsed = JSON.parse(data);
    if (typeof parsed.count === "number") {
      return parsed;
    }
  } catch {
    // File doesn't exist or is invalid - initialize default
  }

  const defaultData = { count: 0 };
  try {
    await fs.writeFile(LIKES_FILE, JSON.stringify(defaultData, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write default likes file:", error);
  }
  return defaultData;
}

export async function GET() {
  try {
    const data = await getLikesData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/likes error:", error);
    return NextResponse.json({ count: 0 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await getLikesData();
    const newCount = data.count + 1;
    const updatedData = { count: newCount };

    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(LIKES_FILE, JSON.stringify(updatedData, null, 2), "utf-8");

    return NextResponse.json({ success: true, count: newCount });
  } catch (error) {
    console.error("POST /api/likes error:", error);
    return NextResponse.json({ success: false, error: "Failed to update likes" }, { status: 500 });
  }
}
