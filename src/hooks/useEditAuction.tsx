import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import useShowToast from './useShowToast';
import useAuctionStore from '../store/AuctionStore';

const useEditAuction = (auctionId?: string) => {
  const { getFormData, resetForm, updateField } = useAuctionStore();
  const showToast = useShowToast();
  const nav = useNavigate();

  const editAuction = async () => {
    const formData = getFormData();

    const data = {
      title: formData.title,
      description: formData.description,
      eventDate: new Date(formData.date).toISOString(),
      sellingLimitTime: Number(formData.sellingLimitTime),
      isPrivate: formData.isPrivate,
      privateCode: formData.privateCode,
      budget: Number(formData.budget),
    };

    const response = await axiosInstance.patch(`/auction/${auctionId}`, data);
    return response.data;
  };

  return useMutation({
    mutationFn: editAuction,
    onSuccess: (data) => {
      resetForm();
      updateField('createdAuctionId', data.createdAuctionId);
      showToast('Success', '경매 수정이 완료되었습니다.', 'success');
      nav(`/auction/${data.createdAuctionId}`);
    },
    onError: (error) => {
      showToast('Error', `${error}`, 'error');
    },
  });
};

export default useEditAuction;
