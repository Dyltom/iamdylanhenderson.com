import { Metadata } from 'next'

// Centralized metadata configuration - Single Responsibility Principle
export const siteConfig = {
  name: 'Dylan Henderson',
  title: 'Dylan Henderson - Software Engineer',
  description: 'Full-stack software engineer specializing in React, TypeScript, and modern web development. Based in Melbourne, VIC.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iamdylanhenderson.com',
  ogImage: '/og-image.jpg', // We'll create this later
  author: {
    name: 'Dylan Henderson',
    twitter: '@iamdylanhenderson', // Update with your actual Twitter handle
    linkedin: 'https://www.linkedin.com/in/iamdylanhenderson',
    github: 'https://github.com/Dyltom'
  },
  keywords: [
    'Dylan Henderson',
    'Software Engineer',
    'Full Stack Developer',
    'React Developer',
    'TypeScript',
    'Next.js',
    'Melbourne',
    'Web Development'
  ]
}

// Factory pattern for creating metadata - Open/Closed Principle
export function createMetadata(override?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      url: siteConfig.url,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.title,
      description: siteConfig.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.author.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...override
  }
}

// Page-specific metadata creators
export const pageMetadata = {
  home: (): Metadata => createMetadata(),

  about: (): Metadata => createMetadata({
    title: 'About',
    description: 'Learn more about Dylan Henderson - professional background, skills, and experience as a full-stack software engineer.',
    openGraph: {
      title: 'About Dylan Henderson',
      description: 'Learn more about Dylan Henderson - professional background, skills, and experience as a full-stack software engineer.',
    }
  }),

  blog: (): Metadata => createMetadata({
    title: 'Blog',
    description: 'Technical articles and insights on web development, React, TypeScript, and software engineering best practices.',
    openGraph: {
      title: 'Blog - Dylan Henderson',
      description: 'Technical articles and insights on web development, React, TypeScript, and software engineering best practices.',
    }
  }),

  contact: (): Metadata => createMetadata({
    title: 'Contact',
    description: 'Get in touch with Dylan Henderson for collaboration, consulting, or opportunities.',
    openGraph: {
      title: 'Contact Dylan Henderson',
      description: 'Get in touch with Dylan Henderson for collaboration, consulting, or opportunities.',
    }
  }),

  cv: (): Metadata => createMetadata({
    title: 'CV',
    description: 'Professional CV of Dylan Henderson - Full-stack software engineer with expertise in React, TypeScript, and modern web technologies.',
    openGraph: {
      title: 'CV - Dylan Henderson',
      description: 'Professional CV of Dylan Henderson - Full-stack software engineer with expertise in React, TypeScript, and modern web technologies.',
    }
  }),

  projects: (): Metadata => createMetadata({
    title: 'Projects',
    description: 'Portfolio of web development projects by Dylan Henderson showcasing full-stack applications, APIs, and modern web technologies.',
    openGraph: {
      title: 'Projects - Dylan Henderson',
      description: 'Portfolio of web development projects by Dylan Henderson showcasing full-stack applications, APIs, and modern web technologies.',
    }
  }),

  // Factory for blog posts
  blogPost: (post: { title: string; excerpt: string; image?: string }): Metadata => createMetadata({
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image }] : [{ url: siteConfig.ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [siteConfig.ogImage],
    }
  })
}