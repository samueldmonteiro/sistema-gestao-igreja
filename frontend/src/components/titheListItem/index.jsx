import React from 'react';
import { Card, CardContent, Typography, Grid, Paper, Box } from '@mui/material';

const TitheListItem = ({tithe}) => {
  return (
    <Box sx={{ marginBottom: 2, borderRadius: 2 }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container spacing={2}>
            {/* Valor do Dízimo */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h7" component="div" color="textSecondary">
                Valor
              </Typography>
              <Typography variant="h6" component="div">
                R$ {tithe.value}
              </Typography>
            </Grid>

            {/* Nome do Membro */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h7" component="div" color="textSecondary">
                Membro
              </Typography>
              <Typography variant="h6" component="div">
                {tithe.theMember.fullName}
              </Typography>
            </Grid>

            {/* Congregação */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h7" component="div" color="textSecondary">
                Congregação
              </Typography>
              <Typography variant="h6" component="div">
                {tithe.congregation.name}
              </Typography>
            </Grid>

            {/* Data */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h7" component="div" color="textSecondary">
                Data
              </Typography>
              <Typography variant="h6" component="div">
                {new Date(tithe.date).toLocaleDateString('pt-BR')}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TitheListItem;