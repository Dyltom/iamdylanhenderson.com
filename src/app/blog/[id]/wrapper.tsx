import { Metadata } from 'next'
import { getArticle } from '../../../fetchers/article'
import { pageMetadata } from '../../../config/metadata'

export async function generateMetadata({
  params
}: {
  params: { id: string }
}): Promise<Metadata> {
  try {
    const article = await getArticle(params.id)

    if (!article) {
      return pageMetadata.blog()
    }

    // Extract the first 160 characters as excerpt if no excerpt field
    const excerpt = article.attributes.excerpt ||
      article.attributes.content.substring(0, 160).replace(/\n/g, ' ').trim() + '...'

    return pageMetadata.blogPost({
      title: article.attributes.title,
      excerpt,
      image: article.attributes.featuredImage?.data?.attributes?.url
    })
  } catch (error) {
    console.error('Error generating metadata for blog post:', error)
    return pageMetadata.blog()
  }
}