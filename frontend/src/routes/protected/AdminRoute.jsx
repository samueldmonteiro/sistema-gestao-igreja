import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const AdminRoute = ({ children }) => {

    const { isLogged } = useContext(AuthContext);

    if (!isLogged) {
        return <Navigate to="/acesso_restrito" />
    }

    return children;
}

export default AdminRoute;