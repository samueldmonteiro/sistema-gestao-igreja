import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation, BrowserRouter } from 'react-router-dom';
import { DrawerHeader, drawerWidth, Main } from './styles/globals';
import { AuthProvider } from './context/AuthContext';
import MainRoutes from './routes/routes';
import Header from './components/dashboard/header';
import SideBar from './components/dashboard/sideBar';
import Footer from './components/footer';
import { FormatColorTextRounded } from '@mui/icons-material';

const windowWidth = window.innerWidth;

function MainApp() {
  const [open, setOpen] = React.useState(windowWidth < 600 ? false : true);

console.log('oi')
  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const location = useLocation();
  const hiddenHeaderRoutes = ['/acesso_restrito'];
  const shouldShowHeader = !hiddenHeaderRoutes.includes(location.pathname);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {shouldShowHeader && <Header open={open} handleDrawerOpen={handleDrawerOpen}/>}
      {shouldShowHeader && <SideBar open={open} handleDrawerClose={handleDrawerClose}/>}
      <Main open={open} sx={{
        flexGrow: 1,
        bgcolor: "#f9f9f9",
        padding: 4,
        transition: "margin-left 0.3s ease",
        minHeight: '100vh',
        position: 'relative',
       
        marginLeft: open ? '-10px' : '',
        paddingBottom: '0px',
      }}
      >
        <DrawerHeader />
        {/** Routes */}
        <MainRoutes />
        <Footer/>
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
