import { Center, HStack, StackProps, Text, useToken } from '@chakra-ui/react';

type GroupTitleProps = Pick<StackProps, 'gridColumn'> & {
  text: string;
};
export const GroupTitle = ({ text, ...stackProps }: GroupTitleProps) => {
  return (
    <HStack {...stackProps}>
      <GroupTitleDiamond />
      <Text textStyle="md2" color="white" gridColumn="1 / col12-end">
        {text}
      </Text>
    </HStack>
  );
};
