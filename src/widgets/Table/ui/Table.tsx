import {
  getUserDataSelector,
  getUserDataThunk,
  getUserError,
  getUserIsLoading,
  updateUserDataThunk
} from 'entities/user';
import { User } from 'entities/user/model/types/userSchema';
import { useCallback, useEffect, useState } from 'react';
import { useActions } from 'shared/lib/hooks/useActions/useActions';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { ErrorSnackbar } from 'shared/ui/ErrorSnackbar/ErrorSnackbar';

import { Alert, AlertProps, Snackbar } from '@mui/material';
import { DataGrid, gridClasses, GridRowModel } from '@mui/x-data-grid';
import { isDeepEqual } from '@mui/x-data-grid/internals';

import { BuildColumns } from '../config/buildColumns/BuildColumns';

export const Table = () => {
  const actions = { getUserData: getUserDataThunk, updateUserData: updateUserDataThunk };
  const { getUserData, updateUserData } = useActions(actions);

  const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

  useEffect(() => {
    getUserData();
  }, []);

  const tableRows = useAppSelector(getUserDataSelector);
  const isLoading = useAppSelector(getUserIsLoading);
  const error = useAppSelector(getUserError);
  const handleCloseSnackbar = () => setSnackbar(null);
  const handleProcessRowUpdateError = useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel<User>, oldRow: GridRowModel<User>) => {
      if (isDeepEqual(newRow, oldRow)) return oldRow;
      updateUserData(newRow);
      return newRow;
    },

    []
  );

  return (
    <>
      <ErrorSnackbar error={error} />
      <DataGrid
        rows={tableRows || []}
        columns={BuildColumns()}
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
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
};
