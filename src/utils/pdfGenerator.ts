import jsPDF from 'jspdf'
import { CVData } from './cvTypes'

// Color scheme matching the dark theme
const colors = {
  primary: '#0f0f0f',
  secondary: '#32CD32',
  text: '#333333',
  lightText: '#666666',
  lighterText: '#999999',
  accent: '#32CD32',
  lightBg: '#f5f5f5',
  border: '#e0e0e0',
  darkBg: '#1a1a1a',
  gradientEnd: '#2d2d2d'
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
    // Dark gradient background for header
    const gradientHeight = 55
    const gradientSteps = 20
    for (let i = 0; i < gradientSteps; i++) {
      const ratio = i / gradientSteps
      const grayValue = Math.floor(26 + (45 - 26) * ratio) // Gradient from #1a1a1a to #2d2d2d
      doc.setFillColor(grayValue, grayValue, grayValue)
      doc.rect(0, i * (gradientHeight / gradientSteps), pageWidth, gradientHeight / gradientSteps, 'F')
    }

    // Accent bar at top
    doc.setFillColor(50, 205, 50)
    doc.rect(0, 0, pageWidth, 2, 'F')

    // Name with white text on dark background
    y += 5
    doc.setFontSize(32)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(255, 255, 255)
    doc.text(cvData.personalInfo.name, pageWidth / 2, y + 8, { align: 'center' })

    // Title with accent color
    y += 14
    doc.setFontSize(16)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(50, 205, 50)
    doc.text('SENIOR SOFTWARE ENGINEER', pageWidth / 2, y, { align: 'center' })

    // Decorative elements
    const centerX = pageWidth / 2
    doc.setDrawColor(50, 205, 50)
    doc.setLineWidth(0.5)
    // Left decorative line
    doc.line(centerX - 80, y + 2, centerX - 40, y + 2)
    // Right decorative line
    doc.line(centerX + 40, y + 2, centerX + 80, y + 2)

    // Contact info with icons representation
    y += 12
    doc.setFontSize(10)
    doc.setTextColor(230, 230, 230)

    // Contact line with better formatting
    const phone = cvData.personalInfo.phone
    const email = cvData.personalInfo.email
    const location = cvData.personalInfo.location

    // Draw contact items with spacing
    const contactY = y
    const contactSpacing = 60

    // Phone
    doc.setFontSize(9)
    doc.text(phone, centerX - contactSpacing, contactY, { align: 'center' })

    // Email
    doc.text(email, centerX, contactY, { align: 'center' })

    // Location
    doc.text(location, centerX + contactSpacing, contactY, { align: 'center' })

    // Links section with modern design
    if (cvData.personalInfo.linkedin || cvData.personalInfo.github || cvData.personalInfo.portfolio) {
      y += 6
      doc.setFontSize(8)
      doc.setTextColor(50, 205, 50)

      const links = []
      if (cvData.personalInfo.portfolio) {
        links.push(`${cvData.personalInfo.portfolio.replace('https://', '').replace('http://', '')}`)
      }
      if (cvData.personalInfo.linkedin) {
        links.push(`LinkedIn: ${cvData.personalInfo.linkedin.replace('https://www.', '').replace('https://', '')}`)
      }
      if (cvData.personalInfo.github) {
        links.push(`GitHub: ${cvData.personalInfo.github.replace('https://', '')}`)
      }

      doc.text(links.join('   '), pageWidth / 2, y, { align: 'center' })
    }

    // Add subtle shadow effect at bottom of header
    y = gradientHeight + 5
    doc.setFillColor(240, 240, 240)
    doc.rect(0, gradientHeight, pageWidth, 0.5, 'F')
  }

  // Section header with icon-like design
  const drawSectionHeader = (title: string) => {
    // Add spacing before section
    y += 2

    // Left accent bar
    doc.setFillColor(50, 205, 50)
    doc.rect(margin - 10, y - 4, 3, 10, 'F')

    // Title with modern typography
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    setTextColor(colors.primary)
    doc.text(title.toUpperCase(), margin, y + 2)

    // Decorative line extending from title
    const titleWidth = doc.getTextWidth(title.toUpperCase())
    doc.setDrawColor(220, 220, 220)
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

    lines.forEach(line => {
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
    if (y > pageHeight - 60) {
      doc.addPage()
      y = margin
    }

    // Experience card background
    doc.setFillColor(248, 248, 248)
    const expStartY = y - 3
    const expHeight = 8 + (exp.responsibilities.length * 6)
    doc.rect(margin - 5, expStartY, contentWidth + 10, expHeight, 'F')

    // Left accent stripe
    doc.setFillColor(50, 205, 50)
    doc.rect(margin - 5, expStartY, 2, expHeight, 'F')

    // Role title
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    setTextColor(colors.primary)
    doc.text(exp.title, margin, y)

    // Company with modern styling
    doc.setFontSize(11)
    setTextColor(colors.accent)
    const atSymbolX = margin + doc.getTextWidth(exp.title) + 3
    doc.text(`@ ${exp.company}`, atSymbolX, y)

    // Date badge on the right
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    const dateText = `${exp.startDate} - ${exp.endDate}`
    const dateWidth = doc.getTextWidth(dateText)

    // Date background
    doc.setFillColor(240, 240, 240)
    doc.roundedRect(pageWidth - margin - dateWidth - 8, y - 4, dateWidth + 8, 6, 1, 1, 'F')

    setTextColor(colors.text)
    doc.text(dateText, pageWidth - margin - 4, y, { align: 'right' })

    y += 5

    // Location
    doc.setFontSize(9)
    doc.setFont('helvetica', 'italic')
    setTextColor(colors.lightText)
    doc.text(exp.location, margin, y)
    y += 7

    // Responsibilities with enhanced bullets
    doc.setFont('helvetica', 'normal')
    setTextColor(colors.text)
    exp.responsibilities.forEach((resp, respIndex) => {
      if (y > pageHeight - 20) {
        doc.addPage()
        y = margin
      }

      // Modern bullet design
      doc.setDrawColor(50, 205, 50)
      doc.setLineWidth(1.5)
      doc.line(margin + 1, y - 2, margin + 4, y - 2)

      // Responsibility text with better spacing
      doc.setFontSize(9)
      drawText(resp, 9, false, 10, 1.5)

      // Add slight spacing between bullets
      if (respIndex < exp.responsibilities.length - 1) {
        y += 1
      }
    })

    // Add spacing between jobs
    if (index < cvData.experience.length - 1) {
      y += 10
    }
  })

  y += 8

  // Education
  if (y > pageHeight - 40) {
    doc.addPage()
    y = margin
  }

  drawSectionHeader('Education')
  cvData.education.forEach(edu => {
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    setTextColor(colors.primary)
    doc.text(edu.institution, margin, y)
    y += 5

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    setTextColor(colors.text)
    doc.text(`${edu.degree}`, margin, y)

    setTextColor(colors.lightText)
    doc.text(`Completed: ${edu.completionDate}`, pageWidth - margin, y, { align: 'right' })
    y += 8
  })

  // Technical Skills
  if (y > pageHeight - 30) {
    doc.addPage()
    y = margin
  }

  drawSectionHeader('Technical Skills')

  // Skills with better formatting
  const skillGroups = [
    { title: 'Languages', skills: ['TypeScript', 'JavaScript', 'PHP'] },
    { title: 'Frontend', skills: ['React', 'Next.js', 'React Native'] },
    { title: 'Backend', skills: ['Node.js', 'REST APIs', 'Database design'] },
    { title: 'Tools & Infrastructure', skills: ['Linux/VPS', 'Sentry', 'AI Agents'] }
  ]

  // Extract skills into groups
  const categorizedSkills = {
    languages: cvData.skills.filter(s => ['TypeScript', 'JavaScript', 'PHP'].includes(s)),
    frontend: cvData.skills.filter(s => ['React', 'Next.js', 'React Native'].includes(s)),
    backend: cvData.skills.filter(s => ['Node.js', 'REST APIs', 'Database design', 'NoSQL exposure'].includes(s)),
    tools: cvData.skills.filter(s => ['Linux/VPS infrastructure', 'Sentry', 'AI Agents'].includes(s))
  }

  // Display skills in a more visual way
  let skillY = y
  let columnX = margin

  Object.entries(categorizedSkills).forEach(([category, skills], idx) => {
    if (skills.length > 0) {
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      setTextColor(colors.accent)
      doc.text(category.charAt(0).toUpperCase() + category.slice(1) + ':', columnX, skillY)

      skillY += 4
      doc.setFont('helvetica', 'normal')
      setTextColor(colors.text)

      skills.forEach(skill => {
        doc.text(`• ${skill}`, columnX + 5, skillY)
        skillY += 4
      })

      // Move to next column or reset
      if (idx === 1) {
        columnX = pageWidth / 2
        skillY = y
      }
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