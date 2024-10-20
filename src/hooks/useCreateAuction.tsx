import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface CreateAuctionData {
  title: string;
  description: string;
  date: string;
}

const createAuction = async (data: CreateAuctionData) => {
  const response = await axios.post('/api/post', data);
  return response.data;
};

export const useCreateAuction = () => {
  return useMutation({
    mutationFn: createAuction,
    onSuccess: (data) => {
      console.log('성공', data);
    },
    onError: (error) => {
      console.log('에러', error);
    },
  });
};
