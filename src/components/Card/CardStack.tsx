import { useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SwipeCard from './SwiperCard';
import { Result } from '../../utils/types';

interface CardStackProps {
  results: Result[];
}

function CardStack({ results }: CardStackProps) {
  const [cards, setCards] = useState(results);
  const nav = useNavigate();
  const cardsRemaining = cards.length > 0;
  const handleGoHome = () => {
    nav('/');
  };
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      position="relative"
      bg="#222222"
    >
      {cards.map((result, index) => (
        <SwipeCard
          key={result.id}
          result={result}
          isTop={index === cards.length - 1}
          index={index}
          removeCard={() =>
            setCards((cards) => cards.filter((c) => c.id !== result.id))
          }
        />
      ))}
      {!cardsRemaining && (
        <Box
          position="absolute"
          width="300px"
          height="400px"
          borderRadius="lg"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={handleGoHome} colorScheme="mong">
            홈으로
          </Button>
        </Box>
      )}
    </Flex>
  );
}

export default CardStack;
