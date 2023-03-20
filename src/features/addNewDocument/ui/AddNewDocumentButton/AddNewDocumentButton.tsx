import { addNewUserDataThunk, getUserIsLoading } from 'entities/user';
import { useActions } from 'shared/lib/hooks/useActions/useActions';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { PrimaryButton } from 'shared/ui/PrimaryButton/PrimaryButton';

import NoteAddIcon from '@mui/icons-material/NoteAdd';

export const AddNewDocumentButton = () => {
  const isLoading = useAppSelector(getUserIsLoading);
  const actions = { addNewUserData: addNewUserDataThunk };
  const { addNewUserData } = useActions(actions);
  const onClickAdd = () => {
    addNewUserData();
  };

  return (
    <PrimaryButton disabled={isLoading} onClick={onClickAdd}>
      <NoteAddIcon sx={{ marginRight: '5px' }} /> New Document
    </PrimaryButton>
  );
};