import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuctionStore from '../../store/AuctionStore';
import useShowToast from '../../hooks/useShowToast';
import useCreateAuction from '../../hooks/useCreateAuction';
import useCreateAuctionItem from '../../hooks/useCreateAuctionItem';
import useAuctionItemStore from '../../store/AuntionItemStore';

interface ButtonProps {
  type: string;
  currentIndex: number;
  slides: number;
  sourceType: string;
}

function SwiperButton({ type, currentIndex, slides, sourceType }: ButtonProps) {
  const { auctionInfo, resetForm } = useAuctionStore();
  const { auctionItemInfo, resetItemForm } = useAuctionItemStore();
  const showToast = useShowToast();
  const mutation = useCreateAuction();
  const mutationItem = useCreateAuctionItem();
  const nav = useNavigate();

  const handleToPrevPage = () => {
    resetForm();
    resetItemForm();
    nav(-1);
  };

  const handleSubmit = () => {
    if (sourceType === 'auction') {
      if (
        !auctionInfo.title ||
        !auctionInfo.description ||
        !auctionInfo.date ||
        !auctionInfo.sellingLimitTime ||
        !auctionInfo.budget
      ) {
        showToast('Error', '모든 필드를 입력해 주세요!', 'error');
        return;
      }
      mutation.mutate();
    } else {
      if (
        !auctionItemInfo.itemName ||
        !auctionItemInfo.description ||
        !auctionItemInfo.price
      ) {
        showToast('Error', '모든 필드를 입력해 주세요!', 'error');
        return;
      }
      mutationItem.mutate();
    }
  };

  return (
    <Box>
      {type === 'prev' ? (
        <Box>
          <Button
            id="custom-prev"
            m={2}
            display={currentIndex ? 'block' : 'none'}
          >
            &lt;
          </Button>
          <Button
            onClick={handleToPrevPage}
            m={2}
            display={currentIndex ? 'none' : 'block'}
          >
            &lt;
          </Button>
        </Box>
      ) : (
        <Flex justifyContent="center">
          <Button
            id="custom-next"
            sx={{
              backgroundColor: '#AA8EBF',
              color: 'white',
            }}
            width="90%"
            _hover={{ backgroundColor: '#977DAB' }}
            _focus={{ backgroundColor: '#AA8EBF' }}
            display={currentIndex === slides - 1 ? 'none' : 'block'}
          >
            확인
          </Button>
          <Button
            sx={{
              backgroundColor: '#AA8EBF',
              color: 'white',
            }}
            width="90%"
            _hover={{ backgroundColor: '#977DAB' }}
            _focus={{ backgroundColor: '#AA8EBF' }}
            display={currentIndex === slides - 1 ? 'block' : 'none'}
            onClick={handleSubmit}
            isLoading={mutation.isPending}
          >
            제출하기
          </Button>
        </Flex>
      )}
    </Box>
  );
}

export default SwiperButton;
