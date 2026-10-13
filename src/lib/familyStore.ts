import fs from "fs";
import path from "path";

export interface FamilyUser {
  id: string;
  name: string;
  phone?: string;
  role: string; // "Family Head" | "Father" | "Mother" | "Son" | "Daughter" | "Pilgrim"
  familyCode: string;
  joinedAt: number;
}

export interface FamilyGroup {
  code: string; // e.g. "MANS-786"
  name: string; // e.g. "Mansuri Family Group"
  createdBy: string;
  createdAt: number;
  members: FamilyUser[];
  meetingPoint?: {
    location: string;
    gateNumber?: string;
    time?: string;
    notes?: string;
    updatedBy?: string;
    updatedAt?: number;
  };
  hotel?: {
    name: string;
    city: "Makkah" | "Madinah";
    roomNumber?: string;
    address?: string;
    notes?: string;
    updatedBy?: string;
    updatedAt?: number;
  };
}

export interface StoredFamilyMessage {
  id: string;
  familyCode: string;
  senderId: string;
  senderName: string;
  senderRole?: string;
  text: string;
  type: "text" | "quick_reply" | "system" | "emergency";
  timestamp: number;
}

// In-memory cache for fast lookups
let cachedGroups: Map<string, FamilyGroup> = new Map();
let cachedMessages: Map<string, StoredFamilyMessage[]> = new Map();
let isInitialized = false;

// File path for persistence in /tmp (works across Vercel serverless requests)
const DATA_FILE = path.join(process.env.TEMP || "/tmp", "umrah_family_store.json");

function loadFromDisk() {
  if (isInitialized) return;
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const data = JSON.parse(raw);
      if (data.groups && Array.isArray(data.groups)) {
        cachedGroups = new Map(data.groups.map((g: FamilyGroup) => [g.code.toUpperCase(), g]));
      }
      if (data.messages && Array.isArray(data.messages)) {
        cachedMessages = new Map();
        for (const m of data.messages as StoredFamilyMessage[]) {
          const list = cachedMessages.get(m.familyCode.toUpperCase()) || [];
          list.push(m);
          cachedMessages.set(m.familyCode.toUpperCase(), list);
        }
      }
    }
  } catch (err) {
    console.warn("Could not read family store from disk:", err);
  }
  isInitialized = true;
}

