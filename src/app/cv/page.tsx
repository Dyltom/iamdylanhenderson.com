'use client'

import React, { useState } from 'react'
import Script from 'next/script'
import './print.css'
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
  Chip,
  Stack,
  TextField,
  Alert,
  IconButton,
  Tooltip,
  Collapse,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Grid,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import DownloadIcon from '@mui/icons-material/Download'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import DescriptionIcon from '@mui/icons-material/Description'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import AnalyticsIcon from '@mui/icons-material/Analytics'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PrintIcon from '@mui/icons-material/Print'
import { generateATSFriendlyDOCX, generateATSFilename } from '../../utils/docxGenerator'
import { CV_DATA } from '../../utils/cvTypes'
import { maxContentWidth, pageMargin } from '../../utils/styles'
import { generateCVSchema, generateResumeSchema } from '../../utils/cvSchema'
import { analyzeCVAgainstJob, formatCVForAnalysis } from '../../utils/keywordOptimizer'

export default function CVPage() {
  const theme = useTheme()
  const [jobTitle, setJobTitle] = useState('')
  const [downloadMessage, setDownloadMessage] = useState('')
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const [jobDescription, setJobDescription] = useState('')
  const [keywordAnalysis, setKeywordAnalysis] = useState<any>(null)
  const [showOptimizer, setShowOptimizer] = useState(false)

  const handleDOCXDownload = async () => {
    try {
      const filename = generateATSFilename('Dylan Henderson', jobTitle)
      await generateATSFriendlyDOCX(CV_DATA, filename)
      setDownloadMessage(`Downloaded: ${filename}`)
      setTimeout(() => setDownloadMessage(''), 3000)
    } catch (error) {
      console.error('Error generating DOCX:', error)
      setDownloadMessage('Error generating document. Please try again.')
    }
  }

  const handleCopySection = (section: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const formatExperienceText = () => {
    return CV_DATA.experience.map(exp =>
      `${exp.title} | ${exp.company} | ${exp.location}\n${exp.startDate} - ${exp.endDate}\n${exp.responsibilities.map(r => `• ${r}`).join('\n')}`
    ).join('\n\n')
  }

  const handleKeywordAnalysis = () => {
    if (!jobDescription.trim()) {
      setKeywordAnalysis({ error: 'Please enter a job description' })
      return
    }
    const cvText = formatCVForAnalysis(CV_DATA)
    const analysis = analyzeCVAgainstJob(cvText, jobDescription)
    setKeywordAnalysis(analysis)
  }

  return (
    <>
      {/* Schema.org structured data for SEO */}
      <Script
        id="cv-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateCVSchema(CV_DATA))
        }}
      />
      <Script
        id="resume-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateResumeSchema(CV_DATA))
        }}
      />

      <Container maxWidth={false} sx={{ ...pageMargin, ...maxContentWidth }}>
        <Box sx={{ py: 4 }}>
        {/* Header */}
        <Paper sx={{ p: 4, mb: 4, backgroundColor: theme.palette.primary.dark }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
            {CV_DATA.personalInfo.name}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: theme.palette.secondary.main }}>
            Senior Software Engineer
          </Typography>

          {/* Contact Info */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1">
              {CV_DATA.personalInfo.phone} | {CV_DATA.personalInfo.email} | {CV_DATA.personalInfo.location}
            </Typography>
            {CV_DATA.personalInfo.portfolio && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Portfolio: <a href={CV_DATA.personalInfo.portfolio} style={{ color: theme.palette.secondary.main }}>
                  {CV_DATA.personalInfo.portfolio}
                </a>
              </Typography>
            )}
          </Box>

          {/* Download Controls */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <TextField
              label="Job Title (optional)"
              variant="outlined"
              size="small"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              helperText="For filename optimization"
              sx={{ minWidth: 250 }}
            />
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DescriptionIcon />}
              onClick={handleDOCXDownload}
              sx={{ height: 40 }}
            >
              Download ATS-Optimized DOCX
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<PictureAsPdfIcon />}
              disabled
              sx={{ height: 40 }}
            >
              PDF (Coming Soon)
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<PrintIcon />}
              onClick={() => window.print()}
              sx={{ height: 40 }}
            >
              Print
            </Button>
          </Box>
          {downloadMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {downloadMessage}
            </Alert>
          )}
        </Paper>

        {/* Keyword Optimizer */}
        <Paper sx={{ p: 4, mb: 4 }} className="no-print">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              ATS Keyword Optimizer
            </Typography>
            <IconButton
              onClick={() => setShowOptimizer(!showOptimizer)}
              sx={{ transform: showOptimizer ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>

          <Collapse in={showOptimizer}>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                label="Paste Job Description"
                placeholder="Paste the full job description here to analyze keyword matches..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AnalyticsIcon />}
                onClick={handleKeywordAnalysis}
                disabled={!jobDescription.trim()}
                sx={{ mb: 3 }}
              >
                Analyze Keywords
              </Button>

              {keywordAnalysis && !keywordAnalysis.error && (
                <Box>
                  {/* ATS Score */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      ATS Match Score: {keywordAnalysis.score}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={keywordAnalysis.score}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: theme.palette.grey[800],
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: keywordAnalysis.score >= 80
                            ? theme.palette.success.main
                            : keywordAnalysis.score >= 60
                            ? theme.palette.warning.main
                            : theme.palette.error.main,
                        },
                      }}
                    />
                  </Box>

                  <Grid container spacing={3}>
                    {/* Present Keywords */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" sx={{ mb: 1, color: theme.palette.success.main }}>
                        ✓ Matching Keywords ({keywordAnalysis.presentKeywords.length})
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {keywordAnalysis.presentKeywords.map((keyword: string, index: number) => (
                          <Chip
                            key={index}
                            label={keyword}
                            size="small"
                            sx={{
                              mb: 1,
                              backgroundColor: theme.palette.success.dark,
                            }}
                          />
                        ))}
                      </Stack>
                    </Grid>

                    {/* Missing Keywords */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" sx={{ mb: 1, color: theme.palette.warning.main }}>
                        ⚠ Missing Keywords ({keywordAnalysis.missingKeywords.length})
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {keywordAnalysis.missingKeywords.map((keyword: string, index: number) => (
                          <Chip
                            key={index}
                            label={keyword}
                            size="small"
                            sx={{
                              mb: 1,
                              backgroundColor: theme.palette.warning.dark,
                            }}
                          />
                        ))}
                      </Stack>
                    </Grid>

                    {/* Suggestions */}
                    {keywordAnalysis.suggestions.length > 0 && (
                      <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          💡 Optimization Suggestions
                        </Typography>
                        <List dense>
                          {keywordAnalysis.suggestions.map((suggestion: string, index: number) => (
                            <ListItem key={index} sx={{ pl: 0 }}>
                              <ListItemText
                                primary={`• ${suggestion}`}
                                primaryTypographyProps={{ variant: 'body2' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              )}

              {keywordAnalysis?.error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {keywordAnalysis.error}
                </Alert>
              )}
            </Box>
          </Collapse>
        </Paper>

        {/* Professional Summary */}
        <Paper sx={{ p: 4, mb: 4, position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h4" sx={{ color: theme.palette.secondary.main }}>
              Professional Summary
            </Typography>
            <Tooltip title={copiedSection === 'summary' ? 'Copied!' : 'Copy section'}>
              <IconButton
                size="small"
                onClick={() => handleCopySection('summary', CV_DATA.summary)}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            {CV_DATA.summary}
          </Typography>
        </Paper>

        {/* Work Experience */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ color: theme.palette.secondary.main }}>
              Work Experience
            </Typography>
            <Tooltip title={copiedSection === 'experience' ? 'Copied!' : 'Copy section'}>
              <IconButton
                size="small"
                onClick={() => handleCopySection('experience', formatExperienceText())}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
          {CV_DATA.experience.map((exp, index) => (
            <Box key={index} sx={{ mb: index < CV_DATA.experience.length - 1 ? 4 : 0 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {exp.title} | {exp.company}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  {exp.startDate} - {exp.endDate}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                {exp.location}
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx}>
                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                      {resp}
                    </Typography>
                  </li>
                ))}
              </Box>
            </Box>
          ))}
        </Paper>

        {/* Education */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" sx={{ color: theme.palette.secondary.main, mb: 3 }}>
            Education
          </Typography>
          {CV_DATA.education.map((edu, index) => (
            <Box key={index}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {edu.institution}
              </Typography>
              <Typography variant="body1">
                {edu.degree} | Completed: {edu.completionDate}
              </Typography>
            </Box>
          ))}
        </Paper>

        {/* Technical Skills */}
        <Paper sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ color: theme.palette.secondary.main }}>
              Technical Skills
            </Typography>
            <Tooltip title={copiedSection === 'skills' ? 'Copied!' : 'Copy section'}>
              <IconButton
                size="small"
                onClick={() => handleCopySection('skills', CV_DATA.skills.join(', '))}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {CV_DATA.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                sx={{
                  mb: 1,
                  backgroundColor: theme.palette.primary.light,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.dark,
                  },
                }}
              />
            ))}
          </Stack>
        </Paper>

        {/* ATS Tips */}
        <Alert severity="info" sx={{ mt: 4 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ATS Optimization Tips:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Use the DOCX format for maximum ATS compatibility (95% success rate)</li>
            <li>Customize the job title field to match the position you're applying for</li>
            <li>Copy sections to tailor your application for specific job descriptions</li>
            <li>The downloaded DOCX uses ATS-friendly formatting: single column, no graphics, standard fonts</li>
          </ul>
        </Alert>
      </Box>
    </Container>
    </>
  )
}