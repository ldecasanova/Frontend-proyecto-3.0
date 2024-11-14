export interface User {
    id: number;
    nombre: string;
    email: string;
    direccion: string;
    rol: 'usuario' | 'admin';
    // otros campos
  }
  
  export interface Animal {
    id: number;
    nombre: string;
    especie: string;
    edad: number;
    estadoSalud: string;
    adoptanteId: number;
    // otros campos
  }
  
  export interface Cita {
    id: number;
    animalId: number;
    fechaCita: string;
    motivo: string;
    veterinario: string;
    estado?: string;
  }
  
  export interface RegistroSalud {
    id: number;
    descripcion: string;
    fechaConsulta: string;
    veterinario: string;
    animalId: number;
  }
  
  export interface Vacuna {
    id: number;
    nombre: string;
    fechaAplicacion: string;
    fechaProximaAplicacion: string;
    animalId: number;
  }
  
  export interface Notificacion {
    id: number;
    mensaje: string;
    usuarioId: number;
  }
  
  export interface Ubicacion {
    id: number;
    latitud: number;
    longitud: number;
    fechaRegistro: string;
    animalId: number;
  }
  
  // Agrega más interfaces según sea necesario
  