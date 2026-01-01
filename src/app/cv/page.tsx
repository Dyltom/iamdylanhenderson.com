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
import PersonIcon from '@mui/icons-material/Person'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import CodeIcon from '@mui/icons-material/Code'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import LanguageIcon from '@mui/icons-material/Language'
import { generateATSFriendlyDOCX, generateATSFilename } from '../../utils/docxSimpleGenerator'
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
  const [pdfLoading, setPdfLoading] = useState(false)

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

  const handlePDFDownload = async () => {
    try {
      setPdfLoading(true)
      const filename = generateATSFilename('Dylan Henderson', jobTitle).replace('.docx', '.pdf')

      // Dynamically import PDF generator to avoid SSR issues
      const { downloadPDF } = await import('../../utils/pdfGenerator')
      await downloadPDF(CV_DATA, filename)

      setDownloadMessage(`Downloaded: ${filename}`)
      setTimeout(() => setDownloadMessage(''), 3000)
    } catch (error) {
      console.error('Error generating PDF:', error)
      setDownloadMessage('Error generating PDF. Please try again.')
    } finally {
      setPdfLoading(false)
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
        <Paper sx={{
          p: 6,
          mb: 4,
          background: `linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)`,
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid #32CD32',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '300px',
            height: '300px',
            background: '#32CD32',
            opacity: 0.1,
            borderRadius: '50%',
          }
        }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: `linear-gradient(45deg, #ffffff 30%, #32CD32 90%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              {CV_DATA.personalInfo.name}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: '#32CD32',
                fontWeight: 300,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Senior Software Engineer
            </Typography>

            {/* Contact Info with Icons */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ color: '#32CD32', fontSize: 20 }} />
                  <Typography variant="body1" sx={{ color: '#ffffff' }}>{CV_DATA.personalInfo.phone}</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ color: '#32CD32', fontSize: 20 }} />
                  <Typography variant="body1" sx={{ color: '#ffffff' }}>{CV_DATA.personalInfo.email}</Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ color: '#32CD32', fontSize: 20 }} />
                  <Typography variant="body1" sx={{ color: '#ffffff' }}>{CV_DATA.personalInfo.location}</Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Social Links */}
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {CV_DATA.personalInfo.portfolio && (
                <Chip
                  icon={<LanguageIcon />}
                  label="Portfolio"
                  component="a"
                  href={CV_DATA.personalInfo.portfolio}
                  target="_blank"
                  clickable
                  sx={{
                    backgroundColor: 'transparent',
                    border: `1px solid #32CD32`,
                    color: '#32CD32',
                    '&:hover': {
                      backgroundColor: '#32CD32',
                      color: '#000000',
                    }
                  }}
                />
              )}
              {CV_DATA.personalInfo.linkedin && (
                <Chip
                  icon={<LinkedInIcon />}
                  label="LinkedIn"
                  component="a"
                  href={CV_DATA.personalInfo.linkedin}
                  target="_blank"
                  clickable
                  sx={{
                    backgroundColor: 'transparent',
                    border: `1px solid #32CD32`,
                    color: '#32CD32',
                    '&:hover': {
                      backgroundColor: '#32CD32',
                      color: '#000000',
                    }
                  }}
                />
              )}
              {CV_DATA.personalInfo.github && (
                <Chip
                  icon={<GitHubIcon />}
                  label="GitHub"
                  component="a"
                  href={CV_DATA.personalInfo.github}
                  target="_blank"
                  clickable
                  sx={{
                    backgroundColor: 'transparent',
                    border: `1px solid #32CD32`,
                    color: '#32CD32',
                    '&:hover': {
                      backgroundColor: '#32CD32',
                      color: '#000000',
                    }
                  }}
                />
              )}
            </Stack>
          </Box>
        </Paper>

        {/* Download Controls */}
        <Paper sx={{
          p: 3,
          mb: 4,
          backgroundColor: '#1a1a1a',
          border: `1px solid #32CD32`,
        }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <TextField
              label="Job Title (optional)"
              variant="outlined"
              size="small"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              helperText="For filename optimization"
              sx={{
                minWidth: 250,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#32CD32',
                  },
                  '&:hover fieldset': {
                    borderColor: '#32CD32',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#32CD32',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#ffffff',
                  '&.Mui-focused': {
                    color: '#32CD32',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#ffffff',
                },
                '& .MuiFormHelperText-root': {
                  color: '#aaaaaa',
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<DescriptionIcon />}
              onClick={handleDOCXDownload}
              sx={{
                height: 40,
                backgroundColor: '#32CD32',
                color: '#000000',
                '&:hover': {
                  backgroundColor: '#28a428',
                },
              }}
            >
              Download ATS-Optimized DOCX
            </Button>
            <Button
              variant="outlined"
              startIcon={<PictureAsPdfIcon />}
              onClick={handlePDFDownload}
              disabled={pdfLoading}
              sx={{
                height: 40,
                borderColor: '#32CD32',
                color: '#32CD32',
                '&:hover': {
                  borderColor: '#32CD32',
                  backgroundColor: 'rgba(50, 205, 50, 0.1)',
                },
              }}
            >
              {pdfLoading ? 'Generating PDF...' : 'Download PDF'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={() => window.print()}
              sx={{
                height: 40,
                borderColor: '#32CD32',
                color: '#32CD32',
                '&:hover': {
                  borderColor: '#32CD32',
                  backgroundColor: 'rgba(50, 205, 50, 0.1)',
                },
              }}
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
        <Paper sx={{ p: 4, mb: 4, backgroundColor: '#1a1a1a', border: '1px solid #32CD32' }} className="no-print">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ flexGrow: 1, color: '#ffffff' }}>
              ATS Keyword Optimizer
            </Typography>
            <IconButton
              onClick={() => setShowOptimizer(!showOptimizer)}
              sx={{
                transform: showOptimizer ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
                color: '#32CD32'
              }}
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
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#32CD32',
                    },
                    '&:hover fieldset': {
                      borderColor: '#32CD32',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#32CD32',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#ffffff',
                    '&.Mui-focused': {
                      color: '#32CD32',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#ffffff',
                  },
                }}
              />
              <Button
                variant="contained"
                startIcon={<AnalyticsIcon />}
                onClick={handleKeywordAnalysis}
                disabled={!jobDescription.trim()}
                sx={{
                  mb: 3,
                  backgroundColor: '#32CD32',
                  color: '#000000',
                  '&:hover': {
                    backgroundColor: '#28a428',
                  },
                }}
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
                    <Grid size={{ xs: 12, md: 6 }}>
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
                    <Grid size={{ xs: 12, md: 6 }}>
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
                      <Grid size={12}>
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
        <Paper sx={{
          p: 4,
          mb: 4,
          backgroundColor: '#1a1a1a',
          position: 'relative',
          borderLeft: `4px solid #32CD32`,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateX(4px)',
          }
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <PersonIcon sx={{ color: '#32CD32', fontSize: 32 }} />
              <Typography
                variant="h4"
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    height: '3px',
                    bottom: '-8px',
                    left: '0',
                    width: '60px',
                    background: '#32CD32',
                  }
                }}
              >
                Professional Summary
              </Typography>
            </Box>
            <Tooltip title={copiedSection === 'summary' ? 'Copied!' : 'Copy section'}>
              <IconButton
                size="small"
                onClick={() => handleCopySection('summary', CV_DATA.summary)}
                sx={{ color: '#32CD32' }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#cccccc' }}>
            {CV_DATA.summary}
          </Typography>
        </Paper>

        {/* Work Experience */}
        <Paper sx={{
          p: 4,
          mb: 4,
          backgroundColor: '#1a1a1a',
          borderLeft: `4px solid #32CD32`,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateX(4px)',
          }
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <WorkIcon sx={{ color: '#32CD32', fontSize: 32 }} />
              <Typography
                variant="h4"
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    height: '3px',
                    bottom: '-8px',
                    left: '0',
                    width: '60px',
                    background: '#32CD32',
                  }
                }}
              >
                Work Experience
              </Typography>
            </Box>
            <Tooltip title={copiedSection === 'experience' ? 'Copied!' : 'Copy section'}>
              <IconButton
                size="small"
                onClick={() => handleCopySection('experience', formatExperienceText())}
                sx={{ color: '#32CD32' }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
          {CV_DATA.experience.map((exp, index) => (
            <Box
              key={index}
              sx={{
                mb: index < CV_DATA.experience.length - 1 ? 4 : 0,
                pl: 3,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 8,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: theme.palette.secondary.main,
                },
                '&::after': index < CV_DATA.experience.length - 1 ? {
                  content: '""',
                  position: 'absolute',
                  left: 3.5,
                  top: 16,
                  width: 1,
                  height: 'calc(100% + 16px)',
                  backgroundColor: theme.palette.divider,
                } : {}
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                    {exp.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#32CD32' }}>
                    {exp.company}
                  </Typography>
                </Box>
                <Chip
                  label={`${exp.startDate} - ${exp.endDate}`}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(50, 205, 50, 0.2)',
                    color: '#32CD32',
                    fontWeight: 300,
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ mb: 2, color: '#aaaaaa', fontStyle: 'italic' }}>
                {exp.location}
              </Typography>
              <Box component="ul" sx={{ pl: 2, mt: 0, '& li': { mb: 1 } }}>
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx}>
                    <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#cccccc' }}>
                      {resp}
                    </Typography>
                  </li>
                ))}
              </Box>
            </Box>
          ))}
        </Paper>

        {/* Education */}
        <Paper sx={{
          p: 4,
          mb: 4,
          backgroundColor: '#1a1a1a',
          borderLeft: `4px solid #32CD32`,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateX(4px)',
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <SchoolIcon sx={{ color: '#32CD32', fontSize: 32 }} />
            <Typography
              variant="h4"
              sx={{
                color: '#ffffff',
                fontWeight: 600,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  height: '3px',
                  bottom: '-8px',
                  left: '0',
                  width: '60px',
                  background: '#32CD32',
                }
              }}
            >
              Education
            </Typography>
          </Box>
          {CV_DATA.education.map((edu, index) => (
            <Box key={index}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                {edu.institution}
              </Typography>
              <Typography variant="body1" sx={{ color: '#cccccc' }}>
                {edu.degree} | Completed: {edu.completionDate}
              </Typography>
            </Box>
          ))}
        </Paper>

        {/* Technical Skills */}
        <Paper sx={{
          p: 4,
          backgroundColor: '#1a1a1a',
          borderLeft: `4px solid #32CD32`,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateX(4px)',
          }
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CodeIcon sx={{ color: '#32CD32', fontSize: 32 }} />
              <Typography
                variant="h4"
                sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    height: '3px',
                    bottom: '-8px',
                    left: '0',
                    width: '60px',
                    background: '#32CD32',
                  }
                }}
              >
                Technical Skills
              </Typography>
            </Box>
            <Tooltip title={copiedSection === 'skills' ? 'Copied!' : 'Copy section'}>
              <IconButton
                size="small"
                onClick={() => handleCopySection('skills', CV_DATA.skills.join(', '))}
                sx={{ color: '#32CD32' }}
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
                  backgroundColor: 'transparent',
                  border: '1px solid #32CD32',
                  color: '#32CD32',
                  '&:hover': {
                    backgroundColor: 'rgba(50, 205, 50, 0.2)',
                  },
                }}
              />
            ))}
          </Stack>
        </Paper>

        {/* ATS Tips */}
        <Alert severity="info" sx={{
          mt: 4,
          backgroundColor: '#1a1a1a',
          border: '1px solid #32CD32',
          '& .MuiAlert-icon': {
            color: '#32CD32',
          },
        }}>
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