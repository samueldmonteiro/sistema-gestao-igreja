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
import MailIcon from '@mui/icons-material/Mail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import NewMember from "./pages/member/newMember";
import ShowMembers from "./pages/member/showMembers";
import EditMember from './pages/member/editMember';
import IconLogo from './assets/icone.png'
const drawerWidth = 240;

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

function DashBoard2() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [membersMenuOpen, setMembersMenuOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleMembersMenu = () => {
    setMembersMenuOpen(!membersMenuOpen);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
            <Box display='flex' alignItems={'center'}>
              <img style={{ width: '50px', marginRight:'10px' }} src={IconLogo} alt="" />
              <Typography variant="h6" noWrap component="div">
                A. D. Campo da Ponte
              </Typography>
            </Box>

          </Toolbar>
        </AppBar>
        <Drawer
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
            <Typography variant="subtitle1" sx={{ paddingLeft: 2 }}>
              Membros
            </Typography>
            <ListItemButton onClick={toggleMembersMenu}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Gerenciar Membros" />
              {membersMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={membersMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/novo_membro">
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Novo Membro" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/ver_membros">
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ver Membros" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
          <Divider />
          <List>
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
          </List>


          <List>
            <Typography variant="subtitle1" sx={{ paddingLeft: 2 }}>
              Outros
            </Typography>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/inbox">
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
        <Main open={open} sx={{
          flexGrow: 1,
          bgcolor: "#f9f9f9",
          padding: 5,
          transition: "margin-left 0.3s ease",
          minHeight: '100vh'
        }}
        >
          <DrawerHeader />
          <Routes>
            <Route path="/inbox" element={<Typography variant="h4">Inbox Page</Typography>} />

            {/** Members */}
            <Route path="/novo_membro" element={<NewMember />} />
            <Route path="/ver_membros" element={<ShowMembers />} />
            <Route path="/editar_membro/:id" element={<EditMember />} />
          </Routes>
        </Main>
      </Box>
    </Router>
  );
}

export default DashBoard2;
