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
  summary: "Software Engineer with 6+ years specialising in PHP development and transforming business challenges into technical solutions. Extensive commercial PHP experience building custom WordPress plugins, RESTful APIs, and web applications using MVC frameworks including CakePHP. Proven expertise in full-stack development with React, React Native, Node.js, and creating end-to-end solutions across web and mobile platforms. Strong track record of API design and implementation, including mobile app backends and third-party integrations (Stripe, Xero, OpenAI). Leverages modern tools including AI assistants to accelerate development and solve complex problems. Experienced in automated testing with PHPUnit, CI/CD pipelines, and Agile methodologies. Skilled at collaborating with stakeholders to deliver innovative solutions that automate business processes. Available for immediate start and comfortable working remotely.",
  experience: [
    {
      company: "Bonza Clean",
      title: "Senior Software Engineer",
      location: "Melbourne, VIC",
      startDate: "09/2024",
      endDate: "Present",
      responsibilities: [
        "Set up complete infrastructure on VPS using Coolify for Docker orchestration, automated deployments, and domain management",
        "Built CI/CD pipeline from scratch using GitHub Actions, Docker, and automated testing with PHPUnit",
        "Developed Bonza Engine plugin and custom WordPress plugins: API gateway, booking extensions, payment processing, AI integrations",
        "Created Bonza Success Hub from scratch and implemented Moodle LMS for training and knowledge management",
        "Built and maintained RESTful APIs in PHP powering multi-purpose React Native app for iOS/Android platforms",
        "Integrated multiple third-party services: Stripe/PayPal for payments, Xero for accounting, OpenAI/ElevenLabs for AI features",
        "Transformed non-technical business problems into scalable PHP solutions, achieving 50%+ performance improvements",
        "Increased bookings and revenue while automating operations, serving 1000+ app users with improved satisfaction"
      ]
    },
    {
      company: "Reebelo",
      title: "Full Stack Engineer",
      location: "Collingwood, VIC",
      startDate: "03/2024",
      endDate: "09/2024",
      responsibilities: [
        "Developed and delivered web applications using React, Node.js, and Express.js in Agile environment",
        "Integrated customer data management APIs and CRM systems for enhanced e-commerce capabilities",
        "Implemented automated testing strategies including unit and integration tests",
        "Participated in daily standups, sprint planning, and retrospectives to ensure continuous delivery"
      ]
    },
    {
      company: "etika",
      title: "Full Stack Developer",
      location: "Melbourne, VIC",
      startDate: "03/2022",
      endDate: "03/2024",
      responsibilities: [
        "Developed microservices architecture (10+ services) using TypeScript, React, Node.js, and Scala for database operations",
        "Built federated UIs and automated workflows for lending applications with comprehensive test coverage",
        "Implemented secure coding practices in fintech environment with focus on data protection and compliance",
        "Enhanced platform performance through monitoring, systematic troubleshooting, and microservice optimisation"
      ]
    },
    {
      company: "Leidos Australia",
      title: "Software Engineer",
      location: "Melbourne, VIC",
      startDate: "09/2021",
      endDate: "03/2022",
      responsibilities: [
        "Delivered enterprise-scale web solutions for federal government with active AGSVA NV1 clearance",
        "Designed and developed secure, high-reliability applications using Java/Spring and modern JavaScript frameworks",
        "Applied Agile methodologies with rigorous documentation standards for mission-critical systems",
        "Implemented secure coding practices and compliance protocols for sensitive government data",
        "Collaborated across large, multi-disciplinary teams on complex system integrations"
      ]
    },
    {
      company: "Virtech",
      title: "Software Developer",
      location: "Melbourne, VIC",
      startDate: "02/2020",
      endDate: "09/2021",
      responsibilities: [
        "Developed end-user experience monitoring dashboards using Vue.js and JavaScript for real-time system visibility",
        "Created PowerShell scripts for self-healing automation and proactive issue resolution",
        "Built performance monitoring and alert systems using Nexthink platform integration",
        "Achieved Nexthink Master's Level Certification while improving IT service delivery metrics"
      ]
    },
    {
      company: "Direct Speech",
      title: "Developer",
      location: "Melbourne, VIC",
      startDate: "07/2019",
      endDate: "02/2020",
      responsibilities: [
        "Developed commercial web applications using CakePHP MVC framework for business operations",
        "Designed and implemented MySQL database schemas with query optimisation for performance",
        "Built custom PHP features following MVC architecture patterns and coding standards",
        "Created and consumed RESTful APIs for system integration and data exchange"
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
    "PHP Development (PHP 7/8, CakePHP MVC Framework, WordPress Plugin Development, OOP)",
    "Web Technologies (HTML5, CSS3, JavaScript ES6+, React, TypeScript)",
    "Database Management (MySQL, Schema Design, Query Optimisation, Performance Tuning)",
    "API Development (RESTful API Design, API Integration, Third-party Services, Microservices)",
    "Version Control & CI/CD (Git, PHPUnit, Automated Testing, Jenkins, GitHub Actions)",
    "Mobile Development (React Native, iOS/Android Cross-platform Development)",
    "Agile Methodologies (Scrum, Sprint Planning, Daily Standups, Retrospectives)",
    "Full Stack Development (Node.js, Express.js, Scala, LAMP Stack, Microservices)",
    "DevOps & Infrastructure (Docker, Coolify, VPS Management, Automated Deployments, n8n)",
    "System Integration (Stripe, PayPal, Xero, OpenAI API, ElevenLabs API, Business Automation)",
    "Communication Skills (Stakeholder Collaboration, Technical Documentation, Requirements Gathering)",
    "Problem Solving (Performance Optimisation, Troubleshooting, Creative Solutions)",
    "Time Management (Multi-project Delivery, Sprint Commitments, Deadline Achievement)"
  ]
}