export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  education: {
    university: string;
    degree: string;
    gpa: string;
  };
  statistics: {
    label: string;
    value: string;
  }[];
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon: string;
}

export interface SkillCategory {
  languages: Skill[];
  concepts: Skill[];
  other: Skill[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  image: string;
  githubUrl: string | null;
  liveUrl: string | null;
}

export interface Experience {
  id: number;
  organization: string;
  role: string;
  duration: string;
  achievements: string[];
  technologies: string[];
}

export interface Achievement {
  title: string;
  platform: string;
  date: string;
  description: string;
  url: string | null;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: SkillCategory;
  projects: Project[];
  experience: Experience[];
  achievements: Achievement[];
  socialLinks: SocialLink[];
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}