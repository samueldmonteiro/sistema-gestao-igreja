import React, { useEffect, useState } from 'react';
import Button from '../../../../components/button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getMemberById } from '../../../../services/memberService';
import getAgeByDate from '../../../../utils/getAgeByDate';
import formatDate from '../../../../utils/formatDate';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalMemberInfo = ({ open, handleClose, id }) => {
  const [member, setMember] = useState(null);

  useEffect(() => {
    if (open) {
      getMemberById(id).then((resp) => {
        setMember(resp.data.member);
        console.log(resp.data.member)
      });
    }
  }, [open, id]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="xs" // Melhor responsividade
      fullWidth
      onClose={handleClose}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Informações do Membro
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {member ? (
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2, boxShadow: 1 }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h6" align="center">{member.fullName}</Typography>
                <Stack spacing={1}>
                  <Typography variant="body2"><strong>Telefone:</strong> {member.telphone}</Typography>
                  <Typography variant="body2"><strong>Idade:</strong> {getAgeByDate(member.birthDate)} anos</Typography>
                  <Typography variant="body2"><strong>Batizado no E. Santo:</strong> {member.isBaptizedInHolySpirit ? 'Sim' : 'Não'}</Typography>
                  <Typography variant="body2"><strong>Batizado nas Águas:</strong> {member.isBaptizedInWater ? 'Sim' : 'Não'}</Typography>
                  <Typography variant="body2"><strong>Estado Civil:</strong> {member.maritalStatus}</Typography>
                  <Typography variant="body2"><strong>Congregação:</strong> {member?.congregation?.name ?? 'Não encontrada'}</Typography>
                  <Typography variant="body2"><strong>É Dizimista:</strong> {member.isTither ? 'Sim' : 'Não'}</Typography>
                  <Typography variant="body2"><strong>Data de Nascimento:</strong> {formatDate(member.birthDate)}</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body1" align="center">Carregando informações...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Link to={`/editar_membro/${id}`} style={{ width: '100%' }}>
          <Button value="Editar" fullWidth />
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default ModalMemberInfo;
