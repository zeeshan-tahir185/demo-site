import type { Bi } from "./i18n";

export type Service = { id: string; icon: string; title: Bi; desc: Bi; fee: number };

export const services: Service[] = [
  {
    id: "contracts",
    icon: "FileText",
    title: { en: "Contracts", ar: "العقود" },
    desc: { en: "Drafting, reviewing and negotiating commercial and personal contracts.", ar: "صياغة ومراجعة والتفاوض على العقود التجارية والشخصية." },
    fee: 1500,
  },
  {
    id: "corporate",
    icon: "Building2",
    title: { en: "Corporate & Companies", ar: "الشركات" },
    desc: { en: "Company formation, shareholder agreements and governance.", ar: "تأسيس الشركات واتفاقيات الشركاء والحوكمة." },
    fee: 3500,
  },
  {
    id: "labor",
    icon: "Briefcase",
    title: { en: "Labor & Employment", ar: "العمل والعمال" },
    desc: { en: "Employment contracts, disputes, end-of-service and HR policy.", ar: "عقود العمل والنزاعات ومكافأة نهاية الخدمة وسياسات الموارد البشرية." },
    fee: 1200,
  },
  {
    id: "realestate",
    icon: "Landmark",
    title: { en: "Real Estate", ar: "العقارات" },
    desc: { en: "Sale and lease agreements, title checks and property disputes.", ar: "عقود البيع والإيجار والتحقق من الصكوك والنزاعات العقارية." },
    fee: 2000,
  },
  {
    id: "family",
    icon: "Users",
    title: { en: "Family & Personal Status", ar: "الأحوال الشخصية" },
    desc: { en: "Marriage, divorce, custody, inheritance and wills.", ar: "الزواج والطلاق والحضانة والمواريث والوصايا." },
    fee: 1800,
  },
  {
    id: "litigation",
    icon: "Gavel",
    title: { en: "Litigation & Disputes", ar: "التقاضي والنزاعات" },
    desc: { en: "Representation before courts and arbitration panels.", ar: "الترافع أمام المحاكم وهيئات التحكيم." },
    fee: 5000,
  },
  {
    id: "debt",
    icon: "Banknote",
    title: { en: "Debt Collection", ar: "تحصيل الديون" },
    desc: { en: "Formal notices, settlements and enforcement of claims.", ar: "الإنذارات الرسمية والتسويات وتنفيذ المطالبات." },
    fee: 1000,
  },
  {
    id: "ip",
    icon: "Lightbulb",
    title: { en: "Intellectual Property", ar: "الملكية الفكرية" },
    desc: { en: "Trademark registration, copyright and brand protection.", ar: "تسجيل العلامات التجارية وحقوق النشر وحماية العلامة." },
    fee: 2500,
  },
];

export type Lawyer = {
  id: string;
  name: Bi;
  role: Bi;
  bio: Bi;
  years: number;
  cases: number;
  rating: number;
  langs: Bi;
  photo: string;
  areas: string[];
};

export const lawyers: Lawyer[] = [
  {
    id: "sara",
    name: { en: "Sara Al-Qahtani", ar: "سارة القحطاني" },
    role: { en: "Corporate & Commercial", ar: "الشركات والقانون التجاري" },
    bio: { en: "Advises startups and SMEs on formation, contracts and investment.", ar: "تقدّم الاستشارات للشركات الناشئة والصغيرة في التأسيس والعقود والاستثمار." },
    years: 12,
    cases: 340,
    rating: 4.9,
    langs: { en: "Arabic, English", ar: "العربية، الإنجليزية" },
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    areas: ["corporate", "contracts", "ip"],
  },
  {
    id: "omar",
    name: { en: "Omar Al-Harbi", ar: "عمر الحربي" },
    role: { en: "Litigation & Arbitration", ar: "التقاضي والتحكيم" },
    bio: { en: "Seasoned litigator representing clients in commercial and civil courts.", ar: "محامٍ مترافع متمرّس أمام المحاكم التجارية والمدنية." },
    years: 15,
    cases: 520,
    rating: 4.8,
    langs: { en: "Arabic, English", ar: "العربية، الإنجليزية" },
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    areas: ["litigation", "debt"],
  },
  {
    id: "layla",
    name: { en: "Layla Haddad", ar: "ليلى حداد" },
    role: { en: "Family & Personal Status", ar: "الأحوال الشخصية والأسرة" },
    bio: { en: "Handles sensitive family matters with discretion and care.", ar: "تتولى قضايا الأسرة الحساسة بسرية واهتمام." },
    years: 9,
    cases: 280,
    rating: 5.0,
    langs: { en: "Arabic, English, French", ar: "العربية، الإنجليزية، الفرنسية" },
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    areas: ["family"],
  },
  {
    id: "khalid",
    name: { en: "Khalid Al-Mutairi", ar: "خالد المطيري" },
    role: { en: "Real Estate & Labor", ar: "العقارات وقضايا العمل" },
    bio: { en: "Focused on property transactions, leases and employment disputes.", ar: "متخصص في المعاملات العقارية والإيجارات ونزاعات العمل." },
    years: 11,
    cases: 410,
    rating: 4.9,
    langs: { en: "Arabic, English", ar: "العربية، الإنجليزية" },
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
    areas: ["realestate", "labor"],
  },
];

export function lawyerFor(serviceId: string, preferred?: string) {
  return (
    lawyers.find((l) => l.id === preferred) ??
    lawyers.find((l) => l.areas.includes(serviceId)) ??
    lawyers[0]
  );
}
