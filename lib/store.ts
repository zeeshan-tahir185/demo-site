export type DemoFile = { name: string; size: number };

export type DemoRequest = {
  id: string;
  serviceId: string;
  title: string;
  description: string;
  urgency: "low" | "normal" | "high";
  city: string;
  lawyerId: string;
  files: DemoFile[];
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  paid?: boolean;
};

const KEY = "wathiqa_demo_request";

export function saveRequest(r: DemoRequest) {
  try {
    localStorage.setItem(KEY, JSON.stringify(r));
  } catch {}
}

export function loadRequest(): DemoRequest | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DemoRequest) : null;
  } catch {
    return null;
  }
}

export const sampleRequest: DemoRequest = {
  id: "WQ-1042",
  serviceId: "contracts",
  title: "Review of a commercial lease agreement",
  description: "I'm about to sign a 5-year lease for a retail unit and want the contract reviewed before signing.",
  urgency: "normal",
  city: "Riyadh",
  lawyerId: "sara",
  files: [
    { name: "lease-agreement-draft.pdf", size: 482000 },
    { name: "commercial-registration.pdf", size: 210000 },
  ],
  name: "Abdul Hakim",
  email: "client@example.com",
  phone: "+966 50 000 0000",
  createdAt: new Date().toISOString(),
};

export function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
