import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, IDocumentOptions } from 'docx'
import { saveAs } from 'file-saver'
import { CVData } from './cvTypes'

// Generate professional DOCX using the docx library
export const generateDOCX = async (cvData: CVData, fileName: string = 'Dylan_Henderson_Resume.docx') => {
  try {
    const { Packer } = await import('docx')

    // Document sections
    const sections: any[] = [{
      properties: {
        page: {
          margin: {
            top: 1440, // 1 inch
            right: 1440,
            bottom: 1440,
            left: 1440,
          },
        },
      },
      children: [
        // Header with name
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: cvData.personalInfo.name,
              size: 32,
              bold: true,
              color: "000000", // Black color
            }),
          ],
        }),

        // Title
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: "Senior Software Engineer",
              size: 28,
              color: "32CD32",
            }),
          ],
        }),

        // Contact info
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: `${cvData.personalInfo.phone} | ${cvData.personalInfo.email} | ${cvData.personalInfo.location}`,
              size: 20,
              color: "666666",
            }),
          ],
        }),

        // Links
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
          children: [
            new TextRun({
              text: [
                cvData.personalInfo.portfolio?.replace('https://', ''),
                'linkedin.com/in/dylan-henderson-07',
                'github.com/Dyltom'
              ].filter(Boolean).join(' | '),
              size: 18,
              color: "32CD32",
            }),
          ],
        }),

        // Professional Summary section
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
          border: {
            bottom: {
              color: "32CD32",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
          children: [
            new TextRun({
              text: "PROFESSIONAL SUMMARY",
              size: 24,
              bold: true,
              color: "000000", // Black color
            }),
          ],
        }),

        new Paragraph({
          text: cvData.summary,
          spacing: { after: 240 },
          alignment: AlignmentType.JUSTIFIED,
        }),

        // Work Experience section
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
          border: {
            bottom: {
              color: "32CD32",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
          children: [
            new TextRun({
              text: "WORK EXPERIENCE",
              size: 24,
              bold: true,
              color: "000000", // Black color
            }),
          ],
        }),

        // Add experience entries
        ...cvData.experience.flatMap((exp, index) => [
          // Job title
          new Paragraph({
            spacing: { before: index > 0 ? 240 : 0, after: 60 },
            children: [
              new TextRun({
                text: exp.title,
                bold: true,
                size: 24,
              }),
            ],
          }),

          // Company and dates
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: exp.company,
                color: "32CD32",
                size: 22,
              }),
              new TextRun({
                text: ` | ${exp.startDate} - ${exp.endDate}`,
                color: "666666",
                size: 20,
              }),
            ],
          }),

          // Location
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: exp.location,
                italics: true,
                color: "888888",
                size: 18,
              }),
            ],
          }),

          // Responsibilities
          ...exp.responsibilities.map(resp =>
            new Paragraph({
              bullet: {
                level: 0,
              },
              spacing: { after: 60 },
              text: resp,
            })
          ),
        ]),

        // Education section
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
          border: {
            bottom: {
              color: "32CD32",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
          children: [
            new TextRun({
              text: "EDUCATION",
              size: 24,
              bold: true,
              color: "000000", // Black color
            }),
          ],
        }),

        ...cvData.education.flatMap(edu => [
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: edu.institution,
                bold: true,
                size: 22,
              }),
              new TextRun({
                text: ` | Completed: ${edu.completionDate}`,
                color: "666666",
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            text: edu.degree,
            spacing: { after: 120 },
          }),
        ]),

        // Technical Skills section
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
          border: {
            bottom: {
              color: "32CD32",
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
          children: [
            new TextRun({
              text: "TECHNICAL SKILLS",
              size: 24,
              bold: true,
              color: "000000", // Black color
            }),
          ],
        }),

        // Skills by category
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: "Languages: ",
              bold: true,
              color: "32CD32",
            }),
            new TextRun({
              text: "TypeScript, JavaScript, PHP",
            }),
          ],
        }),

        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: "Frontend: ",
              bold: true,
              color: "32CD32",
            }),
            new TextRun({
              text: "React, Next.js, React Native",
            }),
          ],
        }),

        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: "Backend: ",
              bold: true,
              color: "32CD32",
            }),
            new TextRun({
              text: "Node.js, REST APIs, Database design, NoSQL exposure",
            }),
          ],
        }),

        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: "Infrastructure: ",
              bold: true,
              color: "32CD32",
            }),
            new TextRun({
              text: "Linux/VPS infrastructure, Sentry, AI Agents",
            }),
          ],
        }),
      ],
    }]

    // Create document
    const doc = new Document({
      sections,
      properties: {
        creator: "Dylan Henderson CV Generator",
        description: "Professional Resume",
        title: `${cvData.personalInfo.name} - Resume`,
      }
    })

    // Generate and save
    const buffer = await Packer.toBuffer(doc)
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })
    saveAs(blob, fileName)

  } catch (error) {
    console.error('Error generating DOCX:', error)
    throw error
  }
}

// Export the same function with the expected name
export const generateATSFriendlyDOCX = generateDOCX