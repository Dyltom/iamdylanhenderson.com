'use client';

import { Box, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import type { AboutPage } from '../../utils/types';

import AboutMeSection from '../../components/About/AboutMeSection';
import PersonalSection from '../../components/About/PersonalSection';
import SkillsChart from '../../components/About/SkillsChart';
import Testimonials from '../../components/About/Testimonials';
import WorkExperience from '../../components/About/WorkExperience';
import MatrixRain from '../../components/MatrixRain';
import TerminalEasterEgg from '../../components/TerminalEasterEgg';

export default function AboutPage() {
  const theme = useTheme();
  const [aboutPageContent, setAboutPageContent] = useState<
    AboutPage | undefined
  >(undefined);

  useEffect(() => {
    // Mock the API response with static content
    setAboutPageContent({
      aboutTitle: 'About Me',
      aboutContent: "Hello! I'm Dylan, and I thrive on solving challenges with technology. My coding journey began when I crafted my first Minecraft plugin back in 2014, igniting my passion for continuous learning. Over the years, I've had the privilege of working with four startups and a larger company, where I've tackled complex scenarios and worn many hats, gaining invaluable experience along the way.",
      workExperienceTitle: 'Work Experience',
      skillsTitle: 'My Technical Stack',
      skillsChartText: 'Languages, frameworks, and tools I work with daily',
      testimonialsTitle: 'What People Say About Me',
      interestingFactsTitle: 'A Little More About Me'
    });
  }, []);

  if (!aboutPageContent) {
    return null;
  }

  const SectionDivider = () => (
    <Box
      sx={{
        height: { xs: '80px', md: '120px' },
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '200px',
          height: '1px',
          background: `linear-gradient(90deg,
            transparent 0%,
            ${theme.palette.secondary.main}20 20%,
            ${theme.palette.secondary.main}40 50%,
            ${theme.palette.secondary.main}20 80%,
            transparent 100%)`,
          opacity: 0.5,
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <MatrixRain />
      <TerminalEasterEgg />
      <AboutMeSection content={aboutPageContent} />
      <SectionDivider />
      <WorkExperience title={aboutPageContent.workExperienceTitle} />
      <SectionDivider />
      <SkillsChart
        title={aboutPageContent.skillsTitle}
        keyText={aboutPageContent.skillsChartText}
      />
      <SectionDivider />
      <Testimonials title={aboutPageContent.testimonialsTitle} />
      <SectionDivider />
      <PersonalSection title={aboutPageContent.interestingFactsTitle} />
    </Box>
  );
}
