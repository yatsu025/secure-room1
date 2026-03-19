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
  isEdited?: boolean;
  isDeleted?: boolean;
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

const generateMembers = (count: number, groupType: "admin" | "coadmin" | "member"): GroupMember[] => {
  const members: GroupMember[] = [];
  
  // Add current user with correct role
  members.push({
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
    role: groupType === "admin" ? "admin" : (groupType === "coadmin" ? "coadmin" : "user"),
    joinedAt: "2024-01-01",
    spamCount: 0,
    spamLimit: 3,
  });

  const names = ["Sarah Miller", "James Wilson", "Emily Davis", "Chris Brown", "Lisa Chen", "Tom Harris", "Nina Patel", "Mark Adams", "Zoe Williams", "David Smith"];
  
  for (let i = 0; i < count - 1; i++) {
    const name = names[i % names.length] + (i > 9 ? ` ${Math.floor(i/10)}` : "");
    members.push({
      id: `m${i}`,
      name: name,
      email: name.toLowerCase().replace(" ", ".") + "@example.com",
      role: "user",
      joinedAt: "2024-02-01",
      spamCount: 0,
      spamLimit: 3,
    });
  }
  return members;
};

const generateMessages = (count: number, members: GroupMember[]): Message[] => {
  const messages: Message[] = [];
  const contents = [
    "Hey team! Just pushed the new updates",
    "Great! I'll review it shortly 👍",
    "Can you review the latest PR?",
    "On it! Give me 10 minutes",
    "The tests are all passing now 🎉",
    "Meeting at 2 PM?",
    "Yes, I'll be there.",
    "Did anyone see the client feedback?",
    "Not yet, checking now.",
    "Looks good to me."
  ];

  for (let i = 0; i < count; i++) {
    const sender = members[i % members.length];
    messages.push({
      id: `msg${i}`,
      senderId: sender.id,
      senderName: sender.name,
      content: contents[i % contents.length],
      timestamp: `${10 + Math.floor(i/60)}:${(i % 60).toString().padStart(2, '0')} AM`,
      isOwn: sender.id === currentUser.id,
    });
  }
  return messages;
};

const group1Members = generateMembers(10, "admin");
const group2Members = generateMembers(10, "coadmin");
const group3Members = generateMembers(10, "member");

export const mockGroups: Group[] = [
  {
    id: "g1",
    name: "Admin Group",
    description: "This is a group where you are the admin.",
    lastMessage: "The tests are all passing now 🎉",
    lastMessageTime: "10:42 AM",
    unreadCount: 3,
    members: group1Members,
    pendingMembers: [],
  },
  {
    id: "g2",
    name: "Co-Admin Group",
    description: "This is a group where you are a co-admin.",
    lastMessage: "Meeting at 2 PM?",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    members: group2Members,
    pendingMembers: [],
  },
  {
    id: "g3",
    name: "Member Group",
    description: "This is a group where you are a member.",
    lastMessage: "Did anyone see the client feedback?",
    lastMessageTime: "Mon",
    unreadCount: 12,
    members: group3Members,
    pendingMembers: [],
  },
];

export const mockMessages: Message[] = generateMessages(100, group1Members);

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
