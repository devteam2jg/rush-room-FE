import { Box, Image } from '@chakra-ui/react';
import { useRef } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface BiddingSessionProps {
  images: string[];
}

function BiddingSession({ images }: BiddingSessionProps) {
  const idRef = useRef(0);
  return (
    <Box backgroundColor="#141517">
      <Swiper pagination modules={[Pagination]} className="mySwiper">
        {images.map((image) => (
          <SwiperSlide key={idRef.current++}>
            <Image
              height="35vh"
              objectFit="cover"
              margin="0 auto"
              src={image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default BiddingSession;
