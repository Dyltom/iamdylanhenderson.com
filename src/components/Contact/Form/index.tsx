'use client';
import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  Snackbar,
  Typography,
} from '@mui/material';
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
    <Grid container spacing={2}>
      {/* Contact details, replace with your own content */}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          color: 'primary.contrastText',
          p: 2, // Added padding
        }}
      >
        <Typography variant="h6" color="primary.contrastText" gutterBottom>
          {STATIC_CONTACT_PAGE.attributes.title}
        </Typography>
        <Typography variant="body1" color="primary.contrastText" gutterBottom>
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

        <Box mt={2}>
          <Typography color="primary.contrastText">
            {STATIC_CONTACT_PAGE.attributes.resumeCta}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href={STATIC_CONTACT_PAGE.attributes.resume.data.attributes.url}
            download
            sx={{
              mt: 1,
            }}
          >
            {STATIC_CONTACT_PAGE.attributes.resumeCtaButtonText}
          </Button>
        </Box>
      </Grid>
      {/* Form section */}
      <Grid item xs={12} md={8}>
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
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </Grid>
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
    </Grid>
  );
};

export default ContactForm;
