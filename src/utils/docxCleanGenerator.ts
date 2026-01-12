import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Tab, TabStopType, TabStopPosition } from 'docx'
import { saveAs } from 'file-saver'
import { CVData } from './cvTypes'

// Clean DOCX generator for Australian Government applications
export const generateCleanDOCX = async (cvData: CVData, fileName: string = 'Dylan_Henderson_Resume.docx') => {
  try {
    const { Packer } = await import('docx')

    // Create document sections
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          // Name
          new Paragraph({
            text: cvData.personalInfo.name,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          // Contact Info
          new Paragraph({
            text: `${cvData.personalInfo.phone} • ${cvData.personalInfo.email} • ${cvData.personalInfo.location}`,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          // Professional Summary
          new Paragraph({
            text: "PROFESSIONAL SUMMARY",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),

          new Paragraph({
            text: cvData.summary,
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 400 },
          }),

          // Core Competencies
          new Paragraph({
            text: "CORE COMPETENCIES",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),

          ...createBulletPoints([
            "Full-stack web development with 6+ years commercial experience",
            "Content Management Systems (CMS) development including WordPress and custom solutions",
            "Government sector experience with AGSVA NV1 clearance (held 2021-2022)",
            "Strong technical documentation and stakeholder communication skills",
            "Agile development methodologies and collaborative team environments",
          ]),

          // Professional Experience
          new Paragraph({
            text: "PROFESSIONAL EXPERIENCE",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          // Experience entries
          ...cvData.experience.flatMap((exp, index) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.title} • ${exp.company}`,
                  bold: true,
                }),
              ],
              spacing: { before: index > 0 ? 300 : 0, after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.location} • ${exp.startDate} – ${exp.endDate}`,
                  italics: true,
                }),
              ],
              spacing: { after: 200 },
            }),
            ...exp.responsibilities.map(resp =>
              new Paragraph({
                text: resp,
                bullet: { level: 0 },
                spacing: { after: 100 },
              })
            ),
          ]),

          // Education
          new Paragraph({
            text: "EDUCATION",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          ...cvData.education.flatMap(edu => [
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.institution,
                  bold: true,
                }),
                new TextRun({
                  text: ` • Completed: ${edu.completionDate}`,
                }),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: edu.degree,
              spacing: { after: 300 },
            }),
          ]),

          // Technical Skills
          new Paragraph({
            text: "TECHNICAL SKILLS",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          // Programming Languages
          new Paragraph({
            children: [
              new TextRun({
                text: "Programming Languages & Frameworks",
                bold: true,
              }),
            ],
            spacing: { after: 100 },
          }),
          ...createBulletPoints([
            "PHP (WordPress, CakePHP, custom CMS development)",
            "JavaScript/TypeScript (React, Next.js, Node.js, Express.js)",
            "Java (Spring Framework, microservices)",
            "HTML5/CSS3, responsive design",
          ]),

          // Database & Infrastructure
          new Paragraph({
            children: [
              new TextRun({
                text: "Database & Infrastructure",
                bold: true,
              }),
            ],
            spacing: { before: 200, after: 100 },
          }),
          ...createBulletPoints([
            "MySQL, SQL Server, NoSQL (ScyllaDB)",
            "Linux/VPS infrastructure, Apache web server",
            "Git version control, CI/CD pipelines",
            "AWS cloud services",
          ]),

          // CMS & Web Development
          new Paragraph({
            children: [
              new TextRun({
                text: "Content Management & Web Development",
                bold: true,
              }),
            ],
            spacing: { before: 200, after: 100 },
          }),
          ...createBulletPoints([
            "WordPress custom theme and plugin development",
            "Headless CMS architecture",
            "RESTful API design and implementation",
            "Microservices and event-driven architecture",
          ]),

          // Professional Development
          new Paragraph({
            text: "PROFESSIONAL DEVELOPMENT",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          ...createBulletPoints([
            "Nexthink Master's Level Certification",
            "AGSVA Negative Vetting Level 1 Security Clearance (2021-2022)",
          ]),

          // Referees
          new Paragraph({
            text: "REFEREES",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 400, after: 200 },
          }),

          new Paragraph({
            text: "Available upon request",
            spacing: { after: 200 },
          }),
        ],
      }],
      styles: {
        default: {
          heading1: {
            run: {
              size: 28,
              bold: true,
              font: "Calibri",
            },
            paragraph: {
              spacing: {
                after: 200,
              },
            },
          },
          heading2: {
            run: {
              size: 24,
              bold: true,
              font: "Calibri",
            },
            paragraph: {
              spacing: {
                after: 120,
              },
            },
          },
          document: {
            run: {
              size: 22,
              font: "Calibri",
            },
            paragraph: {
              spacing: {
                line: 276, // 1.15 line spacing
                after: 100,
              },
            },
          },
        },
        paragraphStyles: [
          {
            id: "Title",
            name: "Title",
            run: {
              size: 32,
              bold: true,
              font: "Calibri",
            },
          },
        ],
      },
    })

    // Helper function for bullet points
    function createBulletPoints(items: string[]) {
      return items.map(item =>
        new Paragraph({
          text: item,
          bullet: { level: 0 },
          spacing: { after: 100 },
        })
      )
    }

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

// Government-optimised filename
export const generateGovernmentFilename = (name: string, department?: string): string => {
  const cleanName = name.replace(/\s+/g, '_')
  const date = new Date().toISOString().split('T')[0]

  if (department) {
    const cleanDept = department.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)
    return `${cleanName}_${cleanDept}_Resume_${date}.docx`
  }

  return `${cleanName}_Resume_${date}.docx`
}