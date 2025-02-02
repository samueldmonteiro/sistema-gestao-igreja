import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMembers } from '../../services/memberService';
import { getAllCongregations, getCongregationsWithTotalTithes, getTop3CongregationsWithTotalTithes } from '../../services/congregationService';
import { getTithes } from '../../services/titheService';
import Loading from '../loading';

const Home = () => {
  // Dados fictícios para o exemplo
  const totalOfferings = 0;

  const [totalMembers, setTotalMembers] = useState(0);
  const [totalCongregations, setTotalCongregations] = useState(0);
  const [totalTithes, setTotalTithes] = useState(0);
  const [congregationTithesData, setCongregationTithesData] = useState([]);
  const [congregationTableData, setCongregationTableData] = useState([]);

  useEffect(() => {
    getMembers().then(resp => {
      setTotalMembers(resp.data.qt)
    });

    getAllCongregations().then(resp => {
      setTotalCongregations(resp.data.qt)
    });

    getTithes().then(resp => {
      let total = 0;

      resp.data.tithes.forEach(({ value }) => {
        total += parseFloat(value);
      });
      setTotalTithes(total);
    });

    getCongregationsWithTotalTithes().then(resp => {
      console.log(resp)
      let congregations = [];
      resp.data.congregations.forEach((congregation) => {
        congregations.push({ name: congregation.name, tithes: congregation.totalTithes })
      });

      console.log(congregations);
      setCongregationTithesData(congregations);
    });

    getTop3CongregationsWithTotalTithes().then(resp => {
      console.log(resp)
      let congregations = [];
      resp.data.congregations.forEach((congregation) => {
        congregations.push({ name: congregation.name, tithes: congregation.totalTithes })
      });

      console.log(congregations);
      setCongregationTableData(congregations);
    });

  }, []);

  if(!congregationTithesData || !totalTithes) return (<Loading/>)

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
              <Typography variant="h5">{`R$ ${totalTithes}`}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontSize={19}>Total de Ofertas:</Typography>
              <Typography variant="h5">{`R$ ${totalOfferings}`}</Typography>
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
                  <Bar dataKey="tithes" fill="#3f51b5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Tabela de Congregações com Maior Quantidade de Dízimos */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontSize={19}>Top 3 Congregações com Maior Dízimo</Typography>
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Congregação</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>Dízimo (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {congregationTableData.map((congregation, index) => (
                      <tr key={index}>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{congregation.name}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{`R$ ${congregation.tithes}`}</td>
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
