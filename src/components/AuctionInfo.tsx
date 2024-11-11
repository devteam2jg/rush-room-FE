import {
  Box,
  Button,
  Text,
  Flex,
  Heading,
  Avatar,
  VStack,
  createStandaloneToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuctionDetail from '../hooks/useAuctionDetail';
import EditAuction from './EditAuctionAlert';
import DeleteAuction from './DeleteAuctionAlert';
import DragCloseDrawer from './Drawer/DragCloseDrawer';
// import useAuction from '../hooks/useAuction';

export default function AuctionInfo() {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, isPending, error } = useAuctionDetail();
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <>
      <Box bg="#282828" shadow="md" position="relative" maxHeight="100%vh">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Button
            bgColor="transparent"
            color="white"
            onClick={() => {
              nav(-1);
            }}
          >
            &lt;
          </Button>

          <Box flex="1" />

          <Button
            color="white"
            fontSize="md"
            fontWeight="bold"
            variant="ghost"
            textAlign="right"
            onClick={() => setIsOpen(!isOpen)}
          >
            경매 정보
          </Button>
          <Box />
        </Flex>
      </Box>

      <DragCloseDrawer
        h="h-full"
        heightValue="80vh"
        open={isOpen}
        setOpen={setIsOpen}
      >
        <Flex alignItems="center" justifyContent="space-between" w="100%">
          <Button
            color="white"
            bgColor="transparent"
            onClick={() => setIsOpen(!isOpen)}
          >
            &lt;
          </Button>
          <Flex gap={2}>
            <EditAuction />
            <DeleteAuction />
          </Flex>
        </Flex>
        <Box p="4" bgColor="#282828" fontSize="lg">
          <VStack
            width="100%"
            height="100%"
            pt={3}
            color="white"
            bgColor="#282828"
          >
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 이벤트 명
            </Heading>
            <Text fontSize="sm" mb={2} textAlign="center">
              {data.auctionDto.title}
            </Text>
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 상세 설명
            </Heading>
            <Text fontSize="sm" mb={2} textAlign="center">
              {data.auctionDto.description}
            </Text>
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 제한 시간
            </Heading>
            <Text fontSize="sm" mb={2} textAlign="center">
              {data.auctionDto.sellingLimitTime}분
            </Text>
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              참가자 제한 예산
            </Heading>
            <Text fontSize="sm" mb={2} textAlign="center">
              {data.auctionDto.budget}
            </Text>
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 주최자
            </Heading>
            <Flex
              p={2}
              gap={6}
              justifyContent="center"
              alignItems="center"
              onClick={() => nav(`/myPage/${data.ownerProfile.id}`)}
            >
              <Avatar size="sm" src={data.ownerProfile.profileUrl} />
              <Text fontSize="sm" mb={2} textAlign="center">
                {data.ownerProfile.nickname}
              </Text>
            </Flex>
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 시작 일시
            </Heading>
            <Text fontSize="xm" mb={2} textAlign="center">
              {`${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}
              초`}
            </Text>
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 방 잠그기
            </Heading>
            <Text fontSize="sm" mb={2} textAlign="center">
              {String(data.auctionDto.isPrivate)}
            </Text>
            <Heading as="h5" size="sm" textAlign="left" mb={2}>
              경매 방 비밀번호
            </Heading>
            <Text fontSize="sm" mb={2} textAlign="center">
              {data.auctionDto?.privateCode}
            </Text>
          </VStack>
        </Box>
      </DragCloseDrawer>
    </>
  );
}
