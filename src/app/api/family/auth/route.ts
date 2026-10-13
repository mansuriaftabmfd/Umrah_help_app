import { NextResponse } from "next/server";
import { createGroup, joinGroup, getGroup } from "@/lib/familyStore";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { action, groupName, userName, role, code, phone } = body as {
      action: "create" | "join" | "check";
      groupName?: string;
      userName?: string;
      role?: string;
      code?: string;
      phone?: string;
    };

    if (action === "create") {
      if (!groupName?.trim() || !userName?.trim()) {
        return NextResponse.json({ error: "Family Group Name and Your Name are required" }, { status: 400 });
      }
      const { group, user } = createGroup(groupName, userName, role || "Family Head", phone);
      return NextResponse.json({ success: true, group, user });
    }

    if (action === "join") {
      if (!code?.trim() || !userName?.trim()) {
        return NextResponse.json({ error: "Family Code and Your Name are required" }, { status: 400 });
      }
      const result = joinGroup(code, userName, role || "Member", phone);
      if (!result) {
        return NextResponse.json({ error: `Family Code "${code.trim().toUpperCase()}" not found. Please double-check the code with your family.` }, { status: 404 });
      }
      return NextResponse.json({ success: true, group: result.group, user: result.user });
    }

    if (action === "check") {
      if (!code?.trim()) {
        return NextResponse.json({ error: "Code is required" }, { status: 400 });
      }
      const group = getGroup(code);
      if (!group) {
        return NextResponse.json({ found: false, error: "Family group not found" }, { status: 404 });
      }
      return NextResponse.json({ found: true, group });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Family auth error:", error);
    return NextResponse.json({ error: error.message || "Failed to process family authentication" }, { status: 500 });
  }
}
