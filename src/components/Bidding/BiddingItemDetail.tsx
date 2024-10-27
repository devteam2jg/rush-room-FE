import {
  Box,
  Button,
  createStandaloneToast,
  Divider,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useBitItemInfo from '../../hooks/useBidItemInfo';

function BiddingItemDetail() {
  const { data, error, isPending } = useBitItemInfo();
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
    <Box padding="16px" backgroundColor="#212326">
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
          <Text fontWeight="700" fontSize="18px">
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
      <Text fontWeight="700">물품 제목</Text>
      <Text marginBottom="12px" fontWeight="500">
        {data.title}
      </Text>
      <Text fontWeight="700">물품 상세</Text>
      <Text fontWeight="500">{data.description}</Text>
    </Box>
  );
}

export default BiddingItemDetail;
