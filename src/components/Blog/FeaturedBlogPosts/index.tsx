'use client';

import { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';

import {
  MAX_BLOG_POSTS_DESKTOP,
  MAX_BLOG_POSTS_MOBILE,
} from '../../../utils/consts';
import { sortPosts } from '../../../utils/sorts';
import { Article } from '../../../utils/types';
import theme from '../../ThemeRegistry/theme';
import BlogPostCard from '../BlogPostCard';

type FeaturedBlogPostsType = {
  blogPosts: Article[];
};

const FeaturedBlogPosts: React.FC<FeaturedBlogPostsType> = ({ blogPosts }) => {
  if (blogPosts.length === 0) {
    return null;
  }

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const itemsPerSlide = isMobile
    ? MAX_BLOG_POSTS_MOBILE
    : MAX_BLOG_POSTS_DESKTOP;
  const [, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const sortedBlogPosts = sortPosts(blogPosts, 'mostRecent', true);

  const numberOfDots = blogPosts.length - (itemsPerSlide - 1);

  const handlePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: 'center',
          color: 'primary.contrastText',
          paddingTop: isMobile ? 4 : 8,
        }}
      >
        Recent Posts
      </Typography>
      <Swiper
        onSwiper={setSwiperInstance}
        slidesPerView={itemsPerSlide}
        spaceBetween={30}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        navigation={false}
        pagination={false}
        style={{ paddingTop: 4 }}
      >
        {sortedBlogPosts.map((post, index) => (
          <SwiperSlide key={index}>
            <BlogPostCard post={post} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          alignItems: 'center',
        }}
      >
        <IconButton onClick={handlePrev} sx={{ color: 'secondary.main' }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        {/* Custom Pagination */}
        <Box sx={{ display: 'flex' }}>
          {Array.from({ length: numberOfDots }).map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor:
                  index === swiperInstance?.activeIndex
                    ? 'secondary.main'
                    : 'primary.contrastText',
                mx: 0.5,
              }}
              onClick={() => swiperInstance?.slideTo(index)}
            />
          ))}
        </Box>
        {isMobile ||
          (blogPosts.length > MAX_BLOG_POSTS_DESKTOP && (
            <IconButton onClick={handleNext} sx={{ color: 'secondary.main' }}>
              <ArrowForwardIosIcon />
            </IconButton>
          ))}
      </Box>
    </Box>
  );
};

export default FeaturedBlogPosts;
