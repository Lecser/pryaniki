import { Button, ButtonProps, styled } from '@mui/material';

interface PrimaryButtonProps extends ButtonProps {}

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const { children, ...restProps } = props;

  const StyledPrimaryButton = styled(Button)({
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
    <StyledPrimaryButton variant='contained' {...restProps}>
      {children}
    </StyledPrimaryButton>
  );
};
