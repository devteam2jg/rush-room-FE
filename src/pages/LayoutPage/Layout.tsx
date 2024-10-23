import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Box>
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
