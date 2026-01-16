import { Box, Typography, useMediaQuery } from '@mui/material';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { getHeroContent } from '../../fetchers/pages';
import { convertContentToMarkdown } from '../../utils/converters';
import { HeroContent } from '../../utils/types';
import theme from '../ThemeRegistry/theme';
import GlitchText from '../GlitchText';

const HeroSection: React.FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [heroContent, setHeroContent] = useState<HeroContent | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchArticles = async () => {
      const content = await getHeroContent();

      setHeroContent(content);
    };
    fetchArticles();
  }, []);

  if (!heroContent) {
    return null;
  }

  const markdownContent = convertContentToMarkdown(heroContent.content);

  return (
    <Box
      sx={{
        marginTop: isMobile ? 2 : 4,
        color: 'primary.contrastText',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Hello, my name is
      </Typography>
      <GlitchText
        text="Dylan Henderson"
        variant="h3"
        align="center"
        color="secondary"
        gutterBottom
        glitchIntensity="medium"
        glitchOnHover
      />
      <ReactMarkdown children={markdownContent} />
    </Box>
  );
};

export default HeroSection;
