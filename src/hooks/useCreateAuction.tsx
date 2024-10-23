import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../utils/AxiosInstance';
import useShowToast from './useShowToast';
import useAuctionStore from '../store/AuctionStore';

const useCreateAuction = () => {
  const { getFormData, resetForm, updateField } = useAuctionStore();
  const showToast = useShowToast();

  const createAuction = async () => {
    const formData = getFormData();

    const data = {
      title: formData.title,
      description: formData.description,
      eventDate: new Date(formData.date).toISOString(),
      sellingLimitTime: Number(formData.sellingLimitTime),
    };

    // console.log(data.title);
    // console.log(data.description);
    // console.log(data.eventDate);
    // console.log(data.sellingLitmitTime);

    const response = await axiosInstance.post('/auction', data);
    return response.data;
  };

  return useMutation({
    mutationFn: createAuction,
    onSuccess: (data) => {
      resetForm();
      console.log(data);
      updateField('createdAuctionId', data);
      showToast('Success', '경매 생성이 완료되었습니다.', 'success');
    },
    onError: (error) => {
      console.log('에러', error);
      showToast('Error', `${error}`, 'error');
    },
  });
};

export default useCreateAuction;
