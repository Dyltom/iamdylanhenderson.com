'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Fade,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import AppsIcon from '@mui/icons-material/Apps'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'
import ProjectCard, { Project } from '../../components/Projects/ProjectCard'
import { underLineHeaders } from '../../utils/styles'

// Mock data - Replace with actual data from Strapi
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management',
    longDescription: 'Built a comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, payment integration with Stripe, and admin dashboard for inventory management.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Redux'],
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://example-ecommerce.com',
    featured: true,
    category: 'fullstack',
  },
  {
    id: '2',
    title: 'Task Management API',
    description: 'RESTful API for task management with team collaboration features',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Socket.io'],
    githubUrl: 'https://github.com/yourusername/task-api',
    category: 'backend',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'Interactive weather dashboard with location-based forecasts',
    technologies: ['React', 'D3.js', 'OpenWeather API', 'Tailwind'],
    githubUrl: 'https://github.com/yourusername/weather-app',
    liveUrl: 'https://weather-app.example.com',
    featured: true,
    category: 'frontend',
  },
  // Add more projects...
]

export default function ProjectsPage() {
  const theme = useTheme()
  const [filter, setFilter] = useState<string>('all')

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string | null
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter)
    }
  }

  const filteredProjects = filter === 'all'
    ? mockProjects
    : mockProjects.filter(project =>
        filter === 'featured' ? project.featured : project.category === filter
      )

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            ...underLineHeaders(theme),
            color: theme.palette.primary.contrastText,
            fontWeight: 700,
            mb: 2,
          }}
        >
          Projects
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: '800px',
          }}
        >
          A collection of my recent work, ranging from full-stack applications to
          experimental projects. Each project represents a unique challenge and
          learning opportunity.
        </Typography>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          sx={{
            backgroundColor: theme.palette.primary.dark,
            '& .MuiToggleButton-root': {
              color: theme.palette.primary.contrastText,
              borderColor: theme.palette.divider,
              '&.Mui-selected': {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                },
              },
            },
          }}
        >
          <ToggleButton value="all">
            <AllInclusiveIcon sx={{ mr: 1, fontSize: 20 }} />
            All
          </ToggleButton>
          <ToggleButton value="featured">
            <ViewModuleIcon sx={{ mr: 1, fontSize: 20 }} />
            Featured
          </ToggleButton>
          <ToggleButton value="fullstack">
            <AppsIcon sx={{ mr: 1, fontSize: 20 }} />
            Full Stack
          </ToggleButton>
          <ToggleButton value="frontend">Frontend</ToggleButton>
          <ToggleButton value="backend">Backend</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)'
          },
          gap: 4
        }}
      >
        {filteredProjects.map((project, index) => (
          <Fade
            key={project.id}
            in={true}
            timeout={300}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Box>
              <ProjectCard project={project} />
            </Box>
          </Fade>
        ))}
      </Box>

      {filteredProjects.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: theme.palette.text.secondary }}
          >
            No projects found in this category.
          </Typography>
        </Box>
      )}
    </Container>
  )
}