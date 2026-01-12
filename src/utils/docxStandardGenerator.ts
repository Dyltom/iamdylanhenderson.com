import { Document, Paragraph, TextRun, Packer, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'
import { CVData } from './cvTypes'

export const generateStandardDOCX = async (cvData: CVData, fileName: string = 'Dylan_Henderson_Resume.docx') => {
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 720,    // 0.5 inch
            right: 720,  // 0.5 inch
            bottom: 720, // 0.5 inch
            left: 720,   // 0.5 inch
          },
        },
      },
      children: [
        // Name - centered, larger
        new Paragraph({
          children: [
            new TextRun({
              text: cvData.personalInfo.name,
              size: 32, // 16pt
              bold: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
        }),

        // Contact info - centered
        new Paragraph({
          children: [
            new TextRun({
              text: `${cvData.personalInfo.phone} | ${cvData.personalInfo.email} | ${cvData.personalInfo.location}`,
              size: 20, // 10pt
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
        }),

        // Professional Summary header
        new Paragraph({
          children: [
            new TextRun({
              text: "PROFESSIONAL SUMMARY",
              size: 24, // 12pt
              bold: true,
            }),
          ],
          spacing: { before: 240, after: 120 },
        }),

        // Summary text
        new Paragraph({
          text: cvData.summary,
          size: 20, // 10pt
          spacing: { after: 240 },
        }),

        // Work Experience header
        new Paragraph({
          children: [
            new TextRun({
              text: "WORK EXPERIENCE",
              size: 24, // 12pt
              bold: true,
            }),
          ],
          spacing: { before: 240, after: 120 },
        }),

        // Experience entries
        ...cvData.experience.flatMap((exp, index) => {
          const entries = [];

          // Add spacing before job (except first)
          if (index > 0) {
            entries.push(
              new Paragraph({
                text: "",
                spacing: { before: 180 },
              })
            );
          }

          // Job title and company
          entries.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.title} – ${exp.company}`,
                  size: 22, // 11pt
                  bold: true,
                }),
              ],
              spacing: { after: 60 },
            })
          );

          // Location and dates
          entries.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.location} | ${exp.startDate} – ${exp.endDate}`,
                  size: 20, // 10pt
                  italics: true,
                }),
              ],
              spacing: { after: 120 },
            })
          );

          // Responsibilities as simple paragraphs with bullet
          exp.responsibilities.forEach(resp => {
            entries.push(
              new Paragraph({
                text: `• ${resp}`,
                size: 20, // 10pt
                spacing: { after: 60 },
              })
            );
          });

          return entries;
        }),

        // Education header
        new Paragraph({
          children: [
            new TextRun({
              text: "EDUCATION",
              size: 24, // 12pt
              bold: true,
            }),
          ],
          spacing: { before: 240, after: 120 },
        }),

        // Education entries
        ...cvData.education.flatMap(edu => [
          new Paragraph({
            children: [
              new TextRun({
                text: `${edu.institution} – Completed: ${edu.completionDate}`,
                size: 22, // 11pt
                bold: true,
              }),
            ],
            spacing: { after: 60 },
          }),
          new Paragraph({
            text: edu.degree,
            size: 20, // 10pt
            spacing: { after: 180 },
          }),
        ]),

        // Technical Skills header
        new Paragraph({
          children: [
            new TextRun({
              text: "TECHNICAL SKILLS",
              size: 24, // 12pt
              bold: true,
            }),
          ],
          spacing: { before: 240, after: 120 },
        }),

        // Skills sections
        new Paragraph({
          children: [
            new TextRun({
              text: "Languages: ",
              size: 20,
              bold: true,
            }),
            new TextRun({
              text: "TypeScript, JavaScript, PHP, Java, HTML5/CSS3",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "Frameworks & Libraries: ",
              size: 20,
              bold: true,
            }),
            new TextRun({
              text: "React, Next.js, Node.js, Express.js, WordPress, Spring Framework",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "Databases & Infrastructure: ",
              size: 20,
              bold: true,
            }),
            new TextRun({
              text: "MySQL, SQL Server, NoSQL, AWS, Linux, Git, CI/CD",
              size: 20,
            }),
          ],
          spacing: { after: 60 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "Specialisations: ",
              size: 20,
              bold: true,
            }),
            new TextRun({
              text: "CMS Development, RESTful APIs, Microservices, Full-stack Development",
              size: 20,
            }),
          ],
          spacing: { after: 240 },
        }),

        // Professional Development header
        new Paragraph({
          children: [
            new TextRun({
              text: "PROFESSIONAL DEVELOPMENT",
              size: 24, // 12pt
              bold: true,
            }),
          ],
          spacing: { before: 240, after: 120 },
        }),

        new Paragraph({
          text: "• Nexthink Master's Level Certification",
          size: 20,
          spacing: { after: 60 },
        }),

        new Paragraph({
          text: "• AGSVA Negative Vetting Level 1 Security Clearance (2021-2022)",
          size: 20,
          spacing: { after: 240 },
        }),

        // Referees header
        new Paragraph({
          children: [
            new TextRun({
              text: "REFEREES",
              size: 24, // 12pt
              bold: true,
            }),
          ],
          spacing: { before: 240, after: 120 },
        }),

        new Paragraph({
          text: "Available upon request",
          size: 20,
        }),
      ],
    }],
  });

  // Generate and save
  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  saveAs(blob, fileName);
};