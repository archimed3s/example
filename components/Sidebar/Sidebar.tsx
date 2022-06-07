import { Box, Flex, Spacer, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { LanguagePicker } from '@components/Sidebar/LanguagePicker/LanguagePicker';
import { ProfileBlock } from '@components/Sidebar/ProfileBlock/ProfileBlock';
import { QuickDeposit } from '@components/Sidebar/QuickDeposit';
import { WelcomeBlock } from '@components/Sidebar/WelcomeBlock/WelcomeBlock';
import { usePlayerState } from '@hooks/usePlayerState';
import { getItem } from '@utils/localStorage';

import { SidebarFooter } from './Footer/SidebarFooter';
import { Navigation } from './Navigation/Navigation';

const storageKey = 'sideBarClosed';

export const Sidebar = () => {
  const sidebarWidth = useBreakpointValue({ base: '100vw', md: '250px' });
  const sidebarInitialWidth = useBreakpointValue({ base: '0', md: '70px' });
  const { player } = usePlayerState();
  const isBigScreen = useBreakpointValue({ base: false, '2xl': true }) ?? false;

  const [isSidebarOpen, setIsSidebarOpen] = useState(isBigScreen);

  useEffect(() => {
    const storageValue = getItem(storageKey);
    if (storageValue !== undefined) {
      setIsSidebarOpen(!storageValue);
    } else {
      setIsSidebarOpen(isBigScreen);
    }
  }, [isBigScreen]);

  return (
    <Flex
      direction="column"
      as={motion.aside}
      initial={{ width: sidebarInitialWidth }}
      animate={{
        width: isSidebarOpen ? sidebarWidth : sidebarInitialWidth,
        transition: { duration: 0.1 },
      }}
      px={5}
      py={{ base: 5, md: 6 }}
      bg={{
        base: isSidebarOpen ? 'gray.-160' : 'none',
        xl: 'none',
      }}
      position={{
        base: 'fixed',
        xl: 'static',
      }}
      minHeight="100%"
      zIndex="20"
      boxShadow={{
        sm: isSidebarOpen
          ? '0px 0px 10px rgba(0, 0, 0, 0.2), 0px 0px 30px rgba(17, 18, 29, 0.5), 0px 0px 75px rgba(10, 10, 17, 0.2)'
          : 'none',
        xl: 'none',
      }}
    >
      <Box
        display={{ base: isSidebarOpen ? 'flex' : 'none', xl: 'flex' }}
        flexDirection="column"
        overflowY="auto"
        maxH={{ base: '85vh', md: '100vh' }}
        flex={1}
      >
        {player ? (
          <>
            <Box display={{ base: 'none', lg: isSidebarOpen ? 'block' : 'none' }} paddingBottom="1rem">
              <QuickDeposit player={player} />
            </Box>
            <Box display={{ base: 'block', lg: 'none' }}>
              <ProfileBlock player={player} />
            </Box>
          </>
        ) : (
          <WelcomeBlock isSidebarOpen={isSidebarOpen} />
        )}
        <Navigation player={player} isSidebarOpen={isSidebarOpen} />

        <Spacer />
        <Box mt={6}>{isSidebarOpen && <LanguagePicker />}</Box>
        {isSidebarOpen && <SidebarFooter />}
      </Box>
    </Flex>
  );
};
