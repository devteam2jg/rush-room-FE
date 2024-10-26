import { Image, Flex } from '@chakra-ui/react';
import Navigator from '../../components/Navigator';
import serviceLogo from '../../assets/images/serviceLogo.png';
import AuctionOverviewList from '../../components/AuctionOverviewList';

export default function AuctionOverview() {
  return (
    <>
      <Flex backgroundColor="white" justifyContent="space-between">
        <Image height="50px" src={serviceLogo} />
      </Flex>
      <AuctionOverviewList />
      <Navigator />
    </>
  );
}
