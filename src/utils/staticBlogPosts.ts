import { Article } from './types';

export const STATIC_BLOG_POSTS: Article[] = [
  {
    id: '1',
    title: 'From Minecraft Plugins to Enterprise Solutions: My Developer Journey',
    content: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'My coding journey began in an unexpected place - creating Minecraft plugins back in 2014. What started as a teenager\'s curiosity about how to make custom game modifications quickly evolved into a passion for solving complex problems through code.'
          }
        ]
      },
      {
        type: 'heading',
        level: 2,
        children: [
          {
            type: 'text',
            text: 'The Early Days: Learning Through Gaming'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Writing my first Minecraft plugin taught me more than just Java syntax. It introduced me to event-driven programming, API design, and the importance of writing code that others could understand and use. I spent countless hours debugging NullPointerExceptions and learning why "it works on my machine" isn\'t good enough.'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'This hobby project became my gateway into professional development. The problem-solving skills I developed while figuring out how to make players fly or create custom game mechanics translated directly into real-world applications.'
          }
        ]
      },
      {
        type: 'heading',
        level: 2,
        children: [
          {
            type: 'text',
            text: 'Startup Life: Wearing Many Hats'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Over the years, I\'ve had the privilege of working with four different startups. Each one presented unique challenges - from building MVPs under tight deadlines to scaling systems that were never designed for the growth they experienced. At Bonza, I helped transform a simple WordPress site into a comprehensive educational platform serving thousands of students.'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Working in startups taught me to be adaptable. One day I\'d be optimising database queries, the next I\'d be implementing payment integrations with Stripe, and by the end of the week, I\'d be debugging why our Docker containers weren\'t playing nicely in production. This variety kept me engaged and constantly learning.'
          }
        ]
      },
      {
        type: 'heading',
        level: 2,
        children: [
          {
            type: 'text',
            text: 'The Technical Evolution'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'My technical stack has evolved significantly since those Java plugin days. I\'ve embraced TypeScript for its type safety, fallen in love with React\'s component-based architecture, and discovered the joy of building robust APIs with Node.js and Koa. But perhaps more importantly, I\'ve learned that the technology is just a tool - what matters is solving real problems for real people.'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Recent projects have pushed me into new territories - from implementing AI-powered features to building observability systems that help teams understand their applications better. Each new challenge is an opportunity to expand my toolkit and perspective.'
          }
        ]
      },
      {
        type: 'heading',
        level: 2,
        children: [
          {
            type: 'text',
            text: 'Looking Forward'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'What excites me most about software development is that there\'s always something new to learn. Whether it\'s exploring the latest React features, diving into cloud infrastructure, or understanding how to build more accessible applications, the learning never stops.'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'If there\'s one thing my journey has taught me, it\'s that the best developers aren\'t necessarily those who know the most languages or frameworks. They\'re the ones who remain curious, embrace challenges, and never stop asking "how can I make this better?"'
          }
        ]
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'From that first Minecraft plugin to enterprise solutions, it\'s been quite the adventure - and I\'m just getting started.'
          }
        ]
      }
    ],
    shortDescription: 'A reflection on my journey from creating Minecraft plugins as a teenager to building enterprise solutions, and the lessons learned along the way.',
    publishedAt: '2023-11-16T00:00:00.000Z',
    date: '2023-11-16T00:00:00.000Z',
    readTime: 3,
    views: 33,
    slug: 'from-minecraft-plugins-to-enterprise-solutions',
    createdAt: new Date('2023-11-16'),
    updatedAt: new Date('2023-11-16'),
    categories: ['Career', 'Personal Growth']
  }
];