import { PrimaryButton } from 'shared/ui/PrimaryButton/PrimaryButton';

import { Box, Typography } from '@mui/material';

export const ErrorPage = () => {
  const onReloadButtonClick = () => {
    window.location.reload();
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <Typography mb='10px' variant='h4'>
        An unexpected error occurred 😕
      </Typography>
      <PrimaryButton variant='contained' onClick={onReloadButtonClick}>
        Reload Page
      </PrimaryButton>
    </Box>
  );
};
