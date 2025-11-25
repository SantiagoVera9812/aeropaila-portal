import { useState } from 'react';
import { toast } from 'sonner';
import api from '../lib/api';
import { AuthValidationResponse, LoginRequest, LoginResponse } from '../types/api';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await api.post<LoginResponse>('/v1/auth/login', credentials);
      const { token, username, role } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      
      toast.success(`Bienvenido ${username}`);
      return true;
    } catch (error: unknown) {
      console.error('Login error:', error);
      let message = 'Error al iniciar sesión';
      if (typeof error === 'object' && error !== null && 'response' in error) {
          const err = error as { response: { data: { error: string } } };
          message = err.response?.data?.error || message;
      }
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    globalThis.location.href = '/login';
  };

  const validateToken = async (): Promise<boolean> => {
    try {
      const response = await api.get<AuthValidationResponse>('/v1/auth/validate');
      return response.data.valid;
    } catch {
      return false;
    }
  };

  return {
    login,
    logout,
    validateToken,
    isLoading
  };
};
