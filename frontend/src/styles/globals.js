import { styled as styledMain } from "styled-components";
import { useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

export const Logo = styledMain.img`
    width: 45px;
    margin-right: 10px;
    margin-top: -5px;

    @media (max-width: 400px){
      margin-left: -10px;
    }
`
export const drawerWidth = 250;

export const DrawerHeader = styled('div')(({ }) => {
  const theme = useTheme();
  return {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }
});

const hiddenHeaderRoutes = ['/acesso_restrito'];
const currentPath = window.location.pathname;
const shouldShowHeader = !hiddenHeaderRoutes.includes(currentPath);

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: shouldShowHeader ? `-${drawerWidth}px` : '',
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export const AppBar = styled(MuiAppBar, {
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