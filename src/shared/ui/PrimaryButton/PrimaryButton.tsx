import { Button, ButtonProps, styled } from '@mui/material';

interface PrimaryButtonProps extends ButtonProps {}

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const { variant, children, ...restProps } = props;

  const StyledPrimaryButton = styled(Button)({
    marginBottom: '5px',
    height: '40px',
    '&:hover': {
      backgroundColor: variant === 'contained' ? '#424242' : '#eaeaea'
    },
    '&:disabled': {
      backgroundColor: '#424242',
      color: 'white'
    }
  });

  return (
    <StyledPrimaryButton variant={variant} {...restProps}>
      {children}
    </StyledPrimaryButton>
  );
};
