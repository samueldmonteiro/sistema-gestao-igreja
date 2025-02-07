import React, { useState } from 'react';
import { Box, Typography, TextField, Stack, Paper } from '@mui/material';
import Button from '../../../../components/button';

const TitheFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    startDate: localStorage.getItem('startDate') ?? '',
    endDate: localStorage.getItem('endDate') ?? '',
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
    setFilters({ startDate: '', endDate: '' });
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');
  };

  const handleApplyFilters = () => {
    if (onFilter) {
      onFilter(filters);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filtros
      </Typography>

      <Typography variant="body1" mt={2} mb={1} fontSize={15}>
        Data inicial do Dízimo
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
        Data final do Dízimo
      </Typography>
      <TextField
        type="date"
        name="endDate"
        value={filters.endDate}
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

export default TitheFilters;