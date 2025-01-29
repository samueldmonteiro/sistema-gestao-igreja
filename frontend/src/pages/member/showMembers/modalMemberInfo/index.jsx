import React, { useEffect, useState } from 'react';
import Button from '../../../../components/button';
import { Dialog, DialogActions, DialogContent, DialogTitle, Slide, Card, CardContent, Typography, Grid2 as Grid } from '@mui/material';
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
      });
    }
  }, [open, id]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Informações do Membro</DialogTitle>
      <DialogContent>
        {member ? (
          <Card variant="outlined" sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item size={12}>
                  <Typography variant="h6" gutterBottom>
                    Nome: {member.fullName}
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="body1">
                    <strong>Telefone:</strong> {member.telphone}
                  </Typography>
                </Grid>

                <Grid item size={6}>
                  <Typography variant="body1">
                    <strong>Idade:</strong> {getAgeByDate(member.birthDate)} anos
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="body1">
                    <strong>Batizado no E. Santo:</strong> {member.isBaptizedInTheHolySpirit ? 'Sim' : 'Não'}
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="body1">
                    <strong>Batizado nas Águas:</strong> {member.isBaptizedInWater ? 'Sim' : 'Não'}
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="body1">
                    <strong>Estado Civil:</strong> {member.maritalStatus}
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="body1">
                    <strong>Congregação:</strong> {member.congregation.name}
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="body1">
                    <strong>É Dizimista:</strong> {member.isTither ? 'Sim' : 'Não'}
                  </Typography>
                </Grid>
                <Grid item size={6}>
                  <Typography variant="body1">
                    <strong>Data de Nascimento:</strong> {formatDate(member.birthDate)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body1">Carregando informações...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Link to={"/editar_membro/" + id}>
          <Button value="Editar" />
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default ModalMemberInfo;
