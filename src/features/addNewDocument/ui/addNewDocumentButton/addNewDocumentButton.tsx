import { addNewUserData } from 'entities/user';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Button } from '@mui/material';

export const AddNewDocumentButton = () => {
  const dispatch = useAppDispatch();

  const onClickAdd = () => {
    dispatch(addNewUserData());
  };

  return (
    <Button
      variant='contained'
      sx={{ marginBottom: '5px', backgroundColor: '#424242' }}
      onClick={onClickAdd}
    >
      <NoteAddIcon /> New Document
    </Button>
  );
};
