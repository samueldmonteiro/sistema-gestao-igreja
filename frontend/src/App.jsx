import {
  Toolbar,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/dashboard/header";
import SideBar from "./components/dashboard/sideBar";
import './styles/global.css'; // Importando o CSS global
import NewMember from "./pages/member/newMember";


export default function App() {
  
  return (
    <Router>
      <Box sx={{ display: "flex" }}>

        <CssBaseline />
        
        {/* Barra Superior */}
        <Header />

        {/* Barra Lateral */}
        <SideBar/>

        {/* Conteúdo Principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "#f9f9f9",
            padding: 5,
            transition: "margin-left 0.3s ease",
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Typography>Orders Page</Typography>} />
            <Route path="/reports" element={<Typography>Reports Page</Typography>} />
            <Route
              path="/sales/overview"
              element={<Typography>Sales Overview Page</Typography>}
            />
            <Route
              path="/sales/region"
              element={<Typography>Sales by Region Page</Typography>}
            />
            <Route path="/traffic" element={<Typography>Traffic Page</Typography>} />
            
            {/** Members */}
            <Route path="/novo_membro" element={<NewMember/>} />

          </Routes>
        </Box>
      </Box>
    </Router>
  );
}