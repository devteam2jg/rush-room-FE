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
  breakpoints: {
    sm: '420px', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
    '2xl': '96em', // 1536px
  },
  colors: {
    mong: {
      50: '#F4F0FA', // 가장 밝은 버전
      100: '#E5DBED',
      200: '#D6C7E8',
      300: '#C7B2E5',
      400: '#B9A5E2',
      500: '#B9A5E2', // 기본색상(primary)
      600: '#6E5691',
      700: '#53406D',
      800: '#382B49',
      900: '#1D1524', // 가장 어두운 버전
    },
    mongCancle: {
      50: '#ECEAF1',
      100: '#DDD9E5',
      200: '#CEC9DA',
      300: '#BFB8CE',
      400: '#B0A7C3',
      500: '#C3BECF',
      600: '#928A9E',
      700: '#6E6679',
      800: '#4A4354',
      900: '#272130',
    },
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
      ':root': {
        '--vh': '100%',
      },
      '*': {
        boxSizing: 'border-box',
        margin: 0,
      },
      body: {
        bg: mode('#FCFCFD', '#000')(props),
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
