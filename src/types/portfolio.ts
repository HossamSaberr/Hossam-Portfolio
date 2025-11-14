// Portfolio TypeScript type definitions

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
}

export interface Skill {
  id?: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: 'languages' | 'concepts' | 'other';
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  links: {
    github?: string;
    demo?: string;
  };
  image?: string;
  category?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
  type: 'community' | 'professional' | 'leadership';
  logo?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'competitive' | 'academic' | 'professional' | 'leadership';
  organization?: string;
  link?: string;
  badge?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  color?: string;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  gpa?: string;
  achievements?: string[];
}

export interface Statistics {
  problemsSolved: number;
  studentsMentored: number;
  communitiesLed: number;
  contestsDesigned: number;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: Education;
  statistics: Statistics;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  achievements: Achievement[];
  socialLinks: SocialLink[];
  navigation: NavigationItem[];
}