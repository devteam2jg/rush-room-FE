import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import useShowToast from './useShowToast';
import useAuctionStore from '../store/AuctionStore';

const useCheckPrivateCode = () => {
  const { getFormData, resetForm } = useAuctionStore();
  const showToast = useShowToast();
  const nav = useNavigate();

  const CheckPrivateCode = async () => {
    const formData = getFormData();

    console.log(formData);

    const data = {
      privateCode: formData.privateCode,
    };

    const response = await axiosInstance.post('/auctionId/', data);
    return response.data;
  };

  return useMutation({
    mutationFn: CheckPrivateCode,
    onSuccess: (data) => {
      resetForm();
      showToast('Success', '경매 방으로 입장합니다!', 'success');
      nav(`/auction/${data.auctionId}`);
    },
    onError: (error) => {
      showToast('Error', `${error}`, 'error');
    },
  });
};

export default useCheckPrivateCode;
