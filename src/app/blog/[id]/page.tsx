'use client';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';

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
    return <Typography color="primary.contrastText">Loading...</Typography>;
  }

  const formattedDate = commonDateFormatter(article.publishedAt);
  const formattedReadTime = formatReadTime(article.readTime);
  const formattedLastUpdated = format(
    new Date(article.updatedAt),
    'MMMM dd, yyyy'
  );

  const markdownContent = convertContentToMarkdown(article.content);

  return (
    <Box
      sx={{
        p: 2,
        marginTop: 2,
        color: 'white',
        backgroundColor: 'transparent',
      }}
    >
      <Typography variant="h4" gutterBottom>
        {article.title}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventIcon color="action" sx={{ color: 'secondary.main' }} />
          <Typography variant="subtitle1" component="span">
            {formattedDate}
          </Typography>
          <AccessTimeIcon
            color="action"
            sx={{ color: 'secondary.main', gap: 1 }}
          />
          <Typography variant="subtitle1" component="span">
            {formattedReadTime}
          </Typography>
          <VisibilityIcon color="action" sx={{ color: 'secondary.main' }} />
          <Typography variant="subtitle1" component="span">
            {article.views}
          </Typography>
        </Box>
        <SocialMediaShare />
      </Stack>
      <TableOfContents article={article} />
      <Divider color="#21262d" sx={{ my: 4 }} />
      <ReactMarkdown children={markdownContent} rehypePlugins={[rehypeSlug]} />
      <Divider color="#21262d" sx={{ my: 4 }} />
      <Typography
        color="primary.contrastText"
        variant="subtitle2"
        sx={{ mt: 2 }}
      >
        Last updated on {formattedLastUpdated}
      </Typography>
    </Box>
  );
};

export default BlogPostDetail;
