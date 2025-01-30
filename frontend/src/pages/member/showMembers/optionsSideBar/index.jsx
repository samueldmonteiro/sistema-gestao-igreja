import React, { useState } from 'react';
import { Box, FormControlLabel, Checkbox, Typography, TextField, Stack } from '@mui/material';
import Button from '../../../../components/button';

const OptionsSideBar = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    onlyTithers: localStorage.getItem('onlyTithers') == 'true' ? true : false,
    baptizedSpit: localStorage.getItem('baptizedSpit') == 'true' ? true : false,
    baptizedWater: localStorage.getItem('baptizedWater') == 'true' ? true : false,
    registrationDate: localStorage.getItem('registrationDate') ?? '',
    birthDate: localStorage.getItem('birthDate') ?? '',

  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });

    if (name == 'registrationDate' || name == 'birthDate') {
      localStorage.setItem(name, value);
      return;
    }

    localStorage.setItem(name, !filters[name]);
  }

  const resetFilters = () => {

    setFilters({ onlyTithers: false, baptizedSpit: false, baptizedWater: false, registrationDate: '', birthDate: '' });

    localStorage.setItem('onlyTithers', false);
    localStorage.setItem('baptizedSpit', false);
    localStorage.setItem('baptizedWater', false);
    localStorage.setItem('registrationDate', '');
    localStorage.setItem('birthDate', '');
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
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.onlyTithers}
              onChange={handleChange}
              name="onlyTithers"
            />
          }
          label="Somente dizimistas"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={filters.baptizedSpit}
              onChange={handleChange}
              name="baptizedSpit"
            />
          }
          label="Batizado no Espírito Santo"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={filters.baptizedWater}
              onChange={handleChange}
              name="baptizedWater"
            />
          }
          label="Batizado nas Águas"
        />

        <Typography variant="body1" mt={2} mb={1} fontSize={15}>
          Data de inscrição
        </Typography>
        <TextField
          type="date"
          name="registrationDate"
          value={filters.registrationDate}
          onChange={handleChange}
          fullWidth
        />

        <Typography variant="body1" mt={2} mb={1} fontSize={15}>
          Data de Nascimento
        </Typography>
        <TextField
          type="date"
          name="birthDate"
          value={filters.birthDate}
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

export default OptionsSideBar;
