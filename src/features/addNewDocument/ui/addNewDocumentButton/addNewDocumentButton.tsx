import { addNewUserDataThunk, getUserIsLoading } from 'entities/user';
import { useAction } from 'shared/lib/hooks/useActions/useActions';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { PrimaryButton } from 'shared/ui/PrimaryButton/PrimaryButton';

import NoteAddIcon from '@mui/icons-material/NoteAdd';

export const AddNewDocumentButton = () => {
  const isLoading = useAppSelector(getUserIsLoading);
  const actions = { addNewUserData: addNewUserDataThunk };
  const { addNewUserData } = useAction(actions);
  const onClickAdd = () => {
    addNewUserData();
  };

  return (
    <PrimaryButton disabled={isLoading} onClick={onClickAdd}>
      <NoteAddIcon /> New Document
    </PrimaryButton>
  );
};
