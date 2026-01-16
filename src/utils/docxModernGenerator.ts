import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, convertInchesToTwip, BorderStyle } from 'docx'
import { saveAs } from 'file-saver'
import { CVData } from './cvTypes'

// Modern, properly formatted DOCX generator
export const generateModernDOCX = async (cvData: CVData, fileName: string = 'Dylan_Henderson_Resume.docx') => {
  try {
    const { Packer } = await import('docx')

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
            },
          },
        },
        children: [
          // Name - Large and centered
          new Paragraph({
            children: [
              new TextRun({
                text: cvData.personalInfo.name,
                font: "Calibri",
                size: 36, // 18pt
                bold: true,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 240, // 12pt spacing after
            },
          }),

          // Contact Information - Line 1
          new Paragraph({
            children: [
              new TextRun({
                text: `${cvData.personalInfo.phone} • ${cvData.personalInfo.email} • ${cvData.personalInfo.location}`,
                font: "Calibri",
                size: 22, // 11pt
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 120, // 6pt spacing
            },
          }),

          // Contact Information - Line 2 (Links)
          new Paragraph({
            children: [
              new TextRun({
                text: `LinkedIn: ${cvData.personalInfo.linkedin || 'N/A'} • GitHub: ${cvData.personalInfo.github || 'N/A'} • Portfolio: ${cvData.personalInfo.portfolio || 'N/A'}`,
                font: "Calibri",
                size: 22, // 11pt
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 480, // 24pt spacing after (good section break)
            },
          }),

          // Professional Summary Header
          createSectionHeader("PROFESSIONAL SUMMARY"),

          // Summary text
          new Paragraph({
            children: [
              new TextRun({
                text: cvData.summary,
                font: "Calibri",
                size: 22, // 11pt
              }),
            ],
            alignment: AlignmentType.LEFT,
            spacing: {
              after: 360, // 18pt after summary
              line: 276, // 1.15 line spacing
            },
          }),

          // Core Competencies Header
          createSectionHeader("CORE COMPETENCIES"),

          // Competency bullets
          createBullet("Full-stack web development with 6+ years commercial experience"),
          createBullet("Content Management Systems (CMS) development including WordPress and custom solutions"),
          createBullet("Government sector experience with AGSVA NV1 clearance (held 2021-2022)"),
          createBullet("Strong technical documentation and stakeholder communication skills"),
          createBullet("Agile development methodologies and collaborative team environments", 360),

          // Professional Experience Header
          createSectionHeader("PROFESSIONAL EXPERIENCE"),

          // Experience entries
          ...cvData.experience.flatMap((exp, index) => {
            const entries = [];

            // Add spacing before each job (except first)
            if (index > 0) {
              entries.push(new Paragraph({ text: "", spacing: { before: 240 } }));
            }

            // Job title and company
            entries.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: exp.title,
                    font: "Calibri",
                    size: 24, // 12pt
                    bold: true,
                  }),
                  new TextRun({
                    text: " • ",
                    font: "Calibri",
                    size: 24,
                  }),
                  new TextRun({
                    text: exp.company,
                    font: "Calibri",
                    size: 24, // 12pt
                    bold: true,
                  }),
                ],
                spacing: {
                  after: 60, // 3pt
                },
              })
            );

            // Location and dates
            entries.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${exp.location} • ${exp.startDate} – ${exp.endDate}`,
                    font: "Calibri",
                    size: 22, // 11pt
                    italics: true,
                  }),
                ],
                spacing: {
                  after: 120, // 6pt before bullets
                },
              })
            );

            // Responsibilities
            exp.responsibilities.forEach((resp, respIndex) => {
              entries.push(
                createBullet(
                  resp,
                  respIndex === exp.responsibilities.length - 1 ? 0 : 60 // No space after last bullet
                )
              );
            });

            return entries;
          }),

          // Add space before Education
          new Paragraph({ text: "", spacing: { before: 360 } }),

          // Education Header
          createSectionHeader("EDUCATION"),

          // Education entries
          ...cvData.education.flatMap(edu => [
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.institution,
                  font: "Calibri",
                  size: 24, // 12pt
                  bold: true,
                }),
                new TextRun({
                  text: ` • Completed: ${edu.completionDate}`,
                  font: "Calibri",
                  size: 22, // 11pt
                }),
              ],
              spacing: {
                after: 60, // 3pt
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.degree,
                  font: "Calibri",
                  size: 22, // 11pt
                }),
              ],
              spacing: {
                after: 240, // 12pt after education entry
              },
            }),
          ]),

          // Technical Skills Header
          createSectionHeader("TECHNICAL SKILLS"),

          // Programming Languages & Frameworks
          new Paragraph({
            children: [
              new TextRun({
                text: "Programming Languages & Frameworks",
                font: "Calibri",
                size: 23, // 11.5pt
                bold: true,
              }),
            ],
            spacing: {
              after: 60, // 3pt
            },
          }),
          createBullet("PHP (WordPress, CakePHP, custom CMS development)"),
          createBullet("JavaScript/TypeScript (React, Next.js, Node.js, Express.js)"),
          createBullet("Java (Spring Framework, microservices)"),
          createBullet("HTML5/CSS3, responsive design", 180),

          // Database & Infrastructure
          new Paragraph({
            children: [
              new TextRun({
                text: "Database & Infrastructure",
                font: "Calibri",
                size: 23, // 11.5pt
                bold: true,
              }),
            ],
            spacing: {
              before: 180, // 9pt before new category
              after: 60, // 3pt
            },
          }),
          createBullet("MySQL, SQL Server, NoSQL (ScyllaDB)"),
          createBullet("Linux/VPS infrastructure, Apache web server"),
          createBullet("Git version control, CI/CD pipelines"),
          createBullet("AWS cloud services", 180),

          // Content Management & Web Development
          new Paragraph({
            children: [
              new TextRun({
                text: "Content Management & Web Development",
                font: "Calibri",
                size: 23, // 11.5pt
                bold: true,
              }),
            ],
            spacing: {
              before: 180, // 9pt before new category
              after: 60, // 3pt
            },
          }),
          createBullet("WordPress custom theme and plugin development"),
          createBullet("Headless CMS architecture"),
          createBullet("RESTful API design and implementation"),
          createBullet("Microservices and event-driven architecture", 360),

          // Professional Development Header
          createSectionHeader("PROFESSIONAL DEVELOPMENT"),

          createBullet("Nexthink Master's Level Certification"),
          createBullet("AGSVA Negative Vetting Level 1 Security Clearance (2021-2022)", 360),

          // Referees Header
          createSectionHeader("REFEREES"),

          new Paragraph({
            children: [
              new TextRun({
                text: "Available upon request",
                font: "Calibri",
                size: 22, // 11pt
              }),
            ],
            spacing: {
              after: 240, // 12pt
            },
          }),
        ],
      }],
    });

    // Helper function to create section headers
    function createSectionHeader(text: string) {
      return new Paragraph({
        children: [
          new TextRun({
            text: text,
            font: "Calibri",
            size: 26, // 13pt
            bold: true,
            allCaps: true,
          }),
        ],
        spacing: {
          before: 360, // 18pt before headers
          after: 120, // 6pt after headers
        },
        border: {
          bottom: {
            style: BorderStyle.SINGLE,
            size: 6,
            color: "000000",
          },
        },
      });
    }

    // Helper function to create bullet points
    function createBullet(text: string, afterSpacing: number = 60) {
      return new Paragraph({
        children: [
          new TextRun({
            text: text,
            font: "Calibri",
            size: 22, // 11pt
          }),
        ],
        bullet: {
          level: 0,
        },
        spacing: {
          after: afterSpacing,
          line: 240, // Normal line spacing
        },
      });
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

// Export with expected name
export const generateATSFriendlyDOCX = generateModernDOCX

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