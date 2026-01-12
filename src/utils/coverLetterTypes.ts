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
  recipientName: "Megan",
  companyName: "Federal Government Agency",
  jobTitle: "Junior Drupal Developer",
  referenceNumber: "Junior Drupal Developer",
  salutation: "Dear Megan,",
  openingParagraph: "I am writing to express my strong interest in the Junior Drupal Developer position with the Federal Government Agency (Ref: Junior Drupal Developer), as advertised.",
  bodyParagraphs: [
    "I am a Senior Software Engineer with over 6 years of full-stack experience (specialising in PHP, CMS development, and JavaScript) currently relocating to the Cowra region for family and lifestyle reasons.",
    "While I understand my experience level exceeds the \"Junior\" classification, I am specifically seeking a role with high stability and lower operational pressure to support my move to regional NSW. I am eager to apply my senior-level velocity and reliability to a delivery-focused team, offering the agency a high-value resource at the advertised contract rate.",
    "Why I am the ideal \"Low Risk\" candidate for this contract:\n\n• Government Ready (NV1 History): I previously held an active NV1 Security Clearance (2021–2022) while delivering software for Leidos Australia. I am currently Uncleared but fully prepared for a rapid re-activation or Baseline vetting process.\n\n• Indigenous Applicant: I identify as Aboriginal, and I am keen to contribute to the agency's technical capabilities while supporting diversity targets within the department.\n\n• PHP & CMS Expertise: My background includes extensive work with PHP-based Content Management Systems (WordPress, Custom CMS) and server-side integration. I can hit the ground running with Drupal architecture, API integrations, and secure coding standards immediately.\n\n• Regional Commitment: My move to Cowra is confirmed, meaning I am genuinely looking for a long-term engagement in the region, rather than a short-term stopgap."
  ],
  closingParagraph: "I am available for an immediate start and happy to discuss how my senior capability can de-risk this project's delivery.\n\nI will call you shortly to discuss my suitability.",
  signOff: "Best regards,",
}