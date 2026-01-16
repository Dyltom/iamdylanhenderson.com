'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import TerminalIcon from '@mui/icons-material/Terminal';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const [showTerminal, setShowTerminal] = useState(false);
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  const asciiArt = `
 _____  _   _ _
|  __ \\| | | | |
| |  | | |_| | | __ _ _ __
| |  | |  _  | |/ _\` | '_ \\
| |__| | | | | | (_| | | | |
|_____/|_| |_|_|\\__,_|_| |_|

`;

  const commands: { [key: string]: string } = {
    help: 'Available commands: help, about, skills, contact, clear',
    about: 'Senior Fullstack Developer passionate about creating elegant solutions to complex problems.',
    skills: 'TypeScript, React, Node.js, PHP, WordPress, Vue.js, Next.js, and more...',
    contact: 'Email: dylan@example.com | LinkedIn: /in/dylan-henderson-07',
    clear: '',
  };

  useEffect(() => {
    if (command) {
      const cmd = command.toLowerCase().trim();
      if (commands[cmd] !== undefined) {
        if (cmd === 'clear') {
          setOutput('');
        } else {
          setOutput(commands[cmd]);
        }
      } else {
        setOutput(`Command not found: ${command}. Type 'help' for available commands.`);
      }
      setCommand('');
    }
  }, [command]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setCommand((e.target as HTMLInputElement).value);
      (e.target as HTMLInputElement).value = '';
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 4,
        borderTop: `1px solid ${theme.palette.secondary.main}40`,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <Container maxWidth="lg">
        {/* ASCII Art Signature */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
            opacity: 0.3,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <Typography
            component="pre"
            sx={{
              fontFamily: 'monospace',
              fontSize: { xs: '0.5rem', sm: '0.7rem', md: '0.8rem' },
              lineHeight: 1,
              color: theme.palette.secondary.main,
              whiteSpace: 'pre',
              userSelect: 'none',
            }}
          >
            {asciiArt}
          </Typography>
        </Box>

        {/* Terminal Easter Egg */}
        {showTerminal && (
          <Box
            sx={{
              mb: 3,
              p: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: `1px solid ${theme.palette.secondary.main}`,
              borderRadius: '4px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'monospace',
                color: theme.palette.secondary.main,
                fontSize: '0.85rem',
                mb: 1,
              }}
            >
              dylan@footer:~$ <input
                type="text"
                onKeyPress={handleKeyPress}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: theme.palette.secondary.light,
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  outline: 'none',
                  width: '200px',
                }}
                placeholder="type 'help'"
                autoFocus
              />
            </Typography>
            {output && (
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  color: theme.palette.primary.contrastText,
                  fontSize: '0.85rem',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {output}
              </Typography>
            )}
          </Box>
        )}

        {/* Social Links */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <Tooltip title="GitHub">
            <IconButton
              href="https://github.com/Dyltom"
              target="_blank"
              sx={{
                color: theme.palette.secondary.main,
                '&:hover': {
                  color: theme.palette.secondary.light,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="LinkedIn">
            <IconButton
              href="https://www.linkedin.com/in/dylan-henderson-07"
              target="_blank"
              sx={{
                color: theme.palette.secondary.main,
                '&:hover': {
                  color: theme.palette.secondary.light,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Email">
            <IconButton
              href="/contact"
              sx={{
                color: theme.palette.secondary.main,
                '&:hover': {
                  color: theme.palette.secondary.light,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <EmailIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Terminal Mode">
            <IconButton
              onClick={() => setShowTerminal(!showTerminal)}
              sx={{
                color: theme.palette.secondary.main,
                '&:hover': {
                  color: theme.palette.secondary.light,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <TerminalIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Copyright with typing animation */}
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: theme.palette.secondary.light,
            fontFamily: 'monospace',
            fontSize: '0.85rem',
          }}
        >
          <Box component="span" sx={{ opacity: 0.7 }}>&gt;</Box> Dylan Henderson © {currentYear}
          <Box
            component="span"
            sx={{
              ml: 1,
              animation: 'blink 1s infinite',
              '@keyframes blink': {
                '0%, 50%': { opacity: 1 },
                '51%, 100%': { opacity: 0 },
              },
            }}
          >
            _
          </Box>
        </Typography>

        {/* Command hint */}
        <Typography
          variant="body2"
          align="center"
          sx={{
            color: theme.palette.primary.contrastText,
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            mt: 1,
            opacity: 0.5,
          }}
        >
          // Built with React, TypeScript, and lots of coffee
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;