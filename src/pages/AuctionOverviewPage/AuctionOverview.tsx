import { Image, Flex, Box, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navigator from '../../components/Navigator';
import serviceLogo from '../../assets/images/serviceLogo.png';
import AuctionOverviewList from '../../components/AuctionOverviewList';

export default function AuctionOverview() {
  const nav = useNavigate();

  return (
    <Box
      height="calc(var(--vh, 1vh) * 100)"
      position="relative"
      width="100%"
      overflow="hidden"
    >
      <Box height="100%">
        <Flex p={3} backgroundColor="#161717" justifyContent="space-between">
          <Image height="50px" src={serviceLogo} onClick={() => nav('/')} />
        </Flex>
        <AuctionOverviewList />
        <Navigator />
      </Box>
    </Box>
  );
}
