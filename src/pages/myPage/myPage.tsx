import {
  Box,
  createStandaloneToast,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navigator from '../../components/Navigator';
import UserProfile from '../../components/UserProfile';
import UserAuctionStats from '../../components/UserAuctionStats';
import UserParticipantInfo from '../../components/UserParticipantInfo';
import useAuction from '../../hooks/useAuction';

export default function MyPage() {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useAuction();
  if (isPending) {
    return <div>Loading...!!</div>;
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
    <Box
      minHeight="calc(var(--vh, 1vh) * 100)"
      position="relative"
      bgColor="#222222"
      width="100%"
      overflow="hidden"
    >
      <Box height="100%" width="100%" position="absolute">
        <Flex
          justifyContent="space-between"
          direction="column"
          align="center"
          w="100%"
        >
          <Box
            w="100%"
            p={6}
            pt={10}
            backgroundColor="#886CB5"
            boxShadow="md"
            borderBottomRadius="2xl"
          >
            <UserProfile />
            <UserAuctionStats />
          </Box>
          <UserParticipantInfo />
          <Navigator />
        </Flex>
      </Box>
    </Box>
  );
}
