import { Box, Image } from '@chakra-ui/react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { nanoid } from 'nanoid';

interface BiddingImageProps {
  images: string[];
}

function BiddingImage({ images }: BiddingImageProps) {
  return (
    <Box backgroundColor="#141517">
      <Swiper pagination modules={[Pagination]} className="mySwiper">
        {images.map((image) => (
          <SwiperSlide key={nanoid()}>
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

export default BiddingImage;
