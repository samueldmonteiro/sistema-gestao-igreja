import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import getAgeByDate from '../../utils/getAgeByDate'
import Button from '../button'
import InfoIcon from '@mui/icons-material/Info';

const MemberListItem = ({ member, setOpenModal, setCurrentMemberInfoId }) => {


  const handleClick = ()=>{
    setOpenModal();
    setCurrentMemberInfoId(member.id);
  }
  return (
    <Card key={member.id} sx={{ marginBottom: 3 }}>
      <CardContent style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Nome: {member.fullName}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Idade: {getAgeByDate(member.birthDate)}
        </Typography>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} flexWrap={'wrap'}>
          <Typography variant="body1" color="textSecondary">
            Congregação: {member.congregation.name}
          </Typography>
          <Box>
            <Button onClick={handleClick} variant='outlined' style={{fontSize: '12px'}} startIcon={<InfoIcon  />} value="Ver Mais" />
          </Box>
        </Box>

      </CardContent>
    </Card>
  )
}

export default MemberListItem