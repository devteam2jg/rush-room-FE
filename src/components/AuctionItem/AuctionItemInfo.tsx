import {
  Box,
  Button,
  createStandaloneToast,
  Divider,
  Flex,
  HStack,
  Image,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import useBidItemInfo from '../../hooks/useBidItemInfo';

function AuctionItemInfo() {
  const { auctionId, itemId } = useParams();
  const { data, error, isPending } = useBidItemInfo();
  const nav = useNavigate();
  const { toast } = createStandaloneToast();

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

  const hanldeUpdate = () => {
    nav(`/auction/${auctionId}/update/${itemId}`);
    console.log('이동');
  };

  return (
    <Box height="100%" padding="16px" backgroundColor="#212326">
      <Flex
        marginBottom="12px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex justifyContent="center" alignItems="center" gap="10px">
          <Image
            height="8vh"
            borderRadius="full"
            src={data.postedUser.profileUrl}
          />
          <Text color="#FCFCFD" fontWeight="700" fontSize="18px">
            {data.postedUser.nickname}
          </Text>
        </Flex>
        <Button
          fontWeight="700"
          color="white"
          backgroundColor="#B9A5E2"
          size="md"
        >
          프로필
        </Button>
      </Flex>
      <Divider marginBottom="12px" borderColor="#323438" />
      <Text
        fontSize="26px"
        color="#D5D7DB"
        marginBottom="12px"
        fontWeight="700"
      >
        {data.title}
      </Text>
      <Divider marginBottom="12px" borderColor="#323438" />
      <Box marginBottom="80px" color="#D5D7DB" fontWeight="500">
        <Text fontSize="18px">{data.description}</Text>
      </Box>
      <Flex
        backgroundColor="#212326"
        left={0}
        bottom={0}
        position="fixed"
        alignItems="center"
        borderTop="1px solid #323438"
        justifyContent="space-between"
        width="100%"
        padding="16px"
      >
        <HStack gap="10px" justifyContent="center" alignItems="center">
          <Text
            letterSpacing="10px"
            lineHeight="25px"
            fontSize="18px"
            color="#B9A5E2"
            fontWeight="700"
          >
            시작
            <br />
            가격
          </Text>
          <Text fontSize="23px" fontWeight="700" color="#D5D7DB">
            10000원
          </Text>
        </HStack>
        <Button backgroundColor="#B9A5E2" onClick={hanldeUpdate}>
          수정하기
        </Button>
      </Flex>
    </Box>
  );
}

export default AuctionItemInfo;
