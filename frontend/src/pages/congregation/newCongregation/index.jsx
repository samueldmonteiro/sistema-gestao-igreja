import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { registerCongregation } from "../../../services/congregationService";
import useMessageAlert from "../../../hooks/useMessageAlert";
import Buttom from "../../../components/button";
import useFetchData from "../../../hooks/useFetchData";
import { useEffect } from "react";

const NewCongregation = () => {
  const [formData, setFormData] = useState({
    name: "",
    town: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { message, showMessage } = useMessageAlert();
  const { request, loading, data, error } = useFetchData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    request(registerCongregation, [formData]);
  };

  useEffect(() => {
    if (error) {
      showMessage(error || "Erro ao cadastrar congregação!", 'warning');
    }

    if (!error && data) {
      showMessage("Congregação cadastrada com sucesso!", "success");
    }
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
        margin: "0 auto",
        marginBottom: "50px",
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
        NOVA CONGREGAÇÃO
      </Typography>
      {message}
      <br/>

      <TextField
        label="Nome da Congregação"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 3 }}
        variant="outlined"
      />

      <TextField
        label="Localidade"
        name="town"
        value={formData.town}
        placeholder="Ex: Povoado ..."
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 3 }}
        variant="outlined"
      />

      <Buttom value="Cadastrar" type="submit" loading={loading} />
    </Paper>
  );
};

export default NewCongregation;
