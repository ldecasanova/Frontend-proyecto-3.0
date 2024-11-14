import React, { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Añade el estado para el rol
  const [rol, setRol] = useState<'usuario' | 'admin'>('usuario');
  // ...otros estados

  // Dentro del handleSubmit, incluye el rol
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      await api.post('/registro', { nombre, email, direccion, password, confirmPassword, rol });
      alert('Registro exitoso');
      navigate('/');
    } catch (error) {
      console.error(error);
      // Maneja errores, muestra mensajes, etc.
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4 text-center">Registro</h2>
        {/* Otros campos */}
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        {/* Selector de rol */}
        <select
          value={rol}
          onChange={(e) => setRol(e.target.value as 'usuario' | 'admin')}
          className="mb-4 p-2 border rounded w-full"
        >
          <option value="usuario">Usuario</option>
          <option value="admin">Veterinario</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Registrarse
        </button>
        <p className="mt-4 text-center">
          ¿Ya tienes una cuenta? <Link to="/" className="text-blue-500">Inicia Sesión</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
