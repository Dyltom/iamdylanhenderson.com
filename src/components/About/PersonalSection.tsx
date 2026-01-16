'use client';

import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PrintIcon from '@mui/icons-material/Print';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { underLineHeaders } from '../../utils/styles';

const FactCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: 'rgba(33, 150, 243, 0.05)',
  border: `1px solid ${theme.palette.secondary.main}20`,
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderColor: theme.palette.secondary.main,
    boxShadow: `0 8px 32px ${theme.palette.secondary.main}40`,
    '& .fact-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
    '&::before': {
      opacity: 1,
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}, transparent)`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: `${theme.palette.secondary.main}15`,
  marginBottom: theme.spacing(2),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: `2px solid ${theme.palette.secondary.main}30`,
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 0,
      transform: 'scale(1.1)',
    },
  },
}));

type PersonalSectionProps = {
  title: string;
};

const PersonalSection: React.FC<PersonalSectionProps> = ({ title }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.contrastText,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        color="secondary"
        sx={underLineHeaders(theme)}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: theme.spacing(2),
          justifyContent: 'center',
        }}
      >
        <FactCard elevation={0}>
          <IconWrapper>
            <DirectionsWalkIcon
              className="fact-icon"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: 32,
                transition: 'all 0.3s ease'
              }}
            />
          </IconWrapper>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', textAlign: 'center' }}>
            <Box component="span" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>70,000 steps</Box> in a single day
            <br />
            <Box component="span" sx={{ fontSize: '0.875rem', opacity: 0.8 }}>Peak ambition in motion</Box>
          </Typography>
        </FactCard>

        <FactCard elevation={0}>
          <IconWrapper>
            <WorkIcon
              className="fact-icon"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: 32,
                transition: 'all 0.3s ease'
              }}
            />
          </IconWrapper>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', textAlign: 'center' }}>
            <Box component="span" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>2 months</Box> coding from Thailand
            <br />
            <Box component="span" sx={{ fontSize: '0.875rem', opacity: 0.8 }}>Work + wanderlust</Box>
          </Typography>
        </FactCard>

        <FactCard elevation={0}>
          <IconWrapper>
            <SportsEsportsIcon
              className="fact-icon"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: 32,
                transition: 'all 0.3s ease'
              }}
            />
          </IconWrapper>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', textAlign: 'center' }}>
            Founded <Box component="span" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>EagleEconomy</Box>
            <br />
            <Box component="span" sx={{ fontSize: '0.875rem', opacity: 0.8 }}>Minecraft server owner at 16</Box>
          </Typography>
        </FactCard>

        <FactCard elevation={0}>
          <IconWrapper>
            <DirectionsCarFilledIcon
              className="fact-icon"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: 32,
                transition: 'all 0.3s ease'
              }}
            />
          </IconWrapper>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', textAlign: 'center' }}>
            <Box component="span" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>Toyota 86</Box> owner
            <br />
            <Box component="span" sx={{ fontSize: '0.875rem', opacity: 0.8 }}>Driving passion meets code</Box>
          </Typography>
        </FactCard>

        <FactCard elevation={0}>
          <IconWrapper>
            <SportsRugbyIcon
              className="fact-icon"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: 32,
                transition: 'all 0.3s ease'
              }}
            />
          </IconWrapper>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', textAlign: 'center' }}>
            <Box component="span" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>Newcastle Knights</Box> fan
            <br />
            <Box component="span" sx={{ fontSize: '0.875rem', opacity: 0.8 }}>Through thick and (mostly) thin</Box>
          </Typography>
        </FactCard>

        <FactCard elevation={0}>
          <IconWrapper>
            <PrintIcon
              className="fact-icon"
              sx={{
                color: theme.palette.secondary.main,
                fontSize: 32,
                transition: 'all 0.3s ease'
              }}
            />
          </IconWrapper>
          <Typography variant="body1" sx={{ fontFamily: 'monospace', textAlign: 'center' }}>
            <Box component="span" sx={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>3D printing</Box> enthusiast
            <br />
            <Box component="span" sx={{ fontSize: '0.875rem', opacity: 0.8 }}>Ender 3 → Bambu P1S</Box>
          </Typography>
        </FactCard>
      </Box>
    </Box>
  );
};

export default PersonalSection;
