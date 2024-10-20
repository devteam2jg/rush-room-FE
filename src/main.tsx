import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { GlobalStyleProps, mode } from '@chakra-ui/theme-tools';
import router from './routes';
import './index.css';

const styles = {
  global: (props: GlobalStyleProps) => ({
    body: {
      bg: mode('gray.100', '#000')(props),
      color: mode('gray.800', 'whiteAlpha.900')(props),
    },
  }),
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
