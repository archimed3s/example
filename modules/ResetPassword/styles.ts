export const chakraStyleProps = {
  container: {
    p: '24px',
    bg: 'gray.-120',
    mt: 150,
    borderRadius: '16px',
    flexDirection: 'column' as const,
    minWidth: { base: 'auto', md: '500px' },
  },
  title: {
    color: 'white',
    fontSize: 'm3',
    fontWeight: '600',
  },
  subtitle: {
    color: 'gray.120',
    pt: 2,
    maxWidth: '500px',
  },
  noteText: {
    color: 'white',
    fontSize: 'm4',
  },
  noteContainer: {
    bg: 'gray.-80',
    p: '19px',
    mt: '18px',
    fontSize: 's2',
    borderRadius: '8px',
    alignItems: 'center',
  },
  noteIconContainer: {
    borderRadius: '16px',
    mr: 3,
    bg: 'gray.-50',
    w: '32px',
    h: '32px',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid',
  },
};
