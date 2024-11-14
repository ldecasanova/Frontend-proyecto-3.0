import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState<'usuario' | 'admin'>('usuario');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const loggedInUser = await signIn(email, password);
      if (loggedInUser.rol === 'admin') {
        navigate('/veterinario/dashboard');
      } else {
        navigate('/usuario/dashboard');
      }
    } catch (error) {
      console.error(error);
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4 text-center">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          required
        />
        {/* Si deseas agregar una opción para seleccionar el rol en el login, descomenta lo siguiente */}
        {
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value as 'usuario' | 'admin')}
          className="mb-4 p-2 border rounded w-full"
        >
          <option value="usuario">Usuario</option>
          <option value="admin">Veterinario</option>
        </select>
        }
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition-colors"
        >
          Ingresar
        </button>
        <p className="mt-4 text-center">
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" className="text-blue-500 hover:underline">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
