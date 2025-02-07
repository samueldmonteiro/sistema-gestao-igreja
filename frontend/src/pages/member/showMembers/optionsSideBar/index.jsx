import React, { useState } from 'react';
import { Box, FormControlLabel, Checkbox, Typography, TextField, Stack, Paper, Divider, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import Button from '../../../../components/button';

const months = [
  { label: "Janeiro", value: "01" },
  { label: "Fevereiro", value: "02" },
  { label: "Março", value: "03" },
  { label: "Abril", value: "04" },
  { label: "Maio", value: "05" },
  { label: "Junho", value: "06" },
  { label: "Julho", value: "07" },
  { label: "Agosto", value: "08" },
  { label: "Setembro", value: "09" },
  { label: "Outubro", value: "10" },
  { label: "Novembro", value: "11" },
  { label: "Dezembro", value: "12" },
];

const OptionsSideBar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    onlyTithers: localStorage.getItem('onlyTithers') === 'true',
    isBaptizedSpirit: localStorage.getItem('isBaptizedSpirit') === 'true',
    isBaptizedWater: localStorage.getItem('isBaptizedWater') === 'true',
    registrationDate: localStorage.getItem('registrationDate') || '',
    birthDate: localStorage.getItem('birthDate') || '',
    monthBirthDate: localStorage.getItem('monthBirthDate') || '',
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: newValue }));
    localStorage.setItem(name, newValue);
  };

  const resetFilters = () => {
    const defaultFilters = {
      onlyTithers: false,
      isBaptizedSpirit: false,
      isBaptizedWater: false,
      registrationDate: '',
      birthDate: '',
      monthBirthDate: ''
    };
    setFilters(defaultFilters);
    Object.keys(defaultFilters).forEach((key) => localStorage.setItem(key, defaultFilters[key]));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Filtros
      </Typography>
      <Stack spacing={1}>
        <FormControlLabel
          control={<Checkbox sx={{
            transform: 'scale(0.9)', // Altere o valor para aumentar ou diminuir o tamanho
          }} checked={filters.onlyTithers} onChange={handleChange} name="onlyTithers" />}
          label="Somente dizimistas"
          sx={{
            '& .MuiFormControlLabel-label': {
              fontSize: '16px', // Altere para o tamanho de fonte desejado
            }
          }}
        />
        <FormControlLabel
          control={<Checkbox sx={{
            margin: '-10px 0',
            transform: 'scale(0.9)', // Altere o valor para aumentar ou diminuir o tamanho
          }} checked={filters.isBaptizedSpirit} onChange={handleChange} name="isBaptizedSpirit" />}
          label="Batizado no E. Santo"
          sx={{
            '& .MuiFormControlLabel-label': {
              fontSize: '16px', // Altere para o tamanho de fonte desejado
            }
          }}
        />
        <FormControlLabel
          control={<Checkbox sx={{
            transform: 'scale(0.9)', // Altere o valor para aumentar ou diminuir o tamanho
          }} checked={filters.isBaptizedWater} onChange={handleChange} name="isBaptizedWater" />}
          label="Batizado nas Águas"
          sx={{
            '& .MuiFormControlLabel-label': {
              fontSize: '16px', // Altere para o tamanho de fonte desejado
            }
          }}
        />
        <Stack>

        </Stack>
        <TextField
          label="Data de Inscrição do membro"
          type="date"
          name="registrationDate"
          value={filters.registrationDate}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <br />
        <TextField
          label="Data de Nascimento"
          type="date"
          name="birthDate"
          value={filters.birthDate}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <br></br>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Aniversariante do mês</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Aniversariante do mês"
            name='monthBirthDate'
            value={filters.monthBirthDate}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>Nenhum</em>
            </MenuItem>
            {months.map(({ value, label }) => (
              <MenuItem key={value} value={value}>{label}</MenuItem>

            ))}
          </Select>
        </FormControl>
        <Divider />
        <Stack direction="row" spacing={2}>
          <Button type='submit' variant="contained" onClick={() => onFilter(filters)} value="Aplicar" />
          <Button variant="outlined" onClick={resetFilters} value="Resetar" />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default OptionsSideBar;
