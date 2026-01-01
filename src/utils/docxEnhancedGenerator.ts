import { saveAs } from 'file-saver'
import { CVData } from './cvTypes'

// Enhanced DOCX generator with better styling
export const generateATSFriendlyDOCX = async (cvData: CVData, fileName: string = 'Dylan_Henderson_Resume.docx') => {
  // Create enhanced HTML content with better styling
  const htmlContent = `
    <!DOCTYPE html>
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${cvData.personalInfo.name} - Resume</title>
      <!--[if gte mso 9]><xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
        </w:WordDocument>
      </xml><![endif]-->
      <style>
        @page {
          size: 8.5in 11in;
          margin: 0.5in;
        }
        body {
          font-family: Calibri, Arial, sans-serif;
          font-size: 11pt;
          line-height: 1.5;
          color: #333333;
          margin: 0;
          padding: 0;
          background: white;
        }

        /* Header Styles */
        .header {
          text-align: center;
          margin-bottom: 20pt;
          border-bottom: 2pt solid #32CD32;
          padding-bottom: 10pt;
        }

        h1 {
          font-size: 24pt;
          font-weight: bold;
          color: #0f0f0f;
          margin: 0 0 5pt 0;
          letter-spacing: 0.5pt;
        }

        .subtitle {
          font-size: 14pt;
          color: #32CD32;
          font-weight: normal;
          margin: 0 0 10pt 0;
          text-transform: uppercase;
          letter-spacing: 1pt;
        }

        .contact-info {
          font-size: 10pt;
          color: #555555;
          margin-bottom: 5pt;
        }

        .links {
          font-size: 9pt;
          color: #666666;
        }

        /* Section Styles */
        h2 {
          font-size: 13pt;
          font-weight: bold;
          color: #0f0f0f;
          text-transform: uppercase;
          margin-top: 16pt;
          margin-bottom: 8pt;
          padding-bottom: 3pt;
          border-bottom: 1pt solid #32CD32;
          page-break-after: avoid;
        }

        h3 {
          font-size: 12pt;
          font-weight: bold;
          color: #0f0f0f;
          margin-bottom: 3pt;
          page-break-after: avoid;
        }

        .company {
          color: #32CD32;
          font-weight: normal;
        }

        .date-location {
          font-size: 10pt;
          color: #666666;
          font-style: italic;
          margin-bottom: 6pt;
        }

        /* Content Styles */
        .summary {
          font-size: 11pt;
          line-height: 1.6;
          margin-bottom: 12pt;
          text-align: justify;
        }

        ul {
          margin-top: 0;
          margin-bottom: 12pt;
          padding-left: 20pt;
        }

        li {
          margin-bottom: 4pt;
          line-height: 1.5;
        }

        .job-section {
          margin-bottom: 16pt;
          page-break-inside: avoid;
        }

        .education {
          margin-bottom: 8pt;
        }

        .skills {
          line-height: 1.8;
        }

        /* ATS-friendly enhancements */
        .skill-group {
          margin-bottom: 6pt;
        }

        .skill-category {
          font-weight: bold;
          color: #32CD32;
          display: inline;
        }

        /* Ensure proper spacing and no widows/orphans */
        p {
          margin: 0 0 6pt 0;
          orphans: 3;
          widows: 3;
        }

        @media print {
          body {
            margin: 0;
          }
        }
      </style>
    </head>
    <body>
      <!-- Header Section -->
      <div class="header">
        <h1>${cvData.personalInfo.name}</h1>
        <p class="subtitle">Senior Software Engineer</p>
        <p class="contact-info">
          ${cvData.personalInfo.phone} • ${cvData.personalInfo.email} • ${cvData.personalInfo.location}
        </p>
        ${(cvData.personalInfo.linkedin || cvData.personalInfo.github || cvData.personalInfo.portfolio) ? `
          <p class="links">
            ${[
              cvData.personalInfo.portfolio ? `Portfolio: ${cvData.personalInfo.portfolio}` : '',
              cvData.personalInfo.linkedin ? `LinkedIn: ${cvData.personalInfo.linkedin}` : '',
              cvData.personalInfo.github ? `GitHub: ${cvData.personalInfo.github}` : ''
            ].filter(Boolean).join(' • ')}
          </p>
        ` : ''}
      </div>

      <!-- Professional Summary -->
      <h2>Professional Summary</h2>
      <p class="summary">${cvData.summary}</p>

      <!-- Work Experience -->
      <h2>Work Experience</h2>
      ${cvData.experience.map(exp => `
        <div class="job-section">
          <h3>${exp.title} <span class="company">@ ${exp.company}</span></h3>
          <p class="date-location">${exp.location} | ${exp.startDate} – ${exp.endDate}</p>
          <ul>
            ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
          </ul>
        </div>
      `).join('')}

      <!-- Education -->
      <h2>Education</h2>
      ${cvData.education.map(edu => `
        <div class="education">
          <h3>${edu.institution}</h3>
          <p>${edu.degree} | Completed: ${edu.completionDate}</p>
        </div>
      `).join('')}

      <!-- Technical Skills -->
      <h2>Technical Skills</h2>
      <div class="skills">
        <div class="skill-group">
          <span class="skill-category">Languages:</span> TypeScript, JavaScript, PHP
        </div>
        <div class="skill-group">
          <span class="skill-category">Frontend:</span> React, Next.js, React Native
        </div>
        <div class="skill-group">
          <span class="skill-category">Backend:</span> Node.js, REST APIs, Database design, NoSQL
        </div>
        <div class="skill-group">
          <span class="skill-category">Tools & Infrastructure:</span> Linux/VPS, Sentry, AI Agents
        </div>
      </div>
    </body>
    </html>
  `

  // Create blob with proper MIME type for Word
  const blob = new Blob(['\ufeff', htmlContent], {
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