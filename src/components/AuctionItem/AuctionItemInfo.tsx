import {
  Avatar,
  Box,
  Button,
  createStandaloneToast,
  Divider,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import useBidItemInfo from '../../hooks/useBidItemInfo';
import useAuctionItemDelete from '../../hooks/useAuctionItemDelete';
import SpringModal from '../Modal/SpringModal';

function AuctionItemInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const { auctionId, itemId } = useParams();
  const { data, error, isPending } = useBidItemInfo();
  const { deleteAuctionItem } = useAuctionItemDelete();
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
  };

  const handleDelete = () => {
    deleteAuctionItem();
    nav(-1);
  };

  return (
    <Box
      position="relative"
      height="100%"
      padding="16px"
      backgroundColor="#212326"
    >
      <Flex
        marginBottom="12px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex justifyContent="center" alignItems="center" gap="10px">
          <Avatar src={data.postedUser.profileUrl} />
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
        position="absolute"
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
            {data.startPrice.toLocaleString()}
          </Text>
        </HStack>
        <Button
          width="75px"
          color="#D5D7DB"
          backgroundColor="#B9A5E2"
          onClick={() => setIsOpen(!isOpen)}
        >
          Edit
        </Button>
      </Flex>
      <SpringModal p="" isOpen={isOpen} setIsOpen={setIsOpen}>
        <Box backgroundColor="#3A383F" width="100%" p={5}>
          <Text
            fontWeight="sm"
            fontSize="2xl"
            color="#D5D7DB"
            align="center"
            pb={6}
          >
            수정하기
          </Text>
          {/* <Button color="#D5D7DB" onClick={() => setIsOpen(!isOpen)} /> */}
          <Flex gap={4} justifyContent="center" alignItems="center">
            <Button
              height="50px"
              width="120px"
              fontSize="20px"
              fontWeight="700"
              backgroundColor="#B9A5E2"
              color="#D5D7DB"
              onClick={hanldeUpdate}
            >
              수정
            </Button>
            <Button
              fontSize="20px"
              color="#D5D7DB"
              height="50px"
              width="120px"
              backgroundColor="#886CB5"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </Flex>
        </Box>
      </SpringModal>
    </Box>
  );
}

export default AuctionItemInfo;
