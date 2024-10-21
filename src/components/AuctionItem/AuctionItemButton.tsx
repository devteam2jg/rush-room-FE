import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuctionStore from '../../store/AuctionStore';
import useShowToast from '../../hooks/useShowToast';
import useCreateAuction from '../../hooks/useCreateAuction';

interface ButtonProps {
  type: string;
  currentIndex: number;
}

function AuctionItemButton({ type, currentIndex }: ButtonProps) {
  const { auctionInfo, resetForm } = useAuctionStore();
  const showToast = useShowToast();
  const mutation = useCreateAuction();
  const nav = useNavigate();

  const handleToPrevPage = () => {
    resetForm();
    nav(-1);
  };

  const handleSubmit = () => {
    if (
      !auctionInfo.title ||
      !auctionInfo.content ||
      !auctionInfo.date ||
      !auctionInfo.duration
    ) {
      showToast('Error', '모든 필드를 입력해 주세요!', 'error');
      return;
    }
    mutation.mutate();
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
            display={currentIndex === 3 ? 'none' : 'block'}
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
            display={currentIndex === 3 ? 'block' : 'none'}
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

export default AuctionItemButton;
