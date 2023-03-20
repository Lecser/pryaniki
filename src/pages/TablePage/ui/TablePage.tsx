import { AddNewDocumentButton, AddNewDocumentModal } from 'features/addNewDocument';
import React from 'react';
import { Table } from 'widgets/Table';

import { Box, Typography } from '@mui/material';

const TablePage = () => (
  <Box sx={{ height: 500, width: '75%' }}>
    <Typography
      variant='h3'
      fontWeight='bold'
      component='h3'
      sx={{ textAlign: 'center', mt: 3, mb: 3 }}
    >
      Documents
    </Typography>
    <AddNewDocumentModal />
    <AddNewDocumentButton />
    <Table />
  </Box>
);
export default TablePage;
