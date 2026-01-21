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
  summary: "Senior Software Engineer with active NV1 clearance. Government exposure through federal project delivery at Leidos Australia. Expertise in modern development frameworks (React, Node.js, TypeScript) with strong focus on security implementation. Experienced in OAuth 2.0/OIDC authentication flows, AES-256 encryption, RBAC systems, and automated security scanning. Available for immediate start in Canberra.",
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
        "Built RESTful APIs implementing OAuth 2.0 authorisation code flow with PKCE, JWT token lifecycle management, and rate limiting",
        "Integrated PCI-DSS compliant payment processing with tokenisation, secure vault storage, and transaction monitoring",
        "Developed AI automation features using OpenAI GPT-4 API with prompt injection protection and PII filtering mechanisms",
        "Created comprehensive technical documentation including OpenAPI 3.0 specifications, security runbooks, and incident response procedures",
        "Managed security incident response when credentials were compromised, investigated breach using AI tools, implemented access controls, and documented findings",
        "Proactively monitored security advisories and patched critical vulnerabilities including Next.js security updates",
        "Implemented event-driven workflow automation using n8n with webhook security, HMAC validation, and idempotency controls",
        "Applied SOLID principles and clean code practices, established coding standards with ESLint/Prettier, and automated quality checks",
        "Led technical initiatives including developer recruitment, structured code review processes, and knowledge transfer sessions"
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
        "Developed features for e-commerce platform tightly integrated with Shopify APIs handling product sync and order management",
        "Contributed to decoupling monolithic architecture into microservices to reduce Shopify API dependencies and improve performance",
        "Enhanced financial dashboard features including revenue tracking, refund processing, and payment reconciliation",
        "Worked on inventory management system including stock levels, buybox algorithms, and automated reordering logic",
        "Implemented comprehensive test coverage with Jest ensuring reliability of financial calculations and API integrations",
        "Followed Agile/Scrum methodology with sprint planning, daily standups, and retrospectives for continuous improvement"
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
        "Developed 10+ TypeScript/Koa microservices with federated UI architecture for lending platform",
        "Built document generation service using React-based PDF generation for contracts and statements with S3 storage and versioning",
        "Implemented PII data masking and GDPR compliance features including right to be forgotten, data retention policies, and consent management",
        "Contributed to lending workflows including application processing, financial calculations, and third-party integration features",
        "Created OpenAPI 3.0 documentation for all microservices ensuring clear API contracts and integration guidelines",
        "Maintained extensive logging and monitoring across microservices with canary deployment support for safe releases",
        "Applied TDD methodology achieving high test coverage across all services with comprehensive unit and integration tests",
        "Onboarded new developers as technical buddy, created documentation, and conducted regular code reviews throughout 2-year tenure"
      ],
      techStack: "TypeScript, Koa, React, ScyllaDB, Federated UI, REST APIs, Docker, S3"
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
        "Applied Agile SDLC with formal change management, peer code reviews, and security gate reviews",
        "Followed strict coding standards, maintained comprehensive unit tests, and participated in architectural design reviews",
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
        "Monitored enterprise client systems across government and legal sectors using Nexthink platform",
        "Tracked system performance, application crashes, BSOD incidents, and resource utilisation across thousands of endpoints",
        "Created PowerShell automation scripts for incident remediation and data collection, reducing manual intervention",
        "Built internal company website using Vue.js with component-based architecture and responsive design",
        "Achieved Nexthink Master's Level Certification, becoming platform SME and training team members",
        "Analysed performance trends and provided actionable insights to improve system stability for enterprise clients",
        "Maintained version control with Git, participated in code reviews, and followed established development workflows"
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
  ],
  education: [
    {
      institution: "Monash University",
      degree: "Information Technology (Computers, Networks and Security)",
      completionDate: "02/2020"
    }
  ],
  skills: [
    "Security Clearance: AGSVA NV1 - Active (previously held 2021-2022 with Leidos Australia)",
    "Languages: PHP, JavaScript/ES6+, TypeScript, Java (Spring Boot), HTML5, CSS3, SQL",
    "Frontend: React with Redux/Context API, Vue.js with Vuex, Next.js SSR/SSG, React Native, Material-UI, Tailwind CSS",
    "Backend: Node.js, Express.js middleware patterns, NestJS dependency injection, Spring Boot microservices, RESTful API design",
    "Security: OAuth 2.0/OIDC flows, JWT with refresh tokens, MFA (TOTP/SMS), AES-256-GCM, bcrypt, TLS 1.3, CORS policies",
    "API Security: Rate limiting, API key management, request validation, HMAC signatures, IP whitelisting, DDoS protection",
    "Infrastructure Security: Firewall configuration (iptables/ufw), VPN setup, SSL/TLS certificates, server hardening, SSH key management",
    "API Design: RESTful principles, OpenAPI 3.0 specifications, JSON Schema validation, webhook implementations, versioning strategies",
    "Databases: MySQL query optimisation, PostgreSQL indexing strategies, MongoDB document modeling, Redis caching patterns",
    "Cloud/DevOps: AWS services (EC2, Lambda, S3, RDS, CloudWatch), Docker multi-stage builds, GitHub Actions, GitLab CI/CD, CDN configuration",
    "Infrastructure: Nginx configuration, Linux administration, fail2ban, ModSecurity WAF, SSL/TLS certificate management",
    "Testing: PHPUnit, Jest with coverage reports, React Testing Library, Cypress E2E, SAST/DAST integration",
    "Monitoring: Sentry error tracking, Datadog APM, CloudWatch metrics, structured logging (Winston/Monolog), uptime monitoring",
    "Development Practices: Git flow, feature branching, pull request workflows, code review processes, pair programming",
    "Code Quality: ESLint, Prettier, SonarQube, PHPStan, pre-commit hooks, automated code analysis, coding standards enforcement",
    "Deployment: Blue-green deployments, canary releases, rollback procedures, health checks, zero-downtime deployments",
    "Collaboration: Jira, Confluence, Slack integrations, architectural decision records (ADRs), technical documentation",
    "Development Principles: SOLID, DRY, KISS, YAGNI, clean code practices, design patterns (Factory, Observer, Repository)",
    "Methodologies: Agile/Scrum, TDD/BDD, trunk-based development, continuous integration, sprint planning, retrospectives",
    "Standards: OWASP ASVS, 12-factor apps, PSR standards, semantic versioning, conventional commits, ISO 27001 awareness"
  ]
}