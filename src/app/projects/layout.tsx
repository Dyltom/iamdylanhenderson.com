import { Metadata } from 'next'
import { pageMetadata } from '../../config/metadata'

export const metadata: Metadata = pageMetadata.projects()

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}