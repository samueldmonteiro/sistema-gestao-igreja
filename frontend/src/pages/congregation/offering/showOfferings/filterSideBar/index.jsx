import React, { useEffect, useState } from 'react';
import { Typography, TextField, Stack, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Button from "../../../../../components/button";
import { getAllCongregations } from '../../../../../services/congregationService';

const FilterSideBar = ({ onFilter }) => {

  const [congregations, setCongregations] = useState([]);

  const [filters, setFilters] = useState({
    startDate: localStorage.getItem('startDate') ?? '',
    endDate: localStorage.getItem('endDate') ?? '',
    congregationId: localStorage.getItem('congregationId') ?? '',
    monthYear: localStorage.getItem('monthYear') ?? '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
    localStorage.setItem(name, value);
  };

  const resetFilters = () => {
    setFilters({ startDate: '', endDate: '', congregationId: '', monthYear: '' });
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');
    localStorage.removeItem('congregationId');
    localStorage.removeItem('monthYear');
  };

  useEffect(() => {
    getAllCongregations().then(resp => {
      setCongregations(resp.data.congregations);
    });

  }, []);

  const handleApplyFilters = () => {
    if (onFilter) {
      onFilter(filters);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 , mb:3}}>
      <Typography variant="h6" gutterBottom mb={2}>
        Filtros
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Congregação</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Congregação"
          name='congregationId'
          value={filters.congregationId}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Todas</em>
          </MenuItem>
          {congregations.map(({ id, name }) => (
            <MenuItem key={id} value={id}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="body1" mt={2} mb={1} fontSize={15}>
        Data inicial da oferta
      </Typography>
      <TextField
        type="date"
        name="startDate"
        value={filters.startDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      <Typography variant="body1" mt={2} mb={1} fontSize={15}>
        Data final da oferta
      </Typography>
      <TextField
        type="date"
        name="endDate"
        value={filters.endDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      <Typography variant="body1" mt={2} mb={1} fontSize={15}>
        Ofertas do Mês
      </Typography>
      <TextField
        type="month"
        name="monthYear"
        value={filters.monthYear}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      <Stack direction="row" spacing={2} mt={3}>
        <Button variant="contained" type='submit' onClick={handleApplyFilters} value="Aplicar" />
        <Button variant="outlined" onClick={resetFilters} value="Resetar" />
      </Stack>
    </Paper>
  );
};

export default FilterSideBar;