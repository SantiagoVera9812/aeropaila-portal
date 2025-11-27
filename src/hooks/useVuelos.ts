import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '../lib/api';
import { VueloDTO, VueloResumenReservasDTO } from '../types/api';

export const useVuelos = () => {
  const [vuelos, setVuelos] = useState<VueloDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVuelos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<VueloDTO[]>('/v1/admin/vuelos');
      setVuelos(response.data);
    } catch (error) {
      console.error('Error fetching vuelos:', error);
      toast.error('Error al cargar vuelos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createVuelo = async (vuelo: VueloDTO) => {
    setIsLoading(true);
    try {
      // Transform DTO to Entity structure for Backend
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, asientosDisponibles, numeroVuelo, ...vueloData } = vuelo;
      const payload = {
        ...vueloData,
        origen: { codigoIATA: vuelo.origen },
        destino: { codigoIATA: vuelo.destino },
        capacidadTotal: vuelo.capacidadTotal
      };
      await api.post('/v1/admin/vuelos', payload);
      toast.success('Vuelo creado exitosamente');
      fetchVuelos();
      return true;
    } catch (error) {
      console.error('Error creating vuelo:', error);
      toast.error('Error al crear vuelo');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateVuelo = async (id: string, vuelo: VueloDTO) => {
  setIsLoading(true);
  try {
    // revisar vuelo
    const sanitizedVuelo = {
      ...vuelo,
      capacidadTotal: vuelo.capacidadTotal && !isNaN(vuelo.capacidadTotal) 
        ? vuelo.capacidadTotal 
        : 0 
    };

    const { id: _id, numeroVuelo, ...vueloData } = sanitizedVuelo;
    const payload = {
      ...vueloData,
      origen: { codigoIATA: vuelo.origen },
      destino: { codigoIATA: vuelo.destino },
    };

    await api.put(`/v1/admin/vuelos/${id}`, payload);
    toast.success('Vuelo actualizado exitosamente');
    fetchVuelos();
    return true;
  } catch (error) {
    console.error('Error updating vuelo:', error);
    toast.error('Error al actualizar vuelo');
    return false;
  } finally {
    setIsLoading(false);
  }
};

  const deleteVuelo = async (id: string) => {
    if (!confirm('¿Está seguro de eliminar este vuelo?')) return;

    setIsLoading(true);
    try {
      await api.delete(`/v1/admin/vuelos/${id}`);
      toast.success('Vuelo eliminado exitosamente');
      fetchVuelos();
      return true;
    } catch (error) {
      console.error('Error deleting vuelo:', error);
      toast.error('Error al eliminar vuelo');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getResumenReservas = async (id: string): Promise<VueloResumenReservasDTO | null> => {
    try {
      const response = await api.get<VueloResumenReservasDTO>(`/v1/admin/vuelos/${id}/reservas`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resumen reservas:', error);
      return null;
    }
  };

  const ajustarDisponibilidad = async (id: string, nuevaCapacidad: number) => {
    try {
      await api.put(`/v1/admin/vuelos/${id}/disponibilidad`, { nuevaDisponibilidad: nuevaCapacidad, motivo: "Ajuste manual desde admin" });
      toast.success('Disponibilidad ajustada');
      fetchVuelos();
      return true;
    } catch (error) {
      console.error('Error adjusting availability:', error);
      toast.error('Error al ajustar disponibilidad');
      return false;
    }
  };

  useEffect(() => {
    fetchVuelos();
  }, [fetchVuelos]);

  return {
    vuelos,
    isLoading,
    fetchVuelos,
    createVuelo,
    updateVuelo,
    deleteVuelo,
    getResumenReservas,
    ajustarDisponibilidad
  };
};
