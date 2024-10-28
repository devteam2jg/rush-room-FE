import { Box, Heading, VStack } from '@chakra-ui/react';
import UserHostedAuction from './UserHostedAuction';
import UserGetItem from './UserGetItem';

function UserParticipantInfo() {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      boxShadow="2xl"
      mt={4}
      w="80%"
      maxW="md"
    >
      <Heading as="h3" size="md" mb={4} color="gray.700">
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
