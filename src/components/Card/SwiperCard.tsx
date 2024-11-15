import { Box } from '@chakra-ui/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import CardContent from './CardContent';
import { Result } from '../../utils/types';

const MotionBox = motion(Box);

interface SwipeCardProps {
  result: Result;
  isTop: boolean;
  index: number;
  removeCard: () => void;
}

function SwipeCard({ result, isTop, index, removeCard }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      removeCard();
    }
  };

  const baseRotation = !isTop ? (index % 2 ? 6 : -6) : 0;

  return (
    <MotionBox
      position="absolute"
      w="80%"
      h=""
      style={{
        x,
        opacity,
        rotate: useTransform(rotate, (r) => `${r + baseRotation}deg`),
      }}
      animate={{ scale: isTop ? 1 : 0.95 }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      boxShadow={isTop ? 'xl' : 'md'}
      borderRadius="lg"
      bg="white"
      overflow="hidden"
      transition="0.125s transform"
    >
      <CardContent result={result} />
    </MotionBox>
  );
}

export default SwipeCard;
