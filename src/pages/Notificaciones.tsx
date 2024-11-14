import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Notificacion } from '../types';
import Navbar from '../components/Navbar';

const Notificaciones: React.FC = () => {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const response = await api.get('/notificaciones', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@App:token')}`,
          },
        });
        setNotificaciones(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotificaciones();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl mb-4">Notificaciones</h1>
        <ul>
          {notificaciones.map((notificacion) => (
            <li key={notificacion.id} className="mb-2">
              {notificacion.mensaje}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notificaciones;
