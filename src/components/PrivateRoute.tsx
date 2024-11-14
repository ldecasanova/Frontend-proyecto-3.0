import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return signed ? children : <Navigate to="/" />;
};

export default PrivateRoute;

