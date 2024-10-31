import {
  Box,
  Checkbox,
  Container,
  createStandaloneToast,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SwiperForSlide from '../../components/Swiper/SwiperForSlide';
import SwiperButton from '../../components/Swiper/SwiperButton';
import useAuctionStore from '../../store/AuctionStore';
import useAuctionDetail from '../../hooks/useAuctionDetail';

export default function EditAuction() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, error, isPending } = useAuctionDetail();
  const { auctionInfo, updateField } = useAuctionStore();
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const [slides, setTotalSlides] = useState(0);

  useEffect(() => {
    if (data) {
      updateField('title', data.auctionDto.title || '');
      updateField('description', data.auctionDto.description || '');
      updateField('eventDate', data.auctionDto.eventDate || '');
      updateField(
        'sellingLimitTime',
        data.auctionDto.sellingLimitTime || undefined
      );
      updateField('privateCode', data.auctionDto.privateCode || '');
      updateField('isPrivate', data.auctionDto.isPrivate || false);
      updateField('budget', data.auctionDto.budget || undefined);
    }
  }, [data]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    nav('/');
    toast({
      title: '실패',
      description: `${error.message}`,
      status: 'error',
      variant: 'left-accent',
      duration: 3000,
      isClosable: true,
    });
  }

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Container padding="0" minW="320px" maxW="container.lg">
      <SwiperButton
        type="prev"
        currentIndex={currentIndex}
        slides={slides}
        sourceType="editAuction"
      />
      <Box marginLeft="20px" marginBottom="30px">
        <Text fontSize="20px" fontWeight={700}>
          수정하고 싶은
          <br />
          정보를 입력해 주세요.
        </Text>
      </Box>
      <SwiperForSlide
        setTotalSlides={setTotalSlides}
        onIndexChange={handleIndexChange}
      >
        <Box margin="0 auto" width="90vw" height="60vh">
          <Text fontSize="12px" mb="8px">
            이름
          </Text>
          <Input
            value={auctionInfo.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="이름을 입력해주세요."
          />
        </Box>
        <Box margin="0 auto" width="90vw" height="60vh">
          <Text fontSize="12px" mb="8px">
            상세내용
          </Text>
          <Textarea
            value={auctionInfo.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="상세 내용을 입력해주세요"
          />
        </Box>
        <Box margin="0 auto" width="90vw" height="60vh">
          <Text fontSize="12px" mb="8px">
            물품 당 경매 시간
          </Text>
          <Input
            value={auctionInfo.sellingLimitTime}
            onChange={(e) => updateField('sellingLimitTime', e.target.value)}
            placeholder="물품 당 경매 시간을 정해주세요."
            type="number"
          />
        </Box>
        <Box margin="0 auto" width="90vw" height="60vh">
          <Text fontSize="12px" mb="8px">
            날짜
          </Text>
          <Input
            type="datetime-local"
            value={auctionInfo.eventDate.slice(0, -5)}
            onChange={(e) => updateField('eventDate', e.target.value)}
            placeholder="경매 이벤트의 날짜를 입력해주세요."
          />
        </Box>
        <Box margin="0 auto" width="90vw" height="60vh">
          <Text fontSize="12px" mb="8px">
            참가자 예산 설정
          </Text>
          <Input
            value={auctionInfo.budget}
            onChange={(e) => updateField('budget', e.target.value)}
            placeholder="참가자의 예산 제한 금액을 입력해주세요."
            type="number"
          />
        </Box>

        <Box margin="0 auto" width="90vw" height="60vh">
          <Text fontSize="12px" mb="8px">
            경매 방을 비공개로 설정하시겠어용 ㅇㅅㅇ?
          </Text>
          {!auctionInfo.isPrivate ? (
            <Checkbox
              isChecked={auctionInfo.isPrivate}
              onChange={(e) => updateField('isPrivate', e.target.checked)}
              placeholder="비밀번호를 입력해주세요"
            />
          ) : (
            <>
              <Checkbox
                isChecked={auctionInfo.isPrivate}
                onChange={(e) => updateField('isPrivate', e.target.checked)}
              />
              <Input
                value={auctionInfo.privateCode}
                onChange={(e) => updateField('privateCode', e.target.value)}
                placeholder="비밀번호를 입력해주세요"
              />
            </>
          )}
        </Box>
      </SwiperForSlide>
      <SwiperButton
        type="next"
        currentIndex={currentIndex}
        slides={slides}
        sourceType="editAuction"
      />
    </Container>
  );
}
