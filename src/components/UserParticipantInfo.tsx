import { Box, Heading, VStack } from '@chakra-ui/react';
import UserHostedAuction from './UserHostedAuction';
import UserGetItem from './UserGetItem';

function UserParticipantInfo() {
  return (
    <Box
      bg="#282828"
      p={6}
      borderRadius="lg"
      boxShadow="2xl"
      mt={4}
      w="90%"
      maxW="md"
      overflowY="auto"
      alignItems="inherit"
    >
      <Heading as="h3" size="md" mb={5} color="white">
        경매 참여 정보
      </Heading>
      <VStack spacing={4} align="stretch">
        <UserHostedAuction />
        <UserGetItem />
      </VStack>
    </Box>
  );
}

export default UserParticipantInfo;
