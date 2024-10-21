import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';

export default function Header() {
  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={4} py={2} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="center">
        <Text fontSize="2xl" fontWeight="bold" color="purple.600">
          Rush Room
        </Text>
      </Flex>
    </Box>
  );
}
