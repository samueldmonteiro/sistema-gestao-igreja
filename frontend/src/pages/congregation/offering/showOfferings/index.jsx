import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import Grid from '@mui/material/Grid2';
import Button from "../../../../components/button";
import FilterSideBar from "./filterSideBar";
import { getCongregationOfferings } from "../../../../services/congregationOfferingService";
import CongregationOfferingsListItem from "../../../../components/congregationOfferingListItem";

const ShowOfferinigs = () => {

  const [loadingOfferings, setLoadingOfferings] = useState(true);
  const [countOfferings, setCountOfferings] = useState(0);

  const [offerings, setOfferings] = useState([]);

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams.entries());

    getCongregationOfferings(params).then(resp => {
      console.log(resp);
      setOfferings(resp.data.congregationOfferings);
      setCountOfferings(resp.data.count);
      setLoadingOfferings(false);

    }).catch(() => {
      setOfferings([])
      setLoadingOfferings(false);
    });

  }, []);


  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: '600', fontSize: '19px' }} textAlign={'center'} mb={4}>
        BUSCAR OFERTAS
      </Typography>
      <form>

        <Grid container spacing={4} sx={{ maxWidth: 900 }} m='auto'>
          <Grid size={{ xs: 12, md: 8, sm: 12 }}>
            <Box px={2}>
              <Grid container spacing={4}>
                <Grid width={'100%'}>
                  <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography fontSize={'14px'} style={{ fontWeight: "bold" }} color={'#5a5656'}>
                      {countOfferings} Ofertas
                    </Typography>
                    <Button variant="contained" type='submit' value='Pesquisar' />

                  </Box>
                </Grid>
              </Grid>

              {!loadingOfferings && <Box mt={4}>
                {offerings.map((offering) => (
                  <CongregationOfferingsListItem offering={offering} offerings={offerings} setOfferings={setOfferings}
                  setCountOfferings={setCountOfferings}/>
                ))}
              </Box>}

              {loadingOfferings && <Box mt={4}>
                <Box m={'auto'} pt={'30px'} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress size={60} />
                </Box>
              </Box>}
            </Box >
          </Grid>
          <Grid size={{ xs: 12, md: 4, sm: 12 }}>
            <FilterSideBar />
          </Grid>
        </Grid >
      </form>
    </>
  );
};

export default ShowOfferinigs;
//109
