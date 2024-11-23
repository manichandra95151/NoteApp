// // ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

const ProtectedRoute = ({ children }) => {
    const user = auth.currentUser; // Check if user is logged in

    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;


