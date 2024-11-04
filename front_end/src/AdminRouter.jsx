import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Outlet,Navigate } from 'react-router-dom'

export const AdminRouter = () => {
    const {is_admin}= useContext(AuthContext)
    return is_admin ? <Outlet/> : 
    <Navigate to="/site/home" /> 
}
