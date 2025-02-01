import React, { useState, useEffect } from "react";
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
import OptionsSideBar from "./optionsSideBar";
import Button from "../../../components/button";
import { getAllCongregations } from "../../../services/congregationService";
import { getMembers } from "../../../services/memberService";
import MemberListItem from "../../../components/memberListItem";
import ModalMemberInfo from "./modalMemberInfo";

const ShowMembers = () => {
  const [members, setMembers] = useState([]);
  const [countMembers, setCountMembers] = useState(0);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [searchName, setSearchName] = useState(localStorage.getItem('searchName'));
  const [congregationFilter, setCongregationFilter] = useState(localStorage.getItem('congregation'));
  const [congregations, setCongregations] = useState([]);

  useEffect(() => {

    getAllCongregations().then(resp => {
      setCongregations(resp.data.congregations);
    });

    setLoadingMembers(true);
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams.entries());
    getMembers(params).then(resp => {
      setMembers(resp.data.members);
      setCountMembers(resp.data.qt);
      setLoadingMembers(false);

    }).catch(() => {
      setMembers([])
      setLoadingMembers(false);
    });

  }, []);

  const handlePesquisa = (e) => {
    localStorage.setItem('searchName', e.target.value);
    setSearchName(e.target.value);
  };

  const handleFiltroCongregacao = (e) => {
    localStorage.setItem('congregation', e.target.value);
    setCongregationFilter(e.target.value);
  };


  const [openModal, setOpenModal] = useState(false);
  const [currentMemberInfoId, setCurrentMemberInfoId] = useState(null);

  const handleClickopenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <ModalMemberInfo id={currentMemberInfoId} open={openModal} handleClose={handleCloseModal} />
      <Typography variant="h6" sx={{fontWeight:'600', fontSize:'19px'}} textAlign={'center'} mb={4}>
        BUSCAR MEMBROS
        </Typography>
      <form>

        <Grid container spacing={4} sx={{ maxWidth: 900 }} m='auto'>
          <Grid size={{ xs: 12, md:9, sm: 12 }}>
            <Box px={2}>
              <Grid container spacing={4}>
                <Grid size={7}>
                  <TextField
                    name="name"
                    label="Pesquisar por nome"
                    variant="outlined"
                    fullWidth
                    value={searchName}
                    onChange={handlePesquisa} />
                </Grid>
                <Grid size={5} >
                  <FormControl fullWidth variant='filled'>
                    <InputLabel id="congregacao-label">Congregação</InputLabel>
                    <Select
                      name="congregation"
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
                      {countMembers} Membros
                    </Typography>
                    <Button variant="contained" type='submit' value='Pesquisar' />

                  </Box>
                </Grid>
              </Grid>
              {!loadingMembers && <Box mt={4}>
                {members.map((member) => (
                  <MemberListItem member={member} setOpenModal={handleClickopenModal} setCurrentMemberInfoId={setCurrentMemberInfoId}/>
                ))}
              </Box>}

              {loadingMembers && <Box mt={4}>
                <Box m={'auto'} pt={'30px'} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size={60} />
                </Box>
              </Box>}
            </Box >
          </Grid>
          <Grid size={{ xs: 12, md:3, sm: 9 }}>
            <OptionsSideBar/>
          </Grid>
        </Grid >
      </form>

    </>
  );
};

export default ShowMembers;
//109
