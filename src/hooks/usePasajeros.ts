import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '../lib/api';
import { PasajeroDTO } from '../types/api';

export const usePasajeros = () => {
  const [pasajeros, setPasajeros] = useState<PasajeroDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPasajeros = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<PasajeroDTO[]>('/v1/admin/pasajeros');
      setPasajeros(response.data);
    } catch (error) {
      console.error('Error fetching pasajeros:', error);
      toast.error('Error al cargar pasajeros');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPasajero = async (pasajero: PasajeroDTO) => {
    setIsLoading(true);
    try {
      await api.post('/v1/admin/pasajeros', pasajero);
      toast.success('Pasajero creado exitosamente');
      fetchPasajeros();
      return true;
    } catch (error) {
      console.error('Error creating pasajero:', error);
      toast.error('Error al crear pasajero');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePasajero = async (id: number, pasajero: PasajeroDTO) => {
    setIsLoading(true);
    try {
      await api.put(`/v1/admin/pasajeros/${id}`, pasajero);
      toast.success('Pasajero actualizado exitosamente');
      fetchPasajeros();
      return true;
    } catch (error) {
      console.error('Error updating pasajero:', error);
      toast.error('Error al actualizar pasajero');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePasajero = async (id: number) => {
    if (!confirm('¿Está seguro de eliminar este pasajero?')) return;

    setIsLoading(true);
    try {
      await api.delete(`/v1/admin/pasajeros/${id}`);
      toast.success('Pasajero eliminado exitosamente');
      fetchPasajeros();
      return true;
    } catch (error) {
      console.error('Error deleting pasajero:', error);
      toast.error('Error al eliminar pasajero');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPasajeros();
  }, [fetchPasajeros]);

  return {
    pasajeros,
    isLoading,
    fetchPasajeros,
    createPasajero,
    updatePasajero,
    deletePasajero
  };
};
