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
import { getArticle } from '../../../fetchers/strapi';
import { convertContentToMarkdown } from '../../../utils/converters';
import { formatReadTime } from '../../../utils/dateAndTime';
import { Article } from '../../../utils/types';

type BlogPostDetailProps = {
  params: { id: string };
};

interface GenericNode {
  type: string;
  tagName?: string;
  properties?: { [key: string]: any };
  children?: Array<{ type: string; value?: string }>;
}

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ params }) => {
  const { id: slug } = params;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const article = await getArticle(slug);
      setArticle(article);
    };
    fetchArticle();
  }, [slug]);

  if (!article) {
    return <Typography color="primary.contrastText">Loading...</Typography>;
  }

  const formattedDate = format(new Date(article.publishedAt), 'MMMM dd, yyyy');
  const formattedReadTime = formatReadTime(article.readTime);
  const formattedLastUpdated = format(
    new Date(article.updatedAt),
    'MMMM dd, yyyy'
  );

  const markdownContent = convertContentToMarkdown(article.Content);

  const rehypeRewrite = (node: GenericNode) => {
    if (
      node.tagName &&
      /^h(1|2|3|4|5|6)$/.test(node.tagName) &&
      node.children &&
      node.children.length > 0
    ) {
      const firstChild = node.children[0];
      if (firstChild.type === 'text' && firstChild.value) {
        const slug = firstChild.value.toLowerCase().replace(/\s+/g, '-');
        node.properties = { ...node.properties, id: slug };
      }
    }
  };

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
        {article.Title}
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
      <Divider color="#21262d" sx={{ my: 2 }} />
      <TableOfContents article={article} />
      <Divider color="#21262d" sx={{ my: 4 }} />
      <ReactMarkdown children={markdownContent} rehypePlugins={[rehypeSlug]} />
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