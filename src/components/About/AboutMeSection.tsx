import { Box, Typography, useMediaQuery } from '@mui/material';

import { underLineHeaders } from '../../utils/styles';
import { AboutPage } from '../../utils/types';
import { CV_DATA } from '../../utils/cvTypes';
import theme from '../ThemeRegistry/theme';

type AboutMeSectionProps = {
  content: AboutPage;
};

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ content }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.contrastText,
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
            mt: 3
          }}
        >
          {content.aboutContent || CV_DATA.summary}
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutMeSection;
