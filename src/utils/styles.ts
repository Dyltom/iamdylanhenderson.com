import { Theme } from '@mui/material';

export const textFieldSx = {
  '& label': { color: 'primary.contrastText' }, // Non-focused label color
  '& label.Mui-focused': { color: 'secondary.main' }, // Focused label color
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'secondary.main' },
    '&:hover fieldset': { borderColor: 'secondary.main' },
    '&.Mui-focused fieldset': { borderColor: 'secondary.main' },
    '& input, & textarea': { color: 'primary.contrastText' }, // Set color for both input and textarea
    '& .MuiInputBase-input::placeholder': {
      color: 'primary.contrastText',
      opacity: 1,
    },
  },
  marginBottom: 2,
};

export const selectFieldSx = (theme: Theme) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: `${theme.palette.primary.contrastText} !important}`, // Border color on hover (increased specificity)
    },
    '& .MuiSelect-select': {
      color: theme.palette.primary.contrastText, // Text color inside the select
    },
  },
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.secondary.main} !important`,
  },

  marginBottom: 2,
});

export const underLineHeaders = (theme: Theme) => {
  return {
    gridColumn: '1 / -1', // Span across all columns
    fontFamily: 'monospace',
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      height: '3px',
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0',
      background: theme.palette.secondary.main,
      transition: 'width 0.3s ease-in-out',
    },
    '&:hover::after': {
      width: '100%',
    },
  };
};

export const pageMargin = {
  margin: '0 auto',
  marginTop: 16,
  paddingLeft: 2,
  paddingRight: 2,
};

export const maxContentWidth = {
  maxWidth: { xs: '90vw', md: '70vw' },
};
