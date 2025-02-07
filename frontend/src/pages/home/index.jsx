import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
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
    getMembers().then(resp => setTotalMembers(resp.data.qt));
    getAllCongregations().then(resp => setTotalCongregations(resp.data.qt));

    getTithes().then(resp => {
      const total = resp.data.tithes.reduce((sum, { value }) => sum + parseFloat(value), 0);
      setTotalTithes(total);
    });

    getCongregationOfferings().then(resp => {
      const total = resp.data.congregationOfferings.reduce((sum, { value }) => sum + parseFloat(value), 0);
      setTotalOfferings(total);
    });

    getCongregationsWithTotalTithes().then(resp => {
      const data = resp.data.congregations.map(({ name, totalTithes }) => ({ name, dizimos: totalTithes }));
      setCongregationTithesData(data);
    });

    getCongregationsWithTotalOfferings().then(resp => {
      const data = resp.data.congregations.map(({ name, total_offerings }) => ({ name, ofertas: total_offerings }));
      setCongregationOfferingsData(data);
    });
  }, []);

  if (!totalMembers || !totalCongregations || !totalTithes || !totalOfferings || !congregationTithesData || !congregationOfferingsData) {
    return <Loading />;
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={3}>
        {[{ label: 'Total de Irmãos', value: totalMembers },
          { label: 'Total de Congregações', value: totalCongregations },
          { label: 'Total de Dízimos', value: formatValueToBRL(totalTithes) },
          { label: 'Total de Ofertas', value: formatValueToBRL(totalOfferings) }
        ].map((item, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.label}</Typography>
                <Typography variant="h5">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Dízimos por Congregação</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={congregationTithesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="dizimos" fill="#3f51b5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Ofertas por Congregação</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={congregationOfferingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ofertas" fill="#f50057" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Ranking - Maiores Dízimos</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Congregação</TableCell>
                    <TableCell>Dízimos (R$)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {congregationTithesData.sort((a, b) => b.dizimos - a.dizimos).slice(0, 5).map(({ name, dizimos }, index) => (
                    <TableRow key={index}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{formatValueToBRL(dizimos)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Ranking - Maiores Ofertas</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Congregação</TableCell>
                    <TableCell>Ofertas (R$)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {congregationOfferingsData.sort((a, b) => b.ofertas - a.ofertas).slice(0, 5).map(({ name, ofertas }, index) => (
                    <TableRow key={index}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{formatValueToBRL(ofertas)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
