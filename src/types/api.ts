export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role: string;
}

export interface AuthValidationResponse {
  valid: boolean;
  username: string;
}

export interface AeropuertoDTO {
  codigoIATA: string;
  nombre: string;
  ciudad: string;
  pais: string;
  codigoICAO?: string;
}

export interface VueloDTO {
  id?: string;
  numeroVuelo?: string; // Backend doesn't seem to have numeroVuelo in DTO, but maybe it's mapped? DbInit doesn't show it. Vuelo entity might have it.
  origen: string; // Código aeropuerto
  destino: string; // Código aeropuerto
  fechaSalida: string; // ISO Date string
  fechaLlegada: string; // ISO Date string
  precio: number;
  capacidadTotal?: number; // Backend DTO doesn't have capacity? It has asientosDisponibles.
  asientosDisponibles?: number;
  clase?: string;
  estado?: string;
  aerolinea?: string;
  duracion?: string;
  moneda?: string;
}

export interface VueloResumenReservasDTO {
  vueloId: string;
  numeroVuelo: string;
  totalReservas: number;
  capacidadTotal: number;
  asientosDisponibles: number;
  porcentajeOcupacion: number;
}

export interface PasajeroDTO {
  id?: string;
  nombre: string;
  documento: string;
  email: string;
  telefono: string;
}

export interface ReservaDTO {
  reservaVueloId: string;
  reservaConfirmadaId?: string;
  vueloId: string;
  numPasajeros: number;
  contactoReserva: string;
  documentoContacto: string;
  precioTotal: number;
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'EXPIRADA';
  fechaCreacion: string;
  fechaExpiracion?: string;
  fechaConfirmacion?: string;
  fechaCancelacion?: string;
  transaccionId?: string;
  observaciones?: string;
  urlComprobante?: string;
}

export interface ReporteOcupacionDTO {
  vueloId: string;
  numeroVuelo: string;
  origen: string;
  destino: string;
  fechaSalida: string;
  capacidadTotal: number;
  asientosOcupados: number;
  porcentajeOcupacion: number;
}

export interface ReporteIngresosDTO {
  vueloId: string;
  numeroVuelo: string;
  totalReservas: number;
  ingresoTotal: number;
  fechaSalida: string;
}

export interface ReporteDestinosPopularesDTO {
  origen: string;
  destino: string;
  cantidadReservas: number;
  totalPasajeros: number;
}

export interface ErrorResponse {
  error: string;
  timestamp?: string;
  path?: string;
}

