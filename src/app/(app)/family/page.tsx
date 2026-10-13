"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Users, MessageSquare, MapPin, Hotel, AlertTriangle,
  Send, CheckCircle, Copy, Check, Share2, Plus, LogIn,
  LogOut, Phone, ShieldCheck, RefreshCw, Clock, ExternalLink,
  Sparkles, ChevronRight, UserPlus, ShieldAlert, X,
} from "lucide-react";
import { Card, Badge, Tabs, EmptyState, cn } from "@/components/ui";
import { useAppStore } from "@/store/appStore";

interface FamilyUser {
  id: string;
  name: string;
  role: string;
  phone?: string;
  familyCode: string;
}

interface FamilyGroup {
  code: string;
  name: string;
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

interface FamilyMessage {
  id: string;
  familyCode: string;
  senderId: string;
  senderName: string;
  senderRole?: string;
  text: string;
  type: "text" | "quick_reply" | "system" | "emergency";
  timestamp: number;
}

const TABS = [
  { id: "chat",     label: "Family Chat" },
  { id: "meeting",  label: "Meeting Point" },
  { id: "hotel",    label: "Hotel Info" },
  { id: "members",  label: "Members" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const QUICK_REPLIES = [
  "I'm okay ✓",
  "Back to hotel",
  "At Gate 1 (King Abdulaziz)",
  "Doing Tawaf now",
  "At Safa & Marwah",
  "At Zamzam well",
  "Waiting for you",
  "Need help!",
];

const ROLES = [
  "Family Head",
  "Father",
  "Mother",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Grandparent",
  "Pilgrim",
];

export default function FamilyPage() {
  const isOnline = useAppStore((s) => s.isOnline);

  // Auth / Group state
  const [currentUser, setCurrentUser] = useState<FamilyUser | null>(null);
  const [currentGroup, setCurrentGroup] = useState<FamilyGroup | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"create" | "join">("create");

  // Auth form inputs
  const [inputGroupName, setInputGroupName] = useState("");
  const [inputUserName, setInputUserName] = useState("");
  const [inputUserRole, setInputUserRole] = useState("Family Head");
  const [inputUserPhone, setInputUserPhone] = useState("");
  const [inputFamilyCode, setInputFamilyCode] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Tab & Chat state
  const [activeTab, setActiveTab] = useState<TabId>("chat");
  const [msgText, setMsgText] = useState("");
  const [messages, setMessages] = useState<FamilyMessage[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const [emergencySent, setEmergencySent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Meeting point edit modal
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetingLocation, setMeetingLocation] = useState("");
  const [meetingGate, setMeetingGate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");

  // Hotel edit modal
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [hotelName, setHotelName] = useState("");
  const [hotelCity, setHotelCity] = useState<"Makkah" | "Madinah">("Makkah");
  const [hotelRoom, setHotelRoom] = useState("");
  const [hotelAddress, setHotelAddress] = useState("");
  const [hotelNotes, setHotelNotes] = useState("");

  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Load user & group from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("umrah_family_user");
      const savedGroup = localStorage.getItem("umrah_family_group");
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
      if (savedGroup) setCurrentGroup(JSON.parse(savedGroup));
    } catch {}
  }, []);

  // Fetch latest group details and messages from server
  const fetchGroupAndMessages = useCallback(async () => {
    if (!currentUser?.familyCode) return;

    try {
      // 1. Fetch group details
      const groupRes = await fetch(`/api/family/group?familyCode=${encodeURIComponent(currentUser.familyCode)}`);
      if (groupRes.ok) {
        const groupData = await groupRes.json();
        if (groupData.group) {
          setCurrentGroup(groupData.group);
          localStorage.setItem("umrah_family_group", JSON.stringify(groupData.group));
        }
      }

      // 2. Fetch messages
      const msgRes = await fetch(`/api/family/messages?familyCode=${encodeURIComponent(currentUser.familyCode)}`);
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        if (Array.isArray(msgData.messages)) {
          setMessages(msgData.messages);
        }
      }
    } catch (err) {
      console.warn("Background family sync error:", err);
    }
  }, [currentUser?.familyCode]);

  // Initial fetch and real-time polling every 4 seconds
  useEffect(() => {
    if (!currentUser?.familyCode) return;

    fetchGroupAndMessages();
    const interval = setInterval(fetchGroupAndMessages, 4000);
    return () => clearInterval(interval);
  }, [currentUser?.familyCode, fetchGroupAndMessages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (activeTab === "chat") {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, activeTab]);

  // Auth: Create Family Group
  const handleCreateFamily = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputGroupName.trim() || !inputUserName.trim()) {
      setAuthError("Please fill in both Family Name and Your Name");
      return;
    }

    setAuthLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/family/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          groupName: inputGroupName.trim(),
          userName: inputUserName.trim(),
          role: inputUserRole,
          phone: inputUserPhone.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create family group");
      }

