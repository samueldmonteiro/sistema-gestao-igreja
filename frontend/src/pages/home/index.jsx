import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMembers } from '../../services/memberService';
import { getAllCongregations, getCongregationsWithTotalTithes, getCongregationsWithTotalOfferings } from '../../services/congregationService';
import { getTithes } from '../../services/titheService';
import Loading from '../loading';
import formatValueToBRL from '../../utils/formatValueToBRL';
import { getCongregationOfferings } from '../../services/congregationOfferingService';

const Home = () => {
  const [totalMembers, setTotalMembers] = useState(null);
  const [totalCongregations, setTotalCongregations] = useState(null);
  const [totalTithes, setTotalTithes] = useState(null);
  const [totalOfferings, setTotalOfferings] = useState(null);
  const [congregationTithesData, setCongregationTithesData] = useState(null);
  const [congregationOfferingsData, setCongregationOfferingsData] = useState(null);

  useEffect(() => {
    getMembers().then(resp => {
      setTotalMembers(resp.data.qt);
    });

    getAllCongregations().then(resp => {
      setTotalCongregations(resp.data.qt);
    });

    getTithes().then(resp => {
      let total = 0;
      resp.data.tithes.forEach(({ value }) => {
        total += parseFloat(value);
      });
      setTotalTithes(total);
    });

    getCongregationOfferings().then(resp => {
      let total = 0;
      resp.data.congregationOfferings.forEach(({ value }) => {
        total += parseFloat(value);
      });
      setTotalOfferings(total);
    });

    getCongregationsWithTotalTithes().then(resp => {
      let congregations = [];
      resp.data.congregations.forEach((congregation) => {
        congregations.push({ name: congregation.name, Dizimos: congregation.totalTithes });
      });
      setCongregationTithesData(congregations);
    });

    getCongregationsWithTotalOfferings().then(resp => {
      let congregations = [];
      resp.data.congregations.forEach((congregation) => {
        congregations.push({ name: congregation.name, Ofertas: congregation.total_offerings });
      });
      setCongregationOfferingsData(congregations);
    });
  }, []);

  if (congregationTithesData == null || congregationOfferingsData == null || totalMembers == null || totalCongregations == null || totalTithes == null || totalOfferings == null) {
    return (<Loading />);
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={3}>
        {/* Informações Resumo */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontSize={19}>Total de Irmãos:</Typography>
              <Typography variant="h5">{totalMembers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontSize={19}>Total de Congregações:</Typography>
              <Typography variant="h5">{totalCongregations}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontSize={19}>Total de Dízimos:</Typography>
              <Typography variant="h5">{formatValueToBRL(totalTithes)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontSize={19}>Total de Ofertas:</Typography>
              <Typography variant="h5">{formatValueToBRL(totalOfferings)}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Dízimos por Congregação */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontSize={19}>Dízimos por Congregação</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={congregationTithesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Dizimos" fill="#3f51b5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Ofertas por Congregação */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontSize={19}>Ofertas por Congregação</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={congregationOfferingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Ofertas" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Tabela de Dízimos por Congregação */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontSize={19}>Dízimos por Congregação</Typography>
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Congregação</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Dízimo (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {congregationTithesData && congregationTithesData.map((congregation, index) => (
                      <tr key={index}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{congregation.name}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{formatValueToBRL(congregation.tithes)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Tabela de Ofertas por Congregação */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontSize={19}>Ofertas por Congregação</Typography>
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Congregação</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Oferta (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {congregationOfferingsData && congregationOfferingsData.map((congregation, index) => (
                      <tr key={index}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{congregation.name}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{formatValueToBRL(congregation.offerings)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;