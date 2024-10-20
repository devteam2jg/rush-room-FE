import { Box, Text } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Box>
        <Outlet />
      </Box>
      <Text>네브바</Text>
    </>
  );
};

export default Layout;
