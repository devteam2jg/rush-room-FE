import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuctionItem } from '../utils/types';
import useUpdateAuctionStatus from '../hooks/useUpdateAuctionStatus';
import useAuctionStore from '../store/AuctionStore';

interface Data {
  data: {
    auctionDto: {
      status: string;
    };
    items: AuctionItem[];
  };
  isOwner: boolean;
}

export default function AddAuction({ data, isOwner }: Data) {
  const navigate = useNavigate();
  const { auctionId } = useParams();
  const [isStarted, setIsStarted] = useState(false);
  const mutationUpdateStatus = useUpdateAuctionStatus();
  const { updateField } = useAuctionStore();

  // 시작하기 눌렀을 때 동작하는 함수
  const handleStartAuction = () => {
    if (data.items && data.items.length > 0) {
      setIsStarted(true);
      updateField('status', data.auctionDto.status);
      mutationUpdateStatus.mutate();
    } else {
      console.error('아이템이 생성되지 않습니다.');
    }
  };

  return (
    <Box p={4} textAlign="center" bg="#282828">
      {isOwner ? (
        <>
          <VStack spacing={4} align="flex-start">
            <Heading as="h1" size="ms" textAlign="left" color="white">
              경매 대기 중이에요. <br />
              준비가 되었다면 경매를 시작해주세요.
            </Heading>
            <Heading as="h3" size="xs" color="GrayText" textAlign="left">
              경매를 시작한 후에는 경매를 종료할 수 있어요.
            </Heading>
            <Box flex="1" />
          </VStack>
          <Box flex="1" h={1} />
          <Flex gap={4} justifyContent="center" alignItems="center">
            <Button
              fontSize="md"
              fontWeight="700"
              bg="#AA8EBF"
              color="white"
              width="240px"
              height="40px"
              onClick={handleStartAuction}
            >
              시작하기
            </Button>
            <Button
              fontSize="md"
              fontWeight="700"
              bg="#AA8EBF"
              color="white"
              width="240px"
              height="40px"
              onClick={() => {
                navigate(``);
              }}
              isDisabled={!isStarted}
            >
              종료하기
            </Button>
            <Button
              fontSize="md"
              fontWeight="700"
              bg="#AA8EBF"
              color="white"
              width="240px"
              height="40px"
              onClick={() => {
                navigate(`/auction/${auctionId}/create`);
              }}
            >
              등록하기
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <VStack spacing={4} align="flex-start">
            <Heading as="h1" size="ms" textAlign="left" color="white">
              등록된 물품이 없어요. <br />
              버튼을 눌러 등록해 보세요.
            </Heading>
            <Heading as="h3" size="xs" color="GrayText" textAlign="left">
              누구든지 경매에 참여할 수 있어요.
            </Heading>
            <Box flex="1" />
          </VStack>
          <Box flex="1" h={1} />
          <Button
            fontSize="md"
            fontWeight="700"
            bg="#AA8EBF"
            color="white"
            width="240px"
            height="40px"
            onClick={() => {
              navigate(`/auction/${auctionId}/create`);
            }}
          >
            등록하기
          </Button>
        </>
      )}
    </Box>
  );
}
