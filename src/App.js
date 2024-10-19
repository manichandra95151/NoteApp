import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { auth } from './firebase/firebase'; // Firebase auth import
import './index.css'

function App() {
    return (
       
        <Router>
             {/* <Navbar/> */}
            <Routes>
                {/* Redirect to login if not authenticated */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<LoginPage />} />
                {/* Add other routes if needed */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
