'use client'

import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material'
import {
  AutoFixHigh,
  Psychology,
  Edit,
  Save,
  Cancel,
  ExpandMore,
  CheckCircle,
  Warning,
} from '@mui/icons-material'
import { CVData } from '@/utils/cvTypes'

interface CVEditorProps {
  cvData: CVData
  onUpdateCV: (updatedCV: CVData) => void
}

interface AISuggestions {
  summary: string
  keywordSuggestions: string[]
  skillsToHighlight: string[]
  experienceUpdates: Array<{
    company: string
    originalBullet: string
    suggestedBullet: string
    reason: string
  }>
  additionalRecommendations: string[]
  optimizedSummary: string
}

export default function CVEditor({ cvData, onUpdateCV }: CVEditorProps) {
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<AISuggestions | null>(null)
  const [editingCV, setEditingCV] = useState<CVData>(cvData)
  const [isEditing, setIsEditing] = useState(false)
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set())

  const handleOptimize = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/cv-optimizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription,
          currentCV: editingCV,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to optimize CV')
      }

      setSuggestions(data.suggestions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const applySuggestion = (type: string, value: any) => {
    const newCV = { ...editingCV }
    const suggestionId = `${type}-${JSON.stringify(value)}`

    switch (type) {
      case 'summary':
        newCV.summary = value
        break
      case 'skill':
        if (!newCV.skills.includes(value)) {
          newCV.skills.unshift(value)
        }
        break
      case 'experience':
        const expIndex = newCV.experience.findIndex(exp => exp.company === value.company)
        if (expIndex !== -1) {
          const bulletIndex = newCV.experience[expIndex].responsibilities.indexOf(value.originalBullet)
          if (bulletIndex !== -1) {
            newCV.experience[expIndex].responsibilities[bulletIndex] = value.suggestedBullet
          }
        }
        break
    }

    setEditingCV(newCV)
    setAppliedSuggestions(prev => new Set(prev).add(suggestionId))
  }

  const saveChanges = () => {
    onUpdateCV(editingCV)
    setIsEditing(false)
  }

  const cancelChanges = () => {
    setEditingCV(cvData)
    setIsEditing(false)
    setAppliedSuggestions(new Set())
  }

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Psychology /> AI-Powered CV Optimization
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Paste Job Description Here"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Copy and paste the job description you're applying for..."
          sx={{ mb: 2 }}
        />

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            onClick={handleOptimize}
            disabled={loading || !jobDescription.trim()}
            startIcon={loading ? <CircularProgress size={20} /> : <AutoFixHigh />}
            sx={{
              background: 'linear-gradient(45deg, #32CD32 30%, #228B22 90%)',
              color: 'white',
            }}
          >
            {loading ? 'Analyzing...' : 'Optimize CV with AI'}
          </Button>

          <FormControlLabel
            control={
              <Switch
                checked={isEditing}
                onChange={(e) => setIsEditing(e.target.checked)}
                color="success"
              />
            }
            label="Edit Mode"
          />

          {isEditing && (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<Save />}
                onClick={saveChanges}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Cancel />}
                onClick={cancelChanges}
              >
                Cancel
              </Button>
            </>
          )}
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>

      {suggestions && (
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            AI Optimization Suggestions
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            {suggestions.summary}
          </Alert>

          <Stack spacing={2}>
            {/* Optimized Summary */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Professional Summary Update</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Current:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {editingCV.summary}
                  </Typography>

                  <Typography variant="body2" color="success.main" gutterBottom>
                    Suggested:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {suggestions.optimizedSummary}
                  </Typography>

                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircle />}
                    onClick={() => applySuggestion('summary', suggestions.optimizedSummary)}
                    disabled={appliedSuggestions.has(`summary-${JSON.stringify(suggestions.optimizedSummary)}`)}
                  >
                    Apply
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Keywords to Add */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Keywords to Add</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {suggestions.keywordSuggestions.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={keyword}
                      color={editingCV.skills.includes(keyword) ? "success" : "default"}
                      onClick={() => applySuggestion('skill', keyword)}
                      disabled={editingCV.skills.includes(keyword)}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>

            {/* Experience Updates */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Experience Improvements ({suggestions.experienceUpdates.length})</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {suggestions.experienceUpdates.map((update, index) => (
                    <ListItem key={index} divider sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle2" gutterBottom>
                        {update.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Original: {update.originalBullet}
                      </Typography>
                      <Typography variant="body2" color="success.main" gutterBottom>
                        Suggested: {update.suggestedBullet}
                      </Typography>
                      <Typography variant="caption" color="info.main" gutterBottom>
                        {update.reason}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        onClick={() => applySuggestion('experience', update)}
                        sx={{ mt: 1 }}
                        disabled={appliedSuggestions.has(`experience-${JSON.stringify(update)}`)}
                      >
                        Apply Change
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            {/* Additional Recommendations */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Additional Recommendations</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {suggestions.additionalRecommendations.map((rec, index) => (
                    <ListItem key={index}>
                      <Warning color="warning" sx={{ mr: 1 }} />
                      <ListItemText primary={rec} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Paper>
      )}
    </Box>
  )
}