import { AppBar, Toolbar, Typography } from '@mui/material'
import IconLogo from '../../../assets/icone.jpg'
import { Logo } from './styles'

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#ffffff",
        color: "#1976d2",
      }}
    >
      <Toolbar>
        <Logo src={IconLogo}/>
        <Typography noWrap component="div" sx={{fontWeight:'500', fontSize:'16px'}}>
          A. D. Campo da Ponte
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header