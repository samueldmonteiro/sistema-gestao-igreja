import React, { useState } from 'react';
import { Box, FormControlLabel, Checkbox, Typography, TextField, Stack } from '@mui/material';
import Button from '../../../../components/button';

const TitheFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    date: localStorage.getItem('date') ?? '',
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });

    if (name == 'date') {
      localStorage.setItem(name, value);
      return;
    }

    localStorage.setItem(name, !filters[name]);
  }

  const resetFilters = () => {
    setFilters({date: ''});
    localStorage.setItem('date', '');
  }

  const handleApplyFilters = () => {
    if (onFilter) {
      onFilter(filters);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
          Filtros de Usuários
        </Typography>
        
        <Typography variant="body1" mt={2} mb={1} fontSize={15}>
          Data de entrega do dízimo
        </Typography>
        <TextField
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          fullWidth
        />

        <Stack direction="row" spacing={2} mt={3}>
          <Button variant="contained" type='submit' onClick={handleApplyFilters} value='Aplicar' />
          <Button
            variant="outlined"
            onClick={resetFilters} value='resetar' />
        </Stack>
      </Box>
    </>
  );
};

export default TitheFilters;
