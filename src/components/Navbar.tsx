import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { signOut, user } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <div>
        <Link to="/">Inicio</Link>
        {user?.rol === 'admin' && (
          <>
            <Link to="/veterinario/dashboard" className="ml-4">
              Dashboard Veterinario
            </Link>
            {/* Otros enlaces para admin */}
          </>
        )}
        {user?.rol === 'usuario' && (
          <>
            <Link to="/usuario/dashboard" className="ml-4">
              Mi Panel
            </Link>
            {/* Otros enlaces para usuario */}
          </>
        )}
      </div>
      <div>
        {user && (
          <>
            <span className="mr-4">Hola, {user.nombre}</span>
            <button onClick={signOut}>Cerrar Sesión</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
