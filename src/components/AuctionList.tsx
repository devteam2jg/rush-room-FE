import { Box, Heading, VStack } from '@chakra-ui/react';

export default function AuctionList() {
  return (
    <Box p={4} textAlign="center">
      <VStack spacing={4} align="flex-start">
        <Heading as="h5" size="md" textAlign="left">
          경매 물품 리스트
        </Heading>
      </VStack>
    </Box>
  );
}
