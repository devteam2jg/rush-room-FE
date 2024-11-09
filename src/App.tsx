import { Box, ChakraProvider, Flex } from '@chakra-ui/react';
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
        justifyContent="space-around"
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <Box
          display={{ base: 'none', lg: 'block' }}
          width="500px"
          height="500px"
          bg="red"
        >
          123
        </Box>
        <Box width="100%" margin={{ base: '0 auto', lg: '0' }} maxWidth="430px">
          <RouterProvider router={router} />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
