import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") || "quran";
  
  const fileName = type === "trilingual"
    ? "umrah_duas_trilingual.pdf"
    : type === "duas" 
    ? "umrah-duas-source.pdf" 
    : "quran-13-line-tajweed.pdf";

  const publicFilePath = path.join(process.cwd(), "public", "quran", fileName);

  if (!fs.existsSync(publicFilePath)) {
    return new NextResponse(`PDF file not found: ${fileName}`, { status: 404 });
  }

  const stat = fs.statSync(publicFilePath);
  const fileSize = stat.size;
  const range = req.headers.get("range");

  // Support HTTP range requests for fast PDF page streaming
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const fileStream = fs.createReadStream(publicFilePath, { start, end });

    // Convert node stream to web ReadableStream
    const readable = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
      cancel() {
        fileStream.destroy();
      },
    });

    return new NextResponse(readable, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize.toString(),
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${fileName}"`,
      },
    });
  }

  const fileStream = fs.createReadStream(publicFilePath);
  const readable = new ReadableStream({
    start(controller) {
      fileStream.on("data", (chunk) => controller.enqueue(chunk));
      fileStream.on("end", () => controller.close());
      fileStream.on("error", (err) => controller.error(err));
    },
    cancel() {
      fileStream.destroy();
    },
  });

  return new NextResponse(readable, {
    status: 200,
    headers: {
      "Content-Length": fileSize.toString(),
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${fileName}"`,
      "Accept-Ranges": "bytes",
    },
  });
}
