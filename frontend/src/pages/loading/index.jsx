import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = ({ message }) => {
  return (
    <Box sx={{width: '100%', display: 'flex', margin: '0 auto' }}>
      <CircularProgress />
    </Box>
  )
}

export default Loading