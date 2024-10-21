import { Box, Flex, Image, useColorModeValue } from '@chakra-ui/react';

export default function Header() {
  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={4} py={2} shadow="sm">
      <Flex h={3} alignItems="center" justifyContent="center" />
      <Box>
        <Image src="images/logo.png" alt="logo" width="103px" height="52px" />
      </Box>
    </Box>
  );
}
