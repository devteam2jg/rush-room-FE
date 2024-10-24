import { Image, Flex } from '@chakra-ui/react';
import AuctionOverviewList from '../../components/AuctionOverviewList';
import Navigator from '../../components/Navigator';
import serviceLogo from '../../assets/images/serviceLogo.png';

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
