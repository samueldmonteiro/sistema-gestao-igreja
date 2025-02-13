import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import IconLogo from '../../../assets/icone.png'
import { Avatar } from '@mui/material';
import { AppBar, Logo } from '../../../styles/globals';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { AuthContext } from '../../../context/AuthContext';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { logout } from '../../../services/auth';

export const AdminName = styled.span`
  @media (max-width: 850px){
    display:none;
  }
`;

const Header = ({ open, handleDrawerOpen }) => {

  const { admin } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/acesso_restrito'
  }

  return (
    <AppBar position="fixed" open={open} sx={{ padding: '0 15px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
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

          <Box display='flex' alignItems={'center'}>
            <Logo src={IconLogo} />

            <Typography variant="h6" fontSize={17} noWrap component="div">
              A. D. Campo da Ponte
            </Typography>
          </Box>
        </Box>

        <Box >
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <AdminName>{admin?.position + ' ' + admin?.name}</AdminName>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 38, height: 38 }}>{admin.name[0]}</Avatar>

              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openMenu}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >


            <MenuItem onClick={handleClose}>
              <strong style={{ fontSize: '15px' }}>{admin.position + ' ' + admin.name}</strong>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Configurações
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  )
}

export default Header