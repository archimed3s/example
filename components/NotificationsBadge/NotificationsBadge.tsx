import { Center, CenterProps, Text } from '@chakra-ui/react';

import { useNotifications } from '@hooks/useNotifications';

type NotificationsBadgeProps = Pick<CenterProps, 'display'>;

export const NotificationsBadge = ({ display }: NotificationsBadgeProps) => {
  const { unreadNotifications } = useNotifications();

  if (!unreadNotifications) {
    return null;
  }

  return (
    <Center
      pos="absolute"
      top="0"
      right="0"
      transform="translate(50%,-50%)"
      rounded="full"
      bg="gray.-140"
      padding={1}
      display={display}
    >
      <Text
        px={2}
        py={1}
        textStyle="xs"
        color="white"
        bgGradient="linear(45deg, gradientRed.0, gradientRed.100)"
        boxShadow="0px 1.4px 0px 0px #FFFFFF4D inset"
        rounded="full"
      >
        {unreadNotifications}
      </Text>
    </Center>
  );
};
