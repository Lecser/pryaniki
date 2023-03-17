import { AppPaths } from 'app/providers/AppRouter';
import { useNavigate } from 'react-router';
import { PrimaryButton } from 'shared/ui/PrimaryButton/PrimaryButton';

import { Box, Stack, Typography } from '@mui/material';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const onNavigateButtonClick = () => {
    navigate(AppPaths.app);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <Stack spacing={3}>
        <Typography textAlign='center' variant='h4'>
          Page not found 😕
        </Typography>
        <PrimaryButton onClick={onNavigateButtonClick}>Back to home page</PrimaryButton>
      </Stack>
    </Box>
  );
};
