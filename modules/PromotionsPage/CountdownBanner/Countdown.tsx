import { Center, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { useRouteService } from '@common/services/RouteService';
import { Button } from '@components/Button/Button';
import { GLink } from '@components/GLink/GLink';
import { getRemainingTime } from '@modules/PromotionsPage/getRemainingTime';
import { messages } from '@modules/PromotionsPage/messages';

const CounterNumbers = ({ value, max }: { value: number; max: number }) => {
  const prev = value - 1 >= 0 ? value - 1 : max;
  const next = value === max ? 0 : value + 1;

  return (
    <Stack direction="column" overflow="hidden" justifyContent="center" height="full">
      <Text textStyle="md2">
        <FormattedNumber value={prev} minimumIntegerDigits={2} />
      </Text>
      <Text textStyle="md2" color="white">
        <FormattedNumber value={value} minimumIntegerDigits={2} />
      </Text>
      <Text textStyle="md2">
        <FormattedNumber value={next} minimumIntegerDigits={2} />
      </Text>
    </Stack>
  );
};

type CountdownProps = {
  end: Date;
  promoSlug: string;
};
export const Countdown = ({ end, promoSlug }: CountdownProps) => {
  const routeService = useRouteService();
  const { days, hours, minutes } = getRemainingTime(end);

  return (
    <Stack direction="row" position="absolute" left="1.5rem" bottom="1.5rem">
      <Stack direction="column" width="242px" color="white">
        <Flex
          height="80px"
          width="full"
          borderWidth="1px"
          borderStyle="solid"
          borderRadius="12"
          justifyContent="space-evenly"
          alignItems="center"
          color="whiteTransparent.20"
        >
          <CounterNumbers value={days} max={100} />
          <Text textStyle="md2">:</Text>
          <CounterNumbers value={hours} max={23} />
          <Text textStyle="md2">:</Text>
          <CounterNumbers value={minutes} max={59} />
        </Flex>
        <Grid templateColumns="35% 30% 35%" justifyItems="center" marginTop=".75rem">
          <Text>
            <FormattedMessage {...messages.days} />
          </Text>
          <Text>
            <FormattedMessage {...messages.hours} />
          </Text>
          <Text>
            <FormattedMessage {...messages.minutes} />
          </Text>
        </Grid>
      </Stack>
      <Center height="80px" paddingX="1.5rem">
        <GLink href={routeService.getPromotionDetailsPagePath(promoSlug)}>
          <Button variant="unstyled" bgColor="white" color="black" bgImage="">
            <FormattedMessage {...messages.joinNow} />
          </Button>
        </GLink>
      </Center>
    </Stack>
  );
};
