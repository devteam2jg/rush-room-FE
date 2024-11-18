import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import useShowToast from './useShowToast';
import useAuctionStore from '../store/AuctionStore';

const useUpdateAuctionStatus = () => {
  const { auctionId, itemId } = useParams();
  const { getFormData } = useAuctionStore();
  const showToast = useShowToast();
  const nav = useNavigate();

  const UpdateAuctionStatus = async () => {
    const formData = getFormData();

    const data = {
      status: formData.status,
    };

    const response = await axiosInstance.patch(`/auction/${auctionId}`, data);
    return response.data;
  };

  return useMutation({
    mutationFn: UpdateAuctionStatus,
    onSuccess: () => {
      // nav(`/auction/${auctionId}/bid/${itemId}`);
    },
    onError: (error) => {
      showToast('Error', `${error}`, 'error');
    },
  });
};

export default useUpdateAuctionStatus;
