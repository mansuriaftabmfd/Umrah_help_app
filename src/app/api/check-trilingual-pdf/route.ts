import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const pdfPath = path.join(process.cwd(), "public", "quran", "umrah_duas_trilingual.pdf");
    const exists = fs.existsSync(pdfPath);
    const size = exists ? fs.statSync(pdfPath).size : 0;
    return NextResponse.json({ exists, size, path: pdfPath });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
