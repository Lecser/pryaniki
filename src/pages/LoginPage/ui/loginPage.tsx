import { LoginForm } from 'features/auth/ui/LoginForm/LoginForm';

import { Box, Paper } from '@mui/material';

export const LoginPage = () => (
  <Box
    display='flex'
    flexDirection='column'
    justifyContent='center'
    alignItems='center'
    minHeight='100vh'
  >
    <Paper elevation={2} sx={{ padding: '30px' }}>
      <LoginForm />
    </Paper>
  </Box>
);
