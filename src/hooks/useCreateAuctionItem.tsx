import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import useShowToast from './useShowToast';
import useAuctionItemStore from '../store/AuntionItemStore';

const useCreateAuctionItem = () => {
  const { getFormItemData, resetItemForm } = useAuctionItemStore();
  const showToast = useShowToast();

  const createAuctionItem = async () => {
    const data = getFormItemData();
    const response = await axios.post('/api/post', data);
    return response.data;
  };

  return useMutation({
    mutationFn: createAuctionItem,
    onSuccess: (data) => {
      resetItemForm();
      console.log(data);
      showToast('Success', '아이템 생성이 완료되었습니다.', 'success');
    },
    onError: (error) => {
      console.log('에러', error);
      showToast('Error', `Item${error}`, 'error');
    },
  });
};

export default useCreateAuctionItem;
