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
        "Customer Portal: Self-service portal (quotes, invoices, feedback, scheduling) cut admin work from 9hrs to 1-2hrs/week",
        "Bonza Engine: WordPress plugin suite for bookings/payments; reduced scheduling admin from 4hrs to 1hr/week",
        "AI Systems: Built AI assistant for Bonza Engine users - creates bookings/leads from chat, answers platform questions",
        "Platform & Infrastructure: Built Docker-based CI/CD reducing deploy time from 30min to <5min; set up staging/local dev environments",
        "APIs & Mobile: PHP REST APIs powering React Native app (iOS/Android, 1000+ users)",
        "Integrations: Stripe/PayPal payments, Xero accounting, ElevenLabs voice receptionist for lead capture",
        "Knowledge Systems: Moodle LMS + Scribe docs + training videos; reduced support tickets by standardising onboarding",
        "Automation: n8n workflows for social media automation and AI agent orchestration",
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
        "E-commerce Platform: Co-built opal e-commerce platform (2020-present, $100k+ sales) handling product catalogue and transactions",
        "Headless WordPress: Built JAMstack e-commerce sites with Next.js frontend + WordPress API",
        "Portfolio Sites: Musician portfolio + e-commerce site integrating Spotify API with headless WordPress CMS"
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
      techStack: "React, Node.js, Express, TypeScript, Jest, PostgreSQL, Elasticsearch, AWS (EC2, S3)"
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
        "Delivered enterprise web applications using Java/Spring Boot and React (AGSVA NV1 clearance 2021-2022)",
        "Built secure APIs and services with PostgreSQL for mission-critical government systems",
        "Applied security protocols and compliance standards for sensitive data handling",
        "Integrated complex systems across multi-disciplinary teams using GitLab CI/CD"
      ],
      techStack: "Java, Spring Boot, React, PostgreSQL, Ansible, Elasticsearch, GitLab CI"
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
    "WordPress Development: Plugin development (hooks, REST API, custom post types), Payment integrations, WooCommerce",
    "PHP: PHP 7/8, CakePHP MVC, Laravel knowledge, Composer, PHPUnit, PSR standards",
    "API Design & Integration: RESTful APIs, Stripe, PayPal, Xero, OpenAI, Webhooks, Rate limiting",
    "Frontend: React, TypeScript, Vue.js, Next.js, React Native, HTML5, CSS3, JavaScript ES6+",
    "Backend: Node.js, Express.js, Microservices architecture, Scala, Java/Spring Boot",
    "CI/CD & Testing: GitHub Actions, Docker, PHPUnit, Jest, Playwright E2E, Automated deployments",
    "Database: MySQL, PostgreSQL, ScyllaDB, Query optimisation, Schema design, Migrations",
    "Infrastructure: Linux, VPS management, Nginx/Apache, Docker, Coolify, AWS (EC2, S3)",
    "Security & Compliance: Fintech security practices, Government compliance (NV1 2021-2022)",
    "Agile Delivery: Scrum, Sprint planning, JIRA, Technical documentation, Stakeholder communication"
  ]
}