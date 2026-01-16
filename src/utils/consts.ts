import BookIcon from '@mui/icons-material/Book';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';

export const links = [
  { text: 'Home', href: '/', icon: HomeIcon },
  { text: 'About', href: '/about', icon: StarIcon },
  { text: 'Blog', href: '/blog', icon: BookIcon },
  { text: 'Contact', href: '/contact', icon: DashboardIcon },
];

export const MAX_BLOG_POSTS_DESKTOP = 3;
export const MAX_BLOG_POSTS_MOBILE = 1;
