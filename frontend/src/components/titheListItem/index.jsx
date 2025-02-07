import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import formatDate from '../../utils/formatDate';
import formatValueToBRL from '../../utils/formatValueToBRL';
import { AttachMoney, Person, Place, DateRange } from '@mui/icons-material';

const TitheListItem = ({ tithe }) => {
  return (
    <Box sx={{ marginBottom: 2, borderRadius: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
      <Card sx={{ minWidth: 275, boxShadow: 3, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Grid container spacing={2}>
            {[
              { icon: <AttachMoney sx={{fontSize:'22px'}}/>, label: 'Valor', value: formatValueToBRL(tithe.value) },
              { icon: <Person sx={{fontSize:'22px'}}/>, label: 'Membro', value: tithe?.theMember?.fullName ?? 'Membro removido' },
              { icon: <Place sx={{fontSize:'22px'}}/>, label: 'Congregação', value: tithe?.congregation?.name ?? 'Congregação removida'},
              { icon: <DateRange sx={{fontSize:'22px'}}/>, label: 'Data', value: formatDate(tithe.date) }
            ].map((item, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <Box display="flex" alignItems="center">
                  <Box sx={{ color: 'text.secondary', marginRight: 1, display: 'flex', alignItems: 'center' }}>
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" color="textSecondary">
                      {item.label}
                    </Typography>
                    <Typography fontSize={17} variant="h6" component="div" fontWeight="550">
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TitheListItem;
