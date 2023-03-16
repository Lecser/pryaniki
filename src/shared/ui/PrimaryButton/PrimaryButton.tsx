import { Button, ButtonProps, styled } from '@mui/material';

interface PrimaryButtonProps extends ButtonProps {}

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const { children, ...restProps } = props;

  const BlackButton = styled(Button)({
    backgroundColor: '#212121',
    color: 'white',
    marginBottom: '5px',
    height: '40px',
    '&:hover': {
      backgroundColor: '#424242'
    },
    '&:disabled': {
      backgroundColor: '#424242',
      color: 'white'
    }
  });

  return (
    <BlackButton variant='contained' {...restProps}>
      {children}
    </BlackButton>
  );
};
