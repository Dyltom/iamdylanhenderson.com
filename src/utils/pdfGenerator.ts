import jsPDF from 'jspdf'
import { CVData } from './cvTypes'

// Color scheme matching the dark theme
const colors = {
  primary: '#ffffff',      // White for main text
  secondary: '#32CD32',    // Lime green accent
  text: '#cccccc',        // Light gray for body text
  lightText: '#aaaaaa',   // Medium gray for secondary text
  lighterText: '#888888', // Darker gray for tertiary text
  accent: '#32CD32',      // Lime green
  lightBg: '#1a1a1a',     // Dark background
  border: '#333333',      // Dark border
  darkBg: '#0f0f0f',      // Very dark background
  gradientEnd: '#2d2d2d'  // Gradient end color
}

// Enhanced PDF generator with better design
export const generatePDF = (cvData: CVData): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter'
  })

  // Fonts and sizes
  doc.setFont('helvetica')
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  const margin = 20
  const contentWidth = pageWidth - (margin * 2)
  let y = margin

  // Helper functions
  const drawLine = (y: number, color: string = colors.border) => {
    doc.setDrawColor(parseInt(color.substring(1, 3), 16), parseInt(color.substring(3, 5), 16), parseInt(color.substring(5, 7), 16))
    doc.setLineWidth(0.5)
    doc.line(margin, y, pageWidth - margin, y)
  }

  const drawAccentLine = (x: number, y: number, width: number) => {
    doc.setDrawColor(50, 205, 50) // Lime green
    doc.setLineWidth(2)
    doc.line(x, y, x + width, y)
  }

  const setTextColor = (color: string) => {
    const r = parseInt(color.substring(1, 3), 16)
    const g = parseInt(color.substring(3, 5), 16)
    const b = parseInt(color.substring(5, 7), 16)
    doc.setTextColor(r, g, b)
  }

  // Header section with enhanced design
  const drawHeader = () => {
    // Dark background for entire page
    doc.setFillColor(15, 15, 15) // #0f0f0f
    doc.rect(0, 0, pageWidth, pageHeight, 'F')

    // Dark gradient background for header
    const headerHeight = 45
    const gradientSteps = 20
    for (let i = 0; i < gradientSteps; i++) {
      const ratio = i / gradientSteps
      const grayValue = Math.floor(26 + (45 - 26) * ratio) // Gradient from #1a1a1a to #2d2d2d
      doc.setFillColor(grayValue, grayValue, grayValue)
      doc.rect(0, i * (headerHeight / gradientSteps), pageWidth, headerHeight / gradientSteps, 'F')
    }

    // Accent bar at top
    doc.setFillColor(50, 205, 50)
    doc.rect(0, 0, pageWidth, 2, 'F')

    // Name with white text on dark background
    y = margin - 5
    doc.setFontSize(26)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(255, 255, 255)
    doc.text(cvData.personalInfo.name, pageWidth / 2, y, { align: 'center' })

    // Title with accent color
    y += 10
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(50, 205, 50)
    doc.text('Senior Software Engineer', pageWidth / 2, y, { align: 'center' })

    // Contact info in a single line
    y += 8
    doc.setFontSize(9)
    doc.setTextColor(204, 204, 204) // #cccccc
    const contactText = `${cvData.personalInfo.phone} | ${cvData.personalInfo.email} | ${cvData.personalInfo.location}`
    doc.text(contactText, pageWidth / 2, y, { align: 'center' })

    // Links section
    if (cvData.personalInfo.linkedin || cvData.personalInfo.github || cvData.personalInfo.portfolio) {
      y += 5
      doc.setFontSize(8)
      doc.setTextColor(50, 205, 50)

      const links = []
      if (cvData.personalInfo.portfolio) {
        links.push(cvData.personalInfo.portfolio.replace('https://', ''))
      }
      if (cvData.personalInfo.linkedin) {
        links.push('linkedin.com/in/dylanhenderson')
      }
      if (cvData.personalInfo.github) {
        links.push('github.com/Dyltom')
      }

      doc.text(links.join(' | '), pageWidth / 2, y, { align: 'center' })
    }

    // Set y position after header
    y = headerHeight + 10
  }

  // Section header with icon-like design
  const drawSectionHeader = (title: string) => {
    // Add spacing before section
    y += 5

    // Left accent bar
    doc.setFillColor(50, 205, 50)
    doc.rect(margin - 5, y - 3, 3, 8, 'F')

    // Title with modern typography
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    setTextColor(colors.primary)
    doc.text(title.toUpperCase(), margin, y + 2)

    // Decorative line extending from title
    const titleWidth = doc.getTextWidth(title.toUpperCase())
    doc.setDrawColor(51, 51, 51) // #333333
    doc.setLineWidth(0.5)
    doc.line(margin + titleWidth + 5, y, pageWidth - margin, y)

    y += 10
  }

  // Enhanced text rendering with better line height
  const drawText = (text: string, fontSize: number, isBold: boolean = false, indent: number = 0, lineHeight: number = 1.5) => {
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', isBold ? 'bold' : 'normal')

    const lines = doc.splitTextToSize(text, contentWidth - indent)
    const actualLineHeight = fontSize * 0.35 * lineHeight

    lines.forEach((line: string) => {
      if (y > pageHeight - margin) {
        doc.addPage()
        y = margin
      }
      doc.text(line, margin + indent, y)
      y += actualLineHeight
    })
  }

  // Draw the PDF
  drawHeader()

  // Professional Summary
  drawSectionHeader('Professional Summary')
  setTextColor(colors.text)
  drawText(cvData.summary, 10, false, 0, 1.6)
  y += 8

  // Work Experience
  drawSectionHeader('Work Experience')

  cvData.experience.forEach((exp, index) => {
    // Check page break
    if (y > pageHeight - 50) {
      doc.addPage()
      // Dark background for new page
      doc.setFillColor(15, 15, 15)
      doc.rect(0, 0, pageWidth, pageHeight, 'F')
      y = margin
    }

    // Experience card with subtle dark background
    doc.setFillColor(26, 26, 26) // #1a1a1a
    const expStartY = y - 2
    // Calculate height based on responsibilities
    let estimatedHeight = 25 // Base height for title, company, location
    exp.responsibilities.forEach(resp => {
      const lines = doc.splitTextToSize(resp, contentWidth - 10)
      estimatedHeight += lines.length * 3.5
    })
    doc.rect(margin - 5, expStartY, contentWidth + 10, estimatedHeight, 'F')

    // Left accent stripe
    doc.setFillColor(50, 205, 50)
    doc.rect(margin - 5, expStartY, 2, estimatedHeight, 'F')

    // Role title
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    setTextColor(colors.primary)
    doc.text(exp.title, margin, y)

    // Company
    doc.setFont('helvetica', 'normal')
    setTextColor(colors.accent)
    const titleWidth = doc.getTextWidth(exp.title + ' ')
    doc.text(`at ${exp.company}`, margin + titleWidth, y)

    // Date on the right
    doc.setFontSize(9)
    setTextColor(colors.lightText)
    const dateText = `${exp.startDate} - ${exp.endDate}`
    doc.text(dateText, pageWidth - margin, y, { align: 'right' })

    y += 5

    // Location
    doc.setFontSize(9)
    doc.setFont('helvetica', 'italic')
    setTextColor(colors.lightText)
    doc.text(exp.location, margin, y)
    y += 6

    // Responsibilities
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    setTextColor(colors.text)
    exp.responsibilities.forEach((resp) => {
      if (y > pageHeight - 20) {
        doc.addPage()
        // Dark background for new page
        doc.setFillColor(15, 15, 15)
        doc.rect(0, 0, pageWidth, pageHeight, 'F')
        y = margin
      }

      // Simple bullet
      doc.text('•', margin, y)

      // Responsibility text
      const lines = doc.splitTextToSize(resp, contentWidth - 10)
      lines.forEach((line: string, lineIndex: number) => {
        if (lineIndex === 0) {
          doc.text(line, margin + 5, y)
        } else {
          y += 3.5
          doc.text(line, margin + 5, y)
        }
      })
      y += 4
    })

    // Add spacing between jobs
    if (index < cvData.experience.length - 1) {
      y += 8
    }
  })

  y += 8

  // Education
  if (y > pageHeight - 30) {
    doc.addPage()
    // Dark background for new page
    doc.setFillColor(15, 15, 15)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')
    y = margin
  }

  drawSectionHeader('Education')

  // Education background
  doc.setFillColor(26, 26, 26)
  doc.rect(margin - 5, y - 2, contentWidth + 10, 20, 'F')

  cvData.education.forEach(edu => {
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    setTextColor(colors.primary)
    doc.text(edu.institution, margin, y)

    setTextColor(colors.lightText)
    doc.setFontSize(9)
    doc.text(`Completed: ${edu.completionDate}`, pageWidth - margin, y, { align: 'right' })

    y += 5
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    setTextColor(colors.text)
    doc.text(edu.degree, margin, y)
    y += 8
  })

  // Technical Skills
  if (y > pageHeight - 30) {
    doc.addPage()
    // Dark background for new page
    doc.setFillColor(15, 15, 15)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')
    y = margin
  }

  drawSectionHeader('Technical Skills')

  // Skills background
  doc.setFillColor(26, 26, 26)
  const skillsStartY = y - 2
  doc.rect(margin - 5, skillsStartY, contentWidth + 10, 35, 'F')

  // Group skills by category for better readability
  doc.setFontSize(9)

  const skillCategories = [
    {
      name: 'Languages',
      skills: cvData.skills.filter(s => ['TypeScript', 'JavaScript', 'PHP'].includes(s))
    },
    {
      name: 'Frontend',
      skills: cvData.skills.filter(s => ['React', 'Next.js', 'React Native'].includes(s))
    },
    {
      name: 'Backend',
      skills: cvData.skills.filter(s => ['Node.js', 'REST APIs', 'Database design', 'NoSQL exposure'].includes(s))
    },
    {
      name: 'Infrastructure',
      skills: cvData.skills.filter(s => ['Linux/VPS infrastructure', 'Sentry', 'AI Agents'].includes(s))
    }
  ]

  skillCategories.forEach(category => {
    if (category.skills.length > 0) {
      doc.setFont('helvetica', 'bold')
      setTextColor(colors.accent)
      doc.text(`${category.name}: `, margin, y)

      const categoryWidth = doc.getTextWidth(`${category.name}: `)
      doc.setFont('helvetica', 'normal')
      setTextColor(colors.text)

      const skillsText = category.skills.join(', ')
      const lines = doc.splitTextToSize(skillsText, contentWidth - categoryWidth)
      lines.forEach((line: string, idx: number) => {
        if (idx === 0) {
          doc.text(line, margin + categoryWidth, y)
        } else {
          y += 3.5
          doc.text(line, margin + categoryWidth, y)
        }
      })
      y += 5
    }
  })

  // Footer with page number
  const pageCount = doc.internal.pages.length - 1
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    setTextColor(colors.lighterText)
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' })
  }

  return doc
}

// Download PDF with enhanced filename
export const downloadPDF = async (cvData: CVData, fileName: string = 'Dylan_Henderson_Resume.pdf') => {
  try {
    const pdf = generatePDF(cvData)
    pdf.save(fileName)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}