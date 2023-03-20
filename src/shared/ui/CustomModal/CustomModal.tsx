import { Box, Modal } from '@mui/material';
import { ModalProps } from '@mui/material/Modal/Modal';

interface CustomModalProps extends ModalProps {}

export const CustomModal = (props: CustomModalProps) => {
  const { children, ...restProps } = props;
  const StyledBox = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: '15',
    p: 5
  };
  return (
    <Modal {...restProps}>
      <Box sx={StyledBox}> {children}</Box>
    </Modal>
  );
};
