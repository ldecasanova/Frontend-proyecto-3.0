import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Animal } from '../types';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const enviarNotificaciones = async () => {
    try {
      await api.post('/notificaciones', {
        mensaje: 'Su mascota necesita una vacuna',
        // usuarioId: obtiene los IDs de los dueños
      });
      alert('Notificaciones enviadas');
    } catch (error) {
      console.error(error);
    }
  };  
  
const DashboardVeterinario: React.FC = () => {
  const [animales, setAnimales] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchAnimales = async () => {
      try {
        const response = await api.get('/animales', {
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

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl mb-4">Dashboard Veterinario</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Especie</th>
              <th className="py-2 px-4 border-b">Edad</th>
              <th className="py-2 px-4 border-b">Estado de Salud</th>
              <th className="py-2 px-4 border-b">ID del Dueño</th>
            </tr>
          </thead>
          <tbody>
            {animales.map((animal) => (
              <tr key={animal.id}>
                <td className="py-2 px-4 border-b">{animal.nombre}</td>
                <td className="py-2 px-4 border-b">{animal.especie}</td>
                <td className="py-2 px-4 border-b">{animal.edad}</td>
                <td className="py-2 px-4 border-b">{animal.estadoSalud}</td>
                <td className="py-2 px-4 border-b">{animal.adoptanteId}</td>
                <td className="py-2 px-4 border-b">
                <Link to={`/veterinario/animal/${animal.id}`} className="text-blue-500">
                    {animal.nombre}
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
        onClick={enviarNotificaciones}
        className="mt-4 bg-green-500 text-white p-2 rounded"
        >
        Notificar a Dueños sobre Vacunas
        </button>
      </div>
    </div>
  );
};

export default DashboardVeterinario;
