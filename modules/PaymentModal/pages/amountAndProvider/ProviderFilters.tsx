import { Grid, Tag, Text, useBreakpointValue } from '@chakra-ui/react';
import css from '@emotion/css';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'Withdraw.ProviderFilters.title',
    defaultMessage: 'Pick a payment method',
  },
});

type ProviderFiltersProps = {
  categories: string[];
  category: string;
  onChange: (value: string) => void;
};

const customScrollBarStyle = css`
  -webkit-overflow-scrolling: touch;
  overflow-y: hidden;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 0;
    display: none;
  }
`;

export const ProviderFilters = ({ category: selected, categories, onChange }: ProviderFiltersProps) => {
  const breakpoint = useBreakpointValue({ base: 'base', sm: 'sm', md: 'md', lg: 'lg' });
  const isMobileView = breakpoint === 'base' || breakpoint === 'sm';

  return (
    categories && (
      <>
        <Text textStyle="s" fontWeight="600" marginY={1}>
          <FormattedMessage {...messages.title} />
        </Text>
        <Grid
          gridGap={4}
          gridAutoFlow="column"
          gridTemplateColumns={`repeat(${categories.length}, 36%)`}
          overflowY="auto"
          width="100%"
          paddingBottom={2}
          css={isMobileView ? customScrollBarStyle : null}
        >
          {categories.map((category) => (
            <Tag
              key={category}
              paddingX={3}
              paddingY={2}
              fontSize="s2"
              variant="solid"
              cursor="pointer"
              bgColor="gray.-100"
              userSelect={'none'}
              whiteSpace={isMobileView ? 'nowrap' : 'nowrap'}
              justifyContent="center"
              bgGradient={selected === category ? 'linear(to-t, wildBlue.0, wildBlue.100)' : 'none'}
              onClick={() => onChange(category)}
            >
              {category}
            </Tag>
          ))}
        </Grid>
      </>
    )
  );
};
