import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { selectFieldSx } from '../../utils/styles';

interface SortSelectProps {
  sortType: 'mostRecent' | 'mostViews' | 'longReadTime';
  onSortTypeChange: (
    sortType: 'mostRecent' | 'mostViews' | 'longReadTime'
  ) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({
  sortType,
  onSortTypeChange,
}) => {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent) => {
    onSortTypeChange(
      event.target.value as 'mostRecent' | 'mostViews' | 'longReadTime'
    );
  };

  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel
        id="sort-select-label"
        style={{ color: theme.palette.primary.contrastText }}
      >
        Sort By
      </InputLabel>
      <Select
        labelId="sort-select-label"
        value={sortType}
        label="Sort By"
        onChange={handleChange}
        sx={selectFieldSx}
      >
        <MenuItem value="mostRecent">Recent</MenuItem>
        <MenuItem value="mostViews">Views</MenuItem>
        <MenuItem value="longReadTime">Read Time</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelect;
