export const progressTheme = {
  Progress: {
    sizes: {
      sm: {
        track: {
          h: '8px',
          bgColor: 'gray.-20',
          borderRadius: '100px',
        },
      },
    },
    variants: {
      purple: {
        filledTrack: {
          bgColor: '#955DE1',
        },
      },
      coral: {
        filledTrack: {
          bgColor: '#955DE1',
        },
      },
      blue: {
        filledTrack: {
          bgColor: '#3194E2',
        },
      },
      green: {
        filledTrack: {
          bgColor: '#11AA70',
        },
      },
      orange: {
        filledTrack: {
          bgColor: '#11AA70',
        },
      },
      teal: {
        filledTrack: {
          bgColor: '#3194E2',
        },
      },
    },
    defaultProps: {
      size: 'sm',
      variant: 'blue',
    },
  },
};
