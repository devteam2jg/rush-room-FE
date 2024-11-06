import { Image } from '@chakra-ui/react';
import RTCTestPage from '../../pages/RTCTestPage';

interface StreamProps {
  isOwner: boolean;
}

function BiddingStream({ isOwner }: StreamProps) {
  return (
    // <Image
    //   display="block"
    //   width="100%"
    //   height="100%"
    //   src="/images/back_temp.jpeg"
    //   objectFit="cover"
    // />
    <RTCTestPage isOwner={isOwner} />
  );
}

export default BiddingStream;
