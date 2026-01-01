import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { memo } from 'react';
import { links } from '../../utils/consts';

const MenuItems: React.FC = memo(() => {
  return (
    <Box sx={{ display: 'flex', flexGrow: 0 }}>
      {links.map(({ text, href }) => {
        return (
          <Link key={text} href={href} passHref legacyBehavior>
            <Button
              component="a"
              color="secondary"
              sx={{ textTransform: 'none' }}
            >
              {text}
            </Button>
          </Link>
        );
      })}
    </Box>
  );
});

MenuItems.displayName = 'MenuItems';

export default MenuItems;
