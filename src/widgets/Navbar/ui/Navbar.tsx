import { LogoutButton } from 'features/logout';

import { AppBar, Toolbar, Typography } from '@mui/material';

export const Navbar = () => (
  <AppBar sx={{ height: '65px', backgroundColor: '#212121' }} position='sticky'>
    <Toolbar>
      <Typography variant='h6' component='span' sx={{ flexGrow: 1 }}>
        Test app
      </Typography>
      <LogoutButton>Log out</LogoutButton>
    </Toolbar>
  </AppBar>
);