function saveToDisk() {
  try {
    const allGroups = Array.from(cachedGroups.values());
    const allMessages: StoredFamilyMessage[] = [];
    for (const list of cachedMessages.values()) {
      allMessages.push(...list);
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify({ groups: allGroups, messages: allMessages }, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not save family store to disk:", err);
  }
}

// ── Public Helper Functions ─────────────────────────────────────────────────

export function getGroup(code: string): FamilyGroup | null {
  loadFromDisk();
  return cachedGroups.get(code.trim().toUpperCase()) || null;
}

export function createGroup(groupName: string, creatorName: string, role: string, phone?: string): { group: FamilyGroup; user: FamilyUser } {
  loadFromDisk();

  // Generate a clean, human-readable 6-8 char code (e.g. MANS-786)
  const prefix = groupName.replace(/[^A-Za-z]/g, "").slice(0, 4).toUpperCase() || "FAM";
  const randomNum = Math.floor(100 + Math.random() * 900);
  const code = `${prefix}-${randomNum}`;

  const userId = `u_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const user: FamilyUser = {
    id: userId,
    name: creatorName.trim(),
    role: role || "Family Head",
    phone: phone?.trim(),
    familyCode: code,
    joinedAt: Date.now(),
  };

  const newGroup: FamilyGroup = {
    code,
    name: groupName.trim(),
    createdBy: user.id,
    createdAt: Date.now(),
    members: [user],
    meetingPoint: {
      location: "King Abdulaziz Gate 1",
      gateNumber: "1",
      time: "After Isha Salah",
      notes: "Assemble outside clock tower side near Gate 1",
      updatedBy: creatorName,
      updatedAt: Date.now(),
    },
    hotel: {
      name: "Swissôtel Al Maqam Makkah",
      city: "Makkah",
      roomNumber: "1408",
      address: "Abraj Al Bait Complex",
      notes: "Room key is with Mother",
      updatedBy: creatorName,
      updatedAt: Date.now(),
    },
  };

  cachedGroups.set(code, newGroup);

  // Add welcome message
  addMessage(code, "system", "Umrah Companion", `🕌 Welcome to ${newGroup.name}! Share code "${code}" with your family to chat and stay safe.`, "system");

  saveToDisk();
  return { group: newGroup, user };
}

export function joinGroup(code: string, userName: string, role: string, phone?: string): { group: FamilyGroup; user: FamilyUser } | null {
  loadFromDisk();
  const upperCode = code.trim().toUpperCase();
  const group = cachedGroups.get(upperCode);
  if (!group) return null;

  const userId = `u_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const user: FamilyUser = {
    id: userId,
    name: userName.trim(),
    role: role || "Member",
    phone: phone?.trim(),
    familyCode: upperCode,
    joinedAt: Date.now(),
  };

  // Add or update member
  const existingIdx = group.members.findIndex((m) => m.name.toLowerCase() === userName.trim().toLowerCase());
  if (existingIdx >= 0) {
    group.members[existingIdx] = user;
  } else {
    group.members.push(user);
  }

  // System notification
  addMessage(upperCode, "system", "Umrah Companion", `👋 ${user.name} (${user.role}) has joined the family group.`, "system");

  saveToDisk();
  return { group, user };
}

export function getMessages(code: string, since?: number): StoredFamilyMessage[] {
  loadFromDisk();
  const list = cachedMessages.get(code.trim().toUpperCase()) || [];
  if (since && since > 0) {
    return list.filter((m) => m.timestamp > since);
  }
  return list;
}

export function addMessage(
  code: string,
  senderId: string,
  senderName: string,
  text: string,
  type: "text" | "quick_reply" | "system" | "emergency" = "text",
  senderRole?: string
): StoredFamilyMessage {
  loadFromDisk();
  const upperCode = code.trim().toUpperCase();
  const list = cachedMessages.get(upperCode) || [];

  const newMsg: StoredFamilyMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    familyCode: upperCode,
    senderId,
    senderName,
    senderRole,
    text: text.trim(),
    type,
    timestamp: Date.now(),
  };

  list.push(newMsg);
  // Keep last 100 messages per family group to preserve memory
  if (list.length > 100) {
    list.splice(0, list.length - 100);
  }
  cachedMessages.set(upperCode, list);

  saveToDisk();
  return newMsg;
}

export function updateMeetingPoint(code: string, meetingPoint: NonNullable<FamilyGroup["meetingPoint"]>): boolean {
  loadFromDisk();
  const group = cachedGroups.get(code.trim().toUpperCase());
  if (!group) return false;

  group.meetingPoint = {
    ...group.meetingPoint,
    ...meetingPoint,
    updatedAt: Date.now(),
  };

  addMessage(
    code,
    "system",
    "Umrah Companion",
    `📍 Meeting Point Updated: ${meetingPoint.location} (Gate ${meetingPoint.gateNumber || "-"}) at ${meetingPoint.time || "-"}`,
    "system"
  );

  saveToDisk();
  return true;
}

export function updateHotel(code: string, hotel: NonNullable<FamilyGroup["hotel"]>): boolean {
  loadFromDisk();
  const group = cachedGroups.get(code.trim().toUpperCase());
  if (!group) return false;

  group.hotel = {
    ...group.hotel,
    ...hotel,
    updatedAt: Date.now(),
  };

  addMessage(
    code,
    "system",
    "Umrah Companion",
    `🏨 Hotel Info Updated: ${hotel.name} (${hotel.city}), Room ${hotel.roomNumber || "-"}`,
    "system"
  );

  saveToDisk();
  return true;
}
