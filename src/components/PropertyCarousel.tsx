import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import PropertyCard from './PropertyCard';

interface PropertyCarouselProps {
  properties: any[];
}

const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ properties }) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={1}>
      {properties.map((property) => (
        <SwiperSlide key={property.id}>
          <PropertyCard property={property} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PropertyCarousel;
