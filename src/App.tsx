import { Box, ChakraProvider, Flex, Image } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import theme from './utils/theme';
import router from './routes';
import './App.css';

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
        margin="0 auto"
        maxWidth="1280px"
        alignItems="center"
        justifyContent="space-around"
        flexDirection={{ base: 'column', lg: 'row' }}
        bg="#161717"
      >
        {/* <Box
          display={{ base: 'none', lg: 'block' }}
          width="500px"
          height="500px"
          bg="red"
        >
          123
        </Box> */}
        <Image
          src="public/images/qr.svg"
          alt="QR code"
          display={{ base: 'none', lg: 'block' }}
          width="500px"
          height="500px"
        />
        <Box margin={{ base: '0 auto', lg: '0' }} width="100%" maxWidth="430px">
          <RouterProvider router={router} />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
