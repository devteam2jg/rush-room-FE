import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import useShowToast from './useShowToast';
import useAuctionItemStore from '../store/AuntionItemStore';

const useUpdateAuctionItem = () => {
  const { auctionId, itemId } = useParams();
  const { getFormItemData, resetItemForm } = useAuctionItemStore();
  const showToast = useShowToast();
  const nav = useNavigate();

  const updateAuctionItem = async () => {
    const inputData = getFormItemData();
    const formData = new FormData();

    inputData.itemPicture?.forEach((file) => {
      formData.append('images', file);
    });
    if (inputData.itemName) {
      formData.append('title', inputData.itemName);
    }
    if (inputData.description) {
      formData.append('description', inputData.description);
    }
    if (inputData.price) {
      formData.append('startPrice', `${inputData.price}`);
    }

    const response = await axiosInstance.patch(
      `/auction/${auctionId}/item/${itemId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  };

  return useMutation({
    mutationFn: updateAuctionItem,
    onSuccess: () => {
      resetItemForm();
      showToast('Success', '아이템 수정이 완료되었습니다.', 'success');
      nav(-1);
    },
    onError: (error) => {
      console.log(error);
      showToast('Error', `Item${error}`, 'error');
    },
  });
};

export default useUpdateAuctionItem;
