import { addNewUserDataThunk } from 'entities/user';
import { useAction } from 'shared/lib/hooks/useActions/useActions';
import { PrimaryButton } from 'shared/ui/PrimaryButton/PrimaryButton';

import NoteAddIcon from '@mui/icons-material/NoteAdd';

export const AddNewDocumentButton = () => {
  const actions = { addNewUserData: addNewUserDataThunk };
  const { addNewUserData } = useAction(actions);
  const onClickAdd = () => {
    addNewUserData();
  };

  return (
    <PrimaryButton onClick={onClickAdd}>
      <NoteAddIcon /> New Document
    </PrimaryButton>
  );
};
