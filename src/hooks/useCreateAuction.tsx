import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useShowToast from './useShowToast';
import useAuctionStore from '../store/AuctionStore';

const useCreateAuction = () => {
  const { getFormData, resetForm } = useAuctionStore();
  const showToast = useShowToast();

  const createAuction = async () => {
    const data = getFormData();
    const response = await axios.post('/api/post', data);
    return response.data;
  };

  return useMutation({
    mutationFn: createAuction,
    onSuccess: (data) => {
      resetForm();
      console.log(data);
      showToast('Success', '경매 생성이 완료되었습니다.', 'success');
    },
    onError: (error) => {
      console.log('에러', error);
      showToast('Error', `${error}`, 'error');
    },
  });
};

export default useCreateAuction;
