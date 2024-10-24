import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import useShowToast from './useShowToast';
import useAuctionStore from '../store/AuctionStore';

const useCreateAuction = () => {
  const { getFormData, resetForm, updateField } = useAuctionStore();
  const showToast = useShowToast();
  const nav = useNavigate();

  const createAuction = async () => {
    const formData = getFormData();

    const data = {
      title: formData.title,
      description: formData.description,
      eventDate: new Date(formData.date).toISOString(),
      sellingLimitTime: Number(formData.sellingLimitTime),
    };

    const response = await axiosInstance.post('/auction', data);
    return response.data;
  };

  return useMutation({
    mutationFn: createAuction,
    onSuccess: (data) => {
      resetForm();
      updateField('createdAuctionId', data.createdAuctionId);
      showToast('Success', '경매 생성이 완료되었습니다.', 'success');
      nav(`/auction/${data.createdAuctionId}`);
    },
    onError: (error) => {
      showToast('Error', `${error}`, 'error');
    },
  });
};

export default useCreateAuction;
