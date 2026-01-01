'use client'

import { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import RefreshIcon from '@mui/icons-material/Refresh'
import BugReportIcon from '@mui/icons-material/BugReport'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const theme = useTheme()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        textAlign: 'center',
        padding: theme.spacing(4),
      }}
    >
      <BugReportIcon
        sx={{
          fontSize: { xs: '4rem', sm: '5rem', md: '6rem' },
          color: theme.palette.error.main,
          mb: 3,
          opacity: 0.8,
        }}
      />

      <Typography
        variant="h3"
        sx={{
          mb: 2,
          color: theme.palette.primary.contrastText,
          fontWeight: 600,
        }}
      >
        Oops! Something went wrong
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: theme.palette.text.secondary,
          maxWidth: '500px',
        }}
      >
        We encountered an unexpected error. Don't worry, it's not your fault.
        Try refreshing the page, and if the problem persists, please contact us.
      </Typography>

      {/* Error details in dev mode */}
      {process.env.NODE_ENV === 'development' && (
        <Box
          sx={{
            mb: 4,
            p: 2,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
            border: `1px solid ${theme.palette.error.main}`,
            maxWidth: '600px',
            width: '100%',
          }}
        >
          <Typography
            variant="caption"
            component="pre"
            sx={{
              color: theme.palette.error.main,
              fontFamily: 'Fira Code, monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              textAlign: 'left',
            }}
          >
            {error.message}
            {error.digest && `\nDigest: ${error.digest}`}
          </Typography>
        </Box>
      )}

      <Button
        onClick={reset}
        variant="contained"
        startIcon={<RefreshIcon />}
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px rgba(76, 175, 80, 0.4)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Try Again
      </Button>
    </Box>
  )
}