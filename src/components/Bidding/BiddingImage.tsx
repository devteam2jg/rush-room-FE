import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import 'swiper/css/navigation';

interface BiddingImageProps {
  images: string[];
}

function BiddingImage({ images }: BiddingImageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initialSlide, setInitialSlide] = useState(0);

  const handleImageClick = (index: number) => {
    setInitialSlide(index);
    onOpen();
  };

  return (
    <Box backgroundColor="#141517">
      <Swiper pagination modules={[Pagination]} className="mySwiper">
        {images.map((image, index) => (
          <SwiperSlide key={nanoid()}>
            {image.split('.').pop() === 'm3u8' ? (
              <Box height="35vh" margin="0 auto">
                <video muted width="100%" controls>
                  <source src={image} type="video/mp4" />
                  <track kind="captions" />
                </video>
              </Box>
            ) : (
              <Image
                height="35vh"
                objectFit="cover"
                margin="0 auto"
                src={image}
                cursor="pointer"
                onClick={() => handleImageClick(index)}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
        <ModalOverlay />
        <ModalContent
          bg="rgba(0, 0, 0, 0.9)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="calc(var(--vh, 1vh) * 100)"
        >
          <ModalCloseButton color="white" zIndex="modal" />
          <Swiper
            initialSlide={initialSlide}
            pagination
            navigation
            modules={[Pagination, Navigation]}
            className="mySwiper"
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            {images.map((image) => (
              <SwiperSlide
                key={nanoid()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={image}
                  maxH="90vh"
                  objectFit="contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default BiddingImage;
