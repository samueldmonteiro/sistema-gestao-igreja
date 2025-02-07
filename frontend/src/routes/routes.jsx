import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoute from './protected/AdminRoute'
import NewTithe from '../pages/thithe/newTithe'
import ShowTithes from '../pages/thithe/showTithes'
import Login from '../pages/admin/login'
import EditMember from '../pages/member/editMember'
import NewMember from '../pages/member/newMember'
import ShowMembers from '../pages/member/showMembers'
import { Box, Typography } from '@mui/material'
import Home from '../pages/home'
import NewCongregation from '../pages/congregation/newCongregation'
import NewOffering from '../pages/congregation/offering/newOffering'

const MainRoutes = () => {
  return (
    <Box mb={'35px'}>
      <Routes >
        <Route path="/" element={<AdminRoute><Home /></AdminRoute>} />

        {/** Members */}
        <Route path="/novo_membro" element={<AdminRoute><NewMember /></AdminRoute>} />
        <Route path="/membros" element={<AdminRoute><ShowMembers /></AdminRoute>} />
        <Route path="/editar_membro/:id" element={<AdminRoute><EditMember /></AdminRoute>} />

        {/** Admin */}
        <Route path="/acesso_restrito" element={<Login />} />

        {/** Thiers */}
        <Route path="/novo_dizimo" element={<AdminRoute><NewTithe /></AdminRoute>} />
        <Route path="/dizimos" element={<AdminRoute><ShowTithes /></AdminRoute>} />

        {/** Congregation Offerings */}
        <Route path="/ofertas" element={<Typography variant="h5">Estará funcionando em Breve!</Typography>} />
        <Route path="/nova_oferta" element={<AdminRoute><NewOffering /></AdminRoute>} />

        {/** Congregations */}
        <Route path="/nova_congregacao" element={<AdminRoute><NewCongregation /></AdminRoute>} />

      </Routes>
    </Box>
  )
}

export default MainRoutes