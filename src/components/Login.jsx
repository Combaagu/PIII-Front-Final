import React from 'react';
import { Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/Login.css'; 

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Iniciar sesión</h2>
        <p className="login-keywords">Está construido con tecnologías web estándar, lo que permite un fácil despliegue y personalización.</p>
        <Button type="primary" onClick={() => loginWithRedirect()}>
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
};

export default Login;
