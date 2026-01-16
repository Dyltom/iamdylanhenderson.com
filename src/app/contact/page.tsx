'use client';
import { Container, Box, Typography } from '@mui/material';
import ContactForm from '../../components/Contact/Form';
import { useTheme } from '@mui/material/styles';

const ContactPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8, minHeight: '80vh' }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 6,
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '3rem' },
            color: theme.palette.primary.main,
            fontFamily: 'monospace',
            '&::before': {
              content: '"$ "',
              color: theme.palette.secondary.main,
              mr: 1,
            },
          }}
        >
          Let's Connect
        </Typography>
        <ContactForm />
      </Box>
    </Container>
  );
};

export default ContactPage;
