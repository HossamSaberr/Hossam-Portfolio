import { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: "Hossam Saber",
    title: "Competitive Programmer & Software Developer",
    tagline: "ACPC Finalist, ICPC Problem Setter & Software Developer passionate about algorithms, clean code, and building impactful software solutions.",
    email: "hosssam.saberr@gmail.com",
    phone: "+201140945716",
    location: "Menoufia, Egypt",
  },

  education: {
    institution: "Faculty of Computer & Information, Menoufia University",
    degree: "Computer Science",
    duration: "2023 - Present",
    gpa: "3.2 / 4.0",
    achievements: [
      "Strong focus on Data Structures and Algorithms",
      "Advanced Object-Oriented Programming",
      "Problem Solving Specialization"
    ]
  },

  statistics: {
    problemsSolved: 4000,
    studentsMentored: 500,
    communitiesLed: 2,
    contestsDesigned: 10,
  },

  skills: [
    // Languages
    {
      name: "C++",
      level: "Advanced",
      category: "languages",
      icon: "cpp"
    },
    {
      name: "Java",
      level: "Advanced",
      category: "languages",
      icon: "java"
    },

    // Concepts
    {
      name: "Data Structures & Algorithms",
      level: "Expert",
      category: "concepts",
      icon: "algorithms"
    },
    {
      name: "Object-Oriented Programming",
      level: "Advanced",
      category: "concepts",
      icon: "oop"
    },
    {
      name: "Problem Solving",
      level: "Expert",
      category: "concepts",
      icon: "problem-solving"
    },

    // Other Skills
    {
      name: "GUI Development",
      level: "Intermediate",
      category: "other",
      icon: "gui"
    },
    {
      name: "Web Design",
      level: "Intermediate",
      category: "other",
      icon: "web"
    },
    {
      name: "Team Leadership",
      level: "Advanced",
      category: "other",
      icon: "leadership"
    },
    {
      name: "Mentoring & Teaching",
      level: "Advanced",
      category: "other",
      icon: "mentorship"
    }
  ],

  projects: [
    {
      id: "library-management",
      title: "Library Management System",
      description: "Built a full Java application using OOP principles to manage books, members, and transactions. Features a user-friendly graphical interface built with Java Swing.",
      technologies: ["Java", "OOP", "Java Swing", "GUI"],
      features: [
        "Book management system",
        "Member registration and tracking",
        "Transaction management",
        "User-friendly GUI design",
        "Data persistence"
      ],
      links: {
        github: "https://github.com/HossamSaberr/LibraryManagementSystem"
      },
      category: "Desktop Application",
      featured: true
    },
    {
      id: "personal-portfolio",
      title: "Personal Portfolio Website",
      description: "Designed and developed a complete personal portfolio website including projects, skills, services, and contact sections with responsive design.",
      technologies: ["HTML", "CSS", "Responsive Design", "JavaScript"],
      features: [
        "Responsive web design",
        "Project showcase",
        "Skills and services sections",
        "Contact form",
        "Professional styling"
      ],
      links: {
        demo: "https://hossamsaberr.github.io/Hosam/port.html"
      },
      category: "Web Development",
      featured: true
    },
    {
      id: "icpc-menofia-website",
      title: "ICPC Menofia Community Website",
      description: "Contributed to the official ICPC Menofia Community website using Material for MkDocs, providing access to training plans, recordings, and events.",
      technologies: ["Material for MkDocs", "Markdown", "Git"],
      features: [
        "Training plans and resources",
        "Event recordings and materials",
        "Community announcements",
        "Easy navigation and search",
        "Mobile-responsive design"
      ],
      links: {
        github: "https://github.com/ICPC-Menofia/icpc-menofia.github.io",
        demo: "https://icpc-menofia.github.io"
      },
      category: "Documentation Site",
      featured: false
    }
  ],

  experience: [
    {
      id: "compiler-community",
      organization: "Compiler Community",
      role: "Community Leader",
      duration: "2023 - Present",
      description: "Started as Social Media Team Leader and promoted to Community Leader, driving growth and technical development.",
      achievements: [
        "Organized scientific events with top industry speakers",
        "Taught programming tracks to hundreds of students",
        "Built and mentored technical teams",
        "Increased community engagement and participation",
        "Developed comprehensive learning pathways"
      ],
      type: "community"
    },
    {
      id: "icpc-menofia",
      organization: "ICPC Menofia Community",
      role: "Development Team Leader & Problem Setter",
      duration: "2024 - Present",
      description: "Leading technical development and educational content creation for competitive programming community.",
      achievements: [
        "Mentored 500+ trainees in competitive programming",
        "Designed and implemented contests and training materials",
        "Created structured learning paths for different skill levels",
        "Developed problem sets for various competitions",
        "Conducted technical workshops and training sessions"
      ],
      type: "leadership"
    }
  ],

  achievements: [
    {
      id: "acpc-finalist-2025",
      title: "ACPC Finalist 2025",
      description: "Reached finals in the Arab Collegiate Programming Championship 2025",
      date: "2025",
      type: "competitive",
      organization: "ACPC",
      link: "https://icpc.global/"
    },
    {
      id: "tcpc-problem-setter",
      title: "Problem Setter at TCPC 2025",
      description: "Selected as official problem setter for The Collegiate Programming Contest 2025",
      date: "2025",
      type: "professional",
      organization: "TCPC"
    },
    {
      id: "scpc-problem-setter",
      title: "Problem Setter at SCPC 2025",
      description: "Selected as official problem setter for Syrian Collegiate Programming Contest 2025",
      date: "2025",
      type: "professional",
      organization: "SCPC"
    },
    {
      id: "codeforces-expert",
      title: "Codeforces Expert",
      description: "Achieved Expert rating on Codeforces competitive programming platform",
      date: "Ongoing",
      type: "competitive",
      organization: "Codeforces",
      link: "https://codeforces.com/profile/Homz",
      badge: "https://codeforces.org/s/87610/images/rating/rating-16.svg"
    },
    {
      id: "atcoder-cyan",
      title: "AtCoder Cyan",
      description: "Achieved Cyan rating on AtCoder competitive programming platform",
      date: "Ongoing",
      type: "competitive",
      organization: "AtCoder",
      link: "https://atcoder.jp/users/Homz"
    },
    {
      id: "four-thousand-problems",
      title: "4000+ Algorithmic Problems Solved",
      description: "Successfully solved over 4000 algorithmic problems across various competitive programming platforms",
      date: "Ongoing",
      type: "competitive"
    }
  ],

  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/HossamSaberr",
      icon: "github",
      color: "#333"
    },
    {
      platform: "Codeforces",
      url: "https://codeforces.com/profile/Homz",
      icon: "codeforces",
      color: "#1F8ACB"
    },
    {
      platform: "ICPC Profile",
      url: "https://icpc.global/ICPCID/WCMZYVG0D2Q9",
      icon: "icpc",
      color: "#FF6B35"
    },
    {
      platform: "Email",
      url: "mailto:hosssam.saberr@gmail.com",
      icon: "email",
      color: "#EA4335"
    },
    {
      platform: "Phone",
      url: "tel:+201140945716",
      icon: "phone",
      color: "#10B981"
    }
  ],

  navigation: [
    {
      label: "Home",
      href: "#home"
    },
    {
      label: "About",
      href: "#about"
    },
    {
      label: "Skills",
      href: "#skills"
    },
    {
      label: "Projects",
      href: "#projects"
    },
    {
      label: "Experience",
      href: "#experience"
    },
    {
      label: "Achievements",
      href: "#achievements"
    },
    {
      label: "Contact",
      href: "#contact"
    }
  ]
};