import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  
import ProductList from './components/ProductList';
import AddProduct from './components/CrearProducto';  
import Login from './components/Login';
import { Spin } from 'antd';

const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setAuthChecked(true); 
    }
  }, [isLoading]);

  if (!authChecked) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/productos" />} />
        <Route path="/productos" element={isAuthenticated ? <ProductList /> : <Navigate to="/login" />} />
        <Route path="/productos/crear" element={isAuthenticated ? <AddProduct /> : <Navigate to="/login" />} /> 
        <Route path="/" element={isAuthenticated ? <Navigate to="/productos" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
