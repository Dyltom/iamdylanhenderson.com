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
  techStack?: string
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
    portfolio: "https://www.iamdylanhenderson.com"
  },
  summary: "Senior Software Engineer (PHP/WordPress + React/Node) with 6+ years building plugins, APIs, and internal platforms. Strong in productising messy business workflows into maintainable systems: bookings, payments, invoicing, integrations. Infrastructure + delivery: Docker, CI/CD, PHPUnit, automated deployments. Experience across fintech and government sectors. Available for immediate start.",
  experience: [
    {
      company: "Bonza Clean",
      title: "Senior Software Engineer",
      location: "Melbourne, VIC",
      startDate: "09/2024",
      endDate: "Present",
      responsibilities: [
        "Platform & Infrastructure: Built Docker-based CI/CD reducing deploy time from 30min to <5min; set up staging/local dev environments",
        "Customer Portal: Self-service portal (quotes, invoices, feedback, scheduling) cut admin work from 9hrs to 1-2hrs/week",
        "Bonza Engine: WordPress plugin suite for bookings/payments; reduced scheduling admin from 4hrs to 1hr/week",
        "APIs & Mobile: PHP REST APIs powering React Native app (iOS/Android, 1000+ users)",
        "Integrations: Stripe/PayPal payments, Xero accounting, ElevenLabs voice receptionist for lead capture",
        "AI Systems: Built context-aware AI agent for creating appointments/leads/customers and platform assistance",
        "Automation: n8n workflows for social media automation and AI agent orchestration",
        "Knowledge Systems: Moodle LMS + Scribe docs + training videos; measurably reduced support tickets",
        "Leadership: Hired/mentored developer; delivered virtual training sessions"
      ],
      techStack: "PHP, WordPress, React Native, Docker, GitHub Actions, Stripe, Xero, OpenAI, n8n, Playwright"
    },
    {
      company: "Side Projects",
      title: "Independent Developer",
      location: "Melbourne, VIC",
      startDate: "2018",
      endDate: "Present",
      responsibilities: [
        "E-commerce Platform: Co-built successful opal e-commerce platform handling product catalogue and transactions",
        "Headless WordPress: Built JAMstack e-commerce sites with Next.js frontend + WordPress API",
        "Portfolio Sites: Musician portfolio integrating Spotify API with headless WordPress CMS",
        "Continuous Learning: Explore emerging tech through client work and personal experiments"
      ],
      techStack: "WordPress REST API, Next.js, Spotify API, Headless CMS, JAMstack"
    },
    {
      company: "Reebelo",
      title: "Full Stack Engineer",
      location: "Collingwood, VIC",
      startDate: "03/2024",
      endDate: "09/2024",
      responsibilities: [
        "Built web applications for e-commerce platform using React/Node.js with TypeScript",
        "Integrated customer data APIs and CRM systems for order management and analytics",
        "Implemented comprehensive test coverage with Jest and integration testing",
        "Delivered features in 2-week sprints using Agile methodologies"
      ],
      techStack: "React, Node.js, Express, TypeScript, Jest, PostgreSQL, AWS (EC2, S3)"
    },
    {
      company: "etika",
      title: "Full Stack Developer",
      location: "Melbourne, VIC",
      startDate: "03/2022",
      endDate: "03/2024",
      responsibilities: [
        "Built microservices architecture (10+ services) with federated UI approach",
        "Developed lending workflows with automated testing and compliance checks",
        "Optimised ScyllaDB queries and microservice performance for scale",
        "Implemented secure coding practices for fintech data protection"
      ],
      techStack: "TypeScript, React, Node.js, Scala, ScyllaDB, Microservices, Jest, Docker"
    },
    {
      company: "Leidos Australia",
      title: "Software Engineer",
      location: "Melbourne, VIC",
      startDate: "09/2021",
      endDate: "03/2022",
      responsibilities: [
        "Delivered enterprise web solutions for federal government (AGSVA NV1 clearance held 2021-2022)",
        "Built secure, high-reliability applications for mission-critical systems",
        "Applied rigorous documentation and compliance standards",
        "Collaborated across multi-disciplinary teams on complex integrations"
      ],
      techStack: "Java, Spring Boot, JavaScript, React, PostgreSQL, GitLab CI, Linux"
    },
    {
      company: "Virtech",
      title: "Software Developer",
      location: "Melbourne, VIC",
      startDate: "02/2020",
      endDate: "09/2021",
      responsibilities: [
        "Built monitoring dashboards with Vue.js for real-time system visibility",
        "Automated IT operations with PowerShell self-healing scripts",
        "Integrated Nexthink platform for end-user experience monitoring",
        "Achieved Nexthink Master's Level Certification"
      ],
      techStack: "Vue.js, JavaScript, PowerShell, Nexthink, Windows Server, Active Directory"
    },
    {
      company: "Direct Speech",
      title: "Developer",
      location: "Melbourne, VIC",
      startDate: "07/2019",
      endDate: "02/2020",
      responsibilities: [
        "Built web applications with CakePHP MVC framework",
        "Designed MySQL schemas with optimised queries",
        "Implemented RESTful APIs for system integration",
        "Followed MVC patterns and PSR coding standards"
      ],
      techStack: "PHP, CakePHP, MySQL, REST APIs, jQuery, Bootstrap"
    },
    {
      company: "Media8",
      title: "Technical Consultant",
      location: "Melbourne, VIC",
      startDate: "02/2018",
      endDate: "01/2020",
      responsibilities: [
        "Supported social media operations and automation workflows",
        "Maintained scheduling tools and content management systems"
      ],
      techStack: "JavaScript, Social Media APIs, Content Management Tools"
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
    "PHP: PHP 7/8, WordPress Plugin Development (hooks, REST API), CakePHP, Composer, PHPUnit",
    "Frontend: React, TypeScript, Vue.js, Next.js, HTML5, CSS3, JavaScript ES6+",
    "Backend: Node.js, Express, RESTful APIs, Microservices, Scala",
    "Database: MySQL, PostgreSQL, ScyllaDB, Query Optimisation, Schema Design",
    "Mobile: React Native (iOS/Android), Cross-platform Development",
    "DevOps: Docker, CI/CD (GitHub Actions), Playwright, Automated Testing",
    "Cloud/Infrastructure: AWS (EC2, S3), VPS Management, Coolify, Linux",
    "Integrations: Stripe, PayPal, Xero, OpenAI API, ElevenLabs, n8n",
    "Tools: Git, Agile/Scrum, JIRA, Technical Documentation",
    "Security: AGSVA NV1 Clearance (2021-2022), Secure Development Practices"
  ]
}