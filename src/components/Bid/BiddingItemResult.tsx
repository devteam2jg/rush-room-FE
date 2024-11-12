import { Avatar, Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import Cry from '../../assets/images/cry.png';
import useAuthStore from '../../store/UserAuthStore';

export interface WinnerProps {
  bidPrice: number;
  itemId: string;
  name: string | null;
  title: string;
  type: string;
}

interface WinnerInfoProps {
  winnerInfo: WinnerProps | null;
}

export const blinkAnimation = keyframes`
0%, 100% { opacity: 1; }
50% { opacity: 0; }
`;

function BiddingItemResult({ winnerInfo }: WinnerInfoProps) {
  const user = useAuthStore((state) => state.user);
  if (!winnerInfo) {
    return <div>Error..</div>;
  }
  return (
    <VStack
      alignItems="center"
      justifyContent="space-evenly"
      bg="#222222"
      height="calc(var(--vh, 1vh) * 100)"
      width="100%"
      color="white"
    >
      {winnerInfo?.name ? (
        <VStack
          alignItems="center"
          height="50%"
          gap={3}
          justifyContent="space-between"
        >
          <Text fontWeight="700" fontSize={{ base: '16px', sm: '30px' }}>
            축하합니다 !🥳
          </Text>
          <Text>팽팽한 경쟁을 뚫고 낙찰 되셨습니다!</Text>
          <Box width={{ sm: '250px' }} height={{ sm: '250px' }}>
            <Avatar size={{ base: '2xl', sm: 'full' }} src={user?.profileUrl} />
          </Box>

          <HStack>
            <Text
              fontSize={{ base: '16px', sm: '20px' }}
              color="#886CB5"
              fontWeight="700"
            >
              {winnerInfo?.name} 님이
            </Text>
            <Text
              fontSize={{ base: '16px', sm: '20px' }}
              fontWeight="700"
              color="#CB9428"
            >
              {winnerInfo.bidPrice.toLocaleString()}{' '}
            </Text>
            <Text>원에</Text>
          </HStack>
          <Text fontSize={{ base: '18px', sm: '20px' }} color="#FF8C00">
            {winnerInfo?.title}
          </Text>
          <Text>낙찰 받으셨습니다!</Text>
        </VStack>
      ) : (
        <VStack height="70%" justifyContent="space-between">
          <Text fontWeight="700" fontSize={{ base: '16px', sm: '30px' }}>
            입찰자가 없습니다...🥲
          </Text>
          <HStack fontSize={{ base: '17px', sm: '18px' }}>
            <Text fontWeight="700" color="#A60029">
              누구도
            </Text>
            <Text> 입찰 하지 않았습니다..</Text>
          </HStack>
          <Image width={{ base: '90px', sm: '200px' }} src={Cry} />
          <HStack fontSize={{ base: '18px', sm: '20px' }}>
            <Text fontWeight="700" color="#F1D849">
              판매자님
            </Text>
            <Text>힘내세요..</Text>
          </HStack>
          <Text fontSize={{ base: '18px', sm: '20px' }} color="#FF8C00">
            {winnerInfo?.title}
          </Text>
          <Text>판매자님께 돌려드릴게요..</Text>
        </VStack>
      )}
      <Box
        fontSize={{ base: '16px', sm: '20px' }}
        animation={`${blinkAnimation} 1.5s ease-in-out infinite`}
      >
        <Text>잠시 후 다음 아이템 경매가 시작 됩니다..</Text>
      </Box>
    </VStack>
  );
}

export default BiddingItemResult;
