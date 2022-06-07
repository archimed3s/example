import { Box, Flex, FlexProps, HStack, StackProps, Text } from '@chakra-ui/react';
import { Children, PropsWithChildren, TouchEvent, useCallback, useMemo, useState } from 'react';

export type CarouselProps = {
  height?: FlexProps['height'];
  dotsBottom?: StackProps['bottom'];
  'data-testid'?: string;
};

const arrowStyles = {
  bg: 'rgba(253, 253, 255, 0.2)',
  cursor: 'pointer',
  pos: 'absolute',
  top: '50%',
  w: '44px',
  mt: '-22px',
  p: '9px',
  color: 'white',
  fontSize: '18px',
  transition: '0.6s ease',
  rounded: '50%',
  textAlign: 'center',
  userSelect: 'none',
  _hover: {
    bg: 'rgba(253, 253, 255, 0.5)',
  },
} as const;

const touchSensitivity = 150;

// Based on https://choc-ui.tech/docs/elements/carousels
export const Carousel = ({ children, height, dotsBottom = '8%', ...restProps }: PropsWithChildren<CarouselProps>) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slidesCount = Children.count(children);

  const prevSlide = useCallback(() => setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1)), [slidesCount]);
  const nextSlide = useCallback(() => setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1)), [slidesCount]);

  const onTouchStart = (e: TouchEvent) => setTouchStart(e.targetTouches[0].clientX);

  const onTouchMove = (e: TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (touchStart - touchEnd > touchSensitivity) {
      nextSlide();
    }
    if (touchStart - touchEnd < -touchSensitivity) {
      prevSlide();
    }
  };

  const dotsProps = useMemo(
    () =>
      Children.map(children, (_, index) => ({
        key: `carousel-dot-${index}`,
        onClick: () => setCurrentSlide(index),
        isCurrent: currentSlide === index,
      })),
    [currentSlide, children],
  );

  return (
    <Flex w="full" alignItems="center" justifyContent="center" {...restProps}>
      <Flex
        w="full"
        pos="relative"
        overflow="hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
      >
        <Flex h={height} w="full" transition="all .5s" ml={`-${currentSlide * 100}%`}>
          {Children.map(children, (slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none" height="full" position="relative">
              {slide}
            </Box>
          ))}
        </Flex>
        {slidesCount > 1 && (
          <>
            <Text {...arrowStyles} left="calc(3% + 22px)" onClick={prevSlide} display={{ base: 'none', md: 'block' }}>
              &#10094;
            </Text>
            <Text {...arrowStyles} right="calc(3% + 22px)" onClick={nextSlide} display={{ base: 'none', md: 'block' }}>
              &#10095;
            </Text>
            <HStack justify="center" pos="absolute" bottom={dotsBottom} w="full" gridArea="dots">
              {dotsProps?.map(({ key, isCurrent, onClick }) => (
                <Box
                  key={key}
                  cursor="pointer"
                  boxSize={['5px', '', '13px']}
                  m="0 2px"
                  bg={isCurrent ? 'rgba(253, 253, 255, 1)' : 'rgba(253, 253, 255, 0.4)'}
                  rounded="50%"
                  display="inline-block"
                  transition="background-color 0.6s ease"
                  _hover={{ bg: 'rgba(253, 253, 255, 1)' }}
                  onClick={onClick}
                />
              ))}
            </HStack>
          </>
        )}
      </Flex>
    </Flex>
  );
};
