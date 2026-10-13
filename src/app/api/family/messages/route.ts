import { NextResponse } from "next/server";
import { getMessages, addMessage, getGroup } from "@/lib/familyStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const familyCode = url.searchParams.get("familyCode")?.trim().toUpperCase();
    const sinceParam = url.searchParams.get("since");
    const since = sinceParam ? parseInt(sinceParam, 10) : undefined;

    if (!familyCode) {
      return NextResponse.json({ error: "familyCode is required" }, { status: 400 });
    }

    const messages = getMessages(familyCode, since);
    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    console.error("Get messages error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { familyCode, senderId, senderName, senderRole, text, type } = body as {
      familyCode?: string;
      senderId?: string;
      senderName?: string;
      senderRole?: string;
      text?: string;
      type?: "text" | "quick_reply" | "system" | "emergency";
    };

    if (!familyCode?.trim() || !text?.trim() || !senderName?.trim()) {
      return NextResponse.json({ error: "familyCode, senderName, and text are required" }, { status: 400 });
    }

    // Verify group exists
    const group = getGroup(familyCode);
    if (!group) {
      return NextResponse.json({ error: `Family group "${familyCode}" not found` }, { status: 404 });
    }

    const newMsg = addMessage(
      familyCode,
      senderId || "user",
      senderName,
      text,
      type || "text",
      senderRole
    );

    return NextResponse.json({ success: true, message: newMsg });
  } catch (error: any) {
    console.error("Add message error:", error);
    return NextResponse.json({ error: error.message || "Failed to send message" }, { status: 500 });
  }
}
