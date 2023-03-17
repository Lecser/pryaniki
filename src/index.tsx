import { AppRouter } from 'app/providers/AppRouter';
import { StoreProvider } from 'app/providers/StoreProvider/ui/StoreProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { themeConfig } from 'shared/config/themeConfig';

import { ThemeProvider } from '@mui/material';

import 'app/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreProvider>
    <ThemeProvider theme={themeConfig}>
      <AppRouter />
    </ThemeProvider>
  </StoreProvider>
);
