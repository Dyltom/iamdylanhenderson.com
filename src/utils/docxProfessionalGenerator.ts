import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak } from 'docx'
import { saveAs } from 'file-saver'
import { CVData } from './cvTypes'

// Professional DOCX generator optimised for Australian Government applications
export const generateProfessionalDOCX = async (cvData: CVData, fileName: string = 'Dylan_Henderson_Resume.docx') => {
  try {
    const { Packer } = await import('docx')

    // Document sections with professional formatting
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
        // Header with name - professional black text only
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: cvData.personalInfo.name,
              size: 28,
              bold: true,
              font: "Calibri",
            }),
          ],
        }),

        // Contact information - single line
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 }, // Clear section break
          children: [
            new TextRun({
              text: `${cvData.personalInfo.phone} • ${cvData.personalInfo.email} • ${cvData.personalInfo.location}`,
              size: 22,
              font: "Calibri",
            }),
          ],
        }),

        // Professional Summary section
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 120 },
          children: [
            new TextRun({
              text: "PROFESSIONAL SUMMARY",
              size: 24,
              bold: true,
              font: "Calibri",
            }),
          ],
        }),

        new Paragraph({
          spacing: { after: 300 },
          alignment: AlignmentType.JUSTIFIED,
          children: [
            new TextRun({
              text: cvData.summary,
              size: 22,
              font: "Calibri",
            }),
          ],
        }),

        // Core Competencies section (important for government roles)
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 120 },
          children: [
            new TextRun({
              text: "CORE COMPETENCIES",
              size: 24,
              bold: true,
              font: "Calibri",
            }),
          ],
        }),

        // Organise skills into competency categories
        ...createCompetencyBullets([
          "Full-stack web development with 6+ years commercial experience",
          "Content Management Systems (CMS) development including WordPress and custom solutions",
          "Government sector experience with AGSVA NV1 clearance (held 2021-2022)",
          "Strong technical documentation and stakeholder communication skills",
          "Agile development methodologies and collaborative team environments",
        ]),

        // Work Experience section
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 120 },
          children: [
            new TextRun({
              text: "PROFESSIONAL EXPERIENCE",
              size: 24,
              bold: true,
              font: "Calibri",
            }),
          ],
        }),

        // Add experience entries with improved formatting
        ...cvData.experience.flatMap((exp, index) => [
          // Job title and company on same line
          new Paragraph({
            spacing: { before: index > 0 ? 200 : 0, after: 60 },
            children: [
              new TextRun({
                text: `${exp.title} • ${exp.company}`,
                bold: true,
                size: 23,
                font: "Calibri",
              }),
            ],
          }),

          // Location and dates
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: `${exp.location} • ${exp.startDate} – ${exp.endDate}`,
                size: 22,
                italics: true,
                font: "Calibri",
              }),
            ],
          }),

          // Responsibilities with proper bullet formatting
          ...exp.responsibilities.map(resp =>
            new Paragraph({
              bullet: {
                level: 0,
              },
              spacing: { after: 60, left: 360 }, // Proper indentation
              children: [
                new TextRun({
                  text: resp,
                  size: 22,
                  font: "Calibri",
                }),
              ],
            })
          ),
        ]),

        // Education section
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 120 },
          children: [
            new TextRun({
              text: "EDUCATION",
              size: 24,
              bold: true,
              font: "Calibri",
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
                size: 23,
                font: "Calibri",
              }),
              new TextRun({
                text: ` • Completed: ${edu.completionDate}`,
                size: 22,
                font: "Calibri",
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: edu.degree,
                size: 22,
                font: "Calibri",
              }),
            ],
          }),
        ]),

        // Technical Skills section with improved formatting
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 120 },
          children: [
            new TextRun({
              text: "TECHNICAL SKILLS",
              size: 24,
              bold: true,
              font: "Calibri",
            }),
          ],
        }),

        // Skills organised by category with bullet points
        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: "Programming Languages & Frameworks",
              bold: true,
              size: 23,
              font: "Calibri",
            }),
          ],
        }),
        ...createSkillBullets([
          "PHP (WordPress, CakePHP, custom CMS development)",
          "JavaScript/TypeScript (React, Next.js, Node.js, Express.js)",
          "Java (Spring Framework, microservices)",
          "HTML5/CSS3, responsive design",
        ]),

        new Paragraph({
          spacing: { before: 120, after: 60 },
          children: [
            new TextRun({
              text: "Database & Infrastructure",
              bold: true,
              size: 23,
              font: "Calibri",
            }),
          ],
        }),
        ...createSkillBullets([
          "MySQL, SQL Server, NoSQL (ScyllaDB)",
          "Linux/VPS infrastructure, Apache web server",
          "Git version control, CI/CD pipelines",
          "AWS cloud services",
        ]),

        new Paragraph({
          spacing: { before: 120, after: 60 },
          children: [
            new TextRun({
              text: "Content Management & Web Development",
              bold: true,
              size: 23,
              font: "Calibri",
            }),
          ],
        }),
        ...createSkillBullets([
          "WordPress custom theme and plugin development",
          "Headless CMS architecture",
          "RESTful API design and implementation",
          "Microservices and event-driven architecture",
        ]),

        // Professional Development section
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 120 },
          children: [
            new TextRun({
              text: "PROFESSIONAL DEVELOPMENT",
              size: 24,
              bold: true,
              font: "Calibri",
            }),
          ],
        }),

        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60, left: 360 },
          children: [
            new TextRun({
              text: "Nexthink Master's Level Certification",
              size: 22,
              font: "Calibri",
            }),
          ],
        }),

        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60, left: 360 },
          children: [
            new TextRun({
              text: "AGSVA Negative Vetting Level 1 Security Clearance (2021-2022)",
              size: 22,
              font: "Calibri",
            }),
          ],
        }),

        // Referees section (important for government applications)
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 120 },
          children: [
            new TextRun({
              text: "REFEREES",
              size: 24,
              bold: true,
              font: "Calibri",
            }),
          ],
        }),

        new Paragraph({
          spacing: { after: 60 },
          children: [
            new TextRun({
              text: "Available upon request",
              size: 22,
              font: "Calibri",
            }),
          ],
        }),
      ],
    }]

    // Helper function to create bullet points
    function createSkillBullets(skills: string[]) {
      return skills.map(skill =>
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 40, left: 360 },
          children: [
            new TextRun({
              text: skill,
              size: 22,
              font: "Calibri",
            }),
          ],
        })
      )
    }

    function createCompetencyBullets(competencies: string[]) {
      return competencies.map(comp =>
        new Paragraph({
          bullet: { level: 0 },
          spacing: { after: 60, left: 360 },
          children: [
            new TextRun({
              text: comp,
              size: 22,
              font: "Calibri",
            }),
          ],
        })
      )
    }

    // Create document
    const doc = new Document({
      sections,
      creator: "Dylan Henderson",
      description: "Professional Resume for Australian Government Applications",
      title: `${cvData.personalInfo.name} - Resume`,
      styles: {
        paragraphStyles: [
          {
            id: "Normal",
            name: "Normal",
            basedOn: "Normal",
            next: "Normal",
            run: {
              font: "Calibri",
              size: 22,
            },
            paragraph: {
              spacing: {
                line: 276, // 1.15 line spacing
              },
            },
          },
        ],
      },
    })

    // Generate and save
    const buffer = await Packer.toBuffer(doc)
    const arrayBuffer = new Uint8Array(buffer)
    const blob = new Blob([arrayBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })
    saveAs(blob, fileName)

  } catch (error) {
    console.error('Error generating DOCX:', error)
    throw error
  }
}

// Generate government-optimised filename
export const generateGovernmentFilename = (name: string, department?: string): string => {
  const cleanName = name.replace(/\s+/g, '_')
  const date = new Date().toISOString().split('T')[0] // YYYY-MM-DD format

  if (department) {
    const cleanDept = department.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)
    return `${cleanName}_${cleanDept}_Resume_${date}.docx`
  }

  return `${cleanName}_Resume_${date}.docx`
}