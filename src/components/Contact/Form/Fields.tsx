import { TextField, Box } from '@mui/material';
import { textFieldSx } from '../../../utils/styles';
import { EmailRequestType } from '../../../utils/types';

type FieldsProps = {
  formState: EmailRequestType;
  setFormState: React.Dispatch<React.SetStateAction<EmailRequestType>>;
};

const Fields: React.FC<FieldsProps> = ({ formState, setFormState }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
          fullWidth
          sx={textFieldSx}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          required
          fullWidth
          sx={textFieldSx}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          multiline
          rows={4}
          fullWidth
          sx={textFieldSx}
        />
      </Box>
    </>
  );
};

export default Fields;
