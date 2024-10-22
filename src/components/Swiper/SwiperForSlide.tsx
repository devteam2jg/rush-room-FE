// AuctionSwiper.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

interface SwiperProps {
  children: React.ReactNode[];
  onIndexChange: (index: number) => void;
  setTotalSlides: (slides: number) => void;
}

function SwiperForSlide({
  children,
  onIndexChange,
  setTotalSlides,
}: SwiperProps) {
  return (
    <Swiper
      pagination={{
        type: 'fraction',
      }}
      navigation={{
        prevEl: '#custom-prev',
        nextEl: '#custom-next',
      }}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      allowTouchMove={false}
      onSwiper={(swiper) => setTotalSlides(swiper.slides.length)}
      onSlideChange={(swiper) => onIndexChange(swiper.activeIndex)}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperForSlide;
