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
  summary: "Full-stack developer with 6+ years of experience building web applications and content management systems. Strong background in PHP, JavaScript, Java, HTML/CSS, and modern web frameworks. Experienced in CMS development including WordPress themes, plugins, and custom CMS solutions. Proven track record in government environments with previous AGSVA NV1 clearance (2021-2022). Proficient in full-stack development with expertise in server-side technologies (PHP, Java/Spring, Node.js), databases (MySQL, SQL Server), and modern deployment workflows (Git, CI/CD). Skilled in building RESTful APIs, microservices architecture, and infrastructure management.",
  experience: [
    {
      company: "Bonza Clean",
      title: "Senior Software Engineer",
      location: "Melbourne, VIC",
      startDate: "09/2024",
      endDate: "Present",
      responsibilities: [
        "Developed custom CMS features for customer workflows using PHP, JavaScript, HTML/CSS, and React",
        "Built WordPress-based solutions including custom themes and plugins for business operations",
        "Implemented RESTful APIs and server-side components using PHP and Node.js",
        "Managed MySQL database schemas and optimised queries for high-performance content retrieval",
        "Integrated automated workflows with version control (Git) and CI/CD pipelines"
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
        "Implemented RESTful web services using Express.js/Node.js for e-commerce platform",
        "Worked with headless CMS architecture for content management and delivery",
        "Shipped production changes with focus on maintainability and delivery velocity"
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
        "Developed backend services for federal government clients with AGSVA NV1 clearance (held 2021-2022)",
        "Built Java/Spring microservices and RESTful APIs in secure government environments",
        "Managed infrastructure, deployment pipelines, and database integrations",
        "Collaborated with cross-functional teams following structured government development methodologies"
      ]
    },
    {
      company: "Virtech",
      title: "Software Developer",
      location: "Melbourne, VIC",
      startDate: "02/2020",
      endDate: "09/2021",
      responsibilities: [
        "Built custom WordPress themes and plugins using PHP, JavaScript, HTML/CSS for client websites",
        "Developed content management solutions with focus on user experience and accessibility",
        "Configured Apache web servers and implemented MySQL database schemas for CMS deployments",
        "Achieved Nexthink Master's Level Certification while delivering web-based monitoring dashboards"
      ]
    },
    {
      company: "Direct Speech",
      title: "Developer",
      location: "Melbourne, VIC",
      startDate: "07/2019",
      endDate: "02/2020",
      responsibilities: [
        "Built web applications using CakePHP framework for business operations",
        "Developed custom PHP CMS features and content management workflows"
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
    "CMS Development (WordPress themes/plugins, Custom PHP CMS, Headless CMS)",
    "PHP (CakePHP framework, WordPress development, templating)",
    "Module/Plugin Development (WordPress plugins, CakePHP components)",
    "JavaScript (ES6+, React, Node.js, AJAX)",
    "HTML5/CSS3 (Responsive design, theming)",
    "Java (Spring framework, microservices)",
    "MySQL/SQL Server (Schema design, query optimisation)",
    "Git (Advanced workflows, branching strategies, CI/CD)",
    "Content Workflows (Multi-user systems, approval processes)",
    "API Integration (RESTful services, third-party integrations)",
    "Apache/Nginx (Configuration, deployment)",
    "AGSVA NV1 Clearance (Previously held 2021-2022)",
    "Government/Enterprise environments"
  ]
}