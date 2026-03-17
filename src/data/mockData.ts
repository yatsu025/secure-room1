// Shared mock data and types for Secure Room app
export type UserRole = "admin" | "coadmin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  dob?: string;
}

export interface GroupMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  joinedAt: string;
  spamCount: number;
  spamLimit: number;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  members: GroupMember[];
  pendingMembers: GroupMember[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  isPending?: boolean; // spam pending
}

export interface SpamMessage {
  id: string;
  userName: string;
  userAvatar?: string;
  preview: string;
  fullMessage: string;
  timestamp: string;
}

// Current user (mock - would come from auth)
export const currentUser: User = {
  id: "me",
  name: "Alex Johnson",
  email: "alex@gmail.com",
  phone: "+1 555 0102",
  dob: "1995-06-15",
};

// Mock current user role per group
export const currentUserRole: UserRole = "admin";

export const mockGroups: Group[] = [
  {
    id: "g1",
    name: "Team Alpha",
    description: "Main project discussion group",
    lastMessage: "Can you review the latest PR?",
    lastMessageTime: "10:42 AM",
    unreadCount: 3,
    members: [
      { id: "m1", name: "Alex Johnson", email: "alex@gmail.com", role: "admin", joinedAt: "2024-01-15", spamCount: 0, spamLimit: 3 },
      { id: "m2", name: "Sarah Miller", email: "sarah@company.com", role: "coadmin", joinedAt: "2024-01-16", spamCount: 0, spamLimit: 3 },
      { id: "m3", name: "James Wilson", email: "james@example.com", role: "user", joinedAt: "2024-02-01", spamCount: 1, spamLimit: 3 },
      { id: "m4", name: "Emily Davis", email: "emily@gmail.com", role: "user", joinedAt: "2024-02-05", spamCount: 0, spamLimit: 3 },
    ],
    pendingMembers: [
      { id: "p1", name: "Chris Brown", email: "chris@example.com", role: "user", joinedAt: "", spamCount: 0, spamLimit: 3 },
    ],
  },
  {
    id: "g2",
    name: "Design Studio",
    description: "UI/UX design discussions",
    lastMessage: "New mockups are ready 🎨",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    members: [
      { id: "m1", name: "Alex Johnson", email: "alex@gmail.com", role: "user", joinedAt: "2024-02-10", spamCount: 0, spamLimit: 3 },
      { id: "m5", name: "Lisa Chen", email: "lisa@studio.io", role: "admin", joinedAt: "2024-02-08", spamCount: 0, spamLimit: 3 },
    ],
    pendingMembers: [],
  },
  {
    id: "g3",
    name: "Marketing Hub",
    description: "Campaigns and content planning",
    lastMessage: "Launch date confirmed for Friday",
    lastMessageTime: "Mon",
    unreadCount: 12,
    members: [
      { id: "m1", name: "Alex Johnson", email: "alex@gmail.com", role: "coadmin", joinedAt: "2024-03-01", spamCount: 0, spamLimit: 3 },
      { id: "m6", name: "Tom Harris", email: "tom@marketing.co", role: "admin", joinedAt: "2024-03-01", spamCount: 0, spamLimit: 3 },
      { id: "m7", name: "Nina Patel", email: "nina@marketing.co", role: "user", joinedAt: "2024-03-05", spamCount: 2, spamLimit: 3 },
    ],
    pendingMembers: [
      { id: "p2", name: "Mark Adams", email: "mark@example.com", role: "user", joinedAt: "", spamCount: 0, spamLimit: 3 },
      { id: "p3", name: "Zoe Williams", email: "zoe@example.com", role: "user", joinedAt: "", spamCount: 0, spamLimit: 3 },
    ],
  },
];

export const mockMessages: Message[] = [
  { id: "msg1", senderId: "m2", senderName: "Sarah Miller", content: "Hey team! Just pushed the new updates", timestamp: "10:30 AM", isOwn: false },
  { id: "msg2", senderId: "me", senderName: "Alex Johnson", content: "Great! I'll review it shortly 👍", timestamp: "10:32 AM", isOwn: true },
  { id: "msg3", senderId: "m3", senderName: "James Wilson", content: "Can you review the latest PR?", timestamp: "10:40 AM", isOwn: false },
  { id: "msg4", senderId: "me", senderName: "Alex Johnson", content: "On it! Give me 10 minutes", timestamp: "10:41 AM", isOwn: true },
  { id: "msg5", senderId: "m4", senderName: "Emily Davis", content: "The tests are all passing now 🎉", timestamp: "10:42 AM", isOwn: false },
];

export const mockSpamMessages: SpamMessage[] = [
  {
    id: "s1",
    userName: "James Wilson",
    preview: "Click here for amazing deals...",
    fullMessage: "Click here for amazing deals and win a free iPhone! Visit http://suspicious-link.com now and claim your prize!",
    timestamp: "10:15 AM",
  },
  {
    id: "s2",
    userName: "Nina Patel",
    preview: "You have been selected for...",
    fullMessage: "You have been selected for a special opportunity. Send your bank details to receive $5000. This is a limited time offer!",
    timestamp: "9:55 AM",
  },
];

export const avatarColors = [
  "from-violet-400 to-violet-600",
  "from-blue-400 to-blue-600",
  "from-emerald-400 to-emerald-600",
  "from-amber-400 to-amber-600",
  "from-rose-400 to-rose-600",
  "from-cyan-400 to-cyan-600",
  "from-indigo-400 to-indigo-600",
  "from-orange-400 to-orange-600",
];

export function getAvatarColor(name: string): string {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

export function getInitials(name: string): string {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  return `${user[0]}***@${domain}`;
}
