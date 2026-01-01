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
    const excerpt = article.shortDescription ||
      (article.content && article.content[0]?.children[0]?.text?.substring(0, 160).replace(/\n/g, ' ').trim() + '...') ||
      'Read more...'

    return pageMetadata.blogPost({
      title: article.title,
      excerpt,
      // TODO: Add image support when available
      image: undefined
    })
  } catch (error) {
    console.error('Error generating metadata for blog post:', error)
    return pageMetadata.blog()
  }
}