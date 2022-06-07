import { Center } from '@chakra-ui/react';

type CounterProps = {
  value?: number;
  size?: number;
};

const getViewBox = (size: number, value: number) => {
  return `0 0 ${(String(value).length - 1) * 8 + 32} ${Math.round(size / 2)}`;
};

export const Counter = ({ value, size = 32 }: CounterProps) => {
  if (value === undefined) {
    return null;
  }
  return (
    <Center width={`${size}px`} height={`${size}px`} rounded={100} bgColor="primary.60" color="white" boxShadow="b4">
      <svg viewBox={getViewBox(size, value)}>
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontWeight={600}>
          {value}
        </text>
      </svg>
    </Center>
  );
};
