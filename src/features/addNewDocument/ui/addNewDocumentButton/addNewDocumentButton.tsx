import { addNewUserDataThunk } from 'entities/user';
import { useAction } from 'shared/lib/hooks/useActions/useActions';

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Button } from '@mui/material';

export const AddNewDocumentButton = () => {
  const actions = { addNewUserData: addNewUserDataThunk };
  const { addNewUserData } = useAction(actions);
  const onClickAdd = () => {
    addNewUserData();
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
