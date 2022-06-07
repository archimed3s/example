import { Image } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Carousel, CarouselProps } from '@components/Carousel/Carousel';

export type ImageCarouselSlide = {
  imgLink: string;
  alt: string;
  overlayContent?: ReactNode;
};
type ImageCarouselProps = CarouselProps & {
  slides: ImageCarouselSlide[];
};

const ImageCarouselSlide = (props: ImageCarouselSlide) => {
  return (
    <>
      <Image src={props.imgLink} boxSize="full" backgroundSize="cover" alt={props.alt} />
      {props.overlayContent}
    </>
  );
};

export const ImageCarousel = ({ slides, ...carouselProps }: ImageCarouselProps) => {
  return (
    <Carousel {...carouselProps}>
      {slides.map((slide, index) => (
        <ImageCarouselSlide key={`${index}-${slide.imgLink.substring(0, -10)}`} {...slide} />
      ))}
    </Carousel>
  );
};
