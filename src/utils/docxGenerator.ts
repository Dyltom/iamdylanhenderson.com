import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Packer,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from 'docx'
import { saveAs } from 'file-saver'
import { CVData } from './cvTypes'

// ATS-friendly DOCX generator following 2025 best practices
export const generateATSFriendlyDOCX = async (cvData: CVData, fileName: string = 'Dylan_Henderson_Resume.docx') => {
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 720, // 0.5 inch
            right: 720,
            bottom: 720,
            left: 720,
          },
        },
      },
      children: [
        // Header with name and contact info
        new Paragraph({
          children: [
            new TextRun({
              text: cvData.personalInfo.name,
              bold: true,
              size: 32, // 16pt
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
        }),

        // Contact information in single line for better ATS parsing
        new Paragraph({
          children: [
            new TextRun({
              text: `${cvData.personalInfo.phone} | ${cvData.personalInfo.email} | ${cvData.personalInfo.location}`,
              size: 22, // 11pt
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
        }),

        // Links (if available)
        ...(cvData.personalInfo.linkedin || cvData.personalInfo.github || cvData.personalInfo.portfolio ? [
          new Paragraph({
            children: [
              ...(cvData.personalInfo.linkedin ? [
                new TextRun({
                  text: `LinkedIn: ${cvData.personalInfo.linkedin}`,
                  size: 20,
                }),
              ] : []),
              ...(cvData.personalInfo.github ? [
                new TextRun({
                  text: ` | GitHub: ${cvData.personalInfo.github}`,
                  size: 20,
                }),
              ] : []),
              ...(cvData.personalInfo.portfolio ? [
                new TextRun({
                  text: ` | Portfolio: ${cvData.personalInfo.portfolio}`,
                  size: 20,
                }),
              ] : []),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 360 },
          }),
        ] : []),

        // Professional Summary
        new Paragraph({
          text: "Professional Summary",
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 120 },
        }),
        new Paragraph({
          text: cvData.summary,
          size: 22,
          spacing: { after: 360 },
        }),

        // Work Experience
        new Paragraph({
          text: "Work Experience",
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 240 },
        }),
        ...cvData.experience.flatMap((exp, index) => [
          // Job Title and Company
          new Paragraph({
            children: [
              new TextRun({
                text: `${exp.title} | ${exp.company}`,
                bold: true,
                size: 24,
              }),
            ],
            spacing: { after: 60 },
          }),
          // Location and Dates
          new Paragraph({
            children: [
              new TextRun({
                text: `${exp.location} | ${exp.startDate} - ${exp.endDate}`,
                italics: true,
                size: 22,
              }),
            ],
            spacing: { after: 120 },
          }),
          // Responsibilities as bullet points
          ...exp.responsibilities.map(resp =>
            new Paragraph({
              text: resp,
              bullet: {
                level: 0,
              },
              spacing: { after: 60 },
              size: 22,
            })
          ),
          // Add spacing between jobs
          ...(index < cvData.experience.length - 1 ? [
            new Paragraph({
              text: "",
              spacing: { after: 240 },
            }),
          ] : [new Paragraph({
            text: "",
            spacing: { after: 360 },
          })]),
        ]),

        // Education
        new Paragraph({
          text: "Education",
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 240 },
        }),
        ...cvData.education.map(edu => [
          new Paragraph({
            children: [
              new TextRun({
                text: edu.institution,
                bold: true,
                size: 24,
              }),
            ],
            spacing: { after: 60 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${edu.degree} | Completed: ${edu.completionDate}`,
                size: 22,
              }),
            ],
            spacing: { after: 240 },
          }),
        ]).flat(),

        // Skills
        new Paragraph({
          text: "Technical Skills",
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 120 },
        }),
        new Paragraph({
          text: cvData.skills.join(", "),
          size: 22,
          spacing: { after: 360 },
        }),
      ],
    }],
  })

  // Generate and save the document
  const blob = await Packer.toBlob(doc)
  saveAs(blob, fileName)
}

// Generate ATS-optimized filename
export const generateATSFilename = (name: string, jobTitle?: string): string => {
  const cleanName = name.replace(/\s+/g, '_')
  const timestamp = new Date().toISOString().split('T')[0]

  if (jobTitle) {
    const cleanTitle = jobTitle.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
    return `${cleanName}_${cleanTitle}_Resume_${timestamp}.docx`
  }

  return `${cleanName}_Resume_${timestamp}.docx`
}