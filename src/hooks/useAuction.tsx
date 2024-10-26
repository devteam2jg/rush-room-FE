import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import axiosInstance from '../utils/AxiosInstance';

const useAuction = () => {
  const getAuction = async () => {
    try {
      const { data } = await axiosInstance.get(`/auction`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            throw new Error('잘못된 요청입니다');
          case 401:
            throw new Error('인증이 필요합니다');
          case 403:
            throw new Error('권한이 없습니다');
          case 404:
            throw new Error('데이터를 찾을 수 없습니다');
          case 500:
            throw new Error('서버 에러가 발생했습니다');
          default:
            throw new Error('알 수 없는 에러가 발생했습니다');
        }
      }
      throw new Error('예기치 못한 에러가 발생했습니다');
    }
  };
  return useQuery({
    queryKey: ['Auction'],
    queryFn: getAuction,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    meta: {
      errorMessage: '에러가 발생했습니다.',
    },
  });
};

export default useAuction;
