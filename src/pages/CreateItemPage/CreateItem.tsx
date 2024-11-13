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
    <Container
      height="calc(var(--vh, 1vh) * 100)"
      bg="#282828"
      padding={{ base: '0', sm: '0' }}
      minW="320px"
      width="100%"
      overflow="hidden"
    >
      <SwiperButton
        type="prev"
        currentIndex={currentIndex}
        slides={slides}
        sourceType="auctionItem"
      />
      <Box marginLeft="20px" marginBottom="30px">
        <Text
          fontSize={{ base: '20px', sm: '22px' }}
          fontWeight={700}
          color="white"
        >
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
          labelText="물품 사진 등록"
          typeValue="itemPicture"
          inputType="file"
          placeholderText=""
          sourceType="auctionItem"
        />
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
