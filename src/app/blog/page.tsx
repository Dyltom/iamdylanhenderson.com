'use client';

import { Box, Grid, SelectChangeEvent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import BlogPostCard from '../../components/Blog/BlogPostCard';
import DateFilterSelect from '../../components/Blog/DateFilterSelect';
import SearchBar from '../../components/Blog/Searchbar';
import SortSelect from '../../components/Blog/SortSelect';

import { getArticles } from '../../fetchers/article';
import { filterPostsByDate } from '../../utils/filters';
import { sortPosts } from '../../utils/sorts';
import { Article } from '../../utils/types';

export default function BlogPage() {
  const theme = useTheme();
  const [posts, setPosts] = useState<Article[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState<
    'mostRecent' | 'mostViews' | 'longReadTime'
  >('mostRecent');
  const [sortDescending, setSortDescending] = useState(true);
  const [dateFilter, setDateFilter] = useState<'year' | 'week' | 'day' | ''>(
    ''
  );

  useEffect(() => {
    // Use static posts instead of API
    const staticPosts: Article[] = [
      {
        id: '1',
        title: 'From Setback to Success: My Career Transformation Story',
        content: [],
        shortDescription: 'How I turned a career setback into an opportunity for growth and landed my dream role in tech.',
        publishedAt: '2023-11-16T00:00:00.000Z',
        date: '2023-11-16T00:00:00.000Z',
        readTime: 3,
        views: 33,
        slug: 'from-setback-to-success-career-transformation',
        createdAt: new Date('2023-11-16'),
        updatedAt: new Date('2023-11-16'),
        categories: ['Career', 'Personal Growth']
      }
    ];
    setPosts(staticPosts);
    setFilteredPosts(staticPosts);
  }, []);

  useEffect(() => {
    let processedPosts = sortPosts(posts, sortType, sortDescending);
    processedPosts = filterPostsByDate(processedPosts, dateFilter);

    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      processedPosts = processedPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(lowercasedFilter) ||
          post.shortDescription.toLowerCase().includes(lowercasedFilter)
      );
    }

    setFilteredPosts(processedPosts);
  }, [searchTerm, sortType, sortDescending, dateFilter, posts]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortTypeChange = (
    newSortType: 'mostRecent' | 'mostViews' | 'longReadTime'
  ) => {
    setSortType(newSortType);
  };

  const handleDateFilterChange = (
    event: SelectChangeEvent<'year' | 'week' | 'day' | ''>
  ) => {
    setDateFilter(event.target.value as 'year' | 'week' | 'day' | '');
  };

  return (
    <Box sx={{ p: 2 }}>
      <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <SortSelect
          sortType={sortType}
          onSortTypeChange={handleSortTypeChange}
        />
        <DateFilterSelect
          dateFilter={dateFilter}
          onChange={handleDateFilterChange}
        />
      </Box>
      <Grid container spacing={2} sx={{ minHeight: '200px' }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <Grid key={index} size={{ xs: 12, md: 6 }}>
              <BlogPostCard post={post} />
            </Grid>
          ))
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              width: '100%',
              my: 2,
              color: theme.palette.primary.contrastText,
            }}
          >
            No posts found.
          </Box>
        )}
      </Grid>
    </Box>
  );
}
