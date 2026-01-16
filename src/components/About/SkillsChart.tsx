// components/SkillsDisplay.tsx
import { Box, LinearProgress, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { getSkills } from '../../fetchers/skill';
import { underLineHeaders } from '../../utils/styles';
import { Skill } from '../../utils/types';
import { CV_DATA } from '../../utils/cvTypes';

const SkillBarContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '10px',
  borderRadius: '5px',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper, // Container background
  flex: 1,
}));

const SkillBarProgress = styled(LinearProgress)(({ theme }) => ({
  height: '100%',
  borderRadius: '5px',
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.secondary.main, // Bar color
    transition: 'width 2s ease',
  },
}));

const ExperienceMarker = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '2px',
  backgroundColor: theme.palette.primary.contrastText, // Marker color
  zIndex: 1,
}));

type SkillsDisplayProps = {
  title: string;
  keyText: string;
};

const SkillsDisplay: React.FC<SkillsDisplayProps> = ({ title, keyText }) => {
  const theme = useTheme();
  const [skills, setSkills] = useState<Skill[] | undefined>(undefined);

  useEffect(() => {
    const fetchSkills = async () => {
      const fetchedSkills = await getSkills();
      setSkills(fetchedSkills);
    };
    fetchSkills();
  }, []);

  if (!skills || skills.length === 0) {
    return null;
  }

  const maxSkillExperience = Math.max(
    ...skills.map((skill) => skill.attributes.experience)
  );
  const maxExperience = Math.ceil(maxSkillExperience);

  return (
    <Box sx={{ color: theme.palette.primary.contrastText, padding: '1rem' }}>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        sx={underLineHeaders(theme)}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        sx={{ fontFamily: 'monospace', textAlign: 'center', marginTop: '1rem' }}
      >
        {keyText}
      </Typography>
      {skills.map((skill, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              width: '100px',
              fontFamily: 'monospace',
              color: theme.palette.secondary.light,
              marginRight: '1rem',
            }}
          >
            {skill.attributes.name}
          </Typography>
          <SkillBarContainer>
            {Array.from({ length: Math.floor(maxExperience) }).map((_, i) => (
              <ExperienceMarker
                key={i}
                sx={{
                  left: `${((i + 1) / maxExperience) * 100}%`,
                }}
              />
            ))}
            <SkillBarProgress
              variant="determinate"
              value={(skill.attributes.experience / maxExperience) * 100}
            />
          </SkillBarContainer>
        </Box>
      ))}
    </Box>
  );
};

export default SkillsDisplay;
