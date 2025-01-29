import React from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useMessageAlert from '../../../../hooks/useMessageAlert';
import { deleteMember } from '../../../../services/memberService';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalDeleteMember = ({ open, handleClose, memberId }) => {

  const { message, showMessage } = useMessageAlert();

  const handleDeleteMember = async () => {
    showMessage('Excluindo...', 'info');

    deleteMember(memberId).then(resp => {
      showMessage('Membro removido com sucesso!', 'success');
    }).catch(() => {
      showMessage('Erro ao excluir membro, tente novamente!', 'error');
    });
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Excluir"}</DialogTitle>
        <DialogContent>
          {message}
          <DialogContentText id="alert-dialog-slide-description">
            Tem Certeza que deseja remover este membro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button onClick={handleDeleteMember}>Sim</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default ModalDeleteMember