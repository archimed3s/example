import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';

import { chakraStyleProps } from '@modules/Game/GameStatistics/styles';
import { Leaderboard } from '@modules/Leaderboard/Leaderboard';

type GameStatisticsProps = {
  gameId: string | undefined;
};

export const GameStatistics = ({ gameId }: GameStatisticsProps) => {
  return (
    <Box {...chakraStyleProps.statisticsWrapper}>
      <Tabs isFitted variant="unstyled">
        <TabList {...chakraStyleProps.tabList}>
          <Tab {...chakraStyleProps.tabItem}>Leaderboard</Tab>
          <Tab {...chakraStyleProps.tabItem}>Statistics</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <Leaderboard gameId={gameId} />
          </TabPanel>
          <TabPanel p={0}>
            <Box px={3}>
              <Flex {...chakraStyleProps.headingLine} borderRadius="0.625rem 0.625rem 0 0" mb={1}>
                <Box>
                  <Text as="span" {...chakraStyleProps.headingLineDate}>
                    24h
                  </Text>
                  <Text as="span" {...chakraStyleProps.headingLinePercent}>
                    N/A
                  </Text>
                </Box>
                <Box>
                  <Text as="span" {...chakraStyleProps.headingLineDate}>
                    Week
                  </Text>
                  <Text as="span" {...chakraStyleProps.headingLinePercent}>
                    N/A
                  </Text>
                </Box>
                <Box>
                  <Text as="span" {...chakraStyleProps.headingLineDate}>
                    Month
                  </Text>
                  <Text as="span" {...chakraStyleProps.headingLinePercent}>
                    N/A
                  </Text>
                </Box>
              </Flex>
              <Flex {...chakraStyleProps.headingLine} borderRadius="0 0 0.625rem 0.625rem">
                <Box color="gray.100">RTP</Box>
                <Box>N/A</Box>
              </Flex>
              <Flex {...chakraStyleProps.defaultLine}>
                <Box color="gray.100">Volatility</Box>
                <Box>N/A</Box>
              </Flex>
              <Flex {...chakraStyleProps.stripedLine}>
                <Box color="gray.100">Paylines</Box>
                <Box>N/A</Box>
              </Flex>
              <Flex {...chakraStyleProps.defaultLine}>
                <Box color="gray.100">Max. Win</Box>
                <Box>N/A</Box>
              </Flex>
              <Flex {...chakraStyleProps.stripedLine}>
                <Box color="gray.100">Min. Bet</Box>
                <Box>N/A</Box>
              </Flex>
              <Flex {...chakraStyleProps.defaultLine}>
                <Box color="gray.100">Max. Bet</Box>
                <Box>N/A</Box>
              </Flex>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
