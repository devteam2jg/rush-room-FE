import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { GlobalStyles, mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  fonts: {
    heading: `'Spoqa Han Sans Neo', sans-serif`,
    body: `'Spoqa Han Sans Neo', sans-serif`,
  },
  styles: {
    global: (props: GlobalStyles) => ({
      '@font-face': [
        {
          fontFamily: 'Spoqa Han Sans Neo',
          src: `url('/fonts/SpoqaHanSansNeo-Thin.woff2') format('woff2')`,
          fontWeight: 100,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
        {
          fontFamily: 'Spoqa Han Sans Neo',
          src: `url('/fonts/SpoqaHanSansNeo-Light.woff2') format('woff2')`,
          fontWeight: 300,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
        {
          fontFamily: 'Spoqa Han Sans Neo',
          src: `url('/fonts/SpoqaHanSansNeo-Regular.woff2') format('woff2')`,
          fontWeight: 400,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
        {
          fontFamily: 'Spoqa Han Sans Neo',
          src: `url('/fonts/SpoqaHanSansNeo-Medium.woff2') format('woff2')`,
          fontWeight: 500,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
        {
          fontFamily: 'Spoqa Han Sans Neo',
          src: `url('/fonts/SpoqaHanSansNeo-Bold.woff2') format('woff2')`,
          fontWeight: 700,
          fontStyle: 'normal',
          fontDisplay: 'swap',
        },
      ],
      '*': {
        boxSizing: 'border-box',
        margin: 0,
      },
      body: {
        bg: mode('gray.100', '#000')(props),
        color: mode('gray.800', 'whiteAlpha.900')(props),
        fontFamily: 'Spoqa Han Sans Neo, sans-serif',
      },
      '::-webkit-scrollbar': {
        width: '0px',
        height: '0px',
      },
    }),
  },
  config,
});

export default theme;
