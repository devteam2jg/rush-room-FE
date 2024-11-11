import { Box, Container, Text } from '@chakra-ui/react'; // Chakra UI 버튼을 사용한다고 가정

import { useState } from 'react';
import SwiperForSlide from '../../components/Swiper/SwiperForSlide';

import SwiperContentBox from '../../components/Swiper/SwiperContentBox';
import SwiperButton from '../../components/Swiper/SwiperButton';

export default function CreateAuction() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setTotalSlides] = useState(0);

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Container
      height="calc(var(--vh, 1vh) * 100)"
      bg="#282828"
      padding="0"
      minW="320px"
      maxW="container.lg"
      bgColor="#282828"
      overflow="hidden"
    >
      <SwiperButton
        type="prev"
        currentIndex={currentIndex}
        slides={slides}
        sourceType="auction"
      />
      <Box marginLeft="20px" marginBottom="30px">
        <Text fontSize="20px" fontWeight={700} color="white">
          경매 방 생성을 위해
          <br />
          필요한 정보를 입력해 주세요.
        </Text>
      </Box>
      <SwiperForSlide
        setTotalSlides={setTotalSlides}
        onIndexChange={handleIndexChange}
      >
        <SwiperContentBox
          labelText="이름"
          typeValue="title"
          inputType="text"
          placeholderText="경매이름을 입력해주세요."
          sourceType="auction"
        />
        <SwiperContentBox
          labelText="상세내용"
          typeValue="description"
          inputType="textarea"
          placeholderText="경매 이벤트의 상세 내용을 입력해주세요."
          sourceType="auction"
        />
        <SwiperContentBox
          labelText="물품 당 경매 시간"
          typeValue="sellingLimitTime"
          inputType="text"
          placeholderText="물품 당 경매 시간을 정해주세요."
          sourceType="auction"
        />
        <SwiperContentBox
          labelText="날짜"
          typeValue="eventDate"
          inputType="datetime-local"
          placeholderText="경매 이벤트의 상세 내용을 입력해주세요."
          sourceType="auction"
        />
        <SwiperContentBox
          labelText="참가자 예산 설정"
          typeValue="budget"
          inputType="text"
          placeholderText="참가자의 예산 제한 금액을 입력해주세요."
          sourceType="auction"
        />
        <SwiperContentBox
          labelText="경매 방을 비공개로 설정하시겠어용 ㅇㅅㅇ?"
          typeValue="isPrivate"
          inputType="checkbox"
          placeholderText="비밀번호를 입력해주세요"
          sourceType="auction"
        />
      </SwiperForSlide>
      <SwiperButton
        type="next"
        currentIndex={currentIndex}
        slides={slides}
        sourceType="auction"
      />
    </Container>
  );
}
