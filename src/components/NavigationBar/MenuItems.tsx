import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { memo } from 'react';
import { links } from '../../utils/consts';

const MenuItems: React.FC = memo(() => {
  return (
    <Box sx={{ display: 'flex', flexGrow: 0 }}>
      {links.map(({ text, href }) => {
        return (
          <Button
            key={text}
            component={Link}
            href={href}
            color="secondary"
            sx={{ textTransform: 'none' }}
          >
            {text}
          </Button>
        );
      })}
    </Box>
  );
});

MenuItems.displayName = 'MenuItems';

export default MenuItems;
