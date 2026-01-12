import { Document, Paragraph, TextRun, HeadingLevel, AlignmentType, Packer } from 'docx'
import { saveAs } from 'file-saver'
import { CVData } from './cvTypes'

export const generateMinimalDOCX = async (cvData: CVData, fileName: string = 'Dylan_Henderson_Resume.docx') => {
  const sections = []

  // Name
  sections.push(
    new Paragraph({
      text: cvData.personalInfo.name,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
    })
  )

  // Contact
  sections.push(
    new Paragraph({
      text: `${cvData.personalInfo.phone} | ${cvData.personalInfo.email} | ${cvData.personalInfo.location}`,
      alignment: AlignmentType.CENTER,
    })
  )

  // Empty line
  sections.push(new Paragraph({ text: "" }))

  // Professional Summary
  sections.push(
    new Paragraph({
      text: "Professional Summary",
      heading: HeadingLevel.HEADING_1,
    })
  )

  sections.push(
    new Paragraph({
      text: cvData.summary,
    })
  )

  // Empty line
  sections.push(new Paragraph({ text: "" }))

  // Work Experience
  sections.push(
    new Paragraph({
      text: "Work Experience",
      heading: HeadingLevel.HEADING_1,
    })
  )

  cvData.experience.forEach((exp) => {
    sections.push(new Paragraph({ text: "" }))

    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${exp.title} - ${exp.company}`,
            bold: true,
          }),
        ],
      })
    )

    sections.push(
      new Paragraph({
        text: `${exp.location} | ${exp.startDate} - ${exp.endDate}`,
        italics: true,
      })
    )

    exp.responsibilities.forEach(resp => {
      sections.push(
        new Paragraph({
          text: `• ${resp}`,
        })
      )
    })
  })

  // Empty line
  sections.push(new Paragraph({ text: "" }))

  // Education
  sections.push(
    new Paragraph({
      text: "Education",
      heading: HeadingLevel.HEADING_1,
    })
  )

  cvData.education.forEach((edu) => {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: edu.institution,
            bold: true,
          }),
          new TextRun({
            text: ` - Completed: ${edu.completionDate}`,
          }),
        ],
      })
    )
    sections.push(
      new Paragraph({
        text: edu.degree,
      })
    )
  })

  // Empty line
  sections.push(new Paragraph({ text: "" }))

  // Technical Skills
  sections.push(
    new Paragraph({
      text: "Technical Skills",
      heading: HeadingLevel.HEADING_1,
    })
  )

  // Languages
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Languages: ",
          bold: true,
        }),
        new TextRun({
          text: "TypeScript, JavaScript, PHP",
        }),
      ],
    })
  )

  // Frontend
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Frontend: ",
          bold: true,
        }),
        new TextRun({
          text: "React, Next.js, React Native",
        }),
      ],
    })
  )

  // Backend
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Backend: ",
          bold: true,
        }),
        new TextRun({
          text: "Node.js, REST APIs, Database design, NoSQL exposure",
        }),
      ],
    })
  )

  // Infrastructure
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "Infrastructure: ",
          bold: true,
        }),
        new TextRun({
          text: "Linux/VPS infrastructure, Git, AWS, Sentry",
        }),
      ],
    })
  )

  // Create document
  const doc = new Document({
    sections: [{
      properties: {},
      children: sections,
    }],
  })

  // Generate buffer and save
  const buffer = await Packer.toBuffer(doc)
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  })
  saveAs(blob, fileName)
}