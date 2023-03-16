import { Table } from 'entities/table';
import { AddNewDocumentButton } from 'features/addNewDocument';
import React from 'react';

import { Box, Typography } from '@mui/material';

export const TablePage = () => (
  <Box sx={{ height: 400, width: '75%' }}>
    <Typography variant='h3' component='h3' sx={{ textAlign: 'center', mt: 3, mb: 3 }}>
      Documents
    </Typography>
    <AddNewDocumentButton />
    <Table />
  </Box>
);
