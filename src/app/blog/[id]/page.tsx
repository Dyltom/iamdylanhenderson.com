'use client';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Divider, Stack, Typography, Container, Button } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

import SocialMediaShare from '../../../components/Blog/BlogPage/SocialMediaShare';
import TableOfContents from '../../../components/Blog/BlogPage/TableOfContents';

import { convertContentToMarkdown } from '../../../utils/converters';
import { commonDateFormatter } from '../../../utils/date';
import { formatReadTime } from '../../../utils/dateAndTime';
import { Article } from '../../../utils/types';
import { STATIC_BLOG_POSTS } from '../../../utils/staticBlogPosts';

type BlogPostDetailProps = {
  params: Promise<{ id: string }>;
};
const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ params }) => {
  const theme = useTheme();
  const router = useRouter();
  const [article, setArticle] = useState<Article | undefined>(undefined);

  useEffect(() => {
    const loadArticle = async () => {
      const { id: slug } = await params;
      // Find article in static posts by slug
      const foundArticle = STATIC_BLOG_POSTS.find(post => post.slug === slug);
      setArticle(foundArticle);
    };
    loadArticle();
  }, [params]);

  if (!article) {
    return (
      <Container maxWidth="lg">
        <Typography color="primary.contrastText" sx={{ mt: 4 }}>Loading...</Typography>
      </Container>
    );
  }

  const formattedDate = commonDateFormatter(article.publishedAt);
  const formattedReadTime = formatReadTime(article.readTime);
  const formattedLastUpdated = format(
    new Date(article.updatedAt),
    'MMMM dd, yyyy'
  );

  const markdownContent = convertContentToMarkdown(article.content);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Back button */}
      <Button
        onClick={() => router.push('/blog')}
        startIcon={<ArrowBackIcon />}
        sx={{
          mb: 4,
          color: theme.palette.secondary.main,
          fontFamily: 'monospace',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
          }
        }}
      >
        back to blog
      </Button>

      {/* Article header */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          {article.title}
        </Typography>

        {/* Article metadata */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <EventIcon sx={{ color: theme.palette.secondary.main, fontSize: '1.2rem' }} />
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.contrastText, fontFamily: 'monospace' }}
              >
                {formattedDate}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon sx={{ color: theme.palette.secondary.main, fontSize: '1.2rem' }} />
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.contrastText, fontFamily: 'monospace' }}
              >
                {formattedReadTime}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <VisibilityIcon sx={{ color: theme.palette.secondary.main, fontSize: '1.2rem' }} />
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.contrastText, fontFamily: 'monospace' }}
              >
                {article.views} views
              </Typography>
            </Box>
          </Box>
          <SocialMediaShare />
        </Stack>

        <TableOfContents article={article} />
      </Box>

      <Divider sx={{ borderColor: theme.palette.secondary.main, opacity: 0.3, mb: 4 }} />

      {/* Article content with styled markdown */}
      <Box
        sx={{
          '& > *': {
            color: theme.palette.primary.contrastText,
          },
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            color: theme.palette.primary.main,
            fontWeight: 600,
            mt: 4,
            mb: 2,
            '&:first-of-type': {
              mt: 0,
            },
          },
          '& h2': {
            fontSize: '1.8rem',
            borderBottom: `1px solid ${theme.palette.secondary.main}40`,
            pb: 1,
          },
          '& h3': {
            fontSize: '1.4rem',
          },
          '& p': {
            fontSize: '1.1rem',
            lineHeight: 1.8,
            mb: 2,
          },
          '& code': {
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            color: theme.palette.secondary.main,
            padding: '2px 6px',
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '0.9em',
          },
          '& pre': {
            backgroundColor: '#0d1117',
            border: `1px solid ${theme.palette.secondary.main}40`,
            borderRadius: '8px',
            padding: '16px',
            overflow: 'auto',
            mb: 3,
            '& code': {
              backgroundColor: 'transparent',
              padding: 0,
              fontSize: '0.9rem',
            }
          },
          '& blockquote': {
            borderLeft: `4px solid ${theme.palette.secondary.main}`,
            pl: 2,
            ml: 0,
            fontStyle: 'italic',
            opacity: 0.9,
            my: 3,
          },
          '& ul, & ol': {
            pl: 3,
            mb: 2,
            '& li': {
              mb: 1,
              '&::marker': {
                color: theme.palette.secondary.main,
              }
            }
          },
          '& a': {
            color: theme.palette.secondary.main,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            }
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px',
            my: 3,
          },
          '& hr': {
            borderColor: theme.palette.secondary.main,
            opacity: 0.3,
            my: 4,
          }
        }}
      >
        <ReactMarkdown children={markdownContent} rehypePlugins={[rehypeSlug]} />
      </Box>

      <Divider sx={{ borderColor: theme.palette.secondary.main, opacity: 0.3, my: 4 }} />

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.primary.contrastText,
          opacity: 0.7,
          fontFamily: 'monospace',
          display: 'block',
          mt: 2,
        }}
      >
        Last updated on {formattedLastUpdated}
      </Typography>
    </Container>
  );
};

export default BlogPostDetail;
