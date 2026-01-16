'use client';
import {
  Alert,
  Box,
  Button,
  Link,
  Snackbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { CV_DATA } from '../../../utils/cvTypes';
import { verifyCaptcha } from '../../../utils/ServerActions';
import Fields from './Fields';

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

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      setRenderRecaptcha(true);
    }
  }, []);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCaptchaSubmission = async (token: string | null) => {
    if (!token) {
      setIsVerified(false);
      return;
    }
    const result = await verifyCaptcha(token);
    if (result === 'success!') {
      setIsVerified(true);
    } else {
      setIsVerified(false);
      showSnackbar('Captcha verification failed', 'error');
    }
  };

  const hasValidCaptcha = () => {
    return !renderRecaptcha || (renderRecaptcha && isVerified);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasValidCaptcha()) {
      showSnackbar('Please complete the captcha', 'error');
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

      if (response.ok) {
        showSnackbar('Email sent successfully!', 'success');
        setFormState({ name: '', email: '', message: '' });
        setIsVerified(false);
        recaptchaRef.current?.reset();
      } else {
        showSnackbar(data.message || 'Failed to send email', 'error');
      }
    } catch (error) {
      showSnackbar('An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Me
      </Typography>

      <Typography variant="body1" align="center" paragraph>
        I'm always interested in new opportunities and collaborations.
        Feel free to reach out to discuss projects or just to connect!
      </Typography>

      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Link
          href={CV_DATA.personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mx: 2 }}
        >
          LinkedIn
        </Link>
        <Link
          href={CV_DATA.personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mx: 2 }}
        >
          GitHub
        </Link>
        <Link
          href={`mailto:${CV_DATA.personalInfo.email}`}
          sx={{ mx: 2 }}
        >
          Email
        </Link>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box>
          <Fields formState={formState} setFormState={setFormState} />

          {renderRecaptcha && (
            <Box sx={{ mb: 2 }}>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                ref={recaptchaRef}
                onChange={handleCaptchaSubmission}
              />
            </Box>
          )}

          <Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || !hasValidCaptcha()}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </Box>
        </Box>
      </form>

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
    </Box>
  );
};

export default ContactForm;