'use client';

import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import { useState } from 'react';
import DrawerContent from './DrawerContent';

const DrawerComponent: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            sx: { bgcolor: 'primary.main' }, // Set the background color
          },
        }}
      >
        <DrawerContent toggleDrawer={toggleDrawer} />
      </Drawer>
      <IconButton
        edge="end"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        color="secondary"
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
