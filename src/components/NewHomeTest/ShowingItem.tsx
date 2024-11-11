import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { createStandaloneToast, Box } from '@chakra-ui/react';
import useAuction from '../../hooks/useAuction';
import { AuctionItem } from '../../utils/types';

function Background() {
  return (
    <div className="absolute inset-0 z-0">
      <motion.img
        src="images/biditem.png" // 첫 번째 이미지 경로
        alt="Background Image"
        className="object-cover w-full h-full"
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: 'backInOut',
          delay: 0.2,
        }}
      />
    </div>
  );
}

interface ItemProps {
  auctionDto: object;
  ownerProfile: object;
}

function Card({ auctionDto, ownerProfile }: ItemProps) {
  return (
    <div className="relative w-40 p-3 rounded-lg h-72 shrink-0">
      <span className="absolute w-fit z-10 rounded-full bg-red-500 px-3 py-0.5 text-sm font-extrabold text-white">
        {auctionDto.status}
      </span>
      <span className="absolute bottom-[98px] left-3 w-fit z-20 rounded-full bg-transparent px-3 py-0.5 text-xs font-extrabold text-white flex items-center">
        <img
          className="object-cover w-6 h-6 mr-2 rounded-full"
          src={ownerProfile.thumbnailUrl}
          alt="유저 프로필 이미지"
        />
        {ownerProfile.nickname}
      </span>
      <div className="absolute bottom-0 left-0 right-0 h-[88px] w-full z-20 font-mono font-black text-left transition-colors bg-white border-2 border-white rounded-b-xl text-neutral-800 backdrop-blur hover:bg-white/30 hover:text-white">
        <div className="relative z-10">
          <p className="block my-2 font-mono font-extrabold leading-loose origin-top-left text-md">
            {auctionDto.title}
          </p>
        </div>
      </div>
      <Background />
    </div>
  );
}

function ShowingItem() {
  const { data, error, isPending } = useAuction();
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  if (isPending) {
    return <div>Loading...!!</div>;
  }

  if (error) {
    nav('/');
    toast({
      title: '실패',
      description: `${error.message}`,
      status: 'error',
      variant: 'left-accent',
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <Box height="70vh" overflowY="auto">
      <div className="grid grid-cols-2 gap-4">
        {data?.data?.map((item: AuctionItem) => {
          return (
            <Link to={`/auction/${item.auctionDto.id}`}>
              <Card
                key={item.id}
                auctionDto={item.auctionDto}
                ownerProfile={item.ownerProfile}
              />
            </Link>
          );
        })}
      </div>
    </Box>
  );
}

export default ShowingItem;
