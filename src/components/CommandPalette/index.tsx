import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  InputAdornment,
  Fade,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface Command {
  id: string;
  title: string;
  description: string;
  action: () => void;
  icon?: string;
  keywords?: string[];
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands: Command[] = [
    {
      id: 'home',
      title: 'Home',
      description: 'Go to homepage',
      icon: '🏠',
      action: () => {
        router.push('/');
        onClose();
      },
      keywords: ['main', 'index', 'start'],
    },
    {
      id: 'about',
      title: 'About',
      description: 'Learn more about me',
      icon: '👤',
      action: () => {
        router.push('/about');
        onClose();
      },
      keywords: ['bio', 'info', 'me'],
    },
    {
      id: 'blog',
      title: 'Blog',
      description: 'Read my articles',
      icon: '📝',
      action: () => {
        router.push('/blog');
        onClose();
      },
      keywords: ['articles', 'posts', 'writing'],
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch',
      icon: '📧',
      action: () => {
        router.push('/contact');
        onClose();
      },
      keywords: ['email', 'reach', 'message'],
    },
    {
      id: 'cv',
      title: 'Download CV',
      description: 'Download my resume as PDF',
      icon: '📄',
      action: () => {
        window.open('/cv', '_blank');
        onClose();
      },
      keywords: ['resume', 'pdf', 'download'],
    },
    {
      id: 'github',
      title: 'GitHub',
      description: 'View my GitHub profile',
      icon: '🐙',
      action: () => {
        window.open('https://github.com/Dyltom', '_blank');
        onClose();
      },
      keywords: ['code', 'repos', 'open source'],
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      description: 'Connect on LinkedIn',
      icon: '💼',
      action: () => {
        window.open('https://www.linkedin.com/in/dylan-henderson-07', '_blank');
        onClose();
      },
      keywords: ['professional', 'network', 'connect'],
    },
  ];

  const filteredCommands = commands.filter(command => {
    const query = searchQuery.toLowerCase();
    return (
      command.title.toLowerCase().includes(query) ||
      command.description.toLowerCase().includes(query) ||
      command.keywords?.some(keyword => keyword.toLowerCase().includes(query))
    );
  });

  useEffect(() => {
    if (open) {
      setSearchQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 200 }}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(15, 15, 15, 0.98)',
          border: `1px solid ${theme.palette.secondary.main}`,
          borderRadius: '12px',
          boxShadow: `0 0 40px ${theme.palette.secondary.main}40`,
          mt: '10vh',
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box>
          <TextField
            ref={inputRef}
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.palette.secondary.main }} />
                </InputAdornment>
              ),
              sx: {
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                color: theme.palette.secondary.light,
                p: 2,
                borderBottom: `1px solid ${theme.palette.secondary.main}30`,
              },
            }}
          />

          <List ref={listRef} sx={{ maxHeight: '400px', overflow: 'auto', p: 1 }}>
            {filteredCommands.length === 0 ? (
              <ListItem>
                <ListItemText
                  primary="No commands found"
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: 'monospace',
                      color: theme.palette.secondary.light,
                      textAlign: 'center',
                    },
                  }}
                />
              </ListItem>
            ) : (
              filteredCommands.map((command, index) => (
                <ListItem
                  key={command.id}
                  onClick={command.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '8px',
                    mb: 0.5,
                    backgroundColor:
                      index === selectedIndex
                        ? `${theme.palette.secondary.main}20`
                        : 'transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: `${theme.palette.secondary.main}20`,
                    },
                  }}
                >
                  <Box sx={{ mr: 2, fontSize: '1.5rem' }}>{command.icon}</Box>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontFamily: 'monospace',
                          color: theme.palette.secondary.light,
                          fontSize: '1rem',
                        }}
                      >
                        {command.title}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          fontFamily: 'monospace',
                          color: theme.palette.primary.contrastText,
                          opacity: 0.7,
                          fontSize: '0.85rem',
                        }}
                      >
                        {command.description}
                      </Typography>
                    }
                  />
                  {index === selectedIndex && (
                    <KeyboardArrowRightIcon
                      sx={{
                        color: theme.palette.secondary.main,
                        ml: 'auto',
                      }}
                    />
                  )}
                </ListItem>
              ))
            )}
          </List>

          <Box
            sx={{
              borderTop: `1px solid ${theme.palette.secondary.main}30`,
              p: 1.5,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: 'monospace',
                color: theme.palette.secondary.light,
                opacity: 0.6,
                fontSize: '0.8rem',
              }}
            >
              ↑↓ Navigate
            </Typography>
            <Typography
              sx={{
                fontFamily: 'monospace',
                color: theme.palette.secondary.light,
                opacity: 0.6,
                fontSize: '0.8rem',
              }}
            >
              ↵ Select
            </Typography>
            <Typography
              sx={{
                fontFamily: 'monospace',
                color: theme.palette.secondary.light,
                opacity: 0.6,
                fontSize: '0.8rem',
              }}
            >
              ESC Close
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CommandPalette;