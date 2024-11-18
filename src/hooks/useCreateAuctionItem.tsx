import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import useShowToast from './useShowToast';
import useAuctionItemStore from '../store/AuntionItemStore';

const useCreateAuctionItem = () => {
  const { auctionId } = useParams();
  const { getFormItemData, resetItemForm, updateItemField } =
    useAuctionItemStore();
  const showToast = useShowToast();
  const nav = useNavigate();

  const createAuctionItem = async () => {
    const inputData = getFormItemData();
    const formData = new FormData();

    inputData.itemPicture?.forEach((file) => {
      formData.append('images', file);
    });

    formData.append('title', inputData.itemName);
    formData.append('description', inputData.description);
    formData.append('startPrice', `${inputData.price}`);

    const response = await axiosInstance.post(
      `/auction/${auctionId}/item`,
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
    mutationFn: createAuctionItem,
    onSuccess: (data) => {
      resetItemForm();
      updateItemField('auctionItemId', data);
      showToast('Success', '아이템 생성이 완료되었습니다.', 'success');
      nav(-1);
    },
    onError: (error) => {
      showToast('Error', `Item${error}`, 'error');
    },
  });
};

export default useCreateAuctionItem;
