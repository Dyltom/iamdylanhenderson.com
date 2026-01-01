import { Metadata } from 'next'
import { pageMetadata } from '../../config/metadata'

export const metadata: Metadata = pageMetadata.cv()

export default function CVLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}