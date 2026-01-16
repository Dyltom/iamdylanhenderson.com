import { TextField, Box } from '@mui/material';
import { textFieldSx } from '../../../utils/styles';
import { EmailRequestType } from '../../../utils/types';
import { useTheme } from '@mui/material/styles';

type FieldsProps = {
  formState: EmailRequestType;
  setFormState: React.Dispatch<React.SetStateAction<EmailRequestType>>;
};

const Fields: React.FC<FieldsProps> = ({ formState, setFormState }) => {
  const theme = useTheme();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const enhancedTextFieldSx = {
    ...textFieldSx,
    '& label': {
      color: theme.palette.primary.contrastText,
      fontFamily: 'monospace',
      '&::before': {
        content: '"→ "',
        color: theme.palette.secondary.main,
      }
    },
    '& .MuiOutlinedInput-root': {
      ...textFieldSx['& .MuiOutlinedInput-root'],
      fontFamily: 'monospace',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
          fullWidth
          placeholder="Dylan Henderson"
          sx={enhancedTextFieldSx}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          required
          fullWidth
          placeholder="your.email@example.com"
          sx={enhancedTextFieldSx}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          multiline
          rows={6}
          fullWidth
          placeholder="Tell me about your project..."
          sx={enhancedTextFieldSx}
        />
      </Box>
    </>
  );
};

export default Fields;
