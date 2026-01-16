'use client';

import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAboutPage } from '../../fetchers/pages';
import type { AboutPage } from '../../utils/types';

import AboutMeSection from '../../components/About/AboutMeSection';
import PersonalSection from '../../components/About/PersonalSection';
import SkillsChart from '../../components/About/SkillsChart';
import Testimonials from '../../components/About/Testimonials';
import WorkExperience from '../../components/About/WorkExperience';

export default function AboutPage() {
  const [aboutPageContent, setAboutPageContent] = useState<
    AboutPage | undefined
  >(undefined);

  useEffect(() => {
    // Mock the API response with static content
    setAboutPageContent({
      aboutTitle: 'About Me',
      aboutContent: "Hello! I'm Dylan, and I thrive on solving challenges with technology. My coding journey began when I crafted my first Minecraft plugin back in 2014, igniting my passion for continuous learning. Over the years, I've had the privilege of working with four startups and a larger company, where I've tackled complex scenarios and worn many hats, gaining invaluable experience along the way.",
      workExperienceTitle: 'Work Experience',
      skillsTitle: 'My Technical Skills',
      skillsChartText: 'Each marker represents 1 year of experience.',
      testimonialsTitle: 'What People Say About Me',
      interestingFactsTitle: 'A Little More About Me'
    });
  }, []);

  if (!aboutPageContent) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <AboutMeSection content={aboutPageContent} />
      <WorkExperience title={aboutPageContent.workExperienceTitle} />
      <SkillsChart
        title={aboutPageContent.skillsTitle}
        keyText={aboutPageContent.skillsChartText}
      />
      <Testimonials title={aboutPageContent.testimonialsTitle} />
      <PersonalSection title={aboutPageContent.interestingFactsTitle} />
    </Box>
  );
}
