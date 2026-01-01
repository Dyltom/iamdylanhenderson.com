import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/metadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  // TODO: Get all blog posts from Strapi when available
  // const articles = await getArticles()

  const blogPosts: MetadataRoute.Sitemap = []
  // const blogPosts = articles?.map((article) => ({
  //   url: `${baseUrl}/blog/${article.attributes.slug}`,
  //   lastModified: new Date(article.attributes.updatedAt || article.attributes.publishedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.7,
  // })) || []

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cv`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ]

  return [...routes, ...blogPosts]
}