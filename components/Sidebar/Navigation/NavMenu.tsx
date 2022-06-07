import { Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FormattedMessage, MessageDescriptor } from 'react-intl';

import { GLink } from '@components/GLink/GLink';

export type NavIconProps = {
  color: string;
};

export type MenuItemType = {
  title: MessageDescriptor;
  route: string;
  onClick?: () => void;
  getIcon: (props: NavIconProps) => ReactNode;
  key?: string;
};

type MenuProps = {
  nav: MenuItemType[];
  pathname: string;
  isSidebarOpen: boolean;
};

export const NavMenu = ({ nav, pathname, isSidebarOpen }: MenuProps) => (
  <VStack
    spacing={{ base: 3, md: 2 }}
    bg={{ base: 'gray.-140', md: 'transparent' }}
    borderRadius="12px"
    p={{ base: '12px 16px', md: '8px 0' }}
    w="100%"
    divider={<Divider h="1px" variant="gradient" display={{ base: 'block', md: 'none' }} />}
  >
    {nav.map((item) => (
      <GLink
        key={item.route}
        href={item.route}
        onClick={item.onClick}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        variant="menu"
        py={{ base: 2 }}
        pr={{ base: 2 }}
      >
        <HStack as="span" spacing="3">
          {item.getIcon({ color: pathname === item.route ? 'primary.80' : 'gray.20' })}

          {isSidebarOpen && (
            <Text as="span">
              <FormattedMessage {...item.title} />
            </Text>
          )}
        </HStack>
      </GLink>
    ))}
  </VStack>
);
