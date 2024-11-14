import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface Props {
  children: JSX.Element;
}

const UserRoute: React.FC<Props> = ({ children }) => {
  const { signed, user, loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (!signed) {
    return <Navigate to="/" />;
  }

  return user?.rol === 'usuario' ? children : <Navigate to="/" />;
};

export default UserRoute;
