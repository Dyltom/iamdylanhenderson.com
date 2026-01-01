import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
  pdf,
} from '@react-pdf/renderer'
import { CVData } from './cvTypes'

// Register fonts for better typography
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { src: 'Helvetica-Bold', fontWeight: 'bold' },
  ],
})

// ATS-friendly styles
const styles = StyleSheet.create({
  page: {
    padding: 36, // 0.5 inch margins
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.4,
    color: '#000',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobDate: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  jobLocation: {
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 16,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },
  summary: {
    fontSize: 10,
    marginBottom: 12,
    lineHeight: 1.5,
  },
  education: {
    marginBottom: 8,
  },
  educationInstitution: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  educationDetails: {
    fontSize: 10,
  },
  skills: {
    fontSize: 10,
    lineHeight: 1.6,
  },
  experienceItem: {
    marginBottom: 12,
  },
})

// PDF Document Component
export const CVPDFDocument: React.FC<{ cvData: CVData }> = ({ cvData }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{cvData.personalInfo.name}</Text>
        <Text style={styles.contactInfo}>
          {cvData.personalInfo.phone} | {cvData.personalInfo.email} | {cvData.personalInfo.location}
        </Text>
        {(cvData.personalInfo.linkedin || cvData.personalInfo.github || cvData.personalInfo.portfolio) && (
          <Text style={styles.contactInfo}>
            {[
              cvData.personalInfo.linkedin && `LinkedIn: ${cvData.personalInfo.linkedin}`,
              cvData.personalInfo.github && `GitHub: ${cvData.personalInfo.github}`,
              cvData.personalInfo.portfolio && `Portfolio: ${cvData.personalInfo.portfolio}`,
            ]
              .filter(Boolean)
              .join(' | ')}
          </Text>
        )}
      </View>

      {/* Professional Summary */}
      <View>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summary}>{cvData.summary}</Text>
      </View>

      {/* Work Experience */}
      <View>
        <Text style={styles.sectionTitle}>Work Experience</Text>
        {cvData.experience.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>
                {exp.title} | {exp.company}
              </Text>
              <Text style={styles.jobDate}>
                {exp.startDate} - {exp.endDate}
              </Text>
            </View>
            <Text style={styles.jobLocation}>{exp.location}</Text>
            {exp.responsibilities.map((resp, idx) => (
              <View key={idx} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{resp}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Education */}
      <View>
        <Text style={styles.sectionTitle}>Education</Text>
        {cvData.education.map((edu, index) => (
          <View key={index} style={styles.education}>
            <Text style={styles.educationInstitution}>{edu.institution}</Text>
            <Text style={styles.educationDetails}>
              {edu.degree} | Completed: {edu.completionDate}
            </Text>
          </View>
        ))}
      </View>

      {/* Technical Skills */}
      <View>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        <Text style={styles.skills}>{cvData.skills.join(', ')}</Text>
      </View>
    </Page>
  </Document>
)

// Generate PDF blob
export const generatePDFBlob = async (cvData: CVData): Promise<Blob> => {
  const document = <CVPDFDocument cvData={cvData} />
  const blob = await pdf(document).toBlob()
  return blob
}

// Generate PDF and download
export const downloadPDF = async (cvData: CVData, fileName: string = 'Dylan_Henderson_Resume.pdf') => {
  try {
    const blob = await generatePDFBlob(cvData)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}

// PDF Download Link Component (for UI integration)
export const PDFDownloadButton: React.FC<{
  cvData: CVData
  fileName?: string
  children: React.ReactNode
}> = ({ cvData, fileName = 'Dylan_Henderson_Resume.pdf', children }) => (
  <PDFDownloadLink
    document={<CVPDFDocument cvData={cvData} />}
    fileName={fileName}
    style={{ textDecoration: 'none' }}
  >
    {({ loading }) => (loading ? 'Preparing PDF...' : children)}
  </PDFDownloadLink>
)