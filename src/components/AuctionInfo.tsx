import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  Flex,
  Heading,
  useDisclosure,
  Avatar,
  createStandaloneToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuctionDetail from '../hooks/useAuctionDetail';

export default function AuctionInfo() {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isPending, error } = useAuctionDetail();

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
  const date = new Date(data.auctionDto.eventDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  console.log(data.auctionDto);
  return (
    <Box bg="white" shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Button
          bg="white"
          onClick={() => {
            nav('/');
          }}
        >
          &lt;
        </Button>

        <Box flex="1" />

        <Button
          fontSize="md"
          fontWeight="bold"
          variant="ghost"
          textAlign="right"
          onClick={onOpen}
        >
          경매 정보
        </Button>
        <Box />
      </Flex>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent borderRadius="2xl" p="4">
          <DrawerHeader borderBottomWidth="1px" fontSize="lg">
            경매 정보
          </DrawerHeader>
          <DrawerBody>
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 이벤트 명
            </Heading>
            <Text fontSize="sm" mb={2}>
              {data.auctionDto.title}
            </Text>
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 상세 설명
            </Heading>
            <Text fontSize="sm" mb={4} color="gray.600">
              {data.auctionDto.description}
            </Text>

            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 주최자
            </Heading>
            <Flex
              p={2}
              gap={6}
              onClick={() => nav(`/myPage/${data.ownerProfile.id}`)}
            >
              <Avatar size="sm" src={data.ownerProfile.profileUrl} />
              <Text fontSize="sm" mb={4}>
                {data.ownerProfile.nickname}
              </Text>
            </Flex>
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 시작 일시
            </Heading>
            <Text
              fontSize="xm"
              fontWeight={1000}
              textAlign="center"
              color="gray.600"
            >
              {`${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}
              초`}
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
