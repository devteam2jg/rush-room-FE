import { Box, Button, Flex, Text } from '@chakra-ui/react'; // Chakra UI 버튼을 사용한다고 가정
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SwiperForSlide from '../../components/Swiper/SwiperForSlide';
import useCreateAuction from '../../hooks/useCreateAuction';
import useShowToast from '../../hooks/useShowToast';
import useAuctionStore from '../../store/AuctionStore';
import SwiperContentBox from '../../components/Swiper/SwiperContentBox';

export default function CreateAuction() {
  const { auctionInfo, resetForm } = useAuctionStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const nav = useNavigate();
  const showToast = useShowToast();
  const mutation = useCreateAuction();

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

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
    <Box minHeight="100vh">
      <Button id="custom-prev" m={2} display={currentIndex ? 'block' : 'none'}>
        &lt;
      </Button>
      <Button
        onClick={handleToPrevPage}
        m={2}
        display={currentIndex ? 'none' : 'block'}
      >
        &lt;
      </Button>
      <Box marginLeft="20px" marginBottom="30px">
        <Text fontSize="20px" fontWeight={700}>
          경매 방 생성을 위해
          <br />
          필요한 정보를 입력해 주세요.
        </Text>
      </Box>
      <SwiperForSlide onIndexChange={handleIndexChange}>
        <SwiperContentBox
          labelText="이름"
          typeValue="title"
          inputType="text"
          placeholderText="경매이름을 입력해주세요."
        />
        <SwiperContentBox
          labelText="상세내용"
          typeValue="content"
          inputType="textarea"
          placeholderText="경매 이벤트의 상세 내용을 입력해주세요."
        />
        <SwiperContentBox
          labelText="날짜"
          typeValue="date"
          inputType="datetime-local"
          placeholderText="경매 이벤트의 상세 내용을 입력해주세요."
        />
        <SwiperContentBox
          labelText="물품 당 경매 시간"
          typeValue="duration"
          inputType="text"
          placeholderText="물품 당 경매 시간을 정해주세요."
        />
      </SwiperForSlide>
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
    </Box>
  );
}
