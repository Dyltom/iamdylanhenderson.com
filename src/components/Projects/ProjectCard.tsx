import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  IconButton,
  CardMedia,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'
import CodeIcon from '@mui/icons-material/Code'

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image?: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'other'
}

interface ProjectCardProps {
  project: Project
  detailed?: boolean
}

const ProjectCard = ({ project, detailed = false }: ProjectCardProps) => {
  const theme = useTheme()

  const getCategoryColor = (category: Project['category']) => {
    const colors = {
      frontend: theme.palette.info.main,
      backend: theme.palette.warning.main,
      fullstack: theme.palette.secondary.main,
      mobile: theme.palette.primary.main,
      other: theme.palette.grey[500],
    }
    return colors[category]
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.primary.dark,
        border: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 24px ${theme.palette.secondary.main}20`,
          borderColor: theme.palette.secondary.main,
        },
      }}
    >
      {project.image && (
        <CardMedia
          component="img"
          height={detailed ? 300 : 200}
          image={project.image}
          alt={project.title}
          sx={{
            objectFit: 'cover',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <CodeIcon sx={{ color: getCategoryColor(project.category), fontSize: 20 }} />
          <Typography
            gutterBottom
            variant="h5"
            component="h3"
            sx={{ mb: 0, color: theme.palette.primary.contrastText }}
          >
            {project.title}
          </Typography>
        </Box>

        {project.featured && (
          <Chip
            label="Featured"
            size="small"
            sx={{
              mb: 1,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
            }}
          />
        )}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {detailed && project.longDescription
            ? project.longDescription
            : project.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {project.technologies.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              variant="outlined"
              sx={{
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.main,
                fontSize: '0.75rem',
              }}
            />
          ))}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        {project.githubUrl && (
          <Button
            size="small"
            startIcon={<GitHubIcon />}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: theme.palette.primary.contrastText,
              '&:hover': {
                color: theme.palette.secondary.main,
              },
            }}
          >
            Code
          </Button>
        )}
        {project.liveUrl && (
          <Button
            size="small"
            startIcon={<LaunchIcon />}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: theme.palette.primary.contrastText,
              '&:hover': {
                color: theme.palette.secondary.main,
              },
            }}
          >
            Live Demo
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default ProjectCard