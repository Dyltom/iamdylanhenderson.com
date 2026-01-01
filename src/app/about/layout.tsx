import { Metadata } from 'next'
import { pageMetadata } from '../../config/metadata'

export const metadata: Metadata = pageMetadata.about()

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}