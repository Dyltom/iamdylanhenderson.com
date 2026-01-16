import { Article } from './types';

export const STATIC_BLOG_POSTS: Article[] = [
  {
    id: '1',
    date: '2024-01-15',
    readTime: 5,
    views: 150,
    title: 'Building Scalable WordPress Plugins with Modern PHP',
    shortDescription: 'Learn how to build maintainable WordPress plugins using PHP 8 features, proper OOP principles, and modern development practices.',
    content: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    publishedAt: '2024-01-15',
    slug: 'building-scalable-wordpress-plugins',
    categories: ['PHP', 'WordPress', 'Development']
  },
  {
    id: '2',
    date: '2024-01-10',
    readTime: 7,
    views: 230,
    title: 'From Monolith to Microservices: A Practical Guide',
    shortDescription: 'My experience migrating a large fintech application to microservices architecture using TypeScript, Node.js, and Docker.',
    content: [],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    publishedAt: '2024-01-10',
    slug: 'monolith-to-microservices-guide',
    categories: ['Architecture', 'Microservices', 'TypeScript']
  },
  {
    id: '3',
    date: '2024-01-05',
    readTime: 4,
    views: 180,
    title: 'Optimising React Native Performance for Enterprise Apps',
    shortDescription: 'Tips and techniques for building high-performance React Native applications that scale to thousands of users.',
    content: [],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    publishedAt: '2024-01-05',
    slug: 'react-native-performance-optimisation',
    categories: ['React Native', 'Mobile', 'Performance']
  }
];