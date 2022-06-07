import { Box, BoxProps, Stack, StackProps, Text, TextProps, VStack } from '@chakra-ui/react';

export const PageWrapper = (props: StackProps) => <VStack w="full" alignItems="start" py={9} spacing={0} {...props} />;

export const PageTitle = (props: TextProps) => <Text color="white" textStyle="lg2" fontWeight={400} {...props} />;

export const PageHeader = (props: StackProps) => (
  <VStack spacing={6} alignItems="start" justify="space-between" w="full" {...props} />
);

export const PageControls = (props: StackProps) => (
  <Stack
    direction={{
      md: 'row',
      base: 'column',
    }}
    alignItems={{
      md: 'center',
      base: 'flex-start',
    }}
    spacing={4}
    {...props}
  />
);

export const Paper = (props: BoxProps) => <Box bg="gray.-140" borderRadius={16} padding={3} {...props} />;
export const PaperHeader = (props: TextProps) => (
  <Text color="white" textStyle="md2" fontWeight={600} px={1} {...props} />
);
export const PaperContent = (props: TextProps) => <Text px={3} {...props} />;
