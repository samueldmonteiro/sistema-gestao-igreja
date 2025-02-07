import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box, Paper, CircularProgress } from "@mui/material";
import Select from "react-select";
import { getMembers } from "../../../../services/memberService";
import { getAllCongregations } from "../../../../services/congregationService";
import useMessageAlert from "../../../../hooks/useMessageAlert";
import useFetchData from "../../../../hooks/useFetchData";
import { registerTithe } from "../../../../services/titheService";
import { registerCongregationOffering } from "../../../../services/congregationOfferingService";

const NewOffering = () => {
  const [titheValue, setTitheValue] = useState("");
  const [titheDate, setTitheDate] = useState("");
  const [congregations, setCongregations] = useState([]);
  const [selectedCongregation, setSelectedCongregation] = useState(null);

  useEffect(() => {
    getAllCongregations().then((resp) => {
      const congregationOptions = resp.data.congregations.map((congregation) => ({
        value: congregation.id,
        label: congregation.name,
      }));
      setCongregations(congregationOptions);
    });
  }, []);

  const handleSelect = (e) => {
    setSelectedCongregation(e);
  };

  const { message, showMessage } = useMessageAlert();
  const { request, error, data, loading } = useFetchData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const congregationOfferingData = {
      value: titheValue,
      date: titheDate,
      congregationId: selectedCongregation.value,
    };
    console.log(congregationOfferingData)
    request(registerCongregationOffering, [congregationOfferingData]);
  };

  useEffect(() => {
    if (error) showMessage(error, "warning");
    if (!error && data) showMessage("Oferta cadastrada com sucesso!", "success");
  }, [error, data]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, mt: 4, backgroundColor: "white" }}>
        <Typography variant="h5" sx={{ fontWeight: 600, textAlign: "center", mb: 3, color: "#333" }}>
          Nova Oferta de Congregação
        </Typography>
        {message}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Valor da Oferta"
            type="number"
            value={titheValue}
            onChange={(e) => setTitheValue(e.target.value)}
            margin="normal"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Data da Oferta"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={titheDate}
            onChange={(e) => setTitheDate(e.target.value)}
            margin="normal"
            required
            variant="outlined"
          />
          <Box sx={{ mt: 2 }}>
            <Select
              options={congregations}
              value={selectedCongregation}
              onChange={handleSelect}
              placeholder="Selecione um membro..."
              isSearchable
              styles={{ control: (base) => ({ ...base, padding: 4 }) }}
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3, py: 1.5, fontSize: 16, fontWeight: "bold" }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Registrar Oferta"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default NewOffering;
