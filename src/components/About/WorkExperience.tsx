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
import { getWorkExperience } from '../../fetchers/workExperience';
import { commonDateFormatter } from '../../utils/date';
import { underLineHeaders } from '../../utils/styles';
import { WorkExperience as WorkExperienceType } from '../../utils/types';
import { CV_DATA } from '../../utils/cvTypes';

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

  useEffect(() => {
    const fetchWorkExperience = async () => {
      const fetchedWorkExperience = await getWorkExperience();
      if (fetchedWorkExperience && fetchedWorkExperience.length > 0) {
        setWorkExperience(fetchedWorkExperience);
      } else {
        // Use CV data as fallback
        const cvWorkExperience = CV_DATA.experience.map((exp) => ({
          attributes: {
            company: exp.company,
            title: exp.title,
            startDate: exp.startDate,
            endDate: exp.endDate,
            points: exp.responsibilities,
          },
        })) as WorkExperienceType[];
        setWorkExperience(cvWorkExperience);
      }
    };
    fetchWorkExperience();
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
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography
        variant="h5"
        color="secondary.contrastText"
        gutterBottom
        sx={underLineHeaders(theme)}
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
                  {company.attributes.points.map((point, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      sx={{ color: theme.palette.secondary.light }}
                    >
                      - {point}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Paper>
      </Box>
    </Container>
  );
};

export default WorkExperience;
