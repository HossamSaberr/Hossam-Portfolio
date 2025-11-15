import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Hossam Saber",
    title: "Competitive Programmer & Software Developer",
    tagline: "ACCPC Finalist, ICPC Problem Setter & Software Developer passionate about algorithmic problem solving and mentoring.",
    email: "hosssam.saberr@gmail.com",
    phone: "+201140945716",
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
      title: "Library Management System",
      description: "Comprehensive library management application with book tracking, member management, and user-friendly GUI built using Java Swing and object-oriented programming principles.",
      technologies: ["Java", "OOP", "GUI (Java Swing)", "In-Memory Storage"],
      features: ["Book management system", "Member tracking", "User-friendly interface", "Database integration"],
      image: "/projects/library-management.svg",
      githubUrl: "https://github.com/HossamSaberr/LibraryManagementSystem",
      liveUrl: "https://github.com/HossamSaberr/LibraryManagementSystem"
    },
    {
      id: 2,
      title: "Personal Portfolio Website",
      description: "Modern, responsive portfolio website showcasing projects, skills, services, and contact information with smooth animations and professional design.",
      technologies: ["HTML", "CSS", "Responsive Design", "JavaScript"],
      features: ["Multiple sections", "Responsive layout", "Contact form", "Professional animations"],
      image: "/projects/portfolio-website.svg",
      githubUrl: "https://github.com/HossamSaberr/Hossam-Portfolio",
      liveUrl: "https://hossamsaberr.dev"
    },
    {
      id: 3,
      title: "ICPC Menofia Community Website",
      description: "Official community website featuring training resources, events, and competitive programming content to support and grow the programming community.",
      technologies: ["Markdown", "Git"],
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
      title: "ACPC Finalist",
      platform: "ACPC",
      date: "2025",
      description: "Qualified as finalist in the Arab Collegiate Programming Contest",
      url: "https://acpc.global"
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
      url: "https://atcoder.jp/users/Homz"
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
