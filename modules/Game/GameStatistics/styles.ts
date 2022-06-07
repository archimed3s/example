export const chakraStyleProps = {
  statisticsWrapper: {
    bgColor: 'gray.-140',
    rounded: 'lg',
    pt: '0.75rem',
  },
  tabItem: {
    cursor: 'pointer',
    m: '0 0.15625rem',
    rounded: 5,
    bgColor: 'gray.-100',
    color: 'var(--chakra-colors-white)',
    fontWeight: 600,
    _hover: {
      bgGradient: 'linear-gradient(24.13deg, rgba(89, 101, 158, 0.5) 0%, rgba(139, 153, 221, 0.5) 100%)',
      shadow: 'b2',
    },
    _selected: {
      bgGradient: 'linear-gradient(24.13deg, rgba(89, 101, 158, 0.5) 0%, rgba(139, 153, 221, 0.5) 100%)',
      shadow: 'b2',
    },
    _focus: {
      outline: 'none',
    },
  },
  defaultLine: {
    p: '0.75rem',
    justifyContent: 'space-between',
    textStyle: 'xs2',
  },
  stripedLine: {
    p: '0.75rem',
    justifyContent: 'space-between',
    textStyle: 'xs2',
    bgColor: 'gray.-120',
    rounded: 'lg',
  },
  headingLine: {
    p: '0.75rem',
    justifyContent: 'space-between',
    textStyle: 'xs2',
    bgColor: 'gray.-120',
  },
  headingLineDate: {
    color: 'gray.100',
  },
  headingLinePercent: {
    color: 'white',
    fontWeight: 400,
    ml: '1',
  },
  tabList: {
    mb: '1em',
    bgColor: 'gray.-100',
    p: '0.3125rem 0.15625rem',
    mx: '0.75rem',
    rounded: 5,
  },
};
