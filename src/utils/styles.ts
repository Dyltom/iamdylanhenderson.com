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
