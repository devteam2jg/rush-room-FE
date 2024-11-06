import { Dispatch, SetStateAction } from 'react';
import {
  Avatar,
  Box,
  Button,
  createStandaloneToast,
  Divider,
  Flex,
  HStack,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import DragCloseDrawer from '../Drawer/DragCloseDrawer';
import useItemInfo from '../../hooks/Bid/useItemInfo';

interface InfoProps {
  itemId: string;
  backupItemId: string;
  setInfoOpen: Dispatch<SetStateAction<boolean>>;
  infoOpen: boolean;
}

function BiddingInfo({
  itemId,
  infoOpen,
  setInfoOpen,
  backupItemId,
}: InfoProps) {
  console.log('바꿀게?', itemId);
  const { data, error, isPending } = useItemInfo(
    itemId ? { itemId } : { itemId: backupItemId }
  );
  console.log(data);
  const nav = useNavigate();
  const { toast } = createStandaloneToast();

  if (isPending) {
    return <Spinner />;
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
    <DragCloseDrawer
      h=""
      open={infoOpen}
      setOpen={setInfoOpen}
      heightValue="50vh"
    >
      <Box height="100%">
        <Box borderRadius="15px 15px 0 0" color="#E3E3E3" bg="#282828">
          <Flex>
            <HStack
              justifyContent="space-between"
              padding={{ base: '12px' }}
              alignItems="center"
              width="100%"
              top={0}
              position="sticky"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                gap={{ base: '10px', sm: '22px' }}
              >
                <Avatar src={data.postedUser.profileUrl} />
                <Text fontWeight="700" fontSize={{ base: '18px', sm: '20px' }}>
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
            </HStack>
          </Flex>
          <Divider borderColor="#494949" />
        </Box>
        <Box color="#E5E5E5" bg="#222222" overflow="auto" height="40vh">
          <Box padding="12px">
            <Text fontSize={{ base: '16px', sm: '18px' }} fontWeight="700">
              물품 제목
            </Text>
            <Text fontSize={{ base: '14px', sm: '16px' }} fontWeight="500">
              {data.title}
            </Text>
          </Box>
          <Box height="12px" bg="#161617" />
          <Box padding="12px">
            <Text fontSize={{ base: '16px', sm: '18px' }} fontWeight="700">
              물품 상세
            </Text>
            <Text fontSize={{ base: '14px', sm: '16px' }} fontWeight="500">
              {data.description}
            </Text>
          </Box>
        </Box>
      </Box>
    </DragCloseDrawer>
  );
}

export default BiddingInfo;
