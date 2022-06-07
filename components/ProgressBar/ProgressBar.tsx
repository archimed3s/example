import { Box, HStack } from '@chakra-ui/react';
import { FC } from 'react';

export type ProgressBarProps = {
  nSteps: number;
  currentStep: number;
  color?: string;
};

export const ProgressBar: FC<ProgressBarProps> = ({ nSteps, currentStep, color = 'primary.30' }) => (
  <HStack spacing="1">
    {[...Array(Math.max(nSteps, 0))].map((_, i) => (
      <Box key={i} w="100%" h="3px" bg={i + 1 <= currentStep ? color : 'gray.20'} borderRadius="6px" />
    ))}
  </HStack>
);
