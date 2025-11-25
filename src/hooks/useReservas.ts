import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '../lib/api';
import { ReservaDTO } from '../types/api';

export const useReservas = () => {
  const [reservas, setReservas] = useState<ReservaDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReservas = useCallback(async (documentoCliente?: string) => {
    setIsLoading(true);
    try {
      const params = documentoCliente ? { documentoCliente } : {};
      const response = await api.get<ReservaDTO[]>('/v1/admin/reservas', { params });
      setReservas(response.data);
    } catch (error) {
      console.error('Error fetching reservas:', error);
      toast.error('Error al cargar reservas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateReserva = async (id: string, reserva: ReservaDTO) => {
    setIsLoading(true);
    try {
      await api.put(`/v1/admin/reservas/${id}`, reserva);
      toast.success('Reserva actualizada exitosamente');
      fetchReservas();
      return true;
    } catch (error) {
      console.error('Error updating reserva:', error);
      toast.error('Error al actualizar reserva');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReserva = async (id: string) => {
    if (!confirm('¿Está seguro de eliminar esta reserva?')) return;

    setIsLoading(true);
    try {
      await api.delete(`/v1/admin/reservas/${id}`);
      toast.success('Reserva eliminada exitosamente');
      fetchReservas();
      return true;
    } catch (error) {
      console.error('Error deleting reserva:', error);
      toast.error('Error al eliminar reserva');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const cambiarEstadoReserva = async (id: string, nuevoEstado: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA') => {
    try {
      await api.put(`/v1/admin/reservas/${id}/estado`, { nuevoEstado });
      toast.success('Estado de reserva actualizado');
      fetchReservas();
      return true;
    } catch (error) {
      console.error('Error changing reserva status:', error);
      toast.error('Error al cambiar estado de reserva');
      return false;
    }
  };

  useEffect(() => {
    fetchReservas();
  }, [fetchReservas]);

  return {
    reservas,
    isLoading,
    fetchReservas,
    updateReserva,
    deleteReserva,
    cambiarEstadoReserva
  };
};
