'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';

interface TerminalLine {
  id: string;
  text: string;
  isTyping: boolean;
  showCursor: boolean;
}

export default function TerminalSidebar() {
  const theme = useTheme();
  const pathname = usePathname();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const previousPathname = useRef(pathname);

  // Initial boot sequence
  useEffect(() => {
    const bootSequence = [
      'SYSTEM BOOT SEQUENCE INITIATED...',
      'Loading iamdylanhenderson.com OS v2.0.0',
      'Checking system integrity... OK',
      'Loading modules... OK',
      'Establishing connection... OK',
      `Route: ${pathname}`,
      '> Ready for input_'
    ];

    const initialLines: TerminalLine[] = bootSequence.map((text, index) => ({
      id: `boot-${index}`,
      text,
      isTyping: true,
      showCursor: index === 0
    }));

    setLines(initialLines);
  }, []);

  // Handle page changes
  useEffect(() => {
    if (pathname !== previousPathname.current && lines.length > 0) {
      previousPathname.current = pathname;

      const newCommands = [
        `> cd ${pathname}`,
        `Navigating to ${pathname}...`,
        'Loading components...',
        'Rendering view...',
        `Route: ${pathname}`,
        '> Ready for input_'
      ];

      const newLines: TerminalLine[] = newCommands.map((text, index) => ({
        id: `nav-${Date.now()}-${index}`,
        text,
        isTyping: true,
        showCursor: false
      }));

      setLines(prev => [...prev, ...newLines]);
    }
  }, [pathname, lines.length]);

  // Typing animation effect
  useEffect(() => {
    const typingLines = lines.filter(line => line.isTyping);
    if (typingLines.length === 0) return;

    const currentLine = typingLines[0];
    const lineIndex = lines.findIndex(line => line.id === currentLine.id);

    if (lineIndex === -1 || currentTypingIndex >= currentLine.text.length) {
      // Finished typing current line
      setLines(prev => prev.map((line, idx) => {
        if (line.id === currentLine.id) {
          return { ...line, isTyping: false, showCursor: false };
        }
        // Move cursor to next typing line
        if (idx === lineIndex + 1 && prev[idx]?.isTyping) {
          return { ...line, showCursor: true };
        }
        return line;
      }));
      setCurrentTypingIndex(0);
      return;
    }

    // Continue typing
    const timer = setTimeout(() => {
      setCurrentTypingIndex(prev => prev + 1);
    }, 30 + Math.random() * 50); // Variable typing speed for realism

    return () => clearTimeout(timer);
  }, [lines, currentTypingIndex]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentTypingIndex]);

  const renderLine = (line: TerminalLine) => {
    const displayText = line.isTyping
      ? line.text.slice(0, currentTypingIndex)
      : line.text;

    return (
      <Box
        key={line.id}
        sx={{
          fontFamily: '"Fira Code", monospace',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          color: theme.palette.primary.main,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          position: 'relative',
          '&::after': line.showCursor ? {
            content: '""',
            position: 'absolute',
            right: -2,
            top: 0,
            width: '8px',
            height: '100%',
            backgroundColor: theme.palette.primary.main,
            animation: 'blink 1s step-end infinite',
          } : {}
        }}
      >
        {displayText}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 64, // Below navbar
        width: { xs: '100%', md: 320 },
        height: 'calc(100vh - 64px)',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        borderRight: `1px solid ${theme.palette.primary.main}`,
        padding: 2,
        overflow: 'hidden',
        display: { xs: 'none', md: 'block' }, // Hide on mobile
        zIndex: 10,
        '& @keyframes blink': {
          '0%, 50%': { opacity: 1 },
          '51%, 100%': { opacity: 0 }
        }
      }}
    >
      {/* Terminal header */}
      <Box
        sx={{
          borderBottom: `1px solid ${theme.palette.primary.main}`,
          paddingBottom: 1,
          marginBottom: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#ff5f56'
          }}
        />
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#ffbd2e'
          }}
        />
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: '#27c93f'
          }}
        />
        <Typography
          variant="caption"
          sx={{
            marginLeft: 2,
            color: theme.palette.primary.main,
            fontFamily: '"Fira Code", monospace',
          }}
        >
          dylan@iamdylanhenderson:~$
        </Typography>
      </Box>

      {/* Terminal content */}
      <Box
        ref={terminalRef}
        sx={{
          height: 'calc(100% - 50px)',
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(50, 205, 50, 0.1)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '4px',
          }
        }}
      >
        {lines.map(renderLine)}
      </Box>
    </Box>
  );
}