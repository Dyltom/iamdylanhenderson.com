import { Box, Container, Typography, Paper, Chip, Stack } from '@mui/material';
import { CV_DATA } from '../../utils/cvTypes';

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* About Me Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          About Me
        </Typography>
        <Typography variant="body1" paragraph color="text.secondary">
          {CV_DATA.summary}
        </Typography>
      </Box>

      {/* Work Experience Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom color="primary">
          Work Experience
        </Typography>
        <Stack spacing={3}>
          {CV_DATA.experience.map((job, index) => (
            <Paper key={index} sx={{ p: 3 }} elevation={1}>
              <Typography variant="h6" color="primary">
                {job.title} at {job.company}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {job.location} | {job.startDate} - {job.endDate}
              </Typography>
              <Box component="ul" sx={{ mt: 2, pl: 2 }}>
                {job.responsibilities.map((resp, idx) => (
                  <Box component="li" key={idx} sx={{ mb: 1 }}>
                    <Typography variant="body2">{resp}</Typography>
                  </Box>
                ))}
              </Box>
              {job.techStack && (
                <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }} color="text.secondary">
                  Tech Stack: {job.techStack}
                </Typography>
              )}
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* Skills Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom color="primary">
          Skills
        </Typography>
        <Stack spacing={2}>
          {CV_DATA.skills.map((skillCategory, index) => {
            const [category, ...skills] = skillCategory.split(' (');
            const skillList = skills.join(' (').replace(')', '').split(', ');

            return (
              <Box key={index}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {category}
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {skillList.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      size="small"
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* Education Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom color="primary">
          Education
        </Typography>
        {CV_DATA.education.map((edu, index) => (
          <Paper key={index} sx={{ p: 3 }} elevation={1}>
            <Typography variant="h6">{edu.degree}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {edu.institution} | Completed: {edu.completionDate}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Contact Information */}
      <Box>
        <Typography variant="h4" component="h2" gutterBottom color="primary">
          Contact
        </Typography>
        <Stack spacing={2}>
          <Typography variant="body1">
            <strong>Email:</strong> {CV_DATA.personalInfo.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {CV_DATA.personalInfo.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Location:</strong> {CV_DATA.personalInfo.location}
          </Typography>
          <Typography variant="body1">
            <strong>LinkedIn:</strong>{' '}
            <a href={CV_DATA.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
              Profile
            </a>
          </Typography>
          <Typography variant="body1">
            <strong>GitHub:</strong>{' '}
            <a href={CV_DATA.personalInfo.github} target="_blank" rel="noopener noreferrer">
              {CV_DATA.personalInfo.github?.split('/').pop()}
            </a>
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
}