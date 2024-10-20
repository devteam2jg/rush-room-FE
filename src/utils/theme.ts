// src/theme.ts
import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { GlobalStyleProps, mode } from '@chakra-ui/theme-tools';

const fonts = {
  heading: `'Spoqa Han Sans Neo', sans-serif`,
  body: `'Spoqa Han Sans Neo', sans-serif`,
};

const styles = {
  global: (props: GlobalStyleProps) => ({
    '@font-face': [
      {
        fontFamily: 'Spoqa Han Sans Neo',
        src: "url('/src/assets/fonts/SpoqaHanSansNeo-Thin.ttf') format('truetype')",
        fontWeight: 100,
        fontStyle: 'normal',
      },
      {
        fontFamily: 'Spoqa Han Sans Neo',
        src: "url('/src/assets/fonts/SpoqaHanSansNeo-Light.ttf') format('truetype')",
        fontWeight: 300,
        fontStyle: 'normal',
      },
      {
        fontFamily: 'Spoqa Han Sans Neo',
        src: "url('/src/assets/fonts/SpoqaHanSansNeo-Regular.ttf') format('truetype')",
        fontWeight: 400,
        fontStyle: 'normal',
      },
      {
        fontFamily: 'Spoqa Han Sans Neo',
        src: "url('/src/assets/fonts/SpoqaHanSansNeo-Medium.ttf') format('truetype')",
        fontWeight: 500,
        fontStyle: 'normal',
      },
      {
        fontFamily: 'Spoqa Han Sans Neo',
        src: "url('/src/assets/fonts/SpoqaHanSansNeo-Bold.ttf') format('truetype')",
        fontWeight: 700,
        fontStyle: 'normal',
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
  }),
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles, fonts });

export default theme;
