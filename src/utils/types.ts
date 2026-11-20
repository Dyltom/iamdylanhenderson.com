export type Article = {
  id: string;
  date: string;
  readTime: number;
  views: number;
  title: string;
  shortDescription: string;
  content: Paragraph[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: string;
  slug: string;
  categories: string[];
};

export type EmailRequestType = {
  name: string;
  email: string;
  message: string;
};

export type Paragraph = {
  type: string;
  children: ParagraphChild[];
  format?: 'unordered' | 'ordered'; // For lists
  level?: number; // For headings
};

export type ParagraphChild = {
  type: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string; // For links
  children?: ParagraphChild[]; // For nested structures like links
};

export type AboutPage = {
  aboutContent: string;
  aboutTitle: string;
  workExperienceTitle: string;
  skillsTitle: string;
  skillsChartText: string;
  testimonialsTitle: string;
  interestingFactsTitle: string;
};

type CallToAction = {
  text: string;
  buttonText: string;
};

type ContactUs = {
  attributes: {
    resume: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    title: string;
    resumeCta: string;
    resumeCtaButtonText: string;
    content: Paragraph[];
  };
};

type HeroContent = {
  content: Paragraph[];
};

type Skill = {
  attributes: {
    name: string;
    experience: number;
  };
};

export type Testimonial = {
  attributes: {
    quote: string;
    author: string;
    role: string;
  };
};

type Fact = {
  content: string;
};

export type WorkExperience = {
  attributes: {
    company: string;
    points: string[];
    title: string;
    startDate: string;
    endDate: string;
  };
};
