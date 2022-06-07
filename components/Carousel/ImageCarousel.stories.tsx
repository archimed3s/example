import { Stack, Text } from '@chakra-ui/react';

import { ImageCarousel } from '@components/Carousel/ImageCarousel';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'ImageCarousel',
  component: ImageCarousel,
};

export const ImageCarouselExample = () => {
  const slides = [
    {
      img: 'https://images.pexels.com/photos/2599537/pexels-photo-2599537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      label: 'First Slide',
      description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
    },
    {
      img: 'https://images.pexels.com/photos/2714581/pexels-photo-2714581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      label: 'Second Slide',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      img: 'https://images.pexels.com/photos/2878019/pexels-photo-2878019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
      label: 'Third Slide',
      description: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.',
    },
    {
      img: 'https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      label: 'Fourth Slide',
      description: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
    },
    {
      img: 'https://images.pexels.com/photos/3124111/pexels-photo-3124111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      label: 'Fifth Slide',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ].map(({ img, label, description }) => ({
    overlayContent: (
      <Stack p="8px 12px" pos="absolute" bottom="24px" textAlign="center" w="full" mb="8" color="white">
        <Text fontSize="2xl">{label}</Text>
        <Text fontSize="lg">{description}</Text>
      </Stack>
    ),
    imgLink: img,
    alt: label,
  }));
  return <ImageCarousel slides={slides} height="400px" />;
};
