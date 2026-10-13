import { NextResponse } from "next/server";
import { getGroup, updateMeetingPoint, updateHotel } from "@/lib/familyStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const familyCode = url.searchParams.get("familyCode")?.trim().toUpperCase();

    if (!familyCode) {
      return NextResponse.json({ error: "familyCode is required" }, { status: 400 });
    }

    const group = getGroup(familyCode);
    if (!group) {
      return NextResponse.json({ error: "Family group not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, group });
  } catch (error: any) {
    console.error("Get group error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch family group" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { familyCode, action, meetingPoint, hotel } = body as {
      familyCode?: string;
      action?: "meeting" | "hotel";
      meetingPoint?: any;
      hotel?: any;
    };

    if (!familyCode?.trim()) {
      return NextResponse.json({ error: "familyCode is required" }, { status: 400 });
    }

    if (action === "meeting" && meetingPoint) {
      const ok = updateMeetingPoint(familyCode, meetingPoint);
      if (!ok) return NextResponse.json({ error: "Group not found" }, { status: 404 });
      const updated = getGroup(familyCode);
      return NextResponse.json({ success: true, group: updated });
    }

    if (action === "hotel" && hotel) {
      const ok = updateHotel(familyCode, hotel);
      if (!ok) return NextResponse.json({ error: "Group not found" }, { status: 404 });
      const updated = getGroup(familyCode);
      return NextResponse.json({ success: true, group: updated });
    }

    return NextResponse.json({ error: "Invalid action or payload" }, { status: 400 });
  } catch (error: any) {
    console.error("Update group error:", error);
    return NextResponse.json({ error: error.message || "Failed to update family group" }, { status: 500 });
  }
}
