import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PrintIcon from '@mui/icons-material/Print';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { underLineHeaders } from '../../utils/styles';

type PersonalSectionProps = {
  title: string;
};

//TODO: use strapi data here
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <DirectionsWalkIcon sx={{ color: theme.palette.secondary.main }} />
          <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
            Ambition in motion: once walked an epic 70,000 steps in a day.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <WorkIcon sx={{ color: theme.palette.secondary.main }} />
          <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
            Blended work with wanderlust, spending two months coding from
            Thailand.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SportsEsportsIcon sx={{ color: theme.palette.secondary.main }} />
          <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
            From gamer to creator: ran EagleEconomy, a Minecraft server, as a
            teen.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <DirectionsCarFilledIcon
            sx={{ color: theme.palette.secondary.main }}
          />
          <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
            A proud owner and enthusiast of the Toyota 86, a driving passion.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <SportsRugbyIcon sx={{ color: theme.palette.secondary.main }} />
          <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
            Avid supporter of the Newcastle Knights, through thick and
            thin(there's been lots of thin).
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <PrintIcon sx={{ color: theme.palette.secondary.main }} />
          <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
            3D printing enthusiast, exploring creations with an Ender 3, and now
            transitioning to a Bambu Lab's P1S.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalSection;
