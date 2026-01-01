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

import { getContactUsPage } from '../../../fetchers/pages';
import { verifyCaptcha } from '../../../utils/ServerActions';
import { convertContentToMarkdown } from '../../../utils/converters';
import { ContactUs } from '../../../utils/types';
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
  const [contactUsContent, setContactUsContent] = useState<
    ContactUs | undefined
  >(undefined);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
      setRenderRecaptcha(true);
    }
    const fetchContactUsPageContent = async () => {
      const fetchedContactUs = await getContactUsPage();
      setContactUsContent(fetchedContactUs);
    };
    fetchContactUsPageContent();
  }, []);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  if (!contactUsContent) {
    return null;
  }

  const handleCaptchaVerification = (token: string | null) => {
    if (!token && process.env.IS_RECAPTCHA_ENABLED) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Captcha not completed. Please try again.');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    verifyCaptcha(token)
      .then(() => {
        setIsVerified(true);
        setOpenSnackbar(false);
      })
      .catch(() => {
        setIsVerified(false);
        setSnackbarSeverity('error');
        setSnackbarMessage('Captcha verification failed. Please try again.');
        setOpenSnackbar(true);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isVerified && process.env.IS_RECAPTCHA_ENABLED) {
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

      if (!response.ok) {
        throw new Error('Failed to send email.');
      }

      const data = await response.json();
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

  const markdownContent = convertContentToMarkdown(
    contactUsContent.attributes.content
  );

  return (
    <Grid container spacing={2}>
      {/* Contact details, replace with your own content */}
      <Grid
        size={{ xs: 12, md: 4 }}
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
          {contactUsContent.attributes.title}
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
            {contactUsContent.attributes.resumeCta}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            href={`${
              process.env.NEXT_PUBLIC_STRAPI_ADMIN_URL +
              contactUsContent.attributes.resume.data.attributes.url
            }`}
            download
            sx={{
              mt: 1,
            }}
          >
            {contactUsContent.attributes.resumeCtaButtonText}
          </Button>
        </Box>
      </Grid>
      {/* Form section */}
      <Grid size={{ xs: 12, md: 8 }}>
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
