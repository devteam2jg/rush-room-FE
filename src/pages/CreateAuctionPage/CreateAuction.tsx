import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'; // Chakra UI 버튼을 사용한다고 가정
import SwiperForSlide from '../../components/Swiper/SwiperForSlide';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateAuction } from '../../hooks/useCreateAuction';

export default function CreateAuction() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const nav = useNavigate();
  const toast = useToast();
  const { mutate: CreateAuction, isPending } = useCreateAuction();

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

  const handleToPrevPage = () => {
    nav(-1);
  };

  const handleSubmit = () => {
    if (!title || !description || !date) {
      toast({
        title: '모든 필드를 입력해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    CreateAuction(
      { title, description, date },
      {
        onSuccess: () => {
          toast({
            title: '경매가 성공적으로 생성되었습니다.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          nav('/auctions'); // 경매 목록 페이지로 이동
        },
        onError: () => {
          toast({
            title: '경매 생성에 실패했습니다.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <Box height={'100vh'}>
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
      <Box marginLeft={'20px'} marginBottom={'30px'}>
        <Text fontSize={'20px'} fontWeight={700}>
          경매 방 생성을 위해
          <br />
          필요한 정보를 입력해 주세요.
        </Text>
      </Box>
      <SwiperForSlide onIndexChange={handleIndexChange}>
        <Box margin={'0 auto'} width={'90vw'} height={'60vh'}>
          <Text fontSize={'12px'} mb="8px">
            이름
          </Text>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="경매 이벤트 이름을 정해주세요."
          />
        </Box>
        <Box margin={'0 auto'} width={'90vw'} height={'60vh'}>
          <Text fontSize={'12px'} mb="8px">
            상세내용
          </Text>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="경매 이벤트의 상세 내용을 입력해주세요."
          />
        </Box>
        <Box margin={'0 auto'} width={'90vw'} height={'60vh'}>
          <Text fontSize={'12px'} mb="8px">
            날짜
          </Text>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Box>
      </SwiperForSlide>
      <Flex justifyContent={'center'}>
        <Button
          id="custom-next"
          sx={{
            backgroundColor: '#AA8EBF',
            color: 'white',
          }}
          width={'90%'}
          _hover={{ backgroundColor: '#977DAB' }}
          _focus={{ backgroundColor: '#AA8EBF' }}
          display={currentIndex === 2 ? 'none' : 'block'}
        >
          확인
        </Button>
        <Button
          sx={{
            backgroundColor: '#AA8EBF',
            color: 'white',
          }}
          width={'90%'}
          _hover={{ backgroundColor: '#977DAB' }}
          _focus={{ backgroundColor: '#AA8EBF' }}
          display={currentIndex === 2 ? 'block' : 'none'}
          onClick={handleSubmit}
          isLoading={isPending}
          disabled={isPending}
        >
          제출하기
        </Button>
      </Flex>
    </Box>
  );
}
