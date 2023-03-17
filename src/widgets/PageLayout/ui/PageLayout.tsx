import { PropsWithChildren } from 'react';
import { Navbar } from 'widgets/Navbar';

import { Box } from '@mui/material';

export const PageLayout = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='calc(100vh - 65px)'
      >
        {children}
      </Box>
    </>
  );
};
