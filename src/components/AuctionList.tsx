import { Box, createStandaloneToast, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuctionDetail from '../hooks/useAuctionDetail';
import AuctionItemList from './AuctionItem/AuctionItemList';
import { AuctionItem } from '../utils/types';

interface AuctionListProps {
  fontColor: string;
  headerShow: string;
  bgColor: string;
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
  const [draggingItem, setDraggingItem] = useState<AuctionItem | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

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

  // 드래그가 실행될 때 호출
  const handleDragStart = (item: AuctionItem) => {
    console.log('Drag start', item);
    setDraggingItem(item);
  };

  // 드래그 중인 요소가 다른 요소 위에 올라갈 때
  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    console.log('Drag Over', index);
    e.preventDefault();
    setDragOverIndex(index);
  };

  // 드롭 시 호출
  const handleDrop = () => {
    console.log('Drop:', draggingItem);
    if (draggingItem !== null && dragOverIndex !== null) {
      const updatedItems = [...items];
      const draggedIndex = updatedItems.findIndex(
        (i) => i.id === draggingItem.id
      );

      if (draggedIndex !== -1 && draggedIndex !== dragOverIndex) {
        const [removedItem] = updatedItems.splice(draggedIndex, 1);
        updatedItems.splice(dragOverIndex, 0, removedItem);
        setItems(updatedItems);
      }
    }
    setDraggingItem(null);
    setDragOverIndex(null);
  };

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
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}
            style={{
              border: dragOverIndex === index ? '2px dashed #AA8EBF' : 'none',
              padding: '4px',
              zIndex: 0,
            }}
          >
            <AuctionItemList item={item} />
          </div>
        ))}
      </VStack>
    </Box>
  );
}
