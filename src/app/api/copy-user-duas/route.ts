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

    const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const duas = data.duas || [];
    const sections = Array.from(new Set(duas.map((d: any) => d.section)));

    return NextResponse.json({
      meta: data.meta,
      totalDuas: duas.length,
      sections,
      sectionCounts: sections.reduce((acc: any, s: any) => {
        acc[s] = duas.filter((d: any) => d.section === s).length;
        return acc;
      }, {}),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
