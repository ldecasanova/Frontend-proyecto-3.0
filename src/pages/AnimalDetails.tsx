import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Animal, RegistroSalud, Vacuna } from '../types';
import Navbar from '../components/Navbar';

const AnimalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [historial, setHistorial] = useState<RegistroSalud[]>([]);
  const [vacunas, setVacunas] = useState<Vacuna[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animalResponse = await api.get(`/animales/${id}`);
        setAnimal(animalResponse.data);

        const historialResponse = await api.get(`/historial/${id}`);
        setHistorial(historialResponse.data);

        const vacunasResponse = await api.get(`/vacunas/${id}`);
        setVacunas(vacunasResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!animal) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl mb-4">{animal.nombre}</h1>
        <p>Especie: {animal.especie}</p>
        <p>Edad: {animal.edad}</p>
        <p>Estado de Salud: {animal.estadoSalud}</p>

        <h2 className="text-xl mt-6">Historial Médico</h2>
        <ul>
          {historial.map((registro) => (
            <li key={registro.id}>
              {registro.fechaConsulta}: {registro.descripcion}
            </li>
          ))}
        </ul>

        <h2 className="text-xl mt-6">Vacunas</h2>
        <ul>
          {vacunas.map((vacuna) => (
            <li key={vacuna.id}>
              {vacuna.nombre} - Aplicada el {vacuna.fechaAplicacion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnimalDetails;
