import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AgregarAnimal: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [edad, setEdad] = useState('');
  const [estadoSalud, setEstadoSalud] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(
        '/animales',
        { nombre, especie, edad: Number(edad), estadoSalud },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@App:token')}`,
          },
        }
      );
      alert('Mascota agregada');
      navigate('/usuario/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl mb-4">Agregar Mascota</h1>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Especie"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          <input
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Estado de Salud"
            value={estadoSalud}
            onChange={(e) => setEstadoSalud(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgregarAnimal;
