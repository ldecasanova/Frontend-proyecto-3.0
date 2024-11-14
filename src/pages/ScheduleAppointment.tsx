import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Animal } from '../types';

const ScheduleAppointment: React.FC = () => {
  const [animales, setAnimales] = useState<Animal[]>([]);
  const [animalId, setAnimalId] = useState('');
  const [fechaCita, setFechaCita] = useState('');
  const [motivo, setMotivo] = useState('');
  const [veterinario, setVeterinario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimales = async () => {
      try {
        const response = await api.get('/mis-animales', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@App:token')}`,
          },
        });
        setAnimales(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnimales();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(
        '/citas',
        { animalId: Number(animalId), fechaCita, motivo, veterinario },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@App:token')}`,
          },
        }
      );
      alert('Cita agendada');
      navigate('/usuario/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl mb-4">Agendar Cita</h1>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
          <select
            value={animalId}
            onChange={(e) => setAnimalId(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          >
            <option value="">Seleccione una mascota</option>
            {animales.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.nombre}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={fechaCita}
            onChange={(e) => setFechaCita(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Veterinario"
            value={veterinario}
            onChange={(e) => setVeterinario(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Agendar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppointment;
