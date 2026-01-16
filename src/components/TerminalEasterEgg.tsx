import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const TerminalEasterEgg: React.FC = () => {
  const theme = useTheme();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [showTerminal, setShowTerminal] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const commands: Record<string, string> = {
    'help': `Available commands:
  help     - Show this help message
  whoami   - Display current user
  sudo     - Nice try :)
  clear    - Clear terminal
  ls       - List directory contents
  cat      - Display file contents
  exit     - Close terminal`,
    'whoami': 'dylan@melbourne:~$ Guest user visiting portfolio',
    'sudo': 'dylan is not in the sudoers file. This incident will be reported.',
    'sudo su': 'Nice try! But this is just a portfolio site 😄',
    'ls': `README.md
about.html
projects/
skills/
contact.html
secrets.txt`,
    'cat secrets.txt': 'The secret is... I actually enjoy debugging CSS! 🤫',
    'pwd': '/home/dylan/portfolio',
    'cd ..': 'Permission denied: You shall not pass!',
    'vim': 'Error: No way to exit vim detected. Aborting for your safety.',
    'emacs': 'Error: Not enough RAM to run emacs',
    'clear': '',
    'exit': '',
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't capture input if user is typing in an actual input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === '`') {
        e.preventDefault();
        setShowTerminal(!showTerminal);
        setInput('');
        setOutput('Welcome to Dylan\'s terminal! Type "help" for commands.');
      } else if (showTerminal) {
        if (e.key === 'Enter') {
          const command = input.trim().toLowerCase();
          if (command === 'clear') {
            setOutput('');
          } else if (command === 'exit') {
            setShowTerminal(false);
            setInput('');
            setOutput('');
          } else {
            const response = commands[command] || `Command not found: ${command}`;
            setOutput(response);
          }
          setInput('');
        } else if (e.key === 'Backspace') {
          setInput(prev => prev.slice(0, -1));
        } else if (e.key.length === 1) {
          setInput(prev => prev + e.key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showTerminal, input]);

  // Auto-hide after 10 seconds of inactivity
  useEffect(() => {
    if (showTerminal) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShowTerminal(false);
        setInput('');
        setOutput('');
      }, 10000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [showTerminal, input]);

  return (
    <Fade in={showTerminal}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: '400px',
          maxWidth: '90vw',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          border: `1px solid ${theme.palette.secondary.main}`,
          borderRadius: '4px',
          padding: theme.spacing(2),
          fontFamily: 'monospace',
          zIndex: 9999,
          boxShadow: `0 0 20px ${theme.palette.secondary.main}40`,
        }}
      >
        <Typography
          sx={{
            color: theme.palette.secondary.main,
            fontSize: '0.8rem',
            mb: 1,
          }}
        >
          Terminal (Press ` to toggle)
        </Typography>
        {output && (
          <Typography
            sx={{
              color: theme.palette.secondary.light,
              fontSize: '0.9rem',
              whiteSpace: 'pre-wrap',
              mb: 1,
            }}
          >
            {output}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{
              color: theme.palette.secondary.main,
              fontSize: '0.9rem',
              mr: 1,
            }}
          >
            $
          </Typography>
          <Typography
            sx={{
              color: theme.palette.secondary.light,
              fontSize: '0.9rem',
            }}
          >
            {input}
            <Box
              component="span"
              sx={{
                animation: 'blink 1s infinite',
                '@keyframes blink': {
                  '0%, 50%': { opacity: 1 },
                  '51%, 100%': { opacity: 0 },
                },
              }}
            >
              █
            </Box>
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
};

export default TerminalEasterEgg;