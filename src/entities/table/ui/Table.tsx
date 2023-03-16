import dayjs from 'dayjs';
import { getUserDataThunk, updateUserDataThunk } from 'entities/user';
import { DeleteRowButton } from 'features/tableRowDelete';
import { useCallback, useEffect, useMemo } from 'react';
import { useAction } from 'shared/lib/hooks/useActions/useActions';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';

import { DataGrid, gridClasses, GridColDef, GridRowModel } from '@mui/x-data-grid';

export const Table = () => {
  const actions = { getUserData: getUserDataThunk, updateUserData: updateUserDataThunk };
  const { getUserData, updateUserData } = useAction(actions);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'documentStatus',
        headerName: 'Document Status',
        width: 130,
        editable: true,
        align: 'center'
      },
      {
        field: 'documentName',
        headerName: 'Document Name',
        type: 'string',
        width: 130,
        editable: true,
        align: 'center'
      },
      {
        field: 'documentType',
        headerName: 'Document Type',
        type: 'string',
        width: 130,
        editable: true,
        align: 'center'
      },
      {
        field: 'employeeNumber',
        headerName: 'Employee Number',
        type: 'string',
        width: 130,
        editable: true,
        align: 'center'
      },

      {
        field: 'companySignatureName',
        headerName: 'Company Signature Name',
        type: 'string',
        width: 200,
        editable: true,
        align: 'center'
      },
      {
        field: 'employeeSignatureName',
        headerName: 'Employee Signature Name',
        type: 'string',
        width: 200,
        editable: true,
        align: 'center'
      },
      {
        field: 'employeeSigDate',
        headerName: 'Employee Sig Date',
        type: 'string',
        width: 200,
        editable: false,
        align: 'center',
        renderCell: (params) => dayjs(params.row.employeeSigDate).format('YYYY-MM-DD HH:MM')
      },
      {
        field: 'companySigDate',
        headerName: 'Company Sig Date',
        type: 'string',
        width: 200,
        editable: false,
        align: 'center',
        renderCell: (params) => dayjs(params.row.employeeSigDate).format('YYYY-MM-DD HH:MM')
      },
      {
        field: 'actions',
        headerName: 'Action',
        type: 'actions',
        width: 100,
        cellClassName: 'actions',
        align: 'center',
        getActions: ({ id }) => [<DeleteRowButton id={id} />]
      }
    ],
    []
  );

  useEffect(() => {
    getUserData();
  }, []);

  const rows = useAppSelector((state) => state.user.userData);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const handleProcessRowUpdateError = useCallback((error: Error) => {}, []);

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel) => {
      updateUserData(newRow);
      return newRow;
    },

    []
  );

  return (
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
          bgcolor: '#e0e0e0'
        }
      }}
      disableRowSelectionOnClick
    />
  );
};
