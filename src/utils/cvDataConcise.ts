import { CVData } from './cvTypes'

// Concise CV data optimised for government applications
export const CV_DATA_CONCISE: CVData = {
  personalInfo: {
    name: "Dylan Henderson",
    phone: "0426 007 021",
    email: "dylanthenderson@yahoo.com.au",
    location: "Relocating to Canberra, ACT",
    linkedin: "https://www.linkedin.com/in/dylan-henderson-07",
    github: "https://github.com/Dyltom",
    portfolio: "https://iamdylanhenderson.com"
  },
  summary: "Senior Software Engineer with NV1 clearance being reactivated. Government exposure through federal project delivery at Leidos Australia. Experienced in modern tech stack (React, Node.js, TypeScript) with strong security implementation including OAuth 2.0 authentication, AES-256 encryption, and RBAC systems. Available for immediate start in Canberra.",
  experience: [
    {
      company: "Bonza Clean",
      title: "Senior Software Engineer",
      location: "Melbourne, VIC",
      startDate: "09/2024",
      endDate: "Present",
      responsibilities: [
        "Sole developer responsible for complete platform security including data protection, access controls, and compliance documentation",
        "Delivered secure customer portal and payment systems with comprehensive audit trails and security hardening",
        "Implemented AI-powered automation reducing operational workload while maintaining security standards",
        "Established secure CI/CD pipelines with automated security scanning and vulnerability management"
      ]
    },
    {
      company: "Reebelo",
      title: "Full Stack Engineer",
      location: "Collingwood, VIC",
      startDate: "03/2024",
      endDate: "09/2024",
      responsibilities: [
        "Developed secure e-commerce platform features using Node.js/Express.js with comprehensive testing",
        "Architected headless CMS solution ensuring data integrity and system resilience",
        "Integrated third-party APIs maintaining security protocols and data validation"
      ]
    },
    {
      company: "etika",
      title: "Full Stack Developer",
      location: "Melbourne, VIC",
      startDate: "03/2022",
      endDate: "03/2024",
      responsibilities: [
        "Built secure microservices handling sensitive financial data with compliance requirements",
        "Implemented document generation systems with access controls and audit capabilities",
        "Optimised high-performance NoSQL databases ensuring data security and availability"
      ]
    },
    {
      company: "Leidos Australia",
      title: "Software Engineer (NV1 Cleared)",
      location: "Melbourne, VIC",
      startDate: "09/2021",
      endDate: "03/2022",
      responsibilities: [
        "Delivered large-scale government data platform with active NV1 clearance",
        "Developed secure Java/Spring microservices following government security frameworks",
        "Applied structured SDLC methodologies ensuring compliance with government standards",
        "Collaborated with multi-disciplinary teams in secure federal environment"
      ]
    },
    {
      company: "Virtech",
      title: "Software Developer",
      location: "Melbourne, VIC",
      startDate: "02/2020",
      endDate: "09/2021",
      responsibilities: [
        "Developed secure WordPress solutions for enterprise clients",
        "Managed critical infrastructure ensuring system availability and performance",
        "Achieved Nexthink Master's Level Certification for system monitoring"
      ]
    },
    {
      company: "Direct Speech",
      title: "Developer",
      location: "Melbourne, VIC",
      startDate: "07/2019",
      endDate: "02/2020",
      responsibilities: [
        "Built secure web applications using CakePHP framework",
        "Developed custom CMS features with focus on data integrity and user access controls"
      ]
    }
  ],
  education: [
    {
      institution: "Monash University",
      degree: "IT (Computers, Networks & Security)",
      completionDate: "02/2020"
    }
  ],
  skills: [
    "Security Clearance: NV1 being reactivated (previously held 2021-2022 with Leidos)",
    "Government Experience: Federal data platforms, secure SDLC, formal documentation standards",
    "Security Capabilities: Data encryption, access controls, OAuth 2.0/JWT, OWASP compliance, audit trails",
    "Modern Stack: React, Node.js, TypeScript, RESTful APIs, microservices architecture",
    "Cloud & DevOps: AWS, Docker, CI/CD pipelines, automated security scanning, GitLab",
    "Process Automation: OpenAI integration, workflow optimisation, operational efficiency improvements",
    "CMS Expertise: WordPress, custom CMS development, headless architectures",
    "Databases: MySQL, PostgreSQL, MongoDB, ScyllaDB, secure data handling"
  ]
}

// Additional CV data for professional context
export const ADDITIONAL_INFO = {
  clearanceStatus: "NV1 clearance (reactivation in progress)",
  availability: "Immediate start",
  contractPreference: "Long-term contracts (12+ months)",
  location: "Relocating to Canberra - available for onsite/hybrid work"
}