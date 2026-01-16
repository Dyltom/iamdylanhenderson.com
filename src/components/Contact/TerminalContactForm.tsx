'use client';
import {
  Alert,
  Box,
  Button,
  Link,
  Snackbar,
  Typography,
  useMediaQuery,
  Paper,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Send, Download, LinkedIn, GitHub, Close } from '@mui/icons-material';
import { STATIC_CONTACT_PAGE } from '../../utils/staticPageContent';
import { useTypingEffect } from '../../hooks/useTypingEffect';

const TerminalContactForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Terminal header text
  const headerText = useTypingEffect('dylan@contact:~$ ./connect.sh', 50);

  useEffect(() => {
    // Start terminal animation
    const timer = setTimeout(() => {
      setTerminalOutput(['Initializing secure connection...', 'Loading contact interface...', '']);
      setTimeout(() => setShowForm(true), 1000);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);


  const addTerminalOutput = (message: string) => {
    setTerminalOutput(prev => [...prev, message]);
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    addTerminalOutput(`$ sendmail --from="${formState.name}" --email="${formState.email}"`);
    addTerminalOutput('Establishing SMTP connection...');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to send email.');
      }

      addTerminalOutput('✓ Message sent successfully!');
      addTerminalOutput('✓ Connection closed');
      setFormState({ name: '', email: '', message: '' });
      setSnackbarSeverity('success');
      setSnackbarMessage('Email sent successfully!');
    } catch (error) {
      let errorMessage = 'Failed to send email. Please try again later.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      addTerminalOutput(`✗ Error: ${errorMessage}`);
      setSnackbarSeverity('error');
      setSnackbarMessage(errorMessage);
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const asciiArt = `
   ____            _             _
  / ___|___  _ __ | |_ __ _  ___| |_
 | |   / _ \\| '_ \\| __/ _\` |/ __| __|
 | |__| (_) | | | | || (_| | (__| |_
  \\____\\___/|_| |_|\\__\\__,_|\\___|\\__|
  `;

  return (
    <Box sx={{ width: '100%', maxWidth: '1000px', mx: 'auto' }}>
      {/* Terminal Header */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: 'rgba(0, 0, 0, 0.9)',
          border: '2px solid',
          borderColor: 'secondary.main',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 3,
        }}
      >
        <Box
          sx={{
            bgcolor: 'rgba(0, 255, 0, 0.1)',
            borderBottom: '1px solid',
            borderColor: 'secondary.main',
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Terminal sx={{ color: 'secondary.main', fontSize: 20 }} />
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'monospace',
              color: 'secondary.main',
            }}
          >
            {headerText}
          </Typography>
        </Box>

        {/* Terminal Output */}
        <Box
          ref={terminalRef}
          sx={{
            p: 2,
            minHeight: '150px',
            maxHeight: '250px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(0, 255, 0, 0.1)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 255, 0, 0.3)',
              borderRadius: '4px',
            },
          }}
        >
          <Typography
            component="pre"
            sx={{
              fontFamily: 'monospace',
              color: 'secondary.main',
              fontSize: '0.75rem',
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            {asciiArt}
          </Typography>
          {terminalOutput.map((line, index) => (
            <Typography
              key={index}
              sx={{
                fontFamily: 'monospace',
                color: line.includes('✓') ? 'success.main' : line.includes('✗') ? 'error.main' : 'secondary.main',
                fontSize: '0.875rem',
                mb: 0.5,
              }}
            >
              {line}
            </Typography>
          ))}
        </Box>
      </Paper>

      {/* Main Content */}
      {showForm && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
            gap: 4,
            animation: 'fadeIn 0.5s ease-in',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {/* Contact Info */}
          <Box>
            <Paper
              elevation={0}
              sx={{
                bgcolor: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid',
                borderColor: 'secondary.main',
                borderRadius: 1,
                p: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'monospace',
                  color: 'secondary.main',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Terminal sx={{ fontSize: 20 }} />
                {STATIC_CONTACT_PAGE.attributes.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'monospace',
                  color: 'primary.contrastText',
                  mb: 3,
                  lineHeight: 1.8,
                }}
              >
                $ echo "Let's connect!"
                <br />
                $ Available via:
                <br />
                {'> '}Email: this form
                <br />
                {'> '}
                <Link
                  href="https://www.linkedin.com/in/dylan-henderson-07/"
                  target="_blank"
                  sx={{
                    color: 'secondary.main',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  LinkedIn
                </Link>
                <br />
                {'> '}
                <Link
                  href="https://github.com/Dyltom"
                  target="_blank"
                  sx={{
                    color: 'secondary.main',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  GitHub
                </Link>
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    color: 'primary.contrastText',
                    fontSize: '0.875rem',
                    mb: 2,
                  }}
                >
                  $ cat ./resume.pdf
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Download />}
                  href={STATIC_CONTACT_PAGE.attributes.resume.data.attributes.url}
                  download
                  fullWidth
                  sx={{
                    fontFamily: 'monospace',
                    textTransform: 'none',
                    borderStyle: 'dashed',
                    '&:hover': {
                      borderStyle: 'solid',
                      bgcolor: 'rgba(0, 255, 0, 0.1)',
                    },
                  }}
                >
                  {STATIC_CONTACT_PAGE.attributes.resumeCtaButtonText}
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* Contact Form */}
          <Paper
            elevation={0}
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid',
              borderColor: 'secondary.main',
              borderRadius: 1,
              p: 3,
            }}
          >
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    color: 'secondary.main',
                    fontSize: '0.875rem',
                    mb: 1,
                  }}
                >
                  $ whoami
                </Typography>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid',
                    borderColor: theme.palette.secondary.main,
                    borderRadius: '4px',
                    color: theme.palette.primary.contrastText,
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.palette.secondary.light;
                    e.target.style.boxShadow = `0 0 0 2px ${theme.palette.secondary.main}33`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = theme.palette.secondary.main;
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    color: 'secondary.main',
                    fontSize: '0.875rem',
                    mb: 1,
                  }}
                >
                  $ echo $EMAIL
                </Typography>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  required
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid',
                    borderColor: theme.palette.secondary.main,
                    borderRadius: '4px',
                    color: theme.palette.primary.contrastText,
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.palette.secondary.light;
                    e.target.style.boxShadow = `0 0 0 2px ${theme.palette.secondary.main}33`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = theme.palette.secondary.main;
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    color: 'secondary.main',
                    fontSize: '0.875rem',
                    mb: 1,
                  }}
                >
                  $ cat {'>'} message.txt
                </Typography>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  required
                  rows={6}
                  placeholder="Type your message here..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid',
                    borderColor: theme.palette.secondary.main,
                    borderRadius: '4px',
                    color: theme.palette.primary.contrastText,
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    resize: 'vertical',
                    minHeight: '120px',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = theme.palette.secondary.light;
                    e.target.style.boxShadow = `0 0 0 2px ${theme.palette.secondary.main}33`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = theme.palette.secondary.main;
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                disabled={loading}
                startIcon={loading ? null : <Send />}
                sx={{
                  fontFamily: 'monospace',
                  textTransform: 'none',
                  fontSize: '1rem',
                  py: 1.5,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                    transition: 'left 0.5s',
                  },
                  '&:hover::before': {
                    left: '100%',
                  },
                }}
              >
                {loading ? '$ Sending...' : '$ ./send_message.sh'}
              </Button>
            </form>
          </Paper>
        </Box>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            color: snackbarSeverity === 'success' ? 'success.main' : 'error.main',
            fontFamily: 'monospace',
            '& .MuiAlert-icon': {
              color: snackbarSeverity === 'success' ? 'success.main' : 'error.main',
            },
          }}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TerminalContactForm;