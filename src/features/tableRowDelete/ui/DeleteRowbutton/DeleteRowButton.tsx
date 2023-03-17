import { deleteUserDocumentThunk } from 'entities/user';
import { useActions } from 'shared/lib/hooks/useActions/useActions';

import DeleteIcon from '@mui/icons-material/Delete';
import { GridActionsCellItem, GridRowId } from '@mui/x-data-grid';

interface DeleteRowButtonProps {
  id: GridRowId;
}

export const DeleteRowButton = (props: DeleteRowButtonProps) => {
  const { id } = props;
  const actions = { deleteUserDocument: deleteUserDocumentThunk };
  const { deleteUserDocument } = useActions(actions);

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteUserDocument(id);
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
