import { Box, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

import { underLineHeaders } from '../../utils/styles';
import { AboutPage } from '../../utils/types';
import { CV_DATA } from '../../utils/cvTypes';
import theme from '../ThemeRegistry/theme';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

type AboutMeSectionProps = {
  content: AboutPage;
};

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ content }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [typedText, setTypedText] = useState('');
  const fullText = content.aboutContent || CV_DATA.summary;

  useEffect(() => {
    if (isVisible && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, typedText, fullText]);

  return (
    <Box
      ref={ref}
      sx={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.contrastText,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out',
      }}
    >
      <Box
        sx={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={underLineHeaders(theme)}
          gutterBottom
        >
          {content.aboutTitle || 'About Me'}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'monospace',
            color: theme.palette.secondary.light,
            lineHeight: 1.8,
            textAlign: 'center',
            mt: 3,
            minHeight: '100px',
          }}
        >
          {typedText}
          {typedText.length < fullText.length && (
            <Box
              component="span"
              sx={{
                animation: 'blink 1s infinite',
                '@keyframes blink': {
                  '0%, 50%': { opacity: 1 },
                  '51%, 100%': { opacity: 0 },
                }
              }}
            >
              █
            </Box>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutMeSection;
