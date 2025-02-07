import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import Grid from '@mui/material/Grid2';
import Button from "../../../components/button";
import { getAllCongregations } from "../../../services/congregationService";
import TitheFilters from "./titheFilters";
import TitheListItem from "../../../components/titheListItem";
import { getTithes } from "../../../services/titheService";

const ShowTithes = () => {

  const [tithes, setTithes] = useState([]);
  const [countTithes, setCountTithes] = useState(0);
  const [loadingTithes, setLoadingTithes] = useState(true);
  const [memberName, setMemberName] = useState(localStorage.getItem('memberName'));
  const [congregationFilter, setCongregationFilter] = useState(localStorage.getItem('congregation'));
  const [congregations, setCongregations] = useState([]);

  useEffect(() => {

    getAllCongregations().then(resp => {
      setCongregations(resp.data.congregations);
    });

    setLoadingTithes(true);
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams.entries());

    getTithes(params).then(resp => {
      setTithes(resp.data.tithes);
      setCountTithes(resp.data.qt);
      setLoadingTithes(false);

    }).catch(() => {
      setTithes([])
      setLoadingTithes(false);
    });

  }, []);

  const handlePesquisa = (e) => {
    localStorage.setItem('memberName', e.target.value);
    setMemberName(e.target.value);
  };

  const handleFiltroCongregacao = (e) => {
    localStorage.setItem('congregation', e.target.value);
    setCongregationFilter(e.target.value);
  };

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: '600', fontSize: '19px' }} textAlign={'center'} mb={4}>
        BUSCAR DÍZIMOS
      </Typography>
      <form>

        <Grid container spacing={4} sx={{ maxWidth: 900 }} m='auto'>
          <Grid size={{ xs: 12, md: 8, sm: 12 }}>
            <Box px={2}>
              <Grid container spacing={4}>
                <Grid size={7}>
                  <TextField
                    name="memberName"
                    label="Pesquisar por Membro"
                    variant="outlined"
                    fullWidth
                    value={memberName}
                    onChange={handlePesquisa} />
                </Grid>
                <Grid size={5} >
                  <FormControl fullWidth variant='filled'>
                    <InputLabel id="congregacao-label">Congregação</InputLabel>
                    <Select
                      name="congregationId"
                      label="Congregação"
                      fullWidth
                      labelId="congregacao-label"
                      value={congregationFilter}
                      onChange={handleFiltroCongregacao}
                    >
                      <MenuItem value="">Todas</MenuItem>
                      {congregations.map(({ name, id }) => (
                        <MenuItem key={id} value={id}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid width={'100%'}>
                  <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography fontSize={'14px'} style={{ fontWeight: "bold" }} color={'#5a5656'}>
                      {countTithes} Dízimos
                    </Typography>
                    <Button variant="contained" type='submit' value='Pesquisar' />

                  </Box>
                </Grid>
              </Grid>
              {!loadingTithes && <Box mt={4}>
                {tithes.map((tithe) => (
                  <TitheListItem tithe={tithe} tithes={tithes} setTithes={setTithes} setCountTithes={setCountTithes}/>
                ))}
              </Box>}

              {loadingTithes && <Box mt={4}>
                <Box m={'auto'} pt={'30px'} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size={60} />
                </Box>
              </Box>}
            </Box >
          </Grid>
          <Grid size={{ xs: 12, md: 4, sm: 12 }}>
            <TitheFilters />
          </Grid>
        </Grid >
      </form>
    </>
  );
};

export default ShowTithes;
//109
