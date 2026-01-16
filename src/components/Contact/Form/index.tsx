'use client';
import {
  Alert,
  Box,
  Button,
  Link,
  Snackbar,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Grid';
import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { verifyCaptcha } from '../../../utils/ServerActions';
import Fields from './Fields';
import { STATIC_CONTACT_PAGE } from '../../../utils/staticPageContent';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  );
  const [loading, setLoading] = useState(false);
  const [renderRecaptcha, setRenderRecaptcha] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      setRenderRecaptcha(true);
    }
  }, []);

  const handleCaptchaVerification = async (token: string | null) => {
    if (!token) {
      setIsVerified(false);
      return;
    }

    try {
      const result = await verifyCaptcha(token);
      if (result === 'success!') {
        setIsVerified(true);
      } else {
        setIsVerified(false);
        setSnackbarSeverity('error');
        setSnackbarMessage('Captcha verification failed. Please try again.');
        setOpenSnackbar(true);
      }
    } catch (error) {
      setIsVerified(false);
      setSnackbarSeverity('error');
      setSnackbarMessage('Captcha verification failed. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Skip captcha check if not configured
    if (renderRecaptcha && !isVerified) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Please complete the captcha verification.');
      setOpenSnackbar(true);
      return;
    }
    setLoading(true);
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
      setFormState({ name: '', email: '', message: '' });

      setSnackbarSeverity('success');
      setSnackbarMessage('Email sent successfully!');
    } catch (error) {
      let errorMessage = 'Failed to send email. Please try again later.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
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

  return (
    <Grid2 container spacing={4}>
      {/* Contact details */}
      <Grid2
        size={{ xs: 12, md: 4 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          color: 'primary.contrastText',
          p: 3,
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'secondary.main',
          fontFamily: 'monospace',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: 'secondary.main',
            fontFamily: 'monospace',
            mb: 3,
            '&::before': {
              content: '"# "',
              opacity: 0.7,
            }
          }}
        >
          Get in Touch
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'primary.contrastText',
            fontFamily: 'monospace',
            mb: 2,
          }}
        >
          Feel free to reach out to me here, on{' '}
          <Link
            href="https://www.linkedin.com/in/dylan-henderson-07/"
            target="_blank"
            color="secondary"
          >
            LinkedIn
          </Link>{' '}
          or check out my projects on{' '}
          <Link
            href="https://github.com/Dyltom"
            target="_blank"
            color="secondary"
          >
            GitHub
          </Link>
          .
        </Typography>

        <Box mt={4}>
          <Typography
            sx={{
              color: 'primary.contrastText',
              fontFamily: 'monospace',
              mb: 2,
              '&::before': {
                content: '"$ "',
                color: 'secondary.main',
                mr: 1,
              }
            }}
          >
            {STATIC_CONTACT_PAGE.attributes.resumeCta}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href={STATIC_CONTACT_PAGE.attributes.resume.data.attributes.url}
            download
            sx={{
              mt: 1,
              fontFamily: 'monospace',
              textTransform: 'lowercase',
              '&:hover': {
                backgroundColor: 'secondary.dark',
                '&::before': {
                  content: '">"',
                  mr: 1,
                }
              }
            }}
          >
            {STATIC_CONTACT_PAGE.attributes.resumeCtaButtonText}
          </Button>
        </Box>
      </Grid2>
      {/* Form section */}
      <Grid2 size={{ xs: 12, md: 8 }}>
        <Box
          sx={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'secondary.main',
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'secondary.main',
              fontFamily: 'monospace',
              mb: 3,
              '&::before': {
                content: '"// "',
                opacity: 0.7,
              }
            }}
          >
            Send a message
          </Typography>
        <form onSubmit={handleSubmit}>
          <Fields formState={formState} setFormState={setFormState} />
          {renderRecaptcha && (
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              ref={recaptchaRef}
              onChange={handleCaptchaVerification}
              size="normal"
              className="my-recaptcha"
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            disabled={loading || (renderRecaptcha && !isVerified)}
            sx={{
              mt: 2,
              fontFamily: 'monospace',
              fontSize: '1.1rem',
              py: 1.5,
              textTransform: 'lowercase',
              '&::before': {
                content: loading ? '"⟳ "' : '"$ "',
                mr: 1,
              },
              '&:hover': {
                backgroundColor: 'secondary.dark',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 8px rgba(0, 255, 0, 0.3)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            {loading ? 'sending...' : 'send message'}
          </Button>
        </form>
        </Box>
      </Grid2>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid2>
  );
};

export default ContactForm;
