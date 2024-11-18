import { Box, Heading, VStack } from '@chakra-ui/react';
import UserHostedAuction from './UserHostedAuction';
import UserGetItem from './UserGetItem';

function UserParticipantInfo() {
  return (
    <Box
      height="calc(calc(var(--vh, 1vh) * 100) - 350px)"
      margin="12px auto"
      bg="#282828"
      p={4}
      borderRadius="lg"
      boxShadow="2xl"
      mt={4}
      w="90%"
      maxW="md"
      alignItems="inherit"
    >
      <VStack
        height="100%"
        justifyContent="space-between"
        spacing={4}
        align="stretch"
      >
        <UserHostedAuction />
        <UserGetItem />
      </VStack>
    </Box>
  );
}

export default UserParticipantInfo;
