import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import useShowToast from './useShowToast';
import useAuctionItemStore from '../store/AuntionItemStore';

const useCreateAuctionItem = () => {
  const { id } = useParams();
  const { getFormItemData, resetItemForm, updateItemField } =
    useAuctionItemStore();
  const showToast = useShowToast();
  const nav = useNavigate();

  const createAuctionItem = async () => {
    const formData = getFormItemData();

    const data = {
      title: formData.itemName,
      description: formData.description,
      startPrice: Number(formData.price),
    };

    const response = await axiosInstance.post(
      `/auction/${id}/auction-item`,
      data
    );
    return response.data;
  };

  return useMutation({
    mutationFn: createAuctionItem,
    onSuccess: (data) => {
      console.log(data);
      resetItemForm();
      updateItemField('auctionItemId', data);
      showToast('Success', '아이템 생성이 완료되었습니다.', 'success');
      nav(-1);
    },
    onError: (error) => {
      console.log('에러', error);
      showToast('Error', `Item${error}`, 'error');
    },
  });
};

export default useCreateAuctionItem;
