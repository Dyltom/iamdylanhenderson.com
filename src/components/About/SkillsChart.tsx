import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { underLineHeaders } from '../../utils/styles';

type SkillsDisplayProps = {
  title: string;
  keyText: string;
};

const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ title, keyText }) => {
  const theme = useTheme();
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const techStack = `$ npm ls --depth=0
├── @types/react@18.2.0
├── typescript@5.3.3
├── react@18.2.0
├── next@14.2.0
├── @mui/material@5.15.0
├── nodejs@20.11.0
├── express@4.19.0
├── postgresql@16.1
├── mysql@8.0.35
├── php@8.3.0
├── laravel@11.0.0
├── wordpress@6.4.2
├── docker@24.0.7
├── kubernetes@1.29.0
├── aws-cli@2.15.0
├── git@2.43.0
├── vim@9.0.0
├── linux@ubuntu-22.04
└── bash@5.2.0`;

  return (
    <Box sx={{ color: theme.palette.primary.contrastText, padding: '1rem' }}>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={underLineHeaders(theme)}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        sx={{
          fontFamily: 'monospace',
          textAlign: 'center',
          marginTop: '1rem',
          marginBottom: '2rem',
          color: theme.palette.secondary.light
        }}
      >
        {keyText}
      </Typography>

      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.light}`,
          borderRadius: '4px',
          padding: theme.spacing(3),
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '28px',
            backgroundColor: theme.palette.primary.dark,
            borderBottom: `1px solid ${theme.palette.primary.light}`,
          }
        }}
      >
        {/* Terminal header bar */}
        <Box
          sx={{
            position: 'absolute',
            top: '6px',
            left: '10px',
            display: 'flex',
            gap: '8px',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ff5f56',
            }}
          />
          <Box
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ffbd2e',
            }}
          />
          <Box
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#27c93f',
            }}
          />
        </Box>

        {/* Terminal content */}
        <Box
          component="pre"
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            margin: 0,
            marginTop: '28px',
            color: theme.palette.secondary.light,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            '& span': {
              color: theme.palette.secondary.main,
            }
          }}
        >
          {techStack}
          {showCursor && (
            <Box
              component="span"
              sx={{
                color: theme.palette.secondary.main,
                animation: 'none',
              }}
            >
              █
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SkillsDisplay;