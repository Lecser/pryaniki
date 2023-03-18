import { SyntheticEvent, useEffect, useState } from 'react';

import { Alert, Snackbar } from '@mui/material';

interface ErrorSnackbarProps {
  error?: string;
}

export const ErrorSnackbar = (props: ErrorSnackbarProps) => {
  const { error } = props;
  const [open, setOpen] = useState(false);
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error'>
        {error}
      </Alert>
    </Snackbar>
  );
};
