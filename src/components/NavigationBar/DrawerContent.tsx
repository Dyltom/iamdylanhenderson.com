'use client';

import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
} from '@mui/material';
import Link from 'next/link';
import { Fragment, memo } from 'react';
import { links } from '../../utils/consts';
import theme from '../ThemeRegistry/theme';

interface DrawerContentProps {
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const DrawerContent: React.FC<DrawerContentProps> = memo(({ toggleDrawer }) => {

  return (
    <Box
      sx={{
        width: 250,
        height: '100%', // Ensure the box takes full height
        bgcolor: 'primary.main', // Set the background color to match the primary theme color
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {links.map(({ text, href }, index, array) => {
          return (
            <Fragment key={text}>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  href={href}
                  sx={{
                    justifyContent: 'flex-start',
                    textTransform: 'none',
                    color: 'secondary.main',
                  }}
                >
                  {text}
                </ListItemButton>
              </ListItem>
              {index < array.length - 1 && (
                <Divider sx={{ bgcolor: theme.palette.secondary.main }} />
              )}
            </Fragment>
          );
        })}
      </List>
    </Box>
  );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
