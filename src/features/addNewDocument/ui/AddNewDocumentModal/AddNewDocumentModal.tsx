import { getUserIsLoading } from 'entities/user';
import { useState } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { CustomModal } from 'shared/ui/CustomModal/CustomModal';
import { PrimaryButton } from 'shared/ui/PrimaryButton/PrimaryButton';

import NoteAddIcon from '@mui/icons-material/NoteAdd';

import { AddNewDocumentForm } from '../AddNewDocumentForm/AddNewDocumentForm';

export const AddNewDocumentModal = () => {
  const isLoading = useAppSelector(getUserIsLoading);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <PrimaryButton
        sx={{ mr: '5px' }}
        variant='contained'
        disabled={isLoading}
        onClick={handleOpen}
      >
        <NoteAddIcon sx={{ mr: '5px' }} /> New Document
      </PrimaryButton>
      <CustomModal open={open} onClose={handleClose}>
        <AddNewDocumentForm handleClose={handleClose} />
      </CustomModal>
    </>
  );
};
