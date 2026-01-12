export interface CoverLetterData {
  recipientName?: string
  recipientTitle?: string
  companyName: string
  companyAddress?: string
  jobTitle: string
  referenceNumber?: string
  salutation?: string // Default: "Dear Hiring Manager"

  // Opening paragraph - why you're writing
  openingParagraph: string

  // Body paragraphs - your qualifications and experience
  bodyParagraphs: string[]

  // Closing paragraph - next steps
  closingParagraph: string

  // Sign off
  signOff?: string // Default: "Sincerely"
}

// Example cover letter data
export const EXAMPLE_COVER_LETTER: CoverLetterData = {
  companyName: "Department of Home Affairs",
  jobTitle: "Senior Software Engineer",
  referenceNumber: "DHA/2024/001",
  openingParagraph: "I am writing to express my strong interest in the Senior Software Engineer position at the Department of Home Affairs. With over 6 years of experience in full-stack development and previous experience working with federal government clients through Leidos Australia, I am confident I can contribute effectively to your team's digital transformation initiatives.",
  bodyParagraphs: [
    "Throughout my career, I have demonstrated expertise in developing robust web applications and content management systems using modern technologies. My experience includes building WordPress-based solutions, developing RESTful APIs, and implementing microservices architectures. I have worked extensively with PHP, JavaScript/TypeScript, Java, and various frameworks including React, Node.js, and Spring Framework.",
    "My government sector experience has given me a deep understanding of the importance of secure, compliant, and well-documented solutions. While working at Leidos Australia, I held an AGSVA NV1 security clearance and developed backend services for federal government clients. This experience taught me the value of following structured development methodologies and maintaining high security standards in all aspects of software development.",
    "I am particularly drawn to this role because of the opportunity to contribute to systems that serve the Australian public. My technical skills combined with my understanding of government requirements position me well to deliver solutions that are not only technically sound but also aligned with public service values of integrity, respect, and accountability."
  ],
  closingParagraph: "I would welcome the opportunity to discuss how my skills and experience align with your team's needs. I am available for an interview at your convenience and can be reached at 0426007021 or dylanthenderson@yahoo.com.au. Thank you for considering my application.",
}