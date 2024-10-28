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
import { useNavigate } from 'react-router-dom';
import useBidItemInfo from '../../hooks/useBidItemInfo';

function AuctionItemInfo() {
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
      <Box marginBottom="12px" color="#D5D7DB" fontWeight="500">
        <Text fontSize="18px">{data.description}</Text>
      </Box>
      <Flex
        borderTop="1px solid #323438"
        backgroundColor="#212326"
        position="fixed"
        width="100%"
        padding="16px"
        left={0}
        bottom={0}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack alignItems="center">
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
          <Text color="#D5D7DB"> 10000원</Text>
        </HStack>
        <Button>수정하기</Button>
      </Flex>
    </Box>
  );
}

export default AuctionItemInfo;
