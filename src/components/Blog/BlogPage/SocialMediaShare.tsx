import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

const SocialMediaShare: React.FC = () => {
  const theme = useTheme();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    // Only access document in browser
    if (typeof window !== 'undefined') {
      setUrl(encodeURIComponent(window.location.href));
      setTitle(encodeURIComponent(document.title));
    }
  }, []);

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      'facebook-share-dialog',
      'width=800,height=600'
    );
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      'twitter-share-dialog',
      'width=800,height=600'
    );
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      'linkedin-share-dialog',
      'width=800,height=600'
    );
  };

  const handleRedditShare = () => {
    window.open(
      `https://reddit.com/submit?url=${url}&title=${title}`,
      'reddit-share-dialog',
      'width=800,height=600'
    );
  };

  const handleEmailShare = () => {
    window.location.href = `mailto:?subject=${title}&body=${url}`;
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Stack direction="row" spacing={0.5}>
        <Tooltip title="Share on Facebook" arrow>
          <IconButton
            size="small"
            aria-label="Share on Facebook"
            onClick={handleFacebookShare}
            sx={{
              color: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
              }
            }}
          >
            <FacebookIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Share on Twitter" arrow>
          <IconButton
            size="small"
            aria-label="Share on Twitter"
            onClick={handleTwitterShare}
            sx={{
              color: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
              }
            }}
          >
            <TwitterIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Share on LinkedIn" arrow>
          <IconButton
            size="small"
            aria-label="Share on LinkedIn"
            onClick={handleLinkedInShare}
            sx={{
              color: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
              }
            }}
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Share on Reddit" arrow>
          <IconButton
            size="small"
            aria-label="Share on Reddit"
            onClick={handleRedditShare}
            sx={{
              color: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
              }
            }}
          >
            <RedditIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Share via Email" arrow>
          <IconButton
            size="small"
            aria-label="Share via Email"
            onClick={handleEmailShare}
            sx={{
              color: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
              }
            }}
          >
            <EmailIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default SocialMediaShare;
