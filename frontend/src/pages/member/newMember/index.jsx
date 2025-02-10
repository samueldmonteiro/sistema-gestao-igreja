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
  Paper,
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
    getAllCongregations().then((resp) => {
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
    if (error) showMessage(error + "!", "error");
    if (data) showMessage("Membro Cadastrado com Sucesso!", "success");
  }, [error, data]);

  return (

    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "600px",
        width: "100%",
        p: 3,
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
        margin: '0 auto',
        marginBottom: '50px',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "600",
          fontSize: "24px",
          color: "#333",
          textAlign: "center",
          mb: 4,
        }}
      >
        NOVO MEMBRO
      </Typography>
      {message}
      <br />

      <TextField
        label="Nome Completo"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 3 }}
        variant="outlined"
      />

      <TextField
        label="Data de Nascimento"
        name="birthDate"
        type="date"
        value={formData.birthDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        required
        sx={{ mb: 3 }}
        variant="outlined"
      />

      <TextField
        label="Telefone"
        name="telphone"
        type="tel"
        value={formData.telphone}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 1 }}
        variant="outlined"
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              name="isBaptizedInWater"
              checked={formData.isBaptizedInWater}
              onChange={handleChange}
              color="primary"
            />
          }
          label="É batizado em águas"
        />

        <FormControlLabel
          control={
            <Checkbox
              name="isBaptizedInHolySpirit"
              checked={formData.isBaptizedInHolySpirit}
              onChange={handleChange}
              color="primary"
            />
          }
          label="É batizado no Espírito Santo"
        />
      </Box>

      <FormControl variant="outlined" fullWidth required sx={{ mb: 3 }}>
        <InputLabel>Estado Civil</InputLabel>
        <Select
          name="maritalStatus"
          value={formData.maritalStatus}
          onChange={handleChange}
          label="Estado Civil"
        >
          <MenuItem value="Casado(a)">Casado(a)</MenuItem>
          <MenuItem value="Solteiro(a)">Solteiro(a)</MenuItem>
          <MenuItem value="Mora Junto(a)">Mora Junto(a)</MenuItem>
          <MenuItem value="Viúvo(a)">Viúvo(a)</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" fullWidth required sx={{ mb: 1 }}>
        <InputLabel>Congregação</InputLabel>
        <Select
          name="congregationId"
          value={formData.congregationId}
          onChange={handleChange}
          label="Congregação"
        >
          {congregations.map((cong) => (
            <MenuItem key={cong.id} value={cong.id}>
              {cong.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Buttom value="Cadastrar" type="submit" loading={loading} />
    </Paper>
  );
};

export default NewMember;