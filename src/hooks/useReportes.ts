import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import api from '../lib/api';
import { ReporteDestinosPopularesDTO, ReporteIngresosDTO, ReporteOcupacionDTO } from '../types/api';

export const useReportes = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getReporteOcupacion = useCallback(async (fechaInicio?: string, fechaFin?: string) => {
    setIsLoading(true);
    try {
      const params = { fechaInicio, fechaFin };
      const response = await api.get<ReporteOcupacionDTO[]>('/v1/admin/reportes/ocupacion', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching reporte ocupacion:', error);
      toast.error('Error al cargar reporte de ocupación');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getReporteIngresos = useCallback(async (fechaInicio?: string, fechaFin?: string) => {
    setIsLoading(true);
    try {
      const params = { fechaInicio, fechaFin };
      const response = await api.get<ReporteIngresosDTO[]>('/v1/admin/reportes/ingresos', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching reporte ingresos:', error);
      toast.error('Error al cargar reporte de ingresos');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getReporteDestinosPopulares = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get<ReporteDestinosPopularesDTO[]>('/v1/admin/reportes/destinos-populares');
      return response.data;
    } catch (error) {
      console.error('Error fetching reporte destinos populares:', error);
      toast.error('Error al cargar reporte de destinos populares');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    getReporteOcupacion,
    getReporteIngresos,
    getReporteDestinosPopulares
  };
};
