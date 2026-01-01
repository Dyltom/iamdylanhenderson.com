import { CVData } from './cvTypes'

// Generate Schema.org JSON-LD for CV/Resume
export const generateCVSchema = (cvData: CVData) => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": cvData.personalInfo.name,
    "email": cvData.personalInfo.email,
    "telephone": cvData.personalInfo.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cvData.personalInfo.location
    },
    "url": cvData.personalInfo.portfolio,
    "sameAs": [
      cvData.personalInfo.linkedin,
      cvData.personalInfo.github
    ].filter(Boolean),
    "jobTitle": "Senior Software Engineer",
    "description": cvData.summary,
    "knowsAbout": cvData.skills,
    "hasOccupation": cvData.experience.map(exp => ({
      "@type": "OrganizationRole",
      "hasOccupation": {
        "@type": "Occupation",
        "name": exp.title
      },
      "startDate": formatDateForSchema(exp.startDate),
      "endDate": exp.endDate === "Present" ? undefined : formatDateForSchema(exp.endDate),
      "roleName": exp.title,
      "worksFor": {
        "@type": "Organization",
        "name": exp.company,
        "location": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": exp.location
          }
        }
      },
      "responsibilities": exp.responsibilities.join(" ")
    })),
    "alumniOf": cvData.education.map(edu => ({
      "@type": "OrganizationRole",
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": edu.institution
      },
      "startDate": undefined,
      "endDate": formatDateForSchema(edu.completionDate),
      "educationalCredentialAwarded": edu.degree
    })),
    "knows": [
      {
        "@type": "Language",
        "name": "English",
        "alternateName": "en"
      }
    ]
  }
}

// Convert date format from MM/YYYY to YYYY-MM
const formatDateForSchema = (date: string): string => {
  if (!date || date === "Present") return ""
  const [month, year] = date.split("/")
  return `${year}-${month.padStart(2, '0')}`
}

// Generate Resume schema (alternative format)
export const generateResumeSchema = (cvData: CVData) => {
  return {
    "@context": "https://schema.org",
    "@type": "Resume",
    "name": `${cvData.personalInfo.name} - Senior Software Engineer Resume`,
    "description": cvData.summary,
    "author": {
      "@type": "Person",
      "name": cvData.personalInfo.name,
      "email": cvData.personalInfo.email,
      "telephone": cvData.personalInfo.phone,
      "url": cvData.personalInfo.portfolio
    },
    "dateModified": new Date().toISOString(),
    "inLanguage": "en-US",
    "keywords": cvData.skills.join(", "),
    "about": {
      "@type": "Person",
      "name": cvData.personalInfo.name,
      "jobTitle": "Senior Software Engineer",
      "knowsAbout": cvData.skills
    }
  }
}