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
  summary: "Senior Software Engineer with active NV1 clearance (reactivation in progress). Extensive experience delivering secure government systems and implementing comprehensive security controls. Expertise in modern development frameworks (React, Node.js, TypeScript) with strong focus on security compliance, data protection, and process automation. Proven track record in government sector with Leidos Australia. Available for immediate start in Canberra.",
  experience: [
    {
      company: "Bonza Clean",
      title: "Senior Software Engineer",
      location: "Melbourne, VIC",
      startDate: "09/2024",
      endDate: "Present",
      responsibilities: [
        "Sole developer responsible for complete platform security including data encryption, access controls, and compliance documentation",
        "Delivered secure customer portal with comprehensive audit trails and security hardening for sensitive data protection",
        "Implemented enterprise-grade CI/CD pipelines with automated security scanning and vulnerability management",
        "Developed secure RESTful APIs supporting mobile applications with OAuth authentication and JWT token management",
        "Integrated secure payment systems (Stripe/PayPal) and financial platforms ensuring PCI compliance standards",
        "Built AI-powered automation systems while maintaining security protocols and data privacy standards",
        "Established comprehensive documentation and training systems improving operational efficiency",
        "Implemented workflow automation reducing manual processes while maintaining security and audit requirements",
        "Provided technical leadership including mentoring and knowledge transfer to development team"
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
        "Led architectural transformation to microservices improving system resilience and security",
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
        "Developed compliant lending workflows with comprehensive automated testing and regulatory checks",
        "Optimised high-performance NoSQL databases ensuring data security and system availability",
        "Implemented secure coding practices for sensitive financial data protection and compliance requirements"
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
        "Delivered large-scale government data platform with active NV1 security clearance",
        "Developed secure Java/Spring microservices following federal government security frameworks",
        "Applied structured SDLC methodologies ensuring compliance with government standards",
        "Collaborated with multi-disciplinary teams in secure federal environment maintaining strict security protocols"
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
        "Designed and optimised database schemas ensuring performance and security",
        "Implemented secure RESTful APIs for enterprise system integration",
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
    "Security Clearance: AGSVA NV1 (reactivation in progress) - previously held 2021-2022 with Leidos Australia",
    "Languages: PHP 7.4/8.x, JavaScript ES6+, TypeScript 4.x, Java 11+ (Spring Boot), Python, HTML5, CSS3",
    "Frontend: React 18, Vue.js 3, Next.js 13+, React Native, Material-UI, Tailwind CSS, responsive design",
    "Backend: Node.js 16+, Express.js, NestJS, Spring Framework, RESTful APIs, GraphQL, microservices",
    "Security: OAuth 2.0, JWT, MFA implementation, AES-256 encryption, TLS/SSL, OWASP Top 10, fail2ban, ModSecurity",
    "Databases: MySQL 8, PostgreSQL 13+, MongoDB, ScyllaDB, Redis, query optimisation, stored procedures",
    "Cloud/DevOps: AWS (EC2, Lambda, S3, RDS), Docker, Kubernetes basics, GitHub Actions, GitLab CI/CD, Ansible",
    "CMS/Frameworks: WordPress 6.x (custom plugins/themes), CakePHP 4.x, Laravel, headless CMS architectures",
    "Standards: PSR-12, ESLint, Prettier, SOLID principles, MVC/MVP patterns, 12-factor app methodology",
    "Testing: PHPUnit, Jest, React Testing Library, integration testing, TDD practices, automated security scanning",
    "Monitoring: ELK stack basics, Grafana, Prometheus, APM tools, Nexthink (Master certified), logging best practices",
    "Government: SDLC methodologies, ASD ISM familiarity, PSPF awareness, formal documentation standards"
  ]
}