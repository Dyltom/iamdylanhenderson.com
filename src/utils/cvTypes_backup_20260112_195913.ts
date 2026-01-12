export interface CVData {
  personalInfo: {
    name: string
    phone: string
    email: string
    location: string
    linkedin?: string
    github?: string
    portfolio?: string
  }
  summary: string
  experience: CVExperience[]
  education: CVEducation[]
  skills: string[]
}

export interface CVExperience {
  company: string
  title: string
  location: string
  startDate: string
  endDate: string
  responsibilities: string[]
}

export interface CVEducation {
  institution: string
  degree: string
  completionDate: string
}

// Static CV data based on cv.txt
export const CV_DATA: CVData = {
  personalInfo: {
    name: "Dylan Henderson",
    phone: "0426007021",
    email: "dylanthenderson@yahoo.com.au",
    location: "Melbourne, VIC",
    linkedin: "https://www.linkedin.com/in/dylan-henderson-07",
    github: "https://github.com/Dyltom",
    portfolio: "https://iamdylanhenderson.com"
  },
  summary: "Senior Software Engineer at Bonza Clean, leading the architecture and build of the company's core platform from the ground up. I translate real operational problems into scalable systems and ship quickly with strong engineering standards. I work across product engineering, full-stack development, infrastructure, and reliability: SaaS platform development, CRM and customer workflows, automated SMS/email communications, and mobile apps. I've also built practical AI automations for data collection and customer interactions, including voice/chat experiences and phone automation integrated with ElevenLabs. I'm comfortable owning outcomes end-to-end: architecture, delivery, reliability, and continuous improvement. My default mode is rapid prototyping with a clear path to production-grade systems. Core stack: TypeScript, Next.js, React, Node.js, PHP, React Native, Sentry, databases and schema design, Linux/VPS infrastructure, cloud tooling, component-driven UI (shadcn/ui)",
  experience: [
    {
      company: "Bonza Clean",
      title: "Senior Software Engineer",
      location: "Melbourne, VIC",
      startDate: "09/2024",
      endDate: "Present",
      responsibilities: [
        "Architected and built core platform capabilities from the ground up, translating operational requirements into scalable product systems",
        "Delivered customer and internal workflows including CRM-style customer management, job tracking, and automation-heavy operational flows",
        "Implemented automated customer communications (SMS and email) triggered by workflow events",
        "Built and integrated AI-assisted automations for data capture and customer interaction, including voice and chat experiences and phone automation (ElevenLabs integration)",
        "Owned reliability and production quality through monitoring, error tracking (Sentry), and strong engineering standards"
      ]
    },
    {
      company: "Reebelo",
      title: "Full Stack Engineer",
      location: "Collingwood, VIC",
      startDate: "03/2024",
      endDate: "09/2024",
      responsibilities: [
        "Built and maintained full-stack product features across web application and backend services",
        "Shipped production changes in a fast-moving environment with a focus on maintainability, stability, and delivery velocity",
        "Contributed to engineering standards and code quality through improved structure, debugging, and collaboration"
      ]
    },
    {
      company: "etika",
      title: "Full Stack Developer",
      location: "Melbourne, VIC",
      startDate: "03/2022",
      endDate: "03/2024",
      responsibilities: [
        "Developed and enhanced platform features in a microservices, event-driven architecture",
        "Delivered and refined lending application workflows and related internal systems",
        "Built dynamic document generation capabilities and improved customer interaction flows, including offline-friendly experiences",
        "Worked across TypeScript, Node.js, React, AWS, and NoSQL (ScyllaDB), with a focus on testable, well-structured code"
      ]
    },
    {
      company: "Leidos Australia",
      title: "Software Engineer",
      location: "Melbourne, VIC",
      startDate: "09/2021",
      endDate: "03/2022",
      responsibilities: [
        "Software engineering role contributing to delivery of production systems in a structured enterprise environment",
        "Worked across development, debugging, and collaboration with broader engineering stakeholders"
      ]
    },
    {
      company: "Virtech",
      title: "Software Developer",
      location: "Melbourne, VIC",
      startDate: "02/2020",
      endDate: "09/2021",
      responsibilities: [
        "Delivered solutions using Nexthink to support enterprise monitoring, ITSM, security, and digital transformation outcomes",
        "Achieved Nexthink Master's Level Certification (AsiaPac) and applied it across client environments",
        "Worked directly with stakeholders to translate requirements into practical technical outcomes"
      ]
    },
    {
      company: "Direct Speech",
      title: "Developer",
      location: "Melbourne, VIC",
      startDate: "07/2019",
      endDate: "02/2020",
      responsibilities: [
        "Built and maintained software solutions supporting internal operations and delivery"
      ]
    },
    {
      company: "Media8",
      title: "Technical Consultant",
      location: "Melbourne, VIC",
      startDate: "02/2018",
      endDate: "01/2020",
      responsibilities: [
        "Supported social media operations tooling and scheduling workflows"
      ]
    }
  ],
  education: [
    {
      institution: "Monash University",
      degree: "Information Technology (Computers, Networks and Security)",
      completionDate: "02/2020"
    }
  ],
  skills: [
    "REST APIs",
    "TypeScript",
    "JavaScript",
    "PHP",
    "React",
    "Next.js",
    "Node.js",
    "React Native",
    "Linux/VPS infrastructure",
    "Sentry",
    "Database design",
    "NoSQL exposure",
    "AI Agents"
  ]
}