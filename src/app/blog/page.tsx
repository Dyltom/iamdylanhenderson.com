'use client';

import { Box, SelectChangeEvent } from '@mui/material';
import Grid2 from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import TerminalBlogCard from '../../components/Blog/TerminalBlogCard';
import DateFilterSelect from '../../components/Blog/DateFilterSelect';
import SearchBar from '../../components/Blog/Searchbar';
import SortSelect from '../../components/Blog/SortSelect';

import { filterPostsByDate } from '../../utils/filters';
import { sortPosts } from '../../utils/sorts';
import { Article } from '../../utils/types';
import { STATIC_BLOG_POSTS } from '../../utils/staticBlogPosts';

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
    // Use static posts from shared file
    setPosts(STATIC_BLOG_POSTS);
    setFilteredPosts(STATIC_BLOG_POSTS);
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
      <Grid2 container spacing={2} sx={{ minHeight: '200px' }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <Grid2 key={index} size={{ xs: 12, md: 6 }}>
              <TerminalBlogCard post={post} index={index} />
            </Grid2>
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
      </Grid2>
    </Box>
  );
}
