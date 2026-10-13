import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), "src", "data", "umrah_duas_app.json");
    if (!fs.existsSync(jsonPath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const parsed = JSON.parse(rawData);
    const rawDuas = parsed.duas || [];

    return NextResponse.json({
      status: "ok",
      totalDuas: rawDuas.length,
      sample: rawDuas[0],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
