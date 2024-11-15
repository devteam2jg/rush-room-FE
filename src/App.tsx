import {
  Box,
  ChakraProvider,
  Flex,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { keyframes } from '@emotion/react';
import theme from './utils/theme';
import router from './routes';
import './App.css';
import ServiceLogo from './assets/images/serviceLogo.png';
import AuctionQRStore from './store/\bAuctionQRStore';

function App() {
  const AuctionUrlForQR = AuctionQRStore((state) => state.AuctionUrlForQR);
  function setScreenSize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  const blinkAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
  `;
  return (
    <ChakraProvider theme={theme}>
      <Flex
        width="100vw"
        height="calc(var(--vh, 1vh) * 100)"
        bg="#161717"
        gap={{ base: '0', xl: '200px' }}
        alignItems="center"
        justifyContent={{ base: 'space-evenly', xl: 'center' }}
        flexDirection={{ base: 'column', lg: 'row' }}
      >
        <VStack
          gap={6}
          alignItems="center"
          justifyContent="center"
          display={{ base: 'none', lg: 'flex' }}
        >
          <Image width="250px" src={ServiceLogo} />

          <QRCodeSVG
            value={AuctionUrlForQR}
            size={250}
            level="H"
            includeMargin
            style={{
              borderRadius: '10px', // SVG 자체에 borderRadius 적용
            }}
          />

          <Text
            animation={`${blinkAnimation} 1.5s ease-in-out infinite`}
            color="#FCFCFD"
            fontSize="20px"
          >
            지금 경매에 참여해 보세요!
          </Text>
        </VStack>
        <Box width="100%" maxWidth="430px">
          <RouterProvider router={router} />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
