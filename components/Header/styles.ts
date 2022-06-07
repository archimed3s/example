export const chakraStyleProps = {
  grid: {
    templateRows: { base: 'repeat(2, 1fr)', md: '1fr' },
    templateColumns: { base: 'repeat(2, 1fr)', md: 'auto 1fr auto' },
    alignItems: { md: 'center' },
    bg: { base: 'gray.-160', md: 'gray.-140' },
    pr: { md: 8 },
    pl: { md: 3 },
    py: { base: 5, md: 4 },
  },
  logoWrapper: {
    pl: { base: 5, md: 0 },
    mr: { md: 20 },
  },
  iconMenu: {
    display: { md: 'none' },
  },
  logoText: {
    display: { base: 'none', md: 'block' },
  },
  arrowStyles: {
    display: { base: 'none', md: 'block' },
    color: 'gray.160',
    boxShadow: 'inset 0px 1.4px 0px rgba(139, 150, 190, 0.15)',
    width: '40px',
    sx: {
      '&.chakra-button': {
        borderRadius: '50%',
        ml: 6,
      },
    },
  },
  gridItem: {
    rowStart: { base: 2, md: 1 },
    gridArea: { base: '2 / 1 / 2 / 3', md: '1 / 2' },
    px: { base: 5, md: 0 },
    bg: 'gray.-140',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    _before: {
      content: `""`,
      display: 'block',
      width: '100%',
      height: { base: '1px', md: '0' },
      bgGradient:
        'linear(90deg, rgba(103, 117, 169, 0.01) 0%, rgba(103, 117, 169, 0.2) 48.96%, rgba(103, 117, 169, 0.01) 100%)',
    },
  },
  stackChild: {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    pb: '17px',
    sx: {
      '&': {
        boxSizing: 'content-box',
      },
    },
  },
  linkStyles: {
    py: { base: 3, md: 0 },
  },
  stackUser: {
    pr: { base: 5, md: 0 },
    justify: 'right',
  },
  iconNotificationButton: {
    display: { base: 'none', md: 'block' },
    bgGradient: 'linear(24.13deg, rgba(89, 101, 158, 0.1) 0%, rgba(139, 153, 221, 0.1) 100%)',
  },
  avatar: {
    cursor: 'pointer',
    display: { base: 'none', md: 'block' },
  },
  registerButton: {
    bgGradient: 'linear(211.17deg, #BB83F4 0%, #6A32CB 100%)',
  },
  logInButton: {
    px: { base: '14px', md: 12 },
  },
  depositIconButton: {
    display: { base: 'block', md: 'none' },
    bgGradient: 'linear(211.17deg, #1DC25F 0%, #028C84 100%)',
  },
  depositButton: {
    display: { base: 'none', md: 'block' },
    bgGradient: 'linear(211.17deg, #1DC25F 0%, #028C84 100%)',
  },
  stackCurrency: {
    marginInlineEnd: 12,
  },
  sumWrapper: {
    alignItems: 'center',
    sx: {
      svg: {
        pr: 1,
      },
    },
  },
  labelCurrency: {
    fontSize: '14px',
    color: 'gray.100',
    display: { base: 'none', md: 'block' },
  },
  currency: {
    pl: 1,
    color: 'white',
  },
  stackDivider: {
    borderColor: 'gray.0',
    alignSelf: 'initial',
    height: '13px',
  },
};
