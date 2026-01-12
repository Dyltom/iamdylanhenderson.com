import jsPDF from 'jspdf'
import { CVData } from './cvTypes'

// Clean, professional PDF generator - ATS best practices
export const generatePDF = (cvData: CVData): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  })

  // Setup
  doc.setFont('helvetica')
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  const leftMargin = 20
  const rightMargin = 20
  const contentWidth = pageWidth - leftMargin - rightMargin
  let y = 20

  // Helper function for page breaks
  const checkPageBreak = (requiredSpace: number = 30) => {
    if (y + requiredSpace > pageHeight - 20) {
      doc.addPage()
      y = 20
    }
  }

  // Clean header
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text(cvData.personalInfo.name, pageWidth / 2, y, { align: 'center' })

  y += 10
  doc.setFontSize(14)
  doc.setTextColor(50, 205, 50) // #32CD32 - your brand green
  doc.text('Senior Software Engineer', pageWidth / 2, y, { align: 'center' })

  // Contact info
  y += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(60, 60, 60)
  const contactInfo = `${cvData.personalInfo.phone} | ${cvData.personalInfo.email} | ${cvData.personalInfo.location}`
  doc.text(contactInfo, pageWidth / 2, y, { align: 'center' })

  // Links
  y += 6
  doc.setFontSize(9)
  doc.setTextColor(50, 205, 50) // #32CD32
  const links = [
    cvData.personalInfo.portfolio?.replace('https://', ''),
    'linkedin.com/in/dylan-henderson-07',
    'github.com/Dyltom'
  ].filter(Boolean).join(' | ')
  doc.text(links, pageWidth / 2, y, { align: 'center' })

  y += 12

  // Professional Summary
  checkPageBreak()
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text('PROFESSIONAL SUMMARY', leftMargin, y)

  // Add underline
  const summaryWidth = doc.getTextWidth('PROFESSIONAL SUMMARY')
  doc.setDrawColor(50, 205, 50) // #32CD32
  doc.setLineWidth(0.5)
  doc.line(leftMargin, y + 1, leftMargin + summaryWidth, y + 1)

  y += 8
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(40, 40, 40)

  // Split summary into lines
  const summaryLines = doc.splitTextToSize(cvData.summary, contentWidth)
  summaryLines.forEach((line: any) => {
    checkPageBreak()
    doc.text(line, leftMargin, y)
    y += 5
  })

  y += 8

  // Work Experience
  checkPageBreak()
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text('WORK EXPERIENCE', leftMargin, y)

  // Add underline
  const expWidth = doc.getTextWidth('WORK EXPERIENCE')
  doc.setDrawColor(50, 205, 50) // #32CD32
  doc.line(leftMargin, y + 1, leftMargin + expWidth, y + 1)

  y += 8

  cvData.experience.forEach((exp, index) => {
    checkPageBreak(40)

    // Job title
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text(exp.title, leftMargin, y)

    // Dates on right
    doc.setTextColor(60, 60, 60)
    doc.setFontSize(10)
    const dateText = `${exp.startDate} - ${exp.endDate}`
    doc.text(dateText, pageWidth - rightMargin, y, { align: 'right' })

    y += 5

    // Company on new line
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(50, 205, 50) // #32CD32
    doc.setFontSize(10)
    doc.text(exp.company, leftMargin, y)

    y += 5

    // Location
    doc.setFontSize(9)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(80, 80, 80)
    doc.text(exp.location, leftMargin, y)
    y += 6

    // Responsibilities
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(40, 40, 40)

    exp.responsibilities.forEach(resp => {
      checkPageBreak()

      // Add bullet
      doc.text('•', leftMargin + 2, y)

      // Add responsibility text
      const respLines = doc.splitTextToSize(resp, contentWidth - 8)
      respLines.forEach((line: any, lineIndex: number) => {
        if (lineIndex > 0) {
          y += 5
          checkPageBreak()
        }
        doc.text(line, leftMargin + 8, y)
      })
      y += 6
    })

    // Space between jobs
    if (index < cvData.experience.length - 1) {
      y += 6
    }
  })

  y += 8

  // Education
  checkPageBreak()
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text('EDUCATION', leftMargin, y)

  // Add underline
  const eduWidth = doc.getTextWidth('EDUCATION')
  doc.setDrawColor(50, 205, 50) // #32CD32
  doc.line(leftMargin, y + 1, leftMargin + eduWidth, y + 1)

  y += 8

  cvData.education.forEach(edu => {
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text(edu.institution, leftMargin, y)

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(60, 60, 60)
    doc.text(`Completed: ${edu.completionDate}`, pageWidth - rightMargin, y, { align: 'right' })

    y += 5
    doc.setTextColor(40, 40, 40)
    doc.text(edu.degree, leftMargin, y)
    y += 8
  })

  y += 4

  // Technical Skills
  checkPageBreak()
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text('TECHNICAL SKILLS', leftMargin, y)

  // Add underline
  const skillsWidth = doc.getTextWidth('TECHNICAL SKILLS')
  doc.setDrawColor(50, 205, 50) // #32CD32
  doc.line(leftMargin, y + 1, leftMargin + skillsWidth, y + 1)

  y += 8

  // Organize skills by category for better readability
  const skillCategories = [
    {
      name: 'CMS & Web Development',
      skills: cvData.skills.filter(s =>
        s.includes('CMS') || s.includes('WordPress') || s.includes('Module/Plugin')
      )
    },
    {
      name: 'Languages & Frameworks',
      skills: cvData.skills.filter(s =>
        s.includes('PHP') || s.includes('JavaScript') || s.includes('Java') ||
        s.includes('HTML') || s.includes('CSS')
      )
    },
    {
      name: 'Infrastructure & DevOps',
      skills: cvData.skills.filter(s =>
        s.includes('MySQL') || s.includes('Apache') || s.includes('Git') ||
        s.includes('Testing') || s.includes('Documentation')
      )
    },
    {
      name: 'Professional Experience',
      skills: cvData.skills.filter(s =>
        s.includes('Workflow') || s.includes('API') || s.includes('AGSVA') ||
        s.includes('Government') || s.includes('Development Methodologies') ||
        s.includes('Full-stack')
      )
    }
  ]

  doc.setFontSize(10)

  // Use two columns for better space utilization
  let columnX = leftMargin
  let columnY = y
  let maxColumnY = y
  const columnWidth = (contentWidth - 10) / 2 // 10mm gap between columns

  skillCategories.forEach((category, categoryIndex) => {
    if (category.skills.length > 0) {
      // Determine which column to use
      if (categoryIndex === 2) {
        // Move to second column
        columnX = leftMargin + columnWidth + 10
        columnY = y // Reset to top of skills section
      }

      // Check if we need a page break
      if (columnY + (category.skills.length * 5 + 15) > pageHeight - 20) {
        doc.addPage()
        columnY = 20
        if (categoryIndex >= 2) {
          columnX = leftMargin + columnWidth + 10
        } else {
          columnX = leftMargin
        }
      }

      // Category header
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(50, 205, 50) // Green for categories
      doc.text(category.name, columnX, columnY)
      columnY += 6

      // Skills in category
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(40, 40, 40)

      category.skills.forEach(skill => {
        // Check for page break within skills
        if (columnY > pageHeight - 20) {
          doc.addPage()
          columnY = 20
        }

        // Add bullet point and skill text
        const bulletX = columnX + 2
        const textX = columnX + 6

        // Split long skills if needed
        const skillLines = doc.splitTextToSize(skill, columnWidth - 8)

        skillLines.forEach((line: any, lineIndex: number) => {
          if (lineIndex === 0) {
            doc.text('•', bulletX, columnY)
          }
          doc.text(line, textX, columnY)
          columnY += 4.5
        })
      })

      // Track the maximum Y position for proper spacing
      maxColumnY = Math.max(maxColumnY, columnY)
      columnY += 8 // Space between categories
    }
  })

  // Update y to continue after skills section
  y = maxColumnY

  return doc
}

// Download PDF
export const downloadPDF = async (cvData: CVData, fileName: string = 'Dylan_Henderson_Resume.pdf') => {
  try {
    const pdf = generatePDF(cvData)
    pdf.save(fileName)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}