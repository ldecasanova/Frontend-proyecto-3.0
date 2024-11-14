import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Animal } from '../types';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const DashboardUsuario: React.FC = () => {
  const [animales, setAnimales] = useState<Animal[]>([]);

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

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl mb-4">Mis Mascotas</h1>
        <Link to="/usuario/agregar-animal" className="bg-green-500 text-white p-2 rounded">
          Agregar Mascota
        </Link>
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Especie</th>
              <th className="py-2 px-4 border-b">Edad</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {animales.map((animal) => (
              <tr key={animal.id}>
                <td className="py-2 px-4 border-b">{animal.nombre}</td>
                <td className="py-2 px-4 border-b">{animal.especie}</td>
                <td className="py-2 px-4 border-b">{animal.edad}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/usuario/animal/${animal.id}`} className="text-blue-500 mr-2">
                    Ver Detalles
                  </Link>
                  <Link to="/usuario/agendar-cita" className="bg-blue-500 text-white p-2 rounded ml-4">
                    Agendar Cita
                    </Link>

                  {/* Agrega más acciones como editar o eliminar */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardUsuario;
