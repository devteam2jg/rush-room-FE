import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';

interface AuctionParams {
  userId?: string;
  page: number;
  take: number;
}

const useAuction = (take: number = 10) => {
  const { userId } = useParams();

  const getAuction = async ({ pageParam = 1 }) => {
    try {
      const params: AuctionParams = {
        page: pageParam,
        take,
      };

      if (userId) {
        params.userId = userId;
      }

      const { data } = await axiosInstance.get(`/auction`, { params });
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

  return useInfiniteQuery({
    queryKey: ['Auction', userId],
    queryFn: getAuction,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // 서버 응답에서 다음 페이지 여부 확인
      // lastPage.hasNextPage가 false면 undefined 반환하여 무한스크롤 중단
      if (!lastPage.hasNextPage) return undefined;
      return allPages.length + 1;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    meta: {
      errorMessage: '에러가 발생했습니다.',
    },
  });
};

export default useAuction;
