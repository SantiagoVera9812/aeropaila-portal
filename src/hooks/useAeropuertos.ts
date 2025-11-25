import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '../lib/api';
import { AeropuertoDTO } from '../types/api';

export const useAeropuertos = () => {
  const [aeropuertos, setAeropuertos] = useState<AeropuertoDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAeropuertos = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<AeropuertoDTO[]>('/v1/admin/aeropuertos');
      setAeropuertos(response.data);
    } catch (error) {
      console.error('Error fetching aeropuertos:', error);
      toast.error('Error al cargar aeropuertos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createAeropuerto = async (aeropuerto: AeropuertoDTO) => {
    setIsLoading(true);
    try {
      await api.post('/v1/admin/aeropuertos', aeropuerto);
      toast.success('Aeropuerto creado exitosamente');
      fetchAeropuertos();
      return true;
    } catch (error) {
      console.error('Error creating aeropuerto:', error);
      toast.error('Error al crear aeropuerto');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateAeropuerto = async (id: string, aeropuerto: AeropuertoDTO) => {
    setIsLoading(true);
    try {
      await api.put(`/v1/admin/aeropuertos/${id}`, aeropuerto);
      toast.success('Aeropuerto actualizado exitosamente');
      fetchAeropuertos();
      return true;
    } catch (error) {
      console.error('Error updating aeropuerto:', error);
      toast.error('Error al actualizar aeropuerto');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAeropuerto = async (id: string) => {
    if (!confirm('¿Está seguro de eliminar este aeropuerto?')) return;
    
    setIsLoading(true);
    try {
      await api.delete(`/v1/admin/aeropuertos/${id}`);
      toast.success('Aeropuerto eliminado exitosamente');
      fetchAeropuertos();
      return true;
    } catch (error) {
      console.error('Error deleting aeropuerto:', error);
      toast.error('Error al eliminar aeropuerto');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAeropuertos();
  }, [fetchAeropuertos]);

  return {
    aeropuertos,
    isLoading,
    fetchAeropuertos,
    createAeropuerto,
    updateAeropuerto,
    deleteAeropuerto
  };
};
