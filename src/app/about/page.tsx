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
    const fetchAboutPageContent = async () => {
      const fetchedAboutPage = await getAboutPage();
      setAboutPageContent(fetchedAboutPage);
    };
    fetchAboutPageContent();
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
