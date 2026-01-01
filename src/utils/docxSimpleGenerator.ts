import { saveAs } from 'file-saver'
import { CVData } from './cvTypes'

// Simple HTML-based approach for DOCX generation
export const generateATSFriendlyDOCX = async (cvData: CVData, fileName: string = 'Dylan_Henderson_Resume.docx') => {
  // Create HTML content with Word-compatible styles
  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <style>
        @page {
          size: letter;
          margin: 0.5in;
        }
        body {
          font-family: Arial, sans-serif;
          font-size: 11pt;
          line-height: 1.4;
          color: #000;
        }
        h1 { font-size: 20pt; font-weight: bold; text-align: center; margin-bottom: 8pt; }
        h2 { font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-top: 16pt; margin-bottom: 8pt; }
        h3 { font-size: 12pt; font-weight: bold; margin-bottom: 4pt; }
        .contact { text-align: center; font-size: 10pt; margin-bottom: 4pt; }
        .job-header { display: flex; justify-content: space-between; margin-bottom: 4pt; }
        .job-date { font-size: 10pt; font-style: italic; }
        .location { font-size: 10pt; font-style: italic; margin-bottom: 8pt; }
        ul { padding-left: 16pt; margin-bottom: 8pt; }
        li { margin-bottom: 4pt; }
        .summary { margin-bottom: 12pt; }
        .education { margin-bottom: 8pt; }
        .skills { line-height: 1.6; }
      </style>
    </head>
    <body>
      <h1>${cvData.personalInfo.name}</h1>
      <p class="contact">${cvData.personalInfo.phone} | ${cvData.personalInfo.email} | ${cvData.personalInfo.location}</p>
      ${cvData.personalInfo.linkedin || cvData.personalInfo.github || cvData.personalInfo.portfolio ? `
        <p class="contact">${[
          cvData.personalInfo.linkedin ? `LinkedIn: ${cvData.personalInfo.linkedin}` : '',
          cvData.personalInfo.github ? `GitHub: ${cvData.personalInfo.github}` : '',
          cvData.personalInfo.portfolio ? `Portfolio: ${cvData.personalInfo.portfolio}` : ''
        ].filter(Boolean).join(' | ')}</p>
      ` : ''}

      <h2>Professional Summary</h2>
      <p class="summary">${cvData.summary}</p>

      <h2>Work Experience</h2>
      ${cvData.experience.map(exp => `
        <div>
          <h3>${exp.title} | ${exp.company}</h3>
          <p class="location">${exp.location} | ${exp.startDate} - ${exp.endDate}</p>
          <ul>
            ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
          </ul>
        </div>
      `).join('')}

      <h2>Education</h2>
      ${cvData.education.map(edu => `
        <div class="education">
          <h3>${edu.institution}</h3>
          <p>${edu.degree} | Completed: ${edu.completionDate}</p>
        </div>
      `).join('')}

      <h2>Technical Skills</h2>
      <p class="skills">${cvData.skills.join(', ')}</p>
    </body>
    </html>
  `

  // Create blob with proper MIME type for Word
  const blob = new Blob([htmlContent], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  })

  // Download the file
  saveAs(blob, fileName)
}

// Generate ATS-optimized filename
export const generateATSFilename = (name: string, jobTitle?: string): string => {
  const cleanName = name.replace(/\s+/g, '_')
  const timestamp = new Date().toISOString().split('T')[0]

  if (jobTitle) {
    const cleanTitle = jobTitle.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
    return `${cleanName}_${cleanTitle}_Resume_${timestamp}.docx`
  }

  return `${cleanName}_Resume_${timestamp}.docx`
}