import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import IconLogo from '../../../assets/icone.jpg'
import { Logo } from './styles'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const Header = ({setOpen}) => {

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            mr: 2,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          A. D. Campo da Ponte
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header