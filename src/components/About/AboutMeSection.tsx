import { Box, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';

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
  const fullText = content.aboutContent || CV_DATA.summary;

  return (
    <Box
      ref={ref}
      sx={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.contrastText,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease-out',
      }}
    >
      <Box
        sx={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            ...underLineHeaders(theme),
            mb: 4,
            fontWeight: 600,
            color: theme.palette.primary.main,
            '&::before': {
              content: '"$ "',
              color: theme.palette.secondary.main,
              opacity: 0.8,
            }
          }}
          gutterBottom
        >
          {content.aboutTitle || 'About Me'}
        </Typography>
        <Box
          sx={{
            maxWidth: '700px',
            margin: '0 auto',
            p: 3,
            background: 'rgba(0, 255, 0, 0.03)',
            border: '1px solid',
            borderColor: theme.palette.secondary.main,
            borderRadius: 2,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '4px',
              height: '100%',
              backgroundColor: theme.palette.secondary.main,
            }
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'monospace',
              color: theme.palette.primary.contrastText,
              lineHeight: 1.8,
              fontSize: '1.1rem',
              '& strong': {
                color: theme.palette.secondary.main,
              }
            }}
          >
            {fullText}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutMeSection;
