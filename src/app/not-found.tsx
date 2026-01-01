'use client'

import { Box, Button, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Link from 'next/link'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'

export default function NotFound() {
  const theme = useTheme()

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
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '6rem', sm: '8rem', md: '10rem' },
          fontWeight: 700,
          color: theme.palette.secondary.main,
          textShadow: '0 0 20px rgba(76, 175, 80, 0.3)',
          mb: 2,
        }}
      >
        404
      </Typography>

      <Typography
        variant="h4"
        sx={{
          mb: 2,
          color: theme.palette.primary.contrastText,
          fontWeight: 500,
        }}
      >
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 4,
          color: theme.palette.text.secondary,
          maxWidth: '500px',
        }}
      >
        Looks like you've ventured into uncharted territory. The page you're looking for doesn't exist or has been moved.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          component={Link}
          href="/"
          variant="contained"
          startIcon={<HomeIcon />}
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
          Go Home
        </Button>

        <Button
          component={Link}
          href="/blog"
          variant="outlined"
          startIcon={<SearchIcon />}
          sx={{
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
            '&:hover': {
              borderColor: theme.palette.secondary.light,
              backgroundColor: 'rgba(76, 175, 80, 0.08)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Browse Blog
        </Button>
      </Box>

      {/* ASCII art terminal style */}
      <Box
        component="pre"
        sx={{
          mt: 6,
          fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
          color: theme.palette.secondary.main,
          fontFamily: 'Fira Code, monospace',
          opacity: 0.7,
          display: { xs: 'none', sm: 'block' },
        }}
      >
{`
 _  _    ___  _  _
| || |  / _ \\| || |
| || |_| | | | || |_
|__   _| | | |__   _|
   | | | |_| |  | |
   |_|  \\___/   |_|
`}
      </Box>
    </Box>
  )
}