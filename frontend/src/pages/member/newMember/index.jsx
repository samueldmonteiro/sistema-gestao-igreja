import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { registerMember } from "../../../services/memberService";
import useFetchData from "../../../hooks/useFetchData";
import { getAllCongregations } from "../../../services/congregationService";
import useMessageAlert from "../../../hooks/useMessageAlert";
import Buttom from "../../../components/button";

const NewMember = () => {

  const [formData, setFormData] = React.useState({
    fullName: "",
    birthDate: "",
    telphone: "",
    isBaptizedInWater: false,
    isBaptizedInHolySpirit: false,
    maritalStatus: "",
    congregationId: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [congregations, setCongregations] = useState([]);

  useEffect(() => {
    getAllCongregations().then(resp => {
      setCongregations(resp.data.congregations);
    });
  }, []);

  const { message, showMessage } = useMessageAlert();
  const { request, error, loading, data } = useFetchData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    request(registerMember, [formData]);
  };

  useEffect(() => {
    if (error) showMessage(error + '!', 'error');
    if (data)  showMessage('Membro Cadastro com Sucesso!', 'success');
  }, [error, data]);

  return (
    
    <Box component="form" onSubmit={handleSubmit} sx={{
      maxWidth: "600px",
      minHeight: '100vh',
      margin: "0 auto",
      p: 1,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
    }}>
<Typography variant="h6" sx={{fontWeight:'600', fontSize:'19px'}} textAlign={'center'} mb={4}>
        NOVO MEMBRO
      </Typography>
      {message}

      <TextField label="Nome Completo" name="fullName" value={formData.fullName} onChange={handleChange} fullWidth required />

      <TextField label="Data de Nascimento" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} InputLabelProps={{ shrink: true, }} fullWidth required />

      <TextField label="Telefone" name="telphone" type="tel" value={formData.telphone} onChange={handleChange} fullWidth required />

      <Box sx={{ margin: '-5px 0 -5px 0' }} display="flex" justifyContent="space-between" alignItems="center">
        <FormControlLabel
          control={<Checkbox name="isBaptizedInWater" checked={formData.isBaptizedInWater} onChange={handleChange} />}
          label="É batizado em águas"
        />

        <FormControlLabel
          control={<Checkbox name="isBaptizedInHolySpirit" checked={formData.isBaptizedInHolySpirit} onChange={handleChange} />}
          label="É batizado no Espírito Santo"
        />
      </Box>

      <FormControl variant="filled" fullWidth required>
        <InputLabel>Estado Civil</InputLabel>
        <Select
          name="maritalStatus"
          value={formData.maritalStatus}
          onChange={handleChange}
        >
          <MenuItem value="Casado(a)">Casado</MenuItem>
          <MenuItem value="Solteiro(a)">Solteiro(a)</MenuItem>
          <MenuItem value="Mora Junto(a)">Mora Junto(a)</MenuItem>
          <MenuItem value="Viúvo(a)">Viúvo(a)</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="filled" fullWidth required>
        <InputLabel>Congregação</InputLabel>
        <Select
          name="congregationId"
          value={formData.congregationId}
          onChange={handleChange}
        >
          {congregations.map(cong => (
            <MenuItem key={cong.id} value={cong.id}>{cong.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Buttom value="Cadastrar" type='submit' loading={loading} />
    </Box>
  );
};

export default NewMember;
// 180