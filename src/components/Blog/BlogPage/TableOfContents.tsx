import { Box, Link, Typography, Collapse, IconButton } from '@mui/material';
import { useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Article } from '../../../utils/types';

type TableOfContentsProps = {
  article: Article | null;
};

const TableOfContents: React.FC<TableOfContentsProps> = ({ article }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(true);

  const tocItems = useMemo(() => {
    if (!article) return [];

    return article.content
      .filter((block) => block.type === 'heading')
      .map((block) => ({
        level: block.level ?? 0,
        text: block.children
          .map((child) => child.text.replace(/[?]/g, ''))
          .join(' '),
      }));
  }, [article]);

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0, 255, 0, 0.05)',
        border: `1px solid ${theme.palette.secondary.main}40`,
        borderRadius: 2,
        p: 2,
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: expanded ? 2 : 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.secondary.main,
            fontFamily: 'monospace',
            fontSize: '1.1rem',
            fontWeight: 600,
          }}
        >
          // Table of Contents
        </Typography>
        <IconButton
          size="small"
          onClick={() => setExpanded(!expanded)}
          sx={{
            color: theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: 'rgba(0, 255, 0, 0.1)',
            },
          }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ pl: 1 }}>
          {tocItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                mb: 1,
                ml: item.level > 2 ? 2 : 0,
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.secondary.main,
                  mr: 1,
                  fontSize: '0.9rem',
                  opacity: 0.7,
                }}
              >
                {item.level > 2 ? '└' : '▸'}
              </Typography>
              <Link
                href={`#${item.text.toLowerCase().replace(/\s+/g, '-')}`}
                sx={{
                  color: theme.palette.primary.contrastText,
                  textDecoration: 'none',
                  fontSize: item.level > 2 ? '0.9rem' : '1rem',
                  fontFamily: 'monospace',
                  transition: 'color 0.2s',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                    textDecoration: 'underline',
                  },
                }}
              >
                {item.text}
              </Link>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default TableOfContents;
