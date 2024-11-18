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
import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import 'swiper/css/navigation';

interface BiddingImageProps {
  images: string[];
}

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
      } else if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
      } else {
        console.error('This browser does not support HLS');
      }
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.src = '';
      }
    };
  }, [src]);

  return (
    <Box height="35vh" margin="0 auto">
      <video
        ref={videoRef}
        controls
        muted
        width="100%"
        height="100%"
        style={{ objectFit: 'contain' }}
      >
        <track kind="captions" />
      </video>
    </Box>
  );
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
      <Swiper
        style={{
          '--swiper-pagination-color': '#B9A5E2',
        }}
        pagination
        modules={[Pagination]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={nanoid()}>
            {image.split('.').pop() === 'm3u8' ? (
              <VideoPlayer src={image} />
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
              '--swiper-navigation-color': '#B9A5E2',
              '--swiper-pagination-color': '#B9A5E2',
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
                {image.split('.').pop() === 'm3u8' ? (
                  <Box
                    width="100%"
                    height="90vh"
                    display="flex"
                    alignItems="center"
                  >
                    <VideoPlayer src={image} />
                  </Box>
                ) : (
                  <Image
                    src={image}
                    maxH="90vh"
                    objectFit="contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default BiddingImage;
