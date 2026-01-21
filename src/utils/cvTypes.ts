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
    location: "Relocating to Canberra, ACT",
    linkedin: "https://www.linkedin.com/in/dylan-henderson-07",
    github: "https://github.com/Dyltom",
    portfolio: "https://www.iamdylanhenderson.com"
  },
  summary: "Senior Software Engineer with NV1 clearance being reactivated. Government exposure through federal project delivery at Leidos Australia. Expertise in modern development frameworks (React, Node.js, TypeScript) with strong focus on security implementation. Experienced in OAuth 2.0/OIDC authentication flows, AES-256 encryption, RBAC systems, and automated security scanning. Available for immediate start in Canberra.",
  experience: [
    {
      company: "Bonza Clean",
      title: "Senior Software Engineer",
      location: "Melbourne, VIC",
      startDate: "09/2024",
      endDate: "Present",
      responsibilities: [
        "Architected and implemented end-to-end security architecture including AES-256 encryption at rest, TLS 1.3 in transit, and automated key rotation",
        "Developed secure customer portal with role-based access control (RBAC), comprehensive audit logging, and OWASP Top 10 compliance",
        "Established GitOps CI/CD pipeline with SAST/DAST integration, container vulnerability scanning, and automated dependency checks",
        "Built RESTful APIs implementing OAuth 2.0 authorization code flow with PKCE, JWT token lifecycle management, and rate limiting",
        "Integrated PCI-DSS compliant payment processing with tokenization, secure vault storage, and transaction monitoring",
        "Developed AI automation features using OpenAI GPT-4 API with prompt injection protection and PII filtering mechanisms",
        "Created comprehensive technical documentation including API specifications, security runbooks, and disaster recovery procedures",
        "Implemented event-driven workflow automation using n8n with webhook security, HMAC validation, and idempotency controls",
        "Led technical initiatives including developer recruitment, code review processes, and knowledge transfer sessions"
      ],
      techStack: "PHP, WordPress, React Native, Docker, GitHub Actions, Stripe, Xero, OpenAI, n8n"
    },
    {
      company: "Side Projects",
      title: "Independent Developer",
      location: "Melbourne, VIC",
      startDate: "2018",
      endDate: "Present",
      responsibilities: [
        "E-commerce Platform: Co-developed secure e-commerce platform handling product catalogue and payment transactions",
        "Headless WordPress: Built secure e-commerce solutions with Next.js frontend and WordPress REST API architecture",
        "Portfolio Sites: Developed portfolio and e-commerce sites with third-party API integrations maintaining security standards"
      ],
      techStack: "WordPress REST API, Next.js, Spotify API, Headless CMS"
    },
    {
      company: "Reebelo",
      title: "Full Stack Engineer",
      location: "Collingwood, VIC",
      startDate: "03/2024",
      endDate: "09/2024",
      responsibilities: [
        "Developed secure web applications using React/Node.js with TypeScript ensuring data protection",
        "Contributed to architectural transformation to microservices improving system resilience and security",
        "Integrated third-party APIs maintaining security protocols and data validation standards",
        "Implemented comprehensive test coverage ensuring system reliability and compliance"
      ],
      techStack: "React, Node.js, TypeScript, AWS Lambda, Shopify API, PostgreSQL, Elasticsearch"
    },
    {
      company: "etika",
      title: "Full Stack Developer",
      location: "Melbourne, VIC",
      startDate: "03/2022",
      endDate: "03/2024",
      responsibilities: [
        "Built secure microservices architecture with federated UI approach for financial services platform",
        "Developed lending workflows with automated testing and regulatory compliance features",
        "Worked with NoSQL databases (ScyllaDB) ensuring data security and system availability",
        "Implemented secure coding practices for PII and sensitive financial data protection"
      ],
      techStack: "TypeScript, React, Node.js, Scala, ScyllaDB, Microservices, Docker"
    },
    {
      company: "Leidos Australia",
      title: "Software Engineer (NV1 Cleared)",
      location: "Melbourne, VIC",
      startDate: "09/2021",
      endDate: "03/2022",
      responsibilities: [
        "Delivered secure microservice components for federal government data platform with active NV1 clearance",
        "Developed Java/Spring Boot REST APIs implementing Defence security controls and audit requirements",
        "Applied Agile SDLC methodologies with formal change management and security gate reviews",
        "Collaborated in classified environment using air-gapped development systems and secure communication protocols"
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
        "Developed enterprise monitoring dashboards ensuring system availability and performance",
        "Automated critical IT operations improving system reliability and reducing downtime",
        "Integrated enterprise monitoring platforms for comprehensive system oversight",
        "Achieved Nexthink Master's Level Certification demonstrating platform expertise"
      ],
      techStack: "Vue.js, JavaScript, PowerShell, Nexthink, Windows Server"
    },
    {
      company: "Direct Speech",
      title: "Developer",
      location: "Melbourne, VIC",
      startDate: "07/2019",
      endDate: "02/2020",
      responsibilities: [
        "Built secure web applications using CakePHP framework with focus on data integrity",
        "Designed database schemas with focus on security and data integrity",
        "Implemented secure RESTful APIs for system integration",
        "Applied industry coding standards and best practices for maintainable solutions"
      ],
      techStack: "PHP, CakePHP, MySQL, REST APIs, jQuery"
    },
    {
      company: "Media8",
      title: "Technical Consultant",
      location: "Melbourne, VIC",
      startDate: "02/2018",
      endDate: "01/2020",
      responsibilities: [
        "Supported enterprise operations and automation workflows ensuring operational efficiency",
        "Maintained critical scheduling and content management systems"
      ],
      techStack: "JavaScript, Social Media APIs"
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
    "Security Clearance: AGSVA NV1 being reactivated (previously held 2021-2022 with Leidos Australia)",
    "Languages: PHP, JavaScript/ES6+, TypeScript, Java (Spring Boot), HTML5, CSS3, SQL",
    "Frontend: React with Redux/Context API, Vue.js with Vuex, Next.js SSR/SSG, React Native, Material-UI, Tailwind CSS",
    "Backend: Node.js, Express.js middleware patterns, NestJS dependency injection, Spring Boot microservices, RESTful API design",
    "Security: OAuth 2.0/OIDC flows, JWT with refresh tokens, MFA (TOTP/SMS), AES-256-GCM, bcrypt, TLS 1.3, CORS policies",
    "API Design: RESTful principles, OpenAPI 3.0 specifications, JSON Schema validation, webhook implementations, rate limiting",
    "Databases: MySQL query optimisation, PostgreSQL indexing strategies, MongoDB document modeling, Redis caching patterns",
    "Cloud/DevOps: AWS services (EC2, Lambda, S3, RDS, CloudWatch), Docker multi-stage builds, GitHub Actions, GitLab CI/CD",
    "Infrastructure: Nginx configuration, Linux administration, fail2ban, ModSecurity WAF, SSL/TLS certificate management",
    "Testing: PHPUnit, Jest with coverage reports, React Testing Library, Cypress E2E, SAST/DAST integration",
    "Monitoring: Sentry error tracking, Datadog APM, CloudWatch metrics, structured logging (Winston/Monolog)",
    "Standards: OWASP ASVS, SOLID principles, 12-factor apps, PSR standards, Git flow, semantic versioning"
  ]
}