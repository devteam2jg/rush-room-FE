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
      <Box bg="#161717">
        <Flex
          margin="0 auto"
          maxWidth="1280px"
          alignItems="center"
          justifyContent="space-around"
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          {/* <Box
          display={{ base: 'none', lg: 'block' }}
          width="500px"
          height="500px"
          bg="red"
        >
          123
        </Box> */}
          <Flex
            gap={4}
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
              display={{ base: 'none', lg: 'block' }}
              width="300px"
              height="300px"
            />
          </Flex>

          <Box
            margin={{ base: '0 auto', lg: '0' }}
            width="100%"
            maxWidth="430px"
          >
            <RouterProvider router={router} />
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
