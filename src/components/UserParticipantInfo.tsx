import { Box, Flex, Heading, VStack, Text } from '@chakra-ui/react';

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
        <Flex
          align="center"
          justify="space-between"
          p={4}
          borderRadius="md"
          _hover={{ bg: 'gray.50' }}
        >
          <Flex align="center">
            <Box bg="gray.200" borderRadius="full" boxSize="40px" mr={4} />
            <Text fontSize="md">주최 경매 리스트</Text>
          </Flex>
          <Text>&gt;</Text>
        </Flex>

        <Flex
          align="center"
          justify="space-between"
          p={4}
          borderRadius="md"
          _hover={{ bg: 'gray.50' }}
        >
          <Flex align="center">
            <Box bg="gray.200" borderRadius="full" boxSize="40px" mr={4} />
            <Text fontSize="md">낙찰 물품 리스트</Text>
          </Flex>
          <Text>&gt;</Text>
        </Flex>
      </VStack>
    </Box>
  );
}

export default UserParticipantInfo;
