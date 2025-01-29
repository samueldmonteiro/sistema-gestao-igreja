import React, { useEffect, useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { getMemberById, updateMember } from '../../../services/memberService';
import { useParams } from 'react-router-dom';
import { getAllCongregations } from '../../../services/congregationService';
import Loading from '../../loading';
import formatDate from '../../../utils/formatDate';
import Button from '../../../components/button';
import useFetchData from "../../../hooks/useFetchData";
import useMessageAlert from "../../../hooks/useMessageAlert";
import ModalDeleteMember from './modalDeleteMember'
const EditMember = () => {
  const { id } = useParams();
  const [congregations, setCongregations] = useState([]);
  const [member, setMember] = useState({
    fullName: '',
    birthDate: '',
    telphone: '',
    isBaptizedInHolySpirit: false,
    isBaptizedInWater: false,
    congregation: '',
    maritalStatus: '',
  });

  useEffect(() => {

    getAllCongregations().then(resp => {
      setCongregations(resp.data.congregations);
    });

    getMemberById(id).then(resp => {
      setMember({
        ...resp.data.member, congregation: resp.data.member.congregation.id,
        birthDate: formatDate(resp.data.member.birthDate, 'yyyy-MM-dd')
      });
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember((prev) => ({ ...prev, [name]: value }));
  };

  const { error, loading, request, data } = useFetchData();
  const { message, showMessage } = useMessageAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    request(updateMember, [member.id, member]);
  }

  useEffect(() => {

    if (error) {
      showMessage(error, 'warning');
    }

    if (data && !error) {
      showMessage('Membro Atualizado!', 'success');
    }
  }, [error, data]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  if (!member.fullName || !congregations[0]) {
    return (<Loading />);
  }

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 600,
        margin: '0 auto',
        padding: 3,
        borderRadius: 2
      }}
    >
      {message}
      <TextField
        variant='outlined'
        label="Nome Completo"
        fullWidth
        name="fullName"
        value={member.fullName}
        onChange={handleChange}
      />
      <TextField
        label="Data de Nascimento"
        type="date"
        variant="outlined"
        fullWidth
        name="birthDate"
        value={formatDate(member.birthDate, 'yyyy-MM-dd')}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Telefone"
        type="tel"
        variant="outlined"
        fullWidth
        name="telphone"
        value={member.telphone}
        onChange={handleChange}
      />

      <Box display={'flex'} justifyContent={'space-between'}>
        <FormControlLabel
          control={
            <Checkbox
              name='isBaptizedInHolySpirit'
              checked={member.isBaptizedInHolySpirit}
              onChange={(e) => setMember(prev => ({ ...prev, isBaptizedInHolySpirit: e.target.checked }))}
            />
          }
          label="Batizado no Espírito Santo"
        />
        <FormControlLabel
          control={
            <Checkbox
              name='isBaptizedInWater'
              checked={member.isBaptizedInWater}
              onChange={(e) => setMember(prev => ({ ...prev, isBaptizedInWater: e.target.checked }))}
            />
          }
          label="Batizado nas Águas"
        />
      </Box>

      {congregations[0] &&
        <FormControl>
          <InputLabel id="demo-select-small-label">Congregação</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Congregação"
            onChange={handleChange}
            defaultValue={member.congregation}
            name="congregation"
          >
            {congregations.map(({ name, id }) => (
              <MenuItem key={id} value={id}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      }
      <FormControl>
        <InputLabel id="estado-civil-label">Estado Civil</InputLabel>
        <Select
          labelId="estado-civil-label"
          id="estado-civil-label-id"
          name="maritalStatus"
          value={member.maritalStatus}
          onChange={handleChange}
          label="Estado Civil"
          defaultValue={member.maritalStatus}
        >
          <MenuItem value="Solteiro(a)">Solteiro(a)</MenuItem>
          <MenuItem value="Casado(a)">Casado(a)</MenuItem>
          <MenuItem value="Mora Junto">Mura junto(a)</MenuItem>
          <MenuItem value="Divorciado(a)">Divorciado(a)</MenuItem>
        </Select>
      </FormControl>

      <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} justifyContent={'space-between'}>
        <Button
          loading={loading}
          type='submit'
          variant="contained"
          color="primary"
          value='Atualizar'
        />
        <Button
          variant="contained"
          onClick={handleOpenDeleteModal}
          color="error"
          startIcon={<Delete />}
          value='Excluir'
        />
        <ModalDeleteMember memberId={member.id} open={openDeleteModal} handleClose={handleCloseDeleteModal}/>
      </Box>

    </Box>
  );
};

export default EditMember;
