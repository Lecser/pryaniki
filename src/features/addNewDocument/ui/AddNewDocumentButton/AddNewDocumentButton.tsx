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
    const isoDate = new Date().toISOString();
    const newDocument = {
      companySigDate: isoDate,
      companySignatureName: 'empty',
      documentName: 'empty',
      documentStatus: 'empty',
      documentType: 'empty',
      employeeNumber: 'empty',
      employeeSigDate: isoDate,
      employeeSignatureName: 'empty'
    };
    addNewUserData(newDocument);
  };

  return (
    <PrimaryButton variant='contained' disabled={isLoading} onClick={onClickAdd}>
      <NoteAddIcon sx={{ marginRight: '5px' }} /> new empty document
    </PrimaryButton>
  );
};
