import { Box } from '@mui/material';
import { Metadata } from 'next';
import React from 'react';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';
import BackgroundEffects from '../components/BackgroundEffects';
import ThemeRegistry from '../components/ThemeRegistry/ThemeRegistry';
import { createMetadata } from '../config/metadata';
import GoogleAnalytics from '../components/Analytics/GoogleAnalytics';

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry>
      <html lang="en">
        <body suppressHydrationWarning>
          {process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <BackgroundEffects />
            <NavigationBar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                margin: 'auto',
                maxWidth: {
                  xs: '90vw', // For small screens (mobile)
                  sm: '80vw', // For medium screens (tablets)
                  md: '70vw', // For larger screens (desktops)
                },
              }}
            >
              {children}
            </Box>
            <Footer />
          </Box>
        </body>
      </html>
    </ThemeRegistry>
  );
}
