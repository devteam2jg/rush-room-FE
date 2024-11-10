import { Box, Image, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ShowingUser from '../../components/NewHomeTest/ShowingUser';
import Navigator from '../../components/Navigator';
import ShowingItem from '../../components/NewHomeTest/ShowingItem';
import serviceLogo from '../../assets/images/serviceLogo.png';

function NewHome() {
  const nav = useNavigate();
  return (
    <Box
      // minHeight="calc(var(--vh, 1vh) * 100)"
      height="calc(var(--vh, 1vh) * 100)"
      backgroundColor="#161717"
      position="relative"
      width="100%"
      overflow="hidden"
    >
      <Box height="100%">
        <Box paddingTop={3} paddingLeft={4}>
          <Image height="50px" src={serviceLogo} onClick={() => nav('/')} />
        </Box>
        <VStack width="100%" justifyContent="space-between" color="white">
          <ShowingUser />
          <ShowingItem />
          <Navigator />
        </VStack>
      </Box>
    </Box>
  );
}

export default NewHome;
