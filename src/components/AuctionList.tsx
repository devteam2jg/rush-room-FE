import { Box, createStandaloneToast, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import useAuctionDetail from '../hooks/useAuctionDetail';
import AuctionItemList from './AuctionItem/AuctionItemList';
import { AuctionItem } from '../utils/types';

interface AuctionListProps {
  fontColor: string;
  headerShow: string;
  bgColor: string;
}

function ReorderItem({ item }: { item: AuctionItem }) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      dragListener={false}
      dragControls={controls}
      style={{ width: '100%' }}
    >
      <div
        className="reorder-handle"
        onPointerDown={(e) => controls.start(e)}
        style={{ cursor: 'grab' }}
      >
        <AuctionItemList item={item} />
      </div>
    </Reorder.Item>
  );
}

export default function AuctionList({
  fontColor,
  headerShow,
  bgColor,
}: AuctionListProps) {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useAuctionDetail();
  const [items, setItems] = useState<AuctionItem[]>([]);

  useEffect(() => {
    if (data) {
      setItems(data.items);
    }
  }, [data]);

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
    <Box
      marginBottom="20vh"
      p={4}
      height="100%"
      textAlign="center"
      color={fontColor}
      bg={bgColor}
    >
      <VStack justifyContent="center" spacing={4} alignItems="center">
        <Heading
          display={headerShow === 'show' ? 'block' : 'none'}
          as="h5"
          size="xm"
          textAlign="left"
        >
          경매 물품 리스트
        </Heading>
        <Reorder.Group axis="y" values={items} onReorder={setItems}>
          {items.map((item) => (
            <ReorderItem key={item.id} item={item} />
          ))}
        </Reorder.Group>
      </VStack>
    </Box>
  );
}
