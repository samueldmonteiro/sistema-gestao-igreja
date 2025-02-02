import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link, useLocation, BrowserRouter } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import IconLogo from './assets/icone.png'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Avatar } from '@mui/material';
import { Logo } from './styles/globals';
import { AuthProvider } from './context/AuthContext';
import MainRoutes from './routes/routes';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PaidIcon from '@mui/icons-material/Paid';
import { Home } from '@mui/icons-material';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



function MainApp() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [membersMenuOpen, setMembersMenuOpen] = React.useState(false);
  const [thiersMenuOpen, setThiersMenuOpen] = React.useState(false);
  const [offeringsMenuOpen, setOfferingsMenuOpen] = React.useState(false);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleMembersMenu = () => {
    setMembersMenuOpen(!membersMenuOpen);
  };

  const toggleThiersMenu = () => {
    setThiersMenuOpen(!thiersMenuOpen);
  };

  const toggleOfferingsMenu = () => {
    setOfferingsMenuOpen(!offeringsMenuOpen);
  };

  const location = useLocation();
  const hiddenHeaderRoutes = ['/acesso_restrito'];
  const shouldShowHeader = !hiddenHeaderRoutes.includes(location.pathname);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {shouldShowHeader && <AppBar position="fixed" open={open}>
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
              <Typography variant="h6" noWrap component="div">
                A. D. Campo da Ponte
              </Typography>
            </Box>
          </Box>
          <Avatar>H</Avatar>

        </Toolbar>
      </AppBar>}
      {shouldShowHeader && <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <Home color='primary' />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        
        </List>
        <Divider />
        <List>
          <Typography m={'10px 0 10px 5px'} variant="subtitle2" sx={{ paddingLeft: 2 }}>
            MEMBROS
          </Typography>
          <ListItemButton onClick={toggleMembersMenu}>
            <ListItemIcon>
              <PersonIcon color='primary' />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: '-20px' }} primary="Gerenciar Membros" />
            {membersMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={membersMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/membros">
                <ListItemIcon>
                  <VisibilityIcon color={'primary'} />
                </ListItemIcon>
                <ListItemText sx={{ marginLeft: '-15px' }} primary="Ver Membros" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/novo_membro">
                <ListItemIcon>
                  <PersonAddAlt1Icon color={'primary'} />
                </ListItemIcon>
                <ListItemText sx={{ marginLeft: '-15px' }} primary="Novo Membro" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <Typography m={'10px 0 10px 5px'} variant="subtitle2" sx={{ paddingLeft: 2 }}>
            DÍZIMOS
          </Typography>
          <ListItemButton onClick={toggleThiersMenu}>
            <ListItemIcon>
              <PointOfSaleIcon color='primary' />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: '-20px' }} primary="Gerenciar Dízimos" />
            {thiersMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={thiersMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/dizimos">
                <ListItemIcon>
                  <VisibilityIcon color={'primary'} />
                </ListItemIcon>
                <ListItemText sx={{ marginLeft: '-15px' }} primary="Ver Dízimos" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/novo_dizimo">
                <ListItemIcon>
                  <AttachMoneyIcon color={'primary'} />
                </ListItemIcon>
                <ListItemText sx={{ marginLeft: '-15px' }} primary="Novo Dízimo" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <Typography m={'10px 0 10px 5px'} variant="subtitle2" sx={{ paddingLeft: 2 }}>
            OFERTAS
          </Typography>
          <ListItemButton onClick={toggleOfferingsMenu}>
            <ListItemIcon>
              <LocalAtmIcon color='primary' />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: '-20px' }} primary="Gerenciar Ofertas" />
            {offeringsMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={offeringsMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/ofertas">
                <ListItemIcon>
                  <VisibilityIcon color={'primary'} />
                </ListItemIcon>
                <ListItemText sx={{ marginLeft: '-15px' }} primary="Ver Ofertas" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} component={Link} to="/nova_oferta">
                <ListItemIcon>
                  <PaidIcon color={'primary'} />
                </ListItemIcon>
                <ListItemText sx={{ marginLeft: '-15px' }} primary="Nova Oferta" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        {null && <List>
          <Typography variant="subtitle1" sx={{ paddingLeft: 2 }}>
            MEMBROS
          </Typography>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/ver_membros">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Ver Membros" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/novo_membro">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Novo Membro" />
            </ListItemButton>
          </ListItem>
        </List>}
        <Divider />

      </Drawer>}
      <Main open={open} sx={{
        flexGrow: 1,
        bgcolor: "#f9f9f9",
        padding: 4,
        transition: "margin-left 0.3s ease",
        minHeight: '100vh',
        position: 'relative',
        marginLeft: open ? '-15px' : ''
      }}
      >
        <DrawerHeader />
        {/** Routes */}
        <MainRoutes />
      </Main>
    </Box>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainApp />

      </AuthProvider>
    </BrowserRouter>
  );
}


export default App;
// 327