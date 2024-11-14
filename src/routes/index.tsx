import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DashboardVeterinario from '../pages/DashboardVeterinario';
import DashboardUsuario from '../pages/DashboardUsuario';
import PrivateRoute from '../components/PrivateRoute';
import AnimalDetails from '../pages/AnimalDetails';
import ScheduleAppointment from '../pages/ScheduleAppointment';
import Notificaciones from '../pages/Notificaciones';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/registro" element={<Register />} />
    <Route
      path="/veterinario/dashboard"
      element={
        <PrivateRoute>
          <DashboardVeterinario />
        </PrivateRoute>
      }
    />
    <Route
      path="/usuario/dashboard"
      element={
        <PrivateRoute>
          <DashboardUsuario />
        </PrivateRoute>
      }
    />
    <Route
        path="/veterinario/animal/:id"
        element={
            <PrivateRoute>
            <AnimalDetails/>
            </PrivateRoute>
        }
/>
    <Route
        path="/usuario/agendar-cita"
        element={
            <PrivateRoute>
            <ScheduleAppointment />
            </PrivateRoute>
        }
/>
    <Route
        path="/usuario/notificaciones"
        element={
            <PrivateRoute>
            <Notificaciones />
            </PrivateRoute>
        }
/>

    {/* Agrega más rutas según sea necesario */}
  </Routes>
);

export default AppRoutes;
