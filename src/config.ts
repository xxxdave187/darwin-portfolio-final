/**
 * ============================================================
 *  PORTFOLIO CONTENT CONFIG — EDIT EVERYTHING HERE
 *  All text, links, projects, and socials live in this file.
 *  Replace the placeholder values with your real info.
 * ============================================================
 */

export const site = {
  // Your name — shown in the hero, navbar and footer
  name: "DARWIN CONSIGO",
  // Short romanized handle (e.g. "RONIN.DEV") shown as a brand mark
  handle: "DARWIN.DEV",
  role: "FULL STACK WEB DEVELOPER",
  roleKanji: "開発者",
  // Short intro shown under the hero title
  tagline:
    "I build clean, responsive websites with thoughtful design and smooth user experiences — turning ideas into interfaces people actually enjoy using.",
  // The email that the contact form mailto points to, and shown in contact section
  email: "your.email@gmail.com",
  location: "Taguig City, Philippines",
  availability: "OPEN TO WORK",
};

export const about = {
  heading: "ABOUT ME",
  kanji: "私について",
  // Replace with your real bio (each string is a paragraph)
  bio: [
    "I'm Darwin, a fourth-year Bachelor of Science in Information Technology student at Systems Technology Institute (STI) in the Philippines. I'm passionate about building modern, user-centered digital solutions and currently focused on becoming a full-stack web developer.",
    "I enjoy solving real-world problems through technology, whether that means developing systems that improve everyday processes, or turning ideas into functional, polished applications. I'm continuously learning new tools and technologies to grow into a well-rounded professional developer.",
    "I'm actively seeking an internship/OJT opportunity where I can apply what I've learned, gain hands-on industry experience, and keep developing my technical and professional skills. Based in Taguig City, Philippines.",
  ],
  stats: [
    { value: "04", label: "PROJECT SHIPPED" },
    { value: "16", label: "CORE STACK" },
    { value: "∞", label: "ALWAYS LEARNING" },
  ],
  // Place your real resume PDF at /public/resume.pdf — the button downloads it
  resumeFile: "/resume.pdf",
};

export type Project = {
  id: string;
  kanji: string;
  title: string;
  description: string;
  tags: string[];
  link: string; // project URL or repo — replace "#"
  year: string;
};

export const projects: Project[] = [
  {
    id: "01",
    kanji: "剣",
    title: "(DEMO) Barbershop Booking System",
    description:
      "A full-stack barbershop booking platform where customers schedule appointments in real time and staff manage slots, services, and bookings through a dedicated admin dashboard.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Tailwind", "Firebase",],
    link: "https://7as-barberstudio.netlify.app",
    year: "",
  },
  {
    id: "02",
    kanji: "道",
    title: "(DEMO) Full-stack E-commerce Platform",
    description:
      "A full-stack e-commerce platform with real-time product browsing, secure checkout, and role-based admin analytics, built end-to-end from database to deployment.",
    tags: ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "Tailwind",],
    link: "https://tikshop-ecommerce-app.netlify.app",
    year: "",
  },
  {
    id: "03",
    kanji: "心",
    title: "(DEMO) Inventory & POS System",
    description:
      "A full-stack point-of-sale and inventory management system built for small retail businesses, handling real-time stock deduction, role-based staff access, and live sales analytics from a single",
    tags: ["PHP", "MySQL", "JavaScript", "Chart.js", "CSS3", ],
    link: "http://inventory-pos.free.nf/auth/login.php",
    year: "",
  },
  {
    id: "04",
    kanji: "技",
    title: "CODM Esports Community",
    description:
      "A centralized CODM esports hub connecting players, teams, and fans through live rosters, tournament brackets, match schedules, and community announcements.",
    tags: ["React", "Node.js", "REST API"],
    link: "https://ventrix-community.netlify.app",
    year: "",
  },
];

export const techStack = [
  { name: "HTML5", kanji: "骨", level: 95 },
  { name: "CSS3", kanji: "彩", level: 92 },
  { name: "JAVASCRIPT", kanji: "動", level: 90 },
  { name: "REACT.JS", kanji: "反", level: 88 },
  { name: "TAILWIND", kanji: "風", level: 90 },
  { name: "NODE.JS", kanji: "結", level: 85 },
  { name: "NEXT.JS", kanji: "次", level: 82 },
  { name: "TYPESCRIPT", kanji: "型", level: 84 },
  { name: "PHP", kanji: "侍", level: 75 },
  { name: "FIREBASE", kanji: "炎", level: 78 },
  { name: "TRPC", kanji: "通", level: 76 },
  { name: "PRISMA", kanji: "晶", level: 80 },
  { name: "POSTGRESQL", kanji: "象", level: 82 },
  { name: "CHART.JS", kanji: "図", level: 74 },
  { name: "MYSQL", kanji: "庫", level: 80 },
  { name: "LARAVEL", kanji: "職", level: 72 },
];

export const socials = [
  {
    label: "Messenger",
    handle: "Darwin Consigo",
    url: "https://www.facebook.com/darwin.consigo.77", // replace with your Messenger link
    kanji: "話",
  },
  {
    label: "Gmail",
    handle: "darwindaveconsigo@gmail.com",
    url: "mailto:darwindaveconsigo@gmail.com",
    kanji: "信",
  },
  {
    label: "LinkedIn",
    handle: "Darwin Consigo",
    url: "linkedin.com/in/darwin-consigo-55453342a/",
    kanji: "縁",
  },
  {
    label: "GitHub",
    handle: "xxxdave187",
    url: "https://github.com/xxxdave187",
    kanji: "碼",
  },
];

export const nav = [
  { label: "HOME", kanji: "家", href: "#home" },
  { label: "ABOUT", kanji: "私", href: "#about" },
  { label: "PORTFOLIO", kanji: "作", href: "#portfolio" },
  { label: "CONTACT", kanji: "絡", href: "#contact" },
];