'use client';
import { Container, Box } from '@mui/material';
import TerminalContactForm from '../../components/Contact/TerminalContactForm';

const ContactPage: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 50, 0, 0.3) 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(0, 255, 0, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(0, 255, 0, 0.05) 0%, transparent 50%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '90vh',
          py: 4,
        }}
      >
        <TerminalContactForm />
      </Container>
    </Box>
  );
};

export default ContactPage;
