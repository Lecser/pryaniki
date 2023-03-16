import dayjs from 'dayjs';
import {
  getUserDataSelector,
  getUserDataThunk,
  getUserIsLoading,
  updateUserDataThunk
} from 'entities/user';
import { getUserError } from 'entities/user/model/selectors/getUserError/getUserError';
import { DeleteRowButton } from 'features/tableRowDelete';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAction } from 'shared/lib/hooks/useActions/useActions';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { ErrorSnackbar } from 'shared/ui/ErrorSnackBart/ErrorSnackbar';

import { Alert, AlertProps, Snackbar } from '@mui/material';
import { DataGrid, gridClasses, GridColDef, GridRowModel } from '@mui/x-data-grid';
import { isDeepEqual } from '@mui/x-data-grid/internals';

export const Table = () => {
  const actions = { getUserData: getUserDataThunk, updateUserData: updateUserDataThunk };
  const { getUserData, updateUserData } = useAction(actions);

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

  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

  useEffect(() => {
    getUserData();
  }, []);

  const rows = useAppSelector(getUserDataSelector);
  const isLoading = useAppSelector(getUserIsLoading);
  const error = useAppSelector(getUserError);
  const handleCloseSnackbar = () => setSnackbar(null);
  const handleProcessRowUpdateError = useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel, oldRow: GridRowModel) => {
      if (isDeepEqual(newRow, oldRow)) return newRow;
      updateUserData(newRow);
      return newRow;
    },

    []
  );

  return (
    <>
      <ErrorSnackbar error={error} />
      <DataGrid
        rows={rows || []}
        columns={columns}
        loading={isLoading}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5
        })}
        sx={{
          [`& .${gridClasses.row}`]: {
            backgroundColor: 'rgba(224,224,224,0.55)'
          }
        }}
        disableRowSelectionOnClick
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
};
