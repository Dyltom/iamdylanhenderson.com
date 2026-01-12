import { CVData } from './cvTypes'

// Concise CV data optimised for government applications
export const CV_DATA_CONCISE: CVData = {
  personalInfo: {
    name: "Dylan Henderson",
    phone: "0426 007 021",
    email: "dylanthenderson@yahoo.com.au",
    location: "Relocating to Cowra, NSW",
    linkedin: "https://www.linkedin.com/in/dylan-henderson-07",
    github: "https://github.com/Dyltom",
    portfolio: "https://iamdylanhenderson.com"
  },
  summary: "Senior Software Engineer (6+ years) relocating to Cowra for family reasons. Strong fit: • PHP & CMS expertise (WordPress/Custom) - can handle workload autonomously from Day 1 • Government ready - previously held NV1 clearance (2021-2022) with Leidos • Seeking stable, long-term engagement in regional NSW • Available for immediate start",
  experience: [
    {
      company: "Bonza Clean",
      title: "Senior Software Engineer",
      location: "Melbourne, VIC",
      startDate: "09/2024",
      endDate: "Present",
      responsibilities: [
        "Custom CMS development (PHP, WordPress, React)",
        "RESTful API implementation and MySQL optimisation",
        "Automated CI/CD workflows"
      ]
    },
    {
      company: "Reebelo",
      title: "Full Stack Engineer",
      location: "Collingwood, VIC",
      startDate: "03/2024",
      endDate: "09/2024",
      responsibilities: [
        "Full-stack product features (Node.js/Express.js)",
        "Headless CMS architecture",
        "E-commerce platform development"
      ]
    },
    {
      company: "etika",
      title: "Full Stack Developer",
      location: "Melbourne, VIC",
      startDate: "03/2022",
      endDate: "03/2024",
      responsibilities: [
        "Microservices architecture (TypeScript, React, AWS)",
        "Document generation systems",
        "NoSQL database implementation (ScyllaDB)"
      ]
    },
    {
      company: "Leidos Australia",
      title: "Software Engineer (NV1 Cleared)",
      location: "Melbourne, VIC",
      startDate: "09/2021",
      endDate: "03/2022",
      responsibilities: [
        "Federal government client delivery with active NV1 clearance",
        "Java/Spring microservices in secure environments",
        "Structured government development methodologies"
      ]
    },
    {
      company: "Virtech",
      title: "Software Developer",
      location: "Melbourne, VIC",
      startDate: "02/2020",
      endDate: "09/2021",
      responsibilities: [
        "WordPress custom themes/plugins (PHP, JavaScript)",
        "Apache/MySQL infrastructure",
        "Nexthink Master's Level Certification achieved"
      ]
    },
    {
      company: "Direct Speech",
      title: "Developer",
      location: "Melbourne, VIC",
      startDate: "07/2019",
      endDate: "02/2020",
      responsibilities: [
        "CakePHP framework development",
        "Custom CMS features"
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
    "PHP/CMS Expert: WordPress, CakePHP, Custom CMS architectures",
    "Full-Stack: JavaScript/TypeScript, React, Node.js, Java/Spring",
    "Database: MySQL, SQL Server, NoSQL (ScyllaDB)",
    "Infrastructure: Linux, Apache, Git, CI/CD, AWS",
    "Security: AGSVA NV1 (2021-2022), Secure coding standards",
    "Government Ready: Federal experience, compliance understanding",
    "Indigenous Australian: Supporting diversity targets"
  ]
}

// Additional CV data for professional context
export const ADDITIONAL_INFO = {
  clearanceStatus: "Previously NV1 (2021-2022) - Ready for reactivation or Baseline",
  indigenousStatus: "Aboriginal - Supporting diversity initiatives",
  relocationStatus: "Confirmed move to Cowra, NSW - Seeking regional stability",
  availability: "Immediate start",
  contractPreference: "Long-term engagement preferred"
}