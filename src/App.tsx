import { Box, ChakraProvider, Flex, Image, Text } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import theme from './utils/theme';
import router from './routes';
import './App.css';
import ServiceLogo from './assets/images/serviceLogo.png';

function App() {
  function setScreenSize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <ChakraProvider theme={theme}>
      <Flex
        height="calc(var(--vh, 1vh) * 100)"
        bg="#161717"
        gap="200px"
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <Flex
          display={{ base: 'none', lg: 'block' }}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Image width="250px" src={ServiceLogo} />
          <Text color="#FCFCFD" fontSize="20px">
            지금 경매에 참여해 보세요!
          </Text>
          <Image
            borderRadius="15px"
            src="/images/qr.svg"
            alt="QR code"
            width="300px"
            height="300px"
          />
        </Flex>
        <Box width="100%" maxWidth="430px">
          <RouterProvider router={router} />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
