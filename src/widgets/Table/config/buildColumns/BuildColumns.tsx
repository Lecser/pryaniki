import dayjs from 'dayjs';
import { DeleteRowButton } from 'features/tableRowDelete';
import { useMemo } from 'react';

import { GridColDef } from '@mui/x-data-grid';

export const BuildColumns = () => {
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'documentStatus',
        headerName: 'Document Status',
        width: 130,
        editable: true
      },
      {
        field: 'documentName',
        headerName: 'Document Name',
        type: 'string',
        width: 130,
        editable: true
      },
      {
        field: 'documentType',
        headerName: 'Document Type',
        type: 'string',
        width: 130,
        editable: true
      },
      {
        field: 'employeeNumber',
        headerName: 'Employee Number',
        type: 'string',
        width: 130,
        editable: true
      },
      {
        field: 'companySignatureName',
        headerName: 'Company Signature Name',
        type: 'string',
        width: 200,
        editable: true
      },
      {
        field: 'employeeSignatureName',
        headerName: 'Employee Signature Name',
        type: 'string',
        width: 200,
        editable: true
      },
      {
        field: 'employeeSigDate',
        headerName: 'Employee Sig Date',
        type: 'string',
        width: 200,
        editable: false,
        renderCell: (params) => dayjs(params.row.employeeSigDate).format('YYYY-MM-DD HH:MM')
      },
      {
        field: 'companySigDate',
        headerName: 'Company Sig Date',
        type: 'string',
        width: 200,
        editable: false,
        renderCell: (params) => dayjs(params.row.employeeSigDate).format('YYYY-MM-DD HH:MM')
      },
      {
        field: 'actions',
        headerName: 'Action',
        type: 'actions',
        width: 100,
        cellClassName: 'actions',

        getActions: ({ id }) => [<DeleteRowButton id={id} />]
      }
    ],
    []
  );
  return columns;
};
