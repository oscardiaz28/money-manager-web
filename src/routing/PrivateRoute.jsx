import React from 'react'
import { useProfileStore } from '../store/useProfileStore'
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ( {children } ) => {

    const { user } = useProfileStore();

    return user ? children : <Navigate to="/login" />

}
