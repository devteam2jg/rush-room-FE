import { Image, Flex, Box } from '@chakra-ui/react';
import Navigator from '../../components/Navigator';
import serviceLogo from '../../assets/images/serviceLogo.png';
import AuctionOverviewList from '../../components/AuctionOverviewList';

export default function AuctionOverview() {
  return (
    <Box height="calc(var(--vh, 1vh) * 100)" position="relative">
      <Flex backgroundColor="#161717" justifyContent="space-between">
        <Image height="50px" src={serviceLogo} />
      </Flex>
      <AuctionOverviewList />
      <Navigator />
    </Box>
  );
}
