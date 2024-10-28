import { Box, Flex } from '@chakra-ui/react';
import Navigator from '../../components/Navigator';
import UserProfile from '../../components/UserProfile';
import UserAuctionStats from '../../components/UserAuctionStats';
import UserParticipantInfo from '../../components/UserParticipantInfo';

export default function MyPage() {
  return (
    <Box minHeight="100vh" backgroundColor="white">
      <Flex
        justifyContent="space-between"
        direction="column"
        align="center"
        w="100%"
      >
        <UserProfile />
        <UserAuctionStats />
        <UserParticipantInfo />
        <Navigator />
      </Flex>
    </Box>
  );
}