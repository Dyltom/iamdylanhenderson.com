import {
  Box,
  Container,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { commonDateFormatter } from '../../utils/date';
import { underLineHeaders } from '../../utils/styles';
import { WorkExperience as WorkExperienceType } from '../../utils/types';
import { CV_DATA } from '../../utils/cvTypes';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

type WorkExperienceProps = {
  title: string;
};

const WorkExperience: React.FC<WorkExperienceProps> = ({ title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(0);
  const [workExperience, setWorkExperience] = useState<
    WorkExperienceType[] | undefined
  >([]);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    // Use CV data directly
    const cvWorkExperience = CV_DATA.experience.map((exp, index) => ({
      id: index.toString(),
      attributes: {
        company: exp.company,
        title: exp.title,
        startDate: exp.startDate,
        endDate: exp.endDate,
        points: exp.responsibilities,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString()
      },
    })) as WorkExperienceType[];
    setWorkExperience(cvWorkExperience);
  }, []);

  if (!workExperience) {
    return null;
  }

  const handleChange = (event: React.SyntheticEvent, newIndex: number) => {
    setSelectedCompanyIndex(newIndex);
  };

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.secondary.main,
    },
  };

  return (
    <Box
      ref={ref}
      sx={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateX(0)'
          : isMobile ? 'translateX(-20px)' : 'translateX(-40px)',
        transition: 'all 0.8s ease-out',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          color="secondary.contrastText"
          gutterBottom
          sx={{
            ...underLineHeaders(theme),
            textAlign: 'center',
            mb: 4
          }}
        >
          {title}
        </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.secondary.contrastText,
          overflow: 'hidden',
          ...customScrollbarStyles,
        }}
      >
        <Tabs
          orientation={isMobile ? 'horizontal' : 'vertical'}
          value={selectedCompanyIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderRight: isMobile
              ? 'none'
              : `1px solid ${theme.palette.divider}`,
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.secondary.light,
            },
            '& .MuiTab-root': {
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontFamily: 'monospace',
              color: theme.palette.primary.contrastText,
              '&.Mui-selected': {
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.primary.light,
              },
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            },
            minWidth: '200px',
            pr: theme.spacing(2),
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {workExperience.map((company, index) => (
            <Tab label={company.attributes.company} key={index} />
          ))}
        </Tabs>

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.secondary.contrastText,
            fontFamily: 'monospace',
            p: theme.spacing(2),
            maxHeight: '400px',
            overflowY: 'auto',
            ...customScrollbarStyles,
          }}
        >
          {workExperience.map((company, index) => (
            <Box
              key={index}
              role="tabpanel"
              hidden={selectedCompanyIndex !== index}
            >
              {selectedCompanyIndex === index && (
                <Box sx={{}}>
                  <Typography variant="h6" color="secondary" gutterBottom>
                    {company.attributes.title} at {company.attributes.company}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.secondary.light }}
                  >
                    {company.attributes.startDate.includes('/')
                      ? company.attributes.startDate
                      : commonDateFormatter(company.attributes.startDate)} -{' '}
                    {company.attributes.endDate === 'Present'
                      ? company.attributes.endDate
                      : company.attributes.endDate.includes('/')
                      ? company.attributes.endDate
                      : commonDateFormatter(company.attributes.endDate)}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {/* Show only first 2 points initially */}
                    {company.attributes.points.slice(0, 2).map((point, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          mb: 1.5,
                        }}
                      >
                        <Typography
                          sx={{
                            color: theme.palette.secondary.main,
                            mr: 1,
                            fontSize: '1.2rem',
                          }}
                        >
                          ▸
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.primary.contrastText,
                            lineHeight: 1.6,
                            flex: 1,
                          }}
                        >
                          {point}
                        </Typography>
                      </Box>
                    ))}

                    {/* Show remaining as a summary */}
                    {company.attributes.points.length > 2 && (
                      <Box
                        sx={{
                          mt: 2,
                          p: 2,
                          backgroundColor: 'rgba(0, 255, 0, 0.05)',
                          borderLeft: `3px solid ${theme.palette.secondary.main}`,
                          borderRadius: '0 4px 4px 0',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: theme.palette.secondary.main,
                            fontWeight: 600,
                            display: 'block',
                            mb: 1,
                          }}
                        >
                          Key Achievements:
                        </Typography>
                        <Box>
                          {company.attributes.points.slice(2).map((achievement, achievementIdx) => (
                            <Box
                              key={achievementIdx}
                              sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                mb: 0.5,
                              }}
                            >
                              <Typography
                                sx={{
                                  color: theme.palette.secondary.main,
                                  mr: 0.5,
                                  fontSize: '0.8rem',
                                }}
                              >
                                •
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: theme.palette.primary.contrastText,
                                  fontStyle: 'italic',
                                  lineHeight: 1.5,
                                  fontSize: '0.9rem',
                                  flex: 1,
                                }}
                              >
                                {achievement}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Paper>
      </Box>
      </Container>
    </Box>
  );
};

export default WorkExperience;
