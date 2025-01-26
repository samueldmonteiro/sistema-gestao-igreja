import React, { useState } from 'react'
import {
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Collapse,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const sections = [
  {
    title: "MENU",
    items: [
      { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    ],
  },

  {
    title: "DÍZIMOS",
    items: [
      { text: "Novo dízimo", icon: <BarChartIcon />, path: "/reports" },
      { text: "Ver todos", icon: <BarChartIcon />, path: "/reports" },
      { text: "Deste mês", icon: <DescriptionIcon />, path: "/traffic" },
    ],
  },

  {
    title: "DÍZIMOS",
    items: [
      { text: "Ver t", icon: <BarChartIcon />, path: "/reports" },
      {
        text: "Sales",
        icon: <DescriptionIcon />,
        path: "/sales",
        submenu: [
          { text: "Sales Overview", path: "/sales/overview" },
          { text: "Sales by Region", path: "/sales/region" },
        ],
      },
      {
        text: "Traffic",
        icon: <DescriptionIcon />,
        path: "/traffic",
      },
    ],
  },
  {
    title: "MEMBROS",
    items: [
      { text: "Novo Membro", icon: <PersonAddIcon />, path: "/novo_membro" },
    ],
  },
];

const SideBar = () => {

  const drawerWidth = 240;

  const [openSubmenu, setOpenSubmenu] = useState({});
  console.log('app')

  const handleSubmenuToggle = (index) => {
    setOpenSubmenu((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={true}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", pl: 2, pt: 2 }}>
        {sections.map((section, index) => (
          <div key={index}>
            <Typography
              variant="subtitle1"
              sx={{ mt: 1, mb: -1, px: 2, py: 1, color: "#1976d2", fontWeight: '600', fontSize: '14px' }}
            >
              {section.title}
            </Typography>
            <List>
              {section.items.map((item, idx) => (
                <div key={idx}>
                  <ListItem
                    button
                    component={Link}
                    to={item.path}
                    onClick={
                      item.submenu
                        ? () => handleSubmenuToggle(idx)
                        : undefined
                    }
                    sx={{
                      "&:hover": { backgroundColor: "#f1f1f1" },
                      marginTop: '-9px'
                    }}
                  >
                    <ListItemIcon sx={{ color: "#1976d2" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} sx={{ marginLeft: '-15px' }} />
                    {item.submenu ? (
                      openSubmenu[idx] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : null}
                  </ListItem>
                  {/* Submenu */}
                  {item.submenu && (
                    <Collapse in={openSubmenu[idx]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.submenu.map((subitem, subidx) => (
                          <ListItem
                            button
                            component={Link}
                            to={subitem.path}
                            key={subidx}
                            sx={{ pl: 4,                       marginTop: '-9px'
                            }}
                          >
                            <ListItemText primary={subitem.text} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </div>
              ))}
            </List>
            {index < sections.length - 1 && <Divider />}
          </div>
        ))}
      </Box>
    </Drawer>
  )
}

export default SideBar