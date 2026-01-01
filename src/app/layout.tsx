import { Box } from '@mui/material';
import React from 'react';
import Footer from '../components/Footer';
import NavigationBar from '../components/NavigationBar';
import ParticleBackground from '../components/Particles';
import ThemeRegistry from '../components/ThemeRegistry/ThemeRegistry';

export const metadata = {
  title: 'Dylan Henderson',
  description:
    'Dylan Henderson is a software engineer based in Melbourne, VIC.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry>
      <html lang="en">
        <body>
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <ParticleBackground />
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
