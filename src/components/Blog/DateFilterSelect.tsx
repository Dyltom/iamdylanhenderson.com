import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { selectFieldSx } from '../../utils/styles';

interface DateFilterSelectProps {
  dateFilter: 'year' | 'week' | 'day' | '';
  onChange: (event: SelectChangeEvent<'year' | 'week' | 'day' | ''>) => void;
}

const DateFilterSelect: React.FC<DateFilterSelectProps> = ({
  dateFilter,
  onChange,
}) => {
  const theme = useTheme();

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel
        id="date-filter-label"
        style={{ color: theme.palette.primary.contrastText }}
      >
        Filter By
      </InputLabel>
      <Select
        labelId="date-filter-label"
        value={dateFilter}
        label="Filter By"
        onChange={onChange}
        sx={selectFieldSx(theme)}
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="day">Last Day</MenuItem>
        <MenuItem value="week">Last Week</MenuItem>
        <MenuItem value="year">Last Year</MenuItem>
      </Select>
    </FormControl>
  );
};

export default DateFilterSelect;
