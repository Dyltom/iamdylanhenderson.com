import { Metadata } from 'next'
import { pageMetadata } from '../../config/metadata'

export const metadata: Metadata = pageMetadata.blog()

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}