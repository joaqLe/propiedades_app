import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IonCard, IonImg, IonCardHeader, IonCardContent, IonLabel, IonButton } from '@ionic/react';

interface Property {
  id: number;
  name: string;
  img: string;
  rating: number;
  reviews: number;
  location: string;
  ufPrice: string;
  clpPrice: string;
}

interface PropertyCarouselProps {
  properties: Property[];
}

const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ properties }) => (
  <Swiper spaceBetween={10} slidesPerView={1}>
    {properties.map((property) => (
      <SwiperSlide key={property.id}>
        <IonCard>
          <IonImg src={property.img} alt={`Imagen de ${property.name}`} />
          <IonCardHeader>
            <IonLabel>{property.name}</IonLabel>
            <IonLabel>
              ⭐ {property.rating} ({property.reviews} reviews) • {property.location}
            </IonLabel>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>
              {property.ufPrice} / {property.clpPrice}
            </IonLabel>
            <IonButton color="dark" slot="end">
              Contactar
            </IonButton>
          </IonCardContent>
        </IonCard>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default PropertyCarousel;
