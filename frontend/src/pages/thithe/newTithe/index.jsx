import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box, Paper, CircularProgress } from "@mui/material";
import Select from "react-select";
import { getMembers } from "../../../services/memberService";
import { getAllCongregations } from "../../../services/congregationService";
import useMessageAlert from "../../../hooks/useMessageAlert";
import useFetchData from "../../../hooks/useFetchData";
import { registerTithe } from "../../../services/titheService";

const NewTithe = () => {
  const [titheValue, setTitheValue] = useState("");
  const [titheDate, setTitheDate] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [congregations, setCongregations] = useState([]);
  const [selectedCongregation, setSelectedCongregation] = useState(null);

  useEffect(() => {
    getMembers().then((resp) => {
      const memberOptions = resp.data.members.map((member) => ({
        value: member.id,
        label: `${member.fullName} - ${member.congregation.name}`,
        congregation: member.congregation.id,
      }));
      setMembers(memberOptions);
    });

    getAllCongregations().then((resp) => {
      const congregationOptions = resp.data.congregations.map((congregation) => ({
        value: congregation.id,
        label: congregation.name,
      }));
      setCongregations(congregationOptions);
    });
  }, []);

  const handleSelectMember = (e) => {
    setSelectedMember(e);
    setSelectedCongregation(e.congregation);
  };

  const { message, showMessage } = useMessageAlert();
  const { request, error, data, loading } = useFetchData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const titheData = {
      value: titheValue,
      date: titheDate,
      memberId: selectedMember?.value,
      congregationId: selectedCongregation,
    };
    request(registerTithe, [titheData]);
  };

  useEffect(() => {
    if (error) showMessage(error, "warning");
    if (!error && data) showMessage("Dízimo cadastrado com sucesso!", "success");
  }, [error, data]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, mt: 4, backgroundColor: "white" }}>
        <Typography variant="h5" sx={{ fontWeight: 600, textAlign: "center", mb: 3, color: "#333" }}>
          Novo Dízimo
        </Typography>
        {message}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Valor do Dízimo"
            type="number"
            value={titheValue}
            onChange={(e) => setTitheValue(e.target.value)}
            margin="normal"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Data do Dízimo"
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
              options={members}
              value={selectedMember}
              onChange={handleSelectMember}
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
            {loading ? <CircularProgress size={24} /> : "Registrar Dízimo"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default NewTithe;
