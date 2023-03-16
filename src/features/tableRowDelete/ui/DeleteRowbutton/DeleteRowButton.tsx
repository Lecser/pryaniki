import { deleteDocumentEntity } from 'features/tableRowDelete';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';

interface DeleteRowButtonProps {
  id: GridRowId;
}

export const DeleteRowButton = (props: DeleteRowButtonProps) => {
  const { id } = props;
  const dispatch = useAppDispatch();

  const handleDeleteClick = (id: GridRowId) => () => {
    dispatch(deleteDocumentEntity(id));
  };

  return (
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label='Delete'
      onClick={handleDeleteClick(id)}
      color='inherit'
    />
  );
};
