import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import getAgeByDate from '../../utils/getAgeByDate';

const MemberListItem = ({ member, setOpenModal, setCurrentMemberInfoId }) => {
  
  const handleClick = () => {
    setOpenModal();
    setCurrentMemberInfoId(member.id);
  };

  return (
    <Card key={member.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Typography variant="h6" fontWeight="bold">
          {member.fullName}
        </Typography>
        <Typography mb={'-10px'} variant="body2" color="text.secondary">
          Idade: {getAgeByDate(member.birthDate)} anos
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <Typography variant="body2" color="text.secondary">
            Congregação: {member?.congregation?.name ?? 'Não encontrado'}
          </Typography>
          <Button 
            onClick={handleClick} 
            variant="contained" 
            size="small"
            startIcon={<InfoIcon />}
            sx={{
              marginTop:'8px',
              fontSize: '12px',
              textTransform: 'none',
              borderRadius: 2
            }}
          >
            Ver Mais
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MemberListItem;
