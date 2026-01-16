import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { commonDateFormatter } from '../../utils/date';
import { Article } from '../../utils/types';
import { useRouter } from 'next/navigation';

interface TerminalBlogCardProps {
  post: Article;
  index: number;
}

const TerminalBlogCard: React.FC<TerminalBlogCardProps> = ({ post, index }) => {
  const theme = useTheme();
  const router = useRouter();
  const formattedDate = commonDateFormatter(post.publishedAt);

  const handleClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        border: `1px solid ${theme.palette.secondary.main}40`,
        borderRadius: '4px',
        padding: theme.spacing(2.5),
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          borderColor: theme.palette.secondary.main,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          transform: 'translateY(-2px)',
          '& .prompt': {
            color: theme.palette.secondary.light,
          },
          '&::before': {
            transform: 'translateX(0)',
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}, transparent)`,
          transform: 'translateX(-100%)',
          transition: 'transform 0.6s ease',
        }
      }}
    >
      {/* Terminal header */}
      <Box sx={{ mb: 2 }}>
        <Typography
          className="prompt"
          sx={{
            fontFamily: 'monospace',
            fontSize: { xs: '0.75rem', sm: '0.8rem' },
            color: theme.palette.secondary.main,
            transition: 'color 0.3s ease',
            wordBreak: 'break-word',
          }}
        >
          dylan@blog:~$ cat ./posts/{post.slug}.md
        </Typography>
      </Box>

      {/* Git-style metadata */}
      <Box sx={{ mb: 1 }}>
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: '#ffbd2e',
          }}
        >
          commit {String(index + 1).padStart(7, '0')}a{Math.random().toString(36).substr(2, 5)}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: theme.palette.primary.contrastText,
            opacity: 0.7,
          }}
        >
          Date: {formattedDate} | {post.readTime} min read | {post.views || 0} views
        </Typography>
      </Box>

      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'monospace',
          color: theme.palette.secondary.light,
          mb: 1.5,
          fontWeight: 600,
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
          lineHeight: 1.4,
        }}
      >
        {post.title}
      </Typography>

      {/* Description as comment */}
      <Typography
        sx={{
          fontFamily: 'monospace',
          fontSize: { xs: '0.8rem', sm: '0.85rem' },
          color: theme.palette.primary.contrastText,
          opacity: 0.8,
          mb: 2,
          flexGrow: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          '&::before': {
            content: '"// "',
            color: theme.palette.secondary.dark,
          }
        }}
      >
        {post.shortDescription}
      </Typography>

      {/* Categories as tags */}
      {post.categories && post.categories.length > 0 && (
        <Box sx={{ mt: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {post.categories.map((category, idx) => (
            <Typography
              key={idx}
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.7rem',
                color: theme.palette.secondary.main,
                backgroundColor: `${theme.palette.secondary.main}20`,
                padding: '2px 8px',
                borderRadius: '4px',
                border: `1px solid ${theme.palette.secondary.main}40`,
              }}
            >
              #{category.toLowerCase().replace(/\s+/g, '-')}
            </Typography>
          ))}
        </Box>
      )}

      {/* Read more indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Typography
          sx={{
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: theme.palette.secondary.main,
            opacity: 0.6,
          }}
        >
          cat
        </Typography>
        <Box
          sx={{
            animation: 'blink 1s infinite',
            '@keyframes blink': {
              '0%, 50%': { opacity: 1 },
              '51%, 100%': { opacity: 0 },
            }
          }}
        >
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: theme.palette.secondary.main,
            }}
          >
            █
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TerminalBlogCard;