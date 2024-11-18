import { VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navigator from '../../components/Navigator';
import serviceLogo from '../../assets/images/serviceLogo.png';
import AuctionOverviewList from '../../components/AuctionOverviewList';

export default function AuctionOverview() {
  const nav = useNavigate();

  return (
    <VStack
      width="100%"
      height="calc(var(--vh, 1vh) * 100)"
      position="relative"
      justifyContent="space-between"
      alignItems="inherit"
      overflow="auto"
    >
      {/* <Flex width="100%" backgroundColor="#161717" justifyContent="flex-start">
        <Image height="50px" src={serviceLogo} onClick={() => nav('/')} />
      </Flex> */}
      <AuctionOverviewList />
      <Navigator />
    </VStack>
  );
}
