import { addNewUserDataThunk, User } from 'entities/user';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { addNewDocumentValidationSchema } from 'shared/config/addNewDocumentValidationSchema';
import { useActions } from 'shared/lib/hooks/useActions/useActions';
import { PrimaryButton } from 'shared/ui/PrimaryButton/PrimaryButton';

import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack, TextField, Typography } from '@mui/material';

interface AddNewDocumentFormProps {
  handleClose: () => void;
}

export const AddNewDocumentForm = (props: AddNewDocumentFormProps) => {
  const { handleClose } = props;
  const actions = { addNewUserData: addNewUserDataThunk };
  const { addNewUserData } = useActions(actions);
  const isoDate = new Date().toISOString();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<User>({
    defaultValues: {
      companySigDate: isoDate,
      companySignatureName: '',
      documentName: '',
      documentStatus: '',
      documentType: '',
      employeeNumber: '',
      employeeSigDate: isoDate,
      employeeSignatureName: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(addNewDocumentValidationSchema)
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    addNewUserData(data);
    reset();
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography fontWeight='bold' textAlign='center' component='p' variant='h5'>
        New document
      </Typography>
      <Stack spacing={2} marginBottom='35px'>
        <Controller
          name='documentStatus'
          control={control}
          render={({ field }) => (
            <TextField
              size='small'
              error={!!errors.documentStatus}
              helperText={errors?.documentStatus?.message}
              label='Document status'
              variant='standard'
              margin='normal'
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name='documentName'
          control={control}
          render={({ field }) => (
            <TextField
              size='small'
              error={!!errors.documentName}
              helperText={errors?.documentName?.message}
              label='Document name'
              variant='standard'
              margin='normal'
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name='documentType'
          control={control}
          render={({ field }) => (
            <TextField
              size='small'
              error={!!errors.documentType}
              helperText={errors?.documentType?.message}
              label='Document type'
              variant='standard'
              margin='normal'
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name='employeeNumber'
          control={control}
          render={({ field }) => (
            <TextField
              size='small'
              error={!!errors.employeeNumber}
              helperText={errors?.employeeNumber?.message}
              label='Employee number'
              variant='standard'
              margin='normal'
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name='companySignatureName'
          control={control}
          render={({ field }) => (
            <TextField
              size='small'
              error={!!errors.companySignatureName}
              helperText={errors?.companySignatureName?.message}
              label='Company signature name'
              variant='standard'
              margin='normal'
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name='employeeSignatureName'
          control={control}
          render={({ field }) => (
            <TextField
              size='small'
              error={!!errors.employeeSignatureName}
              helperText={errors?.employeeSignatureName?.message}
              label='Employee signature name'
              variant='standard'
              margin='normal'
              fullWidth
              {...field}
            />
          )}
        />
      </Stack>
      <Box display='flex'>
        <PrimaryButton sx={{ mr: 1 }} fullWidth onClick={handleClose} variant='outlined'>
          Close
        </PrimaryButton>
        <PrimaryButton variant='contained' fullWidth type='submit'>
          add
        </PrimaryButton>
      </Box>
    </form>
  );
};
