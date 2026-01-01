import { Box, Skeleton, Card, CardContent } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Interface segregation - separate interfaces for different skeleton types
interface SkeletonBaseProps {
  width?: string | number
  height?: string | number
}

interface BlogCardSkeletonProps extends SkeletonBaseProps {
  showImage?: boolean
}

// Single Responsibility - Each component has one job
export const TextSkeleton = ({ width = '100%', height = 20 }: SkeletonBaseProps) => {
  const theme = useTheme()
  return (
    <Skeleton
      variant="text"
      width={width}
      height={height}
      sx={{
        bgcolor: theme.palette.action.hover,
        '&::after': {
          background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}20, transparent)`,
        },
      }}
    />
  )
}

export const BlogCardSkeleton = ({ showImage = true }: BlogCardSkeletonProps) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.primary.dark,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {showImage && (
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{
            bgcolor: theme.palette.action.hover,
            '&::after': {
              background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}20, transparent)`,
            },
          }}
        />
      )}
      <CardContent>
        <TextSkeleton width="60%" height={28} />
        <Box sx={{ mt: 1 }}>
          <TextSkeleton width="40%" height={16} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextSkeleton />
          <TextSkeleton />
          <TextSkeleton width="80%" />
        </Box>
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <TextSkeleton width={60} height={16} />
          <TextSkeleton width={60} height={16} />
        </Box>
      </CardContent>
    </Card>
  )
}

export const WorkExperienceSkeleton = () => {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex', gap: 2, height: 400 }}>
      {/* Tab list skeleton */}
      <Box sx={{ width: 200 }}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            height={48}
            sx={{
              mb: 1,
              bgcolor: theme.palette.action.hover,
            }}
          />
        ))}
      </Box>

      {/* Content skeleton */}
      <Box sx={{ flex: 1, p: 2 }}>
        <TextSkeleton width="70%" height={32} />
        <Box sx={{ mt: 1, mb: 3 }}>
          <TextSkeleton width="40%" height={20} />
        </Box>
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <TextSkeleton />
            <TextSkeleton width="90%" />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export const SkillsChartSkeleton = () => {
  const theme = useTheme()

  return (
    <Box>
      <TextSkeleton width={200} height={32} />
      <Box sx={{ mt: 2, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {[1, 2, 3, 4].map((i) => (
          <Box key={i} sx={{ width: 200 }}>
            <TextSkeleton width="60%" height={24} />
            <Box sx={{ mt: 1 }}>
              {[1, 2, 3].map((j) => (
                <TextSkeleton key={j} width="80%" height={16} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export const TestimonialSkeleton = () => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.primary.dark,
        p: 3,
        height: '100%',
      }}
    >
      <Box sx={{ mb: 2 }}>
        <TextSkeleton />
        <TextSkeleton />
        <TextSkeleton width="70%" />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ bgcolor: theme.palette.action.hover }}
        />
        <Box>
          <TextSkeleton width={120} height={20} />
          <TextSkeleton width={80} height={16} />
        </Box>
      </Box>
    </Card>
  )
}

// Composite skeleton for entire page sections
export const AboutPageSkeleton = () => {
  return (
    <Box sx={{ py: 4 }}>
      {/* About section */}
      <Box sx={{ mb: 6 }}>
        <TextSkeleton width={300} height={40} />
        <Box sx={{ mt: 2 }}>
          <TextSkeleton />
          <TextSkeleton />
          <TextSkeleton width="90%" />
        </Box>
      </Box>

      {/* Work Experience */}
      <Box sx={{ mb: 6 }}>
        <TextSkeleton width={250} height={32} />
        <Box sx={{ mt: 3 }}>
          <WorkExperienceSkeleton />
        </Box>
      </Box>

      {/* Skills */}
      <Box sx={{ mb: 6 }}>
        <SkillsChartSkeleton />
      </Box>
    </Box>
  )
}

export const BlogListSkeleton = () => {
  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <BlogCardSkeleton key={i} showImage={false} />
      ))}
    </Box>
  )
}