import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

interface Command {
  command: string;
  output: string | React.JSX.Element;
  delay?: number;
}

const InteractiveTerminal: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<Array<{ command: string; output: string | React.JSX.Element }>>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = [
    {
      command: 'whoami',
      output: 'Dylan Henderson - Senior Fullstack Developer 🚀',
      delay: 500
    },
    {
      command: 'pwd',
      output: '/home/dylan/melbourne',
      delay: 300
    },
    {
      command: 'ls -la skills/',
      output: (
        <Box sx={{ fontFamily: 'monospace' }}>
          <Typography sx={{ color: theme.palette.secondary.main }}>
            drwxr-xr-x  10 dylan  staff   320 Jan 16 09:00 .
          </Typography>
          <Typography sx={{ color: theme.palette.secondary.light }}>
            -rw-r--r--   1 dylan  staff  6840 Jan 16 09:00 React.js
          </Typography>
          <Typography sx={{ color: theme.palette.secondary.light }}>
            -rw-r--r--   1 dylan  staff  5432 Jan 16 09:00 TypeScript
          </Typography>
          <Typography sx={{ color: theme.palette.secondary.light }}>
            -rw-r--r--   1 dylan  staff  4096 Jan 16 09:00 Node.js
          </Typography>
          <Typography sx={{ color: theme.palette.secondary.light }}>
            -rw-r--r--   1 dylan  staff  7890 Jan 16 09:00 PHP
          </Typography>
          <Typography sx={{ color: theme.palette.secondary.light }}>
            -rw-r--r--   1 dylan  staff  3456 Jan 16 09:00 Docker
          </Typography>
        </Box>
      ),
      delay: 800
    },
    {
      command: 'cat current_role.txt',
      output: '📍 Senior Software Engineer @ Bonza Clean\n🔧 Building AI-powered booking systems\n🚀 Reduced admin work from 9hrs to 1hr/week',
      delay: 600
    },
    {
      command: 'git log --oneline -n 3',
      output: (
        <Box sx={{ fontFamily: 'monospace' }}>
          <Typography sx={{ color: '#ffbd2e' }}>
            c253152 feat: add AI assistant to booking engine
          </Typography>
          <Typography sx={{ color: '#ffbd2e' }}>
            ab7d442 fix: optimize Docker CI/CD pipeline
          </Typography>
          <Typography sx={{ color: '#ffbd2e' }}>
            1796ddf feat: implement React Native mobile app
          </Typography>
        </Box>
      ),
      delay: 700
    },
    {
      command: 'echo "Ready to build something awesome?"',
      output: 'Ready to build something awesome? 💻✨',
      delay: 500
    }
  ];

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Type out commands
  useEffect(() => {
    if (currentCommandIndex >= commands.length) {
      setIsTyping(false);
      return;
    }

    const currentCmd = commands[currentCommandIndex];
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < currentCmd.command.length) {
        setCurrentCommand(currentCmd.command.slice(0, charIndex + 1));
        charIndex++;
        setTimeout(typeChar, 50 + Math.random() * 50); // Varying typing speed
      } else {
        // Command fully typed, show output after delay
        setTimeout(() => {
          setCommandHistory(prev => [...prev, {
            command: currentCmd.command,
            output: currentCmd.output
          }]);
          setCurrentCommand('');
          setCurrentCommandIndex(prev => prev + 1);
        }, currentCmd.delay || 500);
      }
    };

    // Start typing after a brief pause
    const startTimeout = setTimeout(typeChar, 1000);
    return () => clearTimeout(startTimeout);
  }, [currentCommandIndex]);

  // Scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory, currentCommand]);

  const handleTerminalClick = () => {
    if (!isTyping) {
      router.push('/contact');
    }
  };

  return (
    <Box
      ref={terminalRef}
      onClick={handleTerminalClick}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: '8px',
        padding: theme.spacing(3),
        minHeight: '400px',
        maxHeight: '500px',
        overflow: 'auto',
        fontFamily: 'monospace',
        cursor: !isTyping ? 'pointer' : 'default',
        position: 'relative',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.secondary.main,
          borderRadius: '4px',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '30px',
          background: `linear-gradient(180deg, ${theme.palette.secondary.main}20 0%, transparent 100%)`,
          pointerEvents: 'none',
        }
      }}
    >
      {/* Terminal header */}
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ color: theme.palette.secondary.main, fontSize: '0.9rem' }}>
          dylan@portfolio:~$ ./introduce.sh
        </Typography>
        <Typography sx={{ color: theme.palette.secondary.light, fontSize: '0.8rem', mb: 2 }}>
          ═══════════════════════════════════════
        </Typography>
      </Box>

      {/* Command history */}
      {commandHistory.map((item, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography sx={{ color: theme.palette.secondary.main }}>
            $ {item.command}
          </Typography>
          <Box sx={{ color: theme.palette.secondary.light, mt: 0.5 }}>
            {typeof item.output === 'string' ? (
              item.output.split('\n').map((line, i) => (
                <Typography key={i}>{line}</Typography>
              ))
            ) : (
              item.output
            )}
          </Box>
        </Box>
      ))}

      {/* Current command being typed */}
      {isTyping && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: theme.palette.secondary.main }}>$ </Typography>
          <Typography sx={{ color: theme.palette.secondary.light }}>
            {currentCommand}
            {showCursor && (
              <Box component="span" sx={{ color: theme.palette.secondary.main }}>
                █
              </Box>
            )}
          </Typography>
        </Box>
      )}

      {/* Click to continue prompt */}
      {!isTyping && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography
            sx={{
              color: theme.palette.secondary.main,
              fontSize: '0.9rem',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.6 },
                '50%': { opacity: 1 },
              }
            }}
          >
            [ Click anywhere to get in touch ]
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default InteractiveTerminal;