      setCurrentUser(data.user);
      setCurrentGroup(data.group);
      localStorage.setItem("umrah_family_user", JSON.stringify(data.user));
      localStorage.setItem("umrah_family_group", JSON.stringify(data.group));
      setIsAuthModalOpen(false);
      fetchGroupAndMessages();
    } catch (err: any) {
      setAuthError(err.message || "Failed to create family group");
    } finally {
      setAuthLoading(false);
    }
  };

  // Auth: Join Existing Family Group
  const handleJoinFamily = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputFamilyCode.trim() || !inputUserName.trim()) {
      setAuthError("Please enter your Family Code and Your Name");
      return;
    }

    setAuthLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/family/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "join",
          code: inputFamilyCode.trim().toUpperCase(),
          userName: inputUserName.trim(),
          role: inputUserRole,
          phone: inputUserPhone.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to join family group");
      }

      setCurrentUser(data.user);
      setCurrentGroup(data.group);
      localStorage.setItem("umrah_family_user", JSON.stringify(data.user));
      localStorage.setItem("umrah_family_group", JSON.stringify(data.group));
      setIsAuthModalOpen(false);
      fetchGroupAndMessages();
    } catch (err: any) {
      setAuthError(err.message || "Could not find family with this code");
    } finally {
      setAuthLoading(false);
    }
  };

  // Send Message
  const handleSendMessage = async (textToSend?: string, type: FamilyMessage["type"] = "text") => {
    const text = (textToSend ?? msgText).trim();
    if (!text || !currentUser || isSending) return;

    setIsSending(true);

    // Optimistic local update
    const optimisticMsg: FamilyMessage = {
      id: `temp_${Date.now()}`,
      familyCode: currentUser.familyCode,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role,
      text,
      type,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    if (!textToSend) setMsgText("");

    try {
      const res = await fetch("/api/family/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          familyCode: currentUser.familyCode,
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderRole: currentUser.role,
          text,
          type,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message) {
          setMessages((prev) => prev.map((m) => (m.id === optimisticMsg.id ? data.message : m)));
        }
      }
    } catch (err) {
      console.warn("Failed to deliver message:", err);
    } finally {
      setIsSending(false);
    }
  };

  // Emergency SOS Alert
  const handleEmergencyAlert = async () => {
    if (!currentUser) return;
    await handleSendMessage(
      `🚨 EMERGENCY ALERT: ${currentUser.name} (${currentUser.role}) needs immediate help! Please call or check location now.`,
      "emergency"
    );
    setEmergencySent(true);
    setShowEmergency(false);
    setTimeout(() => setEmergencySent(false), 5000);
  };

  // Copy Family Code
  const handleCopyCode = () => {
    if (!currentGroup?.code) return;
    navigator.clipboard.writeText(currentGroup.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Share Family Code on WhatsApp
  const handleShareWhatsApp = () => {
    if (!currentGroup) return;
    const text = encodeURIComponent(
      `Assalamu Alaikum! Join our Umrah Family Group "${currentGroup.name}".\n\n1. Open: ${window.location.origin}/family\n2. Enter Family Code: *${currentGroup.code}*\n\nStay connected, track meeting points, and stay safe in Makkah & Madinah!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  // Save Meeting Point
  const handleSaveMeetingPoint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.familyCode) return;

    try {
      const res = await fetch("/api/family/group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          familyCode: currentUser.familyCode,
          action: "meeting",
          meetingPoint: {
            location: meetingLocation || "King Abdulaziz Gate 1",
            gateNumber: meetingGate || "1",
            time: meetingTime || "After Isha Salah",
            notes: meetingNotes,
            updatedBy: currentUser.name,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.group) setCurrentGroup(data.group);
        setIsMeetingModalOpen(false);
        fetchGroupAndMessages();
      }
    } catch {}
  };

  // Save Hotel Details
  const handleSaveHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.familyCode) return;

    try {
      const res = await fetch("/api/family/group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          familyCode: currentUser.familyCode,
          action: "hotel",
          hotel: {
            name: hotelName || "Hotel Near Haram",
            city: hotelCity,
            roomNumber: hotelRoom,
            address: hotelAddress,
            notes: hotelNotes,
            updatedBy: currentUser.name,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.group) setCurrentGroup(data.group);
        setIsHotelModalOpen(false);
        fetchGroupAndMessages();
      }
    } catch {}
  };

  // Leave / Switch Group
  const handleLeaveGroup = () => {
    if (!confirm("Are you sure you want to switch or leave this family group?")) return;
    localStorage.removeItem("umrah_family_user");
    localStorage.removeItem("umrah_family_group");
    setCurrentUser(null);
    setCurrentGroup(null);
    setMessages([]);
  };

  // ── Render: If User is NOT in a Family Group ──────────────────────────────
  if (!currentUser || !currentGroup) {
    return (
      <div className="p-4 md:p-6 max-w-xl mx-auto space-y-6 animate-fade-in pb-36 lg:pb-12">
        {/* Welcome Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-app-primary to-app-brightGreen flex items-center justify-center mx-auto shadow-xl shadow-app-primary/30">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-app-textPrimary tracking-tight">
            Family Safety & Group Chat
          </h2>
          <p className="text-sm text-app-gold font-medium max-w-md mx-auto">
            Stay connected with your family during Tawaf, Sa'i, and Haram visits. Works across all devices live!
          </p>
        </div>

        {/* Auth Mode Switcher Card */}
        <div className="bg-app-card border border-app-border rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
          {/* Mode Tabs */}
          <div className="flex bg-app-cardElevated p-1.5 rounded-2xl border border-app-border">
            <button
              onClick={() => { setAuthMode("create"); setAuthError(null); }}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                authMode === "create"
                  ? "bg-app-brightGreen text-white shadow-md shadow-app-brightGreen/20"
                  : "text-app-textMuted hover:text-app-textPrimary"
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Create New Family</span>
            </button>
            <button
              onClick={() => { setAuthMode("join"); setAuthError(null); }}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                authMode === "join"
                  ? "bg-app-brightGreen text-white shadow-md shadow-app-brightGreen/20"
                  : "text-app-textMuted hover:text-app-textPrimary"
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Join with Family Code</span>
            </button>
          </div>

          {authError && (
            <div className="p-3.5 bg-red-950/60 border border-red-800 text-red-300 text-xs rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          {/* Create Family Form */}
          {authMode === "create" ? (
            <form onSubmit={handleCreateFamily} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-app-textMuted uppercase mb-1.5">
                  Family Group Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mansuri Family, Khan Group..."
                  value={inputGroupName}
                  onChange={(e) => setInputGroupName(e.target.value)}
                  className="w-full bg-app-cardElevated border border-app-border rounded-xl px-4 py-3 text-sm text-app-textPrimary placeholder-app-textMuted focus:outline-none focus:border-app-brightGreen transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-app-textMuted uppercase mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aftab Mansuri"
                    value={inputUserName}
                    onChange={(e) => setInputUserName(e.target.value)}
                    className="w-full bg-app-cardElevated border border-app-border rounded-xl px-4 py-3 text-sm text-app-textPrimary placeholder-app-textMuted focus:outline-none focus:border-app-brightGreen transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-app-textMuted uppercase mb-1.5">
                    Your Role in Family
                  </label>
                  <select
                    value={inputUserRole}
                    onChange={(e) => setInputUserRole(e.target.value)}
                    className="w-full bg-app-cardElevated border border-app-border rounded-xl px-4 py-3 text-sm text-app-textPrimary focus:outline-none focus:border-app-brightGreen transition-colors cursor-pointer"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r} className="bg-app-card text-app-textPrimary">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-app-textMuted uppercase mb-1.5">
                  WhatsApp / Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={inputUserPhone}
                  onChange={(e) => setInputUserPhone(e.target.value)}
                  className="w-full bg-app-cardElevated border border-app-border rounded-xl px-4 py-3 text-sm text-app-textPrimary placeholder-app-textMuted focus:outline-none focus:border-app-brightGreen transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl bg-app-brightGreen hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-app-brightGreen/30 active:scale-95 transition-all disabled:opacity-50"
              >
                {authLoading ? (
                  <span>Creating Family Group...</span>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Create Family Group & Generate Code</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Join Family Form */
            <form onSubmit={handleJoinFamily} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-app-textMuted uppercase mb-1.5">
                  Family Invite Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. MANS-786"
                  value={inputFamilyCode}
                  onChange={(e) => setInputFamilyCode(e.target.value.toUpperCase())}
                  className="w-full bg-app-cardElevated border border-app-border rounded-xl px-4 py-3 text-base font-mono font-bold text-app-brightGreen uppercase placeholder-app-textMuted focus:outline-none focus:border-app-brightGreen transition-colors tracking-widest text-center"
                  required
                />
                <p className="text-[11px] text-app-textMuted mt-1 text-center">
                  Ask your family head or group creator for this 6-character code.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-app-textMuted uppercase mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fatima"
                    value={inputUserName}
                    onChange={(e) => setInputUserName(e.target.value)}
                    className="w-full bg-app-cardElevated border border-app-border rounded-xl px-4 py-3 text-sm text-app-textPrimary placeholder-app-textMuted focus:outline-none focus:border-app-brightGreen transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-app-textMuted uppercase mb-1.5">
                    Your Role in Family
                  </label>
                  <select
                    value={inputUserRole}
                    onChange={(e) => setInputUserRole(e.target.value)}
                    className="w-full bg-app-cardElevated border border-app-border rounded-xl px-4 py-3 text-sm text-app-textPrimary focus:outline-none focus:border-app-brightGreen transition-colors cursor-pointer"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r} className="bg-app-card text-app-textPrimary">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-app-textMuted uppercase mb-1.5">
                  WhatsApp / Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={inputUserPhone}
                  onChange={(e) => setInputUserPhone(e.target.value)}
                  className="w-full bg-app-cardElevated border border-app-border rounded-xl px-4 py-3 text-sm text-app-textPrimary placeholder-app-textMuted focus:outline-none focus:border-app-brightGreen transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl bg-app-brightGreen hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-app-brightGreen/30 active:scale-95 transition-all disabled:opacity-50"
              >
                {authLoading ? (
                  <span>Connecting to Family...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Join Family Group & Open Chat</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="p-3.5 rounded-2xl bg-app-card border border-app-border space-y-1">
            <span className="text-base">🔒</span>
            <p className="text-xs font-bold text-app-textPrimary">100% Private Group</p>
            <p className="text-[11px] text-app-textMuted">Only people with your Family Code can view your messages.</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-app-card border border-app-border space-y-1">
            <span className="text-base">🌐</span>
            <p className="text-xs font-bold text-app-textPrimary">Live on Vercel</p>
            <p className="text-[11px] text-app-textMuted">Works across different phones in Makkah, Madinah, or hotels.</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Render: Active Family Dashboard ───────────────────────────────────────
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-5 animate-fade-in pb-36 lg:pb-12">
      {/* ── Top Family Header Card ─────────────────────────────────────── */}
      <div className="bg-app-card border border-app-border rounded-3xl p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-app-primary to-app-brightGreen flex items-center justify-center text-white shrink-0 shadow-md shadow-app-primary/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-app-textPrimary tracking-tight">
                  {currentGroup.name}
                </h2>
                <Badge variant={isOnline ? "green" : "muted"}>
                  <span className={cn("w-1.5 h-1.5 rounded-full", isOnline ? "bg-app-brightGreen animate-ping" : "bg-app-textMuted")} />
                  <span>{isOnline ? "Live Synced" : "Offline"}</span>
                </Badge>
              </div>
              <p className="text-xs text-app-gold flex items-center gap-1.5 mt-0.5">
                <span>{currentUser.name} ({currentUser.role})</span>
                <span>·</span>
                <span>{currentGroup.members.length} Members</span>
              </p>
            </div>
          </div>

          {/* Share Code & Leave Group Buttons */}
          <div className="flex items-center gap-2">
            {/* Family Code Badge (Click to copy) */}
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 rounded-xl bg-[#141518] hover:bg-[#1c1d22] border border-app-border hover:border-app-brightGreen/50 text-xs font-mono font-bold text-app-brightGreen flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title="Click to copy Family Code"
            >
              <span>Code: {currentGroup.code}</span>
              {copiedCode ? <Check className="w-3.5 h-3.5 text-app-brightGreen" /> : <Copy className="w-3.5 h-3.5 text-app-textMuted" />}
            </button>

            {/* WhatsApp Share Button */}
            <button
              onClick={handleShareWhatsApp}
              className="p-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800 text-app-brightGreen transition-all active:scale-95"
              title="Share Family Code on WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Leave / Switch Group Button */}
            <button
              onClick={handleLeaveGroup}
              className="p-2 rounded-xl bg-app-card hover:bg-red-950/50 border border-app-border hover:border-red-800 text-app-textMuted hover:text-red-400 transition-all active:scale-95"
              title="Switch or Leave Family Group"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Flash Banner */}
      {emergencySent && (
        <div className="p-3.5 bg-red-950/90 border border-red-600 rounded-2xl text-red-200 text-xs font-bold flex items-center gap-2 shadow-2xl animate-bounce">
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
          <span>🚨 Emergency SOS broadcasted to all family members!</span>
        </div>
      )}

      {/* Tabs Switcher */}
      <Tabs
        tabs={TABS as unknown as { id: string; label: string }[]}
        active={activeTab}
        onChange={(id) => setActiveTab(id as TabId)}
      />

      {/* ── TAB 1: Real-Time Family Chat ─────────────────────────────────── */}
      {activeTab === "chat" && (
        <div className="space-y-4">
          {/* Messages Container */}
          <div className="bg-app-card border border-app-border rounded-3xl p-4 sm:p-5 min-h-[360px] max-h-[500px] overflow-y-auto space-y-3.5 shadow-inner">
            {messages.length > 0 ? (
              messages.map((msg) => {
                const isSelf = msg.senderId === currentUser.id;
                const isSystem = msg.type === "system";
                const isEmergency = msg.type === "emergency";

                if (isSystem) {
                  return (
                    <div key={msg.id} className="flex justify-center my-2">
                      <div className="px-3.5 py-1.5 rounded-full bg-black/40 border border-white/10 text-[11px] text-app-gold max-w-[90%] text-center shadow-sm">
                        {msg.text}
                      </div>
                    </div>
                  );
                }

                if (isEmergency) {
                  return (
                    <div key={msg.id} className="p-4 rounded-2xl bg-red-950/80 border-2 border-red-600 shadow-2xl animate-pulse space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-red-300">
                        <span className="flex items-center gap-1.5">
                          <ShieldAlert className="w-4 h-4 text-red-400" />
                          <span>EMERGENCY SOS ALERT</span>
                        </span>
                        <span className="text-[10px] text-red-400">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-white">{msg.text}</p>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={cn("flex flex-col", isSelf ? "items-end" : "items-start")}
                  >
                    {!isSelf && (
                      <span className="text-[11px] font-bold text-app-gold mb-1 px-1">
                        {msg.senderName} {msg.senderRole && `(${msg.senderRole})`}
                      </span>
                    )}

                    <div
                      className={cn(
                        "max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-md",
                        isSelf
                          ? "bg-app-primary text-white rounded-br-xs"
                          : "bg-app-cardElevated border border-app-border text-app-textPrimary rounded-bl-xs"
                      )}
                    >
                      <p className="leading-relaxed select-text">{msg.text}</p>
                      <p
                        className={cn(
                          "text-[9px] mt-1 text-right",
                          isSelf ? "text-white/60" : "text-app-textMuted"
                        )}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyState
                icon={<MessageSquare className="w-6 h-6 text-app-gold" />}
                title="Welcome to your private family chat!"
                description="Send a message or tap a quick reply below to let your family know you're safe."
              />
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Replies Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            <span className="text-[10px] text-app-gold font-bold uppercase shrink-0 mr-1">
              ⚡ Quick:
            </span>
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => handleSendMessage(reply, "quick_reply")}
                className="px-3 py-1.5 rounded-full bg-app-card hover:bg-app-cardElevated border border-app-border hover:border-app-brightGreen/50 text-app-textSecondary hover:text-app-textPrimary transition-all shrink-0 active:scale-95 shadow-sm"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Chat Input Bar & SOS Button */}
          <div className="flex items-center gap-2">
            {/* SOS Emergency Button */}
            <button
              onClick={() => setShowEmergency(true)}
              className="h-12 px-3 sm:px-4 rounded-2xl bg-red-950/80 hover:bg-red-900 border border-red-700 text-red-300 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all active:scale-95 shadow-md shadow-red-950/50"
              title="Emergency SOS Alert"
            >
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline">SOS Help</span>
            </button>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex-1 flex items-center gap-2 bg-app-card border border-app-border rounded-2xl px-3 py-1 shadow-md focus-within:border-app-brightGreen"
            >
              <input
                type="text"
                placeholder="Message your family..."
                value={msgText}
                onChange={(e) => setMsgText(e.target.value)}
                className="flex-1 bg-transparent py-2.5 text-sm text-app-textPrimary placeholder-app-textMuted focus:outline-none"
              />
              <button
                type="submit"
                disabled={!msgText.trim() || isSending}
                className="w-9 h-9 rounded-xl bg-app-primary hover:bg-app-primaryHover disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 active:scale-90"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── TAB 2: Shared Meeting Point ───────────────────────────────────── */}
      {activeTab === "meeting" && (
        <div className="space-y-4">
          <div className="bg-app-card border border-app-border rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-app-border pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-app-brightGreen" />
                <h3 className="text-base font-bold text-app-textPrimary">Family Meeting Point</h3>
              </div>
              <button
                onClick={() => {
                  setMeetingLocation(currentGroup.meetingPoint?.location || "King Abdulaziz Gate 1");
                  setMeetingGate(currentGroup.meetingPoint?.gateNumber || "1");
                  setMeetingTime(currentGroup.meetingPoint?.time || "After Isha Salah");
                  setMeetingNotes(currentGroup.meetingPoint?.notes || "");
                  setIsMeetingModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-app-primary hover:bg-app-primaryHover text-white text-xs font-bold transition-all shadow-sm"
              >
                Update Meeting Point
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 bg-app-cardElevated rounded-2xl border border-app-border space-y-1">
                <span className="text-[10px] font-bold text-app-gold uppercase">Meeting Gate / Location</span>
                <p className="text-base font-bold text-app-textPrimary">
                  {currentGroup.meetingPoint?.location || "King Abdulaziz Gate 1"}
                </p>
                {currentGroup.meetingPoint?.gateNumber && (
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-app-brightGreen mt-1">
                    Gate #{currentGroup.meetingPoint.gateNumber}
                  </span>
                )}
              </div>

              <div className="p-4 bg-app-cardElevated rounded-2xl border border-app-border space-y-1">
                <span className="text-[10px] font-bold text-app-gold uppercase">Agreed Meeting Time</span>
                <p className="text-base font-bold text-app-textPrimary flex items-center gap-2">
                  <Clock className="w-4 h-4 text-app-brightGreen" />
                  <span>{currentGroup.meetingPoint?.time || "After Isha Salah"}</span>
                </p>
                <p className="text-[11px] text-app-textMuted mt-1">
                  Updated by: {currentGroup.meetingPoint?.updatedBy || "Family"}
                </p>
              </div>
            </div>

            {currentGroup.meetingPoint?.notes && (
              <div className="p-3.5 bg-app-cardElevated rounded-2xl border border-app-border space-y-1">
                <span className="text-[10px] font-bold text-app-textMuted uppercase">Family Notes:</span>
                <p className="text-xs text-app-textSecondary">{currentGroup.meetingPoint.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB 3: Shared Hotel Info ─────────────────────────────────────── */}
      {activeTab === "hotel" && (
        <div className="space-y-4">
          <div className="bg-app-card border border-app-border rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-app-border pb-3">
              <div className="flex items-center gap-2">
                <Hotel className="w-5 h-5 text-app-gold" />
                <h3 className="text-base font-bold text-app-textPrimary">Our Hotel Details</h3>
              </div>
              <button
                onClick={() => {
                  setHotelName(currentGroup.hotel?.name || "");
                  setHotelCity(currentGroup.hotel?.city || "Makkah");
                  setHotelRoom(currentGroup.hotel?.roomNumber || "");
                  setHotelAddress(currentGroup.hotel?.address || "");
                  setHotelNotes(currentGroup.hotel?.notes || "");
                  setIsHotelModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-app-primary hover:bg-app-primaryHover text-white text-xs font-bold transition-all shadow-sm"
              >
                Update Hotel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 bg-app-cardElevated rounded-2xl border border-app-border space-y-1">
                <span className="text-[10px] font-bold text-app-gold uppercase">Hotel Name ({currentGroup.hotel?.city || "Makkah"})</span>
                <p className="text-base font-bold text-app-textPrimary">
                  {currentGroup.hotel?.name || "Hotel Name Not Set"}
                </p>
                {currentGroup.hotel?.address && (
                  <p className="text-xs text-app-textMuted mt-1">{currentGroup.hotel.address}</p>
                )}
              </div>

              <div className="p-4 bg-app-cardElevated rounded-2xl border border-app-border space-y-1">
                <span className="text-[10px] font-bold text-app-gold uppercase">Room Number</span>
                <p className="text-base font-bold text-app-brightGreen font-mono">
                  Room #{currentGroup.hotel?.roomNumber || "Not Set"}
                </p>
                {currentGroup.hotel?.notes && (
                  <p className="text-xs text-app-textMuted mt-1">{currentGroup.hotel.notes}</p>
                )}
              </div>
            </div>

            {currentGroup.hotel?.name && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${currentGroup.hotel.name} ${currentGroup.hotel.city || "Makkah"}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-app-cardElevated hover:bg-app-card border border-app-border text-xs font-bold text-app-textPrimary flex items-center justify-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-app-brightGreen" />
                <span>Open Hotel on Google Maps</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* ── TAB 4: Family Members List ───────────────────────────────────── */}
      {activeTab === "members" && (
        <div className="space-y-4">
          <div className="bg-app-card border border-app-border rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-app-border pb-3">
              <h3 className="text-base font-bold text-app-textPrimary flex items-center gap-2">
                <Users className="w-5 h-5 text-app-brightGreen" />
                <span>Family Members ({currentGroup.members.length})</span>
              </h3>
              <button
                onClick={handleShareWhatsApp}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-app-brightGreen flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Invite Family</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentGroup.members.map((member) => (
                <div
                  key={member.id}
                  className="p-3.5 rounded-2xl bg-app-cardElevated border border-app-border flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-app-card border border-app-border flex items-center justify-center font-bold text-app-gold text-sm">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-app-textPrimary flex items-center gap-1.5">
                        <span>{member.name}</span>
                        {member.id === currentUser.id && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-app-brightGreen/20 text-app-brightGreen border border-app-brightGreen/30 font-medium">
                            You
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-app-textMuted">{member.role}</p>
                    </div>
                  </div>

                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="w-8 h-8 rounded-xl bg-app-card border border-app-border flex items-center justify-center text-app-brightGreen hover:scale-105 transition-transform"
                      title={`Call ${member.name}`}
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Share Invitation Card */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 space-y-2">
              <p className="text-xs font-bold text-emerald-300">Invite more relatives to your group</p>
              <p className="text-xs text-emerald-200/80">
                Give them code <strong className="font-mono text-white underline">{currentGroup.code}</strong>. When they open the app and enter this code, they will immediately appear in your chat and group.
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-xl bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="px-3 py-1.5 rounded-xl bg-app-brightGreen text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp Invite</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Emergency SOS Confirmation ─────────────────────────────── */}
      {showEmergency && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-app-card border-2 border-red-600 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl animate-scale-in">
            <div className="flex items-center gap-3 text-red-500">
              <ShieldAlert className="w-8 h-8 animate-pulse" />
              <div>
                <h3 className="text-base font-bold text-app-textPrimary">Broadcast Emergency SOS?</h3>
                <p className="text-xs text-red-500 font-medium">All members of {currentGroup.name} will be alerted.</p>
              </div>
            </div>
            <p className="text-xs text-app-textMuted leading-relaxed">
              This will send an instant emergency alert with sound notification to every phone in your family group.
            </p>
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setShowEmergency(false)}
                className="flex-1 py-2.5 rounded-xl bg-app-cardElevated hover:bg-app-card border border-app-border text-xs font-semibold text-app-textSecondary hover:text-app-textPrimary"
              >
                Cancel
              </button>
              <button
                onClick={handleEmergencyAlert}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg shadow-red-600/30 active:scale-95 transition-transform"
              >
                Send SOS Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: Edit Meeting Point ─────────────────────────────────────── */}
      {isMeetingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-app-card border border-app-border rounded-3xl p-5 max-w-md w-full space-y-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-app-border pb-3">
              <h3 className="text-base font-bold text-app-textPrimary">Update Family Meeting Point</h3>
              <button onClick={() => setIsMeetingModalOpen(false)} className="text-app-textMuted hover:text-app-textPrimary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMeetingPoint} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-app-textMuted uppercase mb-1">Location Name</label>
                <input
                  type="text"
                  placeholder="e.g. King Abdulaziz Gate 1, Clock Tower Entrance"
                  value={meetingLocation}
                  onChange={(e) => setMeetingLocation(e.target.value)}
                  className="w-full bg-app-cardElevated border border-app-border rounded-xl px-3.5 py-2.5 text-xs text-app-textPrimary focus:outline-none focus:border-app-brightGreen"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-app-textMuted uppercase mb-1">Gate Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 1, 79, 84"
                    value={meetingGate}
                    onChange={(e) => setMeetingGate(e.target.value)}
                    className="w-full bg-app-cardElevated border border-app-border rounded-xl px-3.5 py-2.5 text-xs text-app-textPrimary focus:outline-none focus:border-app-brightGreen"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-app-textMuted uppercase mb-1">Meeting Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 9:30 PM / After Isha"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full bg-app-cardElevated border border-app-border rounded-xl px-3.5 py-2.5 text-xs text-app-textPrimary focus:outline-none focus:border-app-brightGreen"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-app-textMuted uppercase mb-1">Notes / Instructions</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Gather outside under the green umbrellas"
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  className="w-full bg-app-cardElevated border border-app-border rounded-xl px-3.5 py-2 text-xs text-app-textPrimary focus:outline-none focus:border-app-brightGreen"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsMeetingModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-app-cardElevated hover:bg-app-card border border-app-border text-xs font-semibold text-app-textSecondary hover:text-app-textPrimary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-app-brightGreen text-white text-xs font-bold shadow-md shadow-app-brightGreen/20"
                >
                  Save & Notify Family
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: Edit Hotel Details ─────────────────────────────────────── */}
      {isHotelModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-app-card border border-app-border rounded-3xl p-5 max-w-md w-full space-y-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between border-b border-app-border pb-3">
              <h3 className="text-base font-bold text-app-textPrimary">Update Hotel Information</h3>
              <button onClick={() => setIsHotelModalOpen(false)} className="text-app-textMuted hover:text-app-textPrimary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHotel} className="space-y-3.5">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-app-textMuted uppercase mb-1">Hotel Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Swissôtel Al Maqam"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    className="w-full bg-app-cardElevated border border-app-border rounded-xl px-3.5 py-2.5 text-xs text-app-textPrimary focus:outline-none focus:border-app-brightGreen"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-app-textMuted uppercase mb-1">City</label>
                  <select
                    value={hotelCity}
                    onChange={(e) => setHotelCity(e.target.value as any)}
                    className="w-full bg-app-cardElevated border border-app-border rounded-xl px-2.5 py-2.5 text-xs text-app-textPrimary focus:outline-none focus:border-app-brightGreen cursor-pointer"
                  >
                    <option value="Makkah" className="bg-app-card text-app-textPrimary">Makkah</option>
                    <option value="Madinah" className="bg-app-card text-app-textPrimary">Madinah</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-app-textMuted uppercase mb-1">Room Number(s)</label>
                <input
                  type="text"
                  placeholder="e.g. Room 1408 & 1409"
                  value={hotelRoom}
                  onChange={(e) => setHotelRoom(e.target.value)}
                  className="w-full bg-app-cardElevated border border-app-border rounded-xl px-3.5 py-2.5 text-xs text-app-textPrimary focus:outline-none focus:border-app-brightGreen"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-app-textMuted uppercase mb-1">Address / Landmark</label>
                <input
                  type="text"
                  placeholder="e.g. Abraj Al Bait, Ibrahim Al Khalil Road"
                  value={hotelAddress}
                  onChange={(e) => setHotelAddress(e.target.value)}
                  className="w-full bg-app-cardElevated border border-app-border rounded-xl px-3.5 py-2.5 text-xs text-app-textPrimary focus:outline-none focus:border-app-brightGreen"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-app-textMuted uppercase mb-1">Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Floor 14, keys with Mother"
                  value={hotelNotes}
                  onChange={(e) => setHotelNotes(e.target.value)}
                  className="w-full bg-app-cardElevated border border-app-border rounded-xl px-3.5 py-2.5 text-xs text-app-textPrimary focus:outline-none focus:border-app-brightGreen"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsHotelModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-app-cardElevated hover:bg-app-card border border-app-border text-xs font-semibold text-app-textSecondary hover:text-app-textPrimary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-app-brightGreen text-white text-xs font-bold shadow-md shadow-app-brightGreen/20"
                >
                  Save & Sync to Family
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
