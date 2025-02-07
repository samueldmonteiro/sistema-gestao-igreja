import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { Home, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Ícones personalizados
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PaidIcon from '@mui/icons-material/Paid';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
// Estilos globais
import { DrawerHeader, drawerWidth } from '../../../styles/globals';

// Itens do menu organizados
const menuItems = [
  {
    title: "Membros",
    icon: <PeopleAltIcon />,
    toggle: "membersMenuOpen",
    subItems: [
      { title: "Ver Membros", icon: <VisibilityIcon />, path: "/membros" },
      { title: "Novo Membro", icon: <PersonAddAlt1Icon />, path: "/novo_membro" },
    ]
  },
  {
    title: "Dízimos",
    icon: <PointOfSaleIcon />,
    toggle: "thiersMenuOpen",
    subItems: [
      { title: "Ver Dízimos", icon: <VisibilityIcon />, path: "/dizimos" },
      { title: "Novo Dízimo", icon: <AttachMoneyIcon />, path: "/novo_dizimo" },
    ]
  },
  /**{
    title: "Ofertas",
    icon: <LocalAtmIcon />,
    toggle: "offeringsMenuOpen",
    subItems: [
      { title: "Ver Ofertas", icon: <VisibilityIcon />, path: "/ofertas" },
      { title: "Nova Oferta", icon: <PaidIcon />, path: "/nova_oferta" },
    ]
  }**/,

  {
    title: "Congregações",
    icon: <HolidayVillageIcon />,
    toggle: "congregationsMenuOpen",
    subItems: [
      { title: "Nova Congregação", icon: <OtherHousesIcon />, path: "/nova_congregacao" },
      { title: "Ver Ofertas", icon: <VisibilityIcon />, path: "/ofertas" },
      { title: "Nova Oferta", icon: <PaidIcon />, path: "/nova_oferta" },
    ]
  }
];

const SideBar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();
  const [state, setState] = React.useState({
    membersMenuOpen: false,
    thiersMenuOpen: false,
    offeringsMenuOpen: false,
    congregationsMenuOpen: false,
  });

  // Alterna os menus expansíveis
  const handleToggle = (menu) => {
    setState((prevState) => ({ ...prevState, [menu]: !prevState[menu] }));
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: '#FFF',
          color: '#333',
          borderRight: 'none',
          boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)',
          scrollbarWidth: 'none',
          scrollbarColor: '#007bff6b transparent',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#007bff8a',
            borderRadius: '10px',
          }
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Painel
        </Typography>
        <IconButton onClick={handleDrawerClose} sx={{ color: '#333' }}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>

      <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" sx={{
            color: '#333',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            }
          }}>
            <ListItemIcon sx={{ color: '#333' }}>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />

      {menuItems.map((item) => (
        <Paper key={item.title} elevation={0} sx={{ backgroundColor: 'transparent' }}>
          
          <Typography variant="subtitle2" sx={{ padding: '10px 20px', fontWeight: 'bold', color: '#555' }}>
            {item.title}
          </Typography>
          <List>
            <ListItemButton onClick={() => handleToggle(item.toggle)}
              sx={{
                color: '#333',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
              }}
            >
              <ListItemIcon sx={{ color: '#333' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
              {state[item.toggle] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={state[item.toggle]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.subItems.map((subItem) => (
                  <ListItemButton component={Link} to={subItem.path} key={subItem.title}
                    sx={{
                      pl: 4, color: '#333',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' }
                    }}
                  >
                    <ListItemIcon sx={{ color: '#333' }}>{subItem.icon}</ListItemIcon>
                    <ListItemText sx={{marginLeft:'-8px'}} primary={subItem.title} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
          
        </Paper>
      ))}

    </Drawer>
  );
};

export default SideBar;
