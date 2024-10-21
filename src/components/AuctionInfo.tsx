import { Box, Button, Flex, Image, useColorModeValue } from '@chakra-ui/react';

export default function AuctionInfo() {
  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={4} py={2} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* 왼쪽 뒤로가기 아이콘 */}
        <Image src="images/leftarrow.png" alt="뒤로가기" boxSize="24px" />
        <Box flex="1" />

        <Button
          fontSize="md"
          fontWeight="bold"
          variant="ghost"
          textAlign="right"
        >
          경매 정보
        </Button>

        <Box />
      </Flex>
    </Box>
  );
}
