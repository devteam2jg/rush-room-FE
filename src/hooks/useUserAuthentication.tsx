// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../utils/AxiosInstance';
import useAuthStore from '../store/UserAuthStore';
import useShowToast from './useShowToast';

interface User {
  id: string;
  name: string;
  email: string;
  socialType: 'kakao';
  iat: number;
  exp: number;
}

// getUser 함수를 export 합니다
export const getUser = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get('/auth/me');
    console.log('로그인 체크 성공:', new Date().toISOString());
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.log('인증 실패:', new Date().toISOString());
      throw new Error('Unauthorized');
    }
    throw error;
  }
};

export function useAuth() {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const [isEnabled, setIsEnabled] = useState(true);

  const query = useQuery<User>({
    queryKey: ['userInfo'],
    queryFn: getUser,
    enabled: isEnabled,
  });

  useEffect(() => {
    if (query.data) {
      login(query.data);
    }
  }, [query.data, login, showToast]);

  useEffect(() => {
    if (query.error) {
      logout();
      setIsEnabled(false);
    }
  }, [query.error, logout]);

  const isUserEmpty = !user && !query.isPending;

  return {
    user,
    isUserEmpty,
    isPending: query.isPending,
    isError: query.isError,
    error: query.error,
  };
}
