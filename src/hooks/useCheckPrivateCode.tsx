import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import useShowToast from './useShowToast';
import useAuctionStore from '../store/AuctionStore';

const useCheckPrivateCode = () => {
  const { auctionId } = useParams();
  const { getFormData, resetForm } = useAuctionStore();
  const showToast = useShowToast();

  const CheckPrivateCode = async () => {
    const formData = getFormData();

    const data = {
      privateCode: formData.privateCode,
    };

    const response = await axiosInstance.post(
      `/auction/${auctionId}/private/enter`,
      data
    );

    return response;
  };

  return useMutation({
    mutationFn: CheckPrivateCode,
    onSuccess: () => {
      resetForm();
      showToast('Success', '경매 방으로 입장합니다!', 'success');
      window.location.reload();
    },
    onError: (error) => {
      showToast('Error', `${error}`, 'error');
    },
  });
};

export default useCheckPrivateCode;
