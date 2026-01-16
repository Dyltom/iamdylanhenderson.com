import { Document, Paragraph, TextRun, Packer, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'
import { CoverLetterData } from './coverLetterTypes'
import { CVData } from './cvTypes'

export const generateCoverLetterDOCX = async (
  coverLetterData: CoverLetterData,
  cvData: CVData,
  fileName: string = 'Dylan_Henderson_Cover_Letter.docx'
) => {
  const today = new Date().toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

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
        // Sender's name
        new Paragraph({
          children: [
            new TextRun({
              text: cvData.personalInfo.name,
              size: 24, // 12pt
              bold: true,
            }),
          ],
          spacing: { after: 60 },
        }),

        // Email
        new Paragraph({
          children: [
            new TextRun({
              text: cvData.personalInfo.email,
              size: 20, // 10pt
            }),
          ],
          spacing: { after: 60 },
        }),

        // Phone
        new Paragraph({
          children: [
            new TextRun({
              text: cvData.personalInfo.phone,
              size: 20, // 10pt
            }),
          ],
          spacing: { after: 60 },
        }),

        // Location
        new Paragraph({
          children: [
            new TextRun({
              text: "Cowra, NSW",
              size: 20, // 10pt
            }),
          ],
          spacing: { after: 240 },
        }),

        // Date
        new Paragraph({
          children: [
            new TextRun({
              text: today,
              size: 20, // 10pt
            }),
          ],
          spacing: { after: 240 },
        }),

        // Recipient name (if provided)
        ...(coverLetterData.recipientName ? [
          new Paragraph({
            children: [
              new TextRun({
                text: coverLetterData.recipientName,
                size: 20, // 10pt
              }),
            ],
            spacing: { after: 60 },
          }),
        ] : []),

        // Recipient title (if provided)
        ...(coverLetterData.recipientTitle ? [
          new Paragraph({
            children: [
              new TextRun({
                text: coverLetterData.recipientTitle,
                size: 20, // 10pt
              }),
            ],
            spacing: { after: 60 },
          }),
        ] : []),

        // Company name
        new Paragraph({
          children: [
            new TextRun({
              text: coverLetterData.companyName,
              size: 20, // 10pt
            }),
          ],
          spacing: { after: 60 },
        }),

        // Company address (if provided)
        ...(coverLetterData.companyAddress ? [
          new Paragraph({
            children: [
              new TextRun({
                text: coverLetterData.companyAddress,
                size: 20, // 10pt
              }),
            ],
            spacing: { after: 240 },
          }),
        ] : [
          new Paragraph({
            text: "",
            spacing: { after: 240 },
          }),
        ]),

        // Reference line
        ...(coverLetterData.referenceNumber ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "Re: ",
                size: 20,
                bold: true,
              }),
              new TextRun({
                text: `${coverLetterData.jobTitle} (Reference: ${coverLetterData.referenceNumber})`,
                size: 20,
              }),
            ],
            spacing: { after: 240 },
          }),
        ] : [
          new Paragraph({
            children: [
              new TextRun({
                text: "Re: ",
                size: 20,
                bold: true,
              }),
              new TextRun({
                text: coverLetterData.jobTitle,
                size: 20,
              }),
            ],
            spacing: { after: 240 },
          }),
        ]),

        // Salutation
        new Paragraph({
          children: [
            new TextRun({
              text: coverLetterData.salutation || "Dear Hiring Manager,",
              size: 20, // 10pt
            }),
          ],
          spacing: { after: 240 },
        }),

        // Opening paragraph
        new Paragraph({
          children: [
            new TextRun({
              text: coverLetterData.openingParagraph,
              size: 20, // 10pt
            }),
          ],
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 240 },
        }),

        // Body paragraphs - properly handle bullets and formatting
        ...coverLetterData.bodyParagraphs.flatMap(paragraph => {
          const sections: any[] = []

          // Split by double newlines first
          const parts = paragraph.split('\n\n')

          parts.forEach((part, partIndex) => {
            if (part.includes('•')) {
              // This section has bullet points
              const lines = part.split('\n')

              lines.forEach((line, lineIndex) => {
                if (line.startsWith('•')) {
                  // Bullet point line
                  sections.push(
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: line,
                          size: 20,
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                      spacing: {
                        after: lineIndex === lines.length - 1 ? 240 : 120,
                      },
                      indent: {
                        left: 360, // Indent bullets
                      },
                    })
                  )
                } else if (line.trim()) {
                  // Non-bullet line (like the intro to bullets)
                  sections.push(
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: line,
                          size: 20,
                        }),
                      ],
                      alignment: AlignmentType.JUSTIFIED,
                      spacing: { after: 120 },
                    })
                  )
                }
              })
            } else {
              // Regular paragraph
              sections.push(
                new Paragraph({
                  children: [
                    new TextRun({
                      text: part,
                      size: 20,
                    }),
                  ],
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: { after: 240 },
                })
              )
            }
          })

          return sections
        }),

        // Closing paragraph - handle multiple lines
        ...coverLetterData.closingParagraph.split('\n\n').map(part =>
          new Paragraph({
            children: [
              new TextRun({
                text: part,
                size: 20, // 10pt
              }),
            ],
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 240 },
          })
        ),

        // Sign off
        new Paragraph({
          children: [
            new TextRun({
              text: coverLetterData.signOff || "Sincerely,",
              size: 20, // 10pt
            }),
          ],
          spacing: { after: 240 },
        }),

        // Signature block
        new Paragraph({
          children: [
            new TextRun({
              text: cvData.personalInfo.name,
              size: 20, // 10pt
            }),
          ],
          spacing: { after: 60 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: cvData.personalInfo.phone,
              size: 20, // 10pt
            }),
          ],
          spacing: { after: 60 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: cvData.personalInfo.email,
              size: 20, // 10pt
            }),
          ],
          spacing: { after: 60 },
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "Cowra, NSW",
              size: 20, // 10pt
            }),
          ],
          spacing: { after: 60 },
        }),
      ],
    }],
  });

  // Generate and save
  const buffer = await Packer.toBuffer(doc);
  const uint8Array = new Uint8Array(buffer);
  const blob = new Blob([uint8Array], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  saveAs(blob, fileName);
};

// Generate government-optimised filename for cover letter
export const generateCoverLetterFilename = (name: string, companyName: string, jobTitle: string): string => {
  const cleanName = name.replace(/\s+/g, '_')
  const cleanCompany = companyName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 15)
  const cleanTitle = jobTitle.replace(/[^a-zA-Z0-9]/g, '').substring(0, 20)
  const date = new Date().toISOString().split('T')[0]

  return `${cleanName}_${cleanCompany}_${cleanTitle}_Cover_Letter_${date}.docx`
}