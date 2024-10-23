import { Box, Container, Text } from '@chakra-ui/react';
import { useState } from 'react';
import SwiperContentBox from '../../components/Swiper/SwiperContentBox';
import SwiperButton from '../../components/Swiper/SwiperButton';
import SwiperForSlide from '../../components/Swiper/SwiperForSlide';

function CreateItem() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setTotalSlides] = useState(0);

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };
  return (
    <Container padding="0" minW="320px" maxW="container.lg">
      <SwiperButton
        type="prev"
        currentIndex={currentIndex}
        slides={slides}
        sourceType="auctionItem"
      />
      <Box marginLeft="20px" marginBottom="30px">
        <Text fontSize="20px" fontWeight={700}>
          등록할 물품의
          <br />
          정보를 입력해 주세요
        </Text>
      </Box>
      <SwiperForSlide
        setTotalSlides={setTotalSlides}
        onIndexChange={handleIndexChange}
      >
        <SwiperContentBox
          labelText="판매 물품 제목"
          typeValue="itemName"
          inputType="text"
          placeholderText="판매할 물품을 적어주세요."
          sourceType="auctionItem"
        />
        <SwiperContentBox
          labelText="자세한 설명"
          typeValue="description"
          inputType="textarea"
          placeholderText="신뢰할 수 있는 거래를 위해 자세히 적어주세요. 해당 물건이 가지는 가치를 잘 표현 한다면 더 높은 가격을 받을 수도 있겠죠?"
          sourceType="auctionItem"
        />
        <SwiperContentBox
          labelText="시작가격"
          typeValue="price"
          inputType="text"
          placeholderText="₩  희망하는 시작가를 입력해주세요."
          sourceType="auctionItem"
        />
      </SwiperForSlide>
      <SwiperButton
        type="next"
        currentIndex={currentIndex}
        slides={slides}
        sourceType="auctionItem"
      />
    </Container>
  );
}

export default CreateItem;
