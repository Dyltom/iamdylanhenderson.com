import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PrintIcon from '@mui/icons-material/Print';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsRugbyIcon from '@mui/icons-material/SportsRugby';
import WorkIcon from '@mui/icons-material/Work';
import { Box, Typography, GlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { underLineHeaders } from '../../utils/styles';

type PersonalSectionProps = {
  title: string;
};

const PersonalSection: React.FC<PersonalSectionProps> = ({ title }) => {
  const theme = useTheme();

  return (
    <>
      <GlobalStyles
        styles={{
          '@keyframes walk': {
            '0%, 100%': { transform: 'translateX(0)' },
            '25%': { transform: 'translateX(-3px) rotate(-5deg)' },
            '75%': { transform: 'translateX(3px) rotate(5deg)' },
          },
          '@keyframes drive': {
            '0%': { transform: 'translateX(-10px)' },
            '100%': { transform: 'translateX(10px)' },
          },
          '@keyframes type': {
            '0%, 100%': { transform: 'rotate(0deg)' },
            '25%': { transform: 'rotate(-10deg)' },
            '75%': { transform: 'rotate(10deg)' },
          },
          '@keyframes bounce': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
          '@keyframes print': {
            '0%, 100%': { transform: 'translateY(0)' },
            '33%': { transform: 'translateY(2px)' },
            '66%': { transform: 'translateY(-2px)' },
          },
        }}
      />
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: theme.spacing(3),
          justifyContent: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3),
            backgroundColor: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              borderColor: theme.palette.secondary.main,
              '& .walk-icon': {
                animation: 'walk 0.5s ease-in-out infinite'
              }
            }
          }}
        >
          <DirectionsWalkIcon
            className="walk-icon"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: '2.5rem',
              mb: 2,
              transition: 'transform 0.3s ease'
            }} />
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'monospace',
              textAlign: 'center',
              color: theme.palette.secondary.light
            }}
          >
            Ambition in motion: once walked an epic 70,000 steps in a day.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3),
            backgroundColor: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              borderColor: theme.palette.secondary.main,
              '& .work-icon': {
                animation: 'type 0.4s ease-in-out infinite'
              }
            }
          }}
        >
          <WorkIcon
            className="work-icon"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: '2.5rem',
              mb: 2,
              transition: 'transform 0.3s ease'
            }} />
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'monospace',
              textAlign: 'center',
              color: theme.palette.secondary.light
            }}
          >
            Blended work with wanderlust, spending two months coding from
            Thailand.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3),
            backgroundColor: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              borderColor: theme.palette.secondary.main,
              '& .game-icon': {
                animation: 'bounce 0.5s ease-in-out infinite'
              }
            }
          }}
        >
          <SportsEsportsIcon
            className="game-icon"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: '2.5rem',
              mb: 2,
              transition: 'transform 0.3s ease'
            }} />
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'monospace',
              textAlign: 'center',
              color: theme.palette.secondary.light
            }}
          >
            From gamer to creator: ran EagleEconomy, a Minecraft server, as a
            teen.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3),
            backgroundColor: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              borderColor: theme.palette.secondary.main,
              '& .car-icon': {
                animation: 'drive 1s ease-in-out infinite'
              }
            }
          }}
        >
          <DirectionsCarFilledIcon
            className="car-icon"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: '2.5rem',
              mb: 2,
              transition: 'transform 0.3s ease'
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'monospace',
              textAlign: 'center',
              color: theme.palette.secondary.light
            }}
          >
            A proud owner and enthusiast of the Toyota 86, a driving passion.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3),
            backgroundColor: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              borderColor: theme.palette.secondary.main,
              '& .rugby-icon': {
                animation: 'spin 1s linear infinite'
              }
            }
          }}
        >
          <SportsRugbyIcon
            className="rugby-icon"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: '2.5rem',
              mb: 2,
              transition: 'transform 0.3s ease'
            }} />
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'monospace',
              textAlign: 'center',
              color: theme.palette.secondary.light
            }}
          >
            Avid supporter of the Newcastle Knights, through thick and
            thin(there's been lots of thin).
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3),
            backgroundColor: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.light}`,
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              borderColor: theme.palette.secondary.main,
              '& .print-icon': {
                animation: 'print 0.5s ease-in-out infinite'
              }
            }
          }}
        >
          <PrintIcon
            className="print-icon"
            sx={{
              color: theme.palette.secondary.main,
              fontSize: '2.5rem',
              mb: 2,
              transition: 'transform 0.3s ease'
            }} />
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'monospace',
              textAlign: 'center',
              color: theme.palette.secondary.light
            }}
          >
            3D printing enthusiast, exploring creations with an Ender 3, and now
            transitioning to a Bambu Lab's P1S.
          </Typography>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default PersonalSection;