import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Button, Container, Typography, Box } from "@mui/material";
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
        // Carrega os membros
        getMembers().then((resp) => {
            const memberOptions = resp.data.members.map((member) => ({
                value: member.id,
                label: member.fullName + ' - ' + member.congregation.name,
            }));
            setMembers(memberOptions);
        });

        // Carrega as congregações
        getAllCongregations().then((resp) => {
            const congregationOptions = resp.data.congregations.map((congregation) => ({
                value: congregation.id,
                label: congregation.name,
            }));
            setCongregations(congregationOptions);
        });
    }, []);

    const { message, showMessage } = useMessageAlert();
    const { request, error, data, loading } = useFetchData();

    const handleSubmit = (e) => {
        e.preventDefault();

        const titheData = {
            value: titheValue,
            date: titheDate,
            memberId: selectedMember.value,
            congregationId: selectedCongregation.value,
        };

        console.log(titheData);

        request(registerTithe, [titheData]);
    };

    useEffect(()=>{
        if(error) showMessage(error, 'warning');
        if(!error && data) showMessage('Dízimo cadastrado com sucesso!', 'success');

    }, [error, data]);

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: '600', fontSize: '19px' }} textAlign={'center'} mb={4}>
                    NOVO DÍZIMO
                </Typography>
                <form onSubmit={handleSubmit}>
                    {message}
                    <TextField
                        fullWidth
                        label="Valor do Dízimo"
                        type="number"
                        value={titheValue}
                        onChange={(e) => setTitheValue(e.target.value)}
                        margin="normal"
                        required
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
                    />
                    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                        <Select
                            options={members}
                            value={selectedMember}
                            onChange={setSelectedMember}
                            placeholder="Selecione um membro..."
                            isSearchable
                        />
                    </Box>
                    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                        <Select
                            options={congregations}
                            value={selectedCongregation}
                            onChange={setSelectedCongregation}
                            placeholder="Selecione uma congregação..."
                            isSearchable
                        />
                    </Box>
                    <Button
                        fullWidth
                        loading={loading}
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ marginTop: 2 }}
                    >
                        Registrar Dízimo
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default NewTithe;