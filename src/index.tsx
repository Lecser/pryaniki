import { AppRouter } from 'app/providers/AppRouter';
import { StoreProvider } from 'app/providers/StoreProvider/ui/StoreProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';

import 'app/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StoreProvider>
    <AppRouter />
  </StoreProvider>
);
