import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Hossam Saber",
    title: "Competitive Programmer & Software Developer",
    tagline: "ACPC Finalist, ICPC Problem Setter & Software Developer passionate about algorithmic problem solving and mentoring",
    email: "hosssam.saberr@gmail.com",
    phone: "+201XXXXXXXX",
    location: "Egypt",
    bio: "I am a passionate competitive programmer and software developer with a strong foundation in algorithmic problem solving and software engineering. As an ACPC Finalist and ICPC Problem Setter, I have solved over 4000 algorithmic problems and achieved Expert rating on Codeforces. My experience extends beyond competitive programming into community leadership, having mentored over 500 students in competitive programming and led development teams in technical communities. I am dedicated to continuous learning, sharing knowledge, and building innovative software solutions that make a positive impact on the community.",
    education: {
      university: "Menoufia University",
      degree: "Bachelor's in Computer Science",
      gpa: "3.2/4.0"
    },
    statistics: [
      { label: "Algorithmic Problems Solved", value: "4000+" },
      { label: "Competitive Programming Rankings", value: "5+" },
      { label: "Students Mentored", value: "2500+" },
      { label: "Leadership Positions", value: "3+" }
    ]
  },
  skills: {
    languages: [
      { name: "C++", level: "Advanced", icon: "cpp" },
      { name: "Java", level: "Advanced", icon: "java" }
    ],
    concepts: [
      { name: "Data Structures & Algorithms", level: "Expert", icon: "dsa" },
      { name: "Object-Oriented Programming", level: "Advanced", icon: "oop" },
      { name: "Problem Solving", level: "Expert", icon: "problem-solving" }
    ],
    other: [
      { name: "GUI Development", level: "Advanced", icon: "gui" },
      { name: "Web Design", level: "Intermediate", icon: "web" },
      { name: "Team Leadership", level: "Advanced", icon: "leadership" },
      { name: "Technical Communication", level: "Advanced", icon: "communication" }
    ]
  },
  projects: [
    {
      id: 1,
      title: "Point of Sale System",
      description: "Developed a Point of Sale system using Java with a Swing-based graphical user interface. Applied Object-Oriented Programming (OOP) principles for clean and maintainable code with database integration.",
      technologies: ["Java", "Java Swing (GUI)", "Database (SQL)", "OOP"],
      features: ["Product management", "Sales processing", "Invoicing", "User authentication"],
      image: "/projects/pos-system.svg",
      githubUrl: "https://github.com/HossamSaberr/POS-System",
      liveUrl: "https://github.com/HossamSaberr/POS-System"
    },
    {
      id: 2,
      title: "Radio Player Application",
      description: "A cross-platform internet radio player using C++ and Qt6 with system tray support. Integrated Radio Browser API to access 30,000+ online radio stations with search and filtering.",
      technologies: ["C++", "Qt6", "Radio Browser API"],
      features: ["System tray integration", "30,000+ radio stations", "Persistent settings", "Desktop notifications"],
      image: "/projects/radio-player.svg",
      githubUrl: "https://github.com/HossamSaberr/RadioPlayer",
      liveUrl: "https://github.com/HossamSaberr/RadioPlayer"
    },
    {
      id: 3,
      title: "MUFCI ChatBot",
      description: "A responsive web chatbot for FCI Menofia University regulations with bilingual support and GPA calculation features.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      features: ["Bilingual support", "GPA calculation", "University regulations", "Responsive design"],
      image: "/projects/mufci-chatbot.svg",
      githubUrl: "https://github.com/HossamSaberr/MUFCI-ChatBot",
      liveUrl: "https://github.com/HossamSaberr/MUFCI-ChatBot"
    },
    {
      id: 4,
      title: "ICPC Menofia Community Website",
      description: "The official website of the ICPC Menofia Community. Built using Material for MkDocs theme, providing centralized access to training plans, session recordings, and competitive programming resources.",
      technologies: ["Material for MkDocs", "Markdown", "Git"],
      features: ["Training plans", "Event recordings", "Resource library", "Community forums"],
      image: "/projects/icpc-community.svg",
      githubUrl: "https://github.com/ICPC-Menofia/community-website",
      liveUrl: "https://icpc-menofia.github.io"
    }
  ],
  experience: [
    {
      id: 1,
      organization: "ICPC Menofia Community",
      role: "Development Team Leader & Problem Setter",
      duration: "2024 - Present",
      achievements: [
        "Mentored 2500+ trainees in competitive programming",
        "Designed contests and learning paths",
        "Created 50+ original programming problems",
        "Led technical development initiatives",
        "Organized hackathons and coding competitions"
      ],
      technologies: ["Competitive Programming", "Problem Setting", "Mentoring", "Technical Leadership"]
    },
    {
      id: 2,
      organization: "Compiler Community",
      role: "Community Leader",
      duration: "2023 - Present",
      achievements: [
        "Organized scientific events with top industry speakers",
        "Taught programming tracks to 100+ students",
        "Grew community engagement by 300%",
        "Led team of 5+ volunteers",
        "Established partnerships with tech companies"
      ],
      technologies: ["Community Management", "Teaching", "Event Planning", "Social Media Strategy"]
    }
  ],
  achievements: [
    {
      title: "ACPC 2025 Finalist",
      platform: "ACPC",
      date: "2025",
      description: "Qualified as finalist in the Arab Collegiate Programming Contest, also served as Problem Setter at Arab Regions",
      url: "https://icpc.global/ICPCID/WCMZYVG0D2Q9"
    },
    {
      title: "Meta Hacker Cup Round 3",
      platform: "Meta",
      date: "2025",
      description: "Qualified for Round 3 of the Meta Hacker Cup 2025 programming competition",
      url: "https://www.facebook.com/codingcompetitions/hacker-cup/2025/certificate/1083569403475171?source=facebook"
    },
    {
      title: "Problem Setter",
      platform: "TCPC & SCPC",
      date: "2025",
      description: "Created original problems for regional programming contests",
      url: ""
    },
    {
      title: "Codeforces Expert",
      platform: "Codeforces",
      date: "Current",
      description: "Achieved Expert rating with 1600+ rating points",
      url: "https://codeforces.com/profile/Homz"
    },
    {
      title: "AtCoder Cyan",
      platform: "AtCoder",
      date: "Current",
      description: "Cyan rating with 1200+ rating points",
      url: "https://atcoder.jp/users/Homzz"
    },
    {
      title: "4000+ Problems Solved",
      platform: "Multiple Platforms",
      date: "Ongoing",
      description: "Successfully solved 4000+ algorithmic programming problems",
      url: ""
    }
  ],
  socialLinks: [
    { name: "GitHub", url: "https://github.com/HossamSaberr", icon: "github" },
    { name: "Twitter", url: "https://x.com/__Homzz", icon: "twitter" },
    { name: "Facebook", url: "https://www.facebook.com/hossam.saber.198778/", icon: "facebook" },
    { name: "LinkedIn", url: "https://linkedin.com/in/hossamsaberr", icon: "linkedin" }
  ]
};

export const navigationItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" }
];
