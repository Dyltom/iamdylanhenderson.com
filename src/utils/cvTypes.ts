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
  summary: "Software Engineer with 6+ years specialising in PHP development and modern web technologies. Extensive commercial PHP experience building custom WordPress plugins, RESTful APIs, and web applications using MVC frameworks including CakePHP. Proven expertise in full-stack development with React, React Native, Node.js, and creating end-to-end solutions across web and mobile platforms. Strong track record of API design and implementation, including mobile app backends and third-party integrations (OpenAI, ElevenLabs, payment systems). Experienced in automated testing with PHPUnit, CI/CD pipelines, and Agile methodologies. Skilled at collaborating with stakeholders to deliver innovative solutions that automate business processes and enhance user experiences. Available for immediate start.",
  experience: [
    {
      company: "Bonza Clean",
      title: "Senior Software Engineer",
      location: "Melbourne, VIC",
      startDate: "09/2024",
      endDate: "Present",
      responsibilities: [
        "Develop custom WordPress plugins using PHP for booking systems (Booknetic), payment integration, and business automation",
        "Build and maintain RESTful APIs in PHP to power React Native mobile applications for iOS and Android platforms",
        "Integrate third-party services including OpenAI and ElevenLabs APIs for AI services and voice receptionist features",
        "Implement automated testing with PHPUnit and maintain CI/CD pipelines for continuous deployment",
        "Collaborate with stakeholders in Agile sprints to deliver innovative solutions that automate business processes",
        "Write clean, maintainable PHP code following MVC patterns and modern development best practices"
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
        "Integrated third-party services and APIs to enhance e-commerce platform capabilities",
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
        "Developed web applications using TypeScript, React, and Node.js following Agile practices",
        "Built automated workflows for lending applications with comprehensive test coverage",
        "Enhanced web platform performance through monitoring and systematic troubleshooting",
        "Collaborated with cross-functional teams to deliver features in two-week sprint cycles"
      ]
    },
    {
      company: "Leidos Australia",
      title: "Software Engineer",
      location: "Melbourne, VIC",
      startDate: "09/2021",
      endDate: "03/2022",
      responsibilities: [
        "Delivered web solutions for federal government agency with active AGSVA NV1 clearance",
        "Designed and developed secure web applications using Java/Spring and modern JavaScript frameworks",
        "Applied Agile methodologies in government environment with focus on security and compliance",
        "Produced technical documentation meeting government standards and security requirements",
        "Collaborated with multi-disciplinary teams to deliver mission-critical web applications"
      ]
    },
    {
      company: "Virtech",
      title: "Software Developer",
      location: "Melbourne, VIC",
      startDate: "02/2020",
      endDate: "09/2021",
      responsibilities: [
        "Built custom WordPress themes and plugins using PHP, implementing business logic and API integrations",
        "Developed PHP-based content management solutions with MySQL database design and query optimisation",
        "Created responsive web interfaces using HTML5, CSS3, and JavaScript for optimal user experience",
        "Configured LAMP stack environments and implemented version control workflows using Git"
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
    "Full Stack Development (Node.js, Express.js, LAMP Stack)",
    "System Integration (OpenAI API, ElevenLabs API, Payment Gateways, Business Automation)",
    "Communication Skills (Stakeholder Collaboration, Technical Documentation, Requirements Gathering)",
    "Problem Solving (Performance Optimisation, Troubleshooting, Creative Solutions)",
    "Time Management (Multi-project Delivery, Sprint Commitments, Deadline Achievement)"
  ]
}