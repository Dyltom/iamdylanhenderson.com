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

  const techStack = `$ cat ~/dev-setup.sh
#!/bin/bash
# Dylan's Development Environment

echo "🚀 Loading tech stack..."

# Frontend frameworks
alias react="npx create-react-app"
alias next="npx create-next-app"
alias vue="npm init vue@latest"

# Languages & runtimes
echo "✓ TypeScript (because any is scary)"
echo "✓ PHP (WordPress wizardry)"
echo "✓ Node.js (async all the things)"
echo "✓ Java (Spring Boot enterprise)"

# Databases
psql --version  # PostgreSQL for serious data
mysql --version # MySQL for WordPress sites

# DevOps & Tools
docker --version
git config --get user.name  # "Dylan Henderson"
echo "AWS CLI configured for deployments"

# Currently building with:
echo "→ React Native (Bonza Clean app)"
echo "→ WordPress plugins (booking engines)"
echo "→ n8n workflows (automation magic)"
echo "→ OpenAI integrations (AI assistants)"

$ echo "Ready to ship 🚢"`;

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