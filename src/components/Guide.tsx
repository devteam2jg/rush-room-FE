import { Box, Image, Heading, VStack } from '@chakra-ui/react';

export default function Guide() {
  return (
    <Box p={4} textAlign="center" backgroundColor="#282828" maxHeight="100vh">
      <VStack spacing={4}>
        <Heading as="h1" size="sm" color="white">
          서비스 사용 가이드
        </Heading>
        <Image
          src="/images/guide.jpg"
          alt="서비스 사용 가이드"
          boxSize="300px"
          objectFit="cover"
          borderRadius="lg"
          shadow="md"
        />
      </VStack>
    </Box>
  );
}
