import {
  Box,
  Container,
  createStandaloneToast,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SwiperButton from '../../components/Swiper/SwiperButton';
import SwiperForSlide from '../../components/Swiper/SwiperForSlide';
import useBidItemInfo from '../../hooks/useBidItemInfo';
import useAuctionItemStore from '../../store/AuntionItemStore';

function UpdateItem() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, error, isPending } = useBidItemInfo();
  const { auctionItemInfo, updateItemField } = useAuctionItemStore();
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const [slides, setTotalSlides] = useState(0);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const fileArray = Array.from(files);
      updateItemField('itemPicture', fileArray);
    }
  };

  useEffect(() => {
    if (data) {
      updateItemField('itemName', data.title || '');
      updateItemField('description', data.description || '');
      updateItemField('price', data.startPrice || undefined);
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
        sourceType="auctionItem"
      />
      <Box marginLeft="20px" marginBottom="30px">
        <Text fontSize="20px" fontWeight={700}>
          수정할 물품의
          <br />
          정보를 입력해 주세요
        </Text>
      </Box>
      <SwiperForSlide
        setTotalSlides={setTotalSlides}
        onIndexChange={handleIndexChange}
      >
        <Box margin="0 auto" width="90vw" height="60vh">
          <Text fontSize="12px" mb="8px">
            물품 사진 등록
          </Text>
          <Input
            marginBottom="20px"
            type="file"
            onChange={handleFilesChange}
            multiple
          />
          <Text fontSize="16px" mb="8px">
            공란으로 제출 시 기존의 사진이 유지됩니다.
          </Text>
        </Box>
        <Box margin="0 auto" width="90vw" height="60vh">
          <Text fontSize="12px" mb="8px">
            판매 물품 제목
          </Text>
          <Input
            value={auctionItemInfo.itemName}
            onChange={(e) => updateItemField('itemName', e.target.value)}
          />
        </Box>
        <Box margin="0 auto" width="90vw" height="60vh">
          <Text fontSize="12px" mb="8px">
            자세한 설명
          </Text>
          <Textarea
            h="200px"
            size="md"
            value={auctionItemInfo.description}
            onChange={(e) => updateItemField('description', e.target.value)}
          />
        </Box>
        <Box margin="0 auto" width="90vw" height="60vh">
          <Text fontSize="12px" mb="8px">
            시작가격
          </Text>
          <Input
            value={auctionItemInfo.price}
            onChange={(e) => updateItemField('price', e.target.value)}
          />
        </Box>
      </SwiperForSlide>
      <SwiperButton
        type="next"
        currentIndex={currentIndex}
        slides={slides}
        sourceType="auctionItemFix"
      />
    </Container>
  );
}

export default UpdateItem;
