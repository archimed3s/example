import { Center, Icon, useToken } from '@chakra-ui/react';

export const HornIcon = () => {
  const [bgColor, gradientFrom, gradientTo] = useToken('colors', [
    'gray.-50',
    'gradientNotification.0',
    'gradientNotification.100',
  ]);

  return (
    <Center
      width={12}
      height={12}
      border="2px solid transparent"
      rounded={100}
      background={`linear-gradient(${bgColor}, ${bgColor}) padding-box, linear-gradient(135deg, ${gradientFrom}, ${gradientTo}) border-box`}
    >
      <Icon width={5} height={5} viewBox="0 0 20 18" fill="none">
        <path
          d="M0.666748 7.28238V10.3928C0.666748 11.1137 1.11728 11.77 1.82377 12.0783C2.09402 12.1962 2.38927 12.2573 2.68825 12.2573H5.40019H8.11214L16.2812 17.182C17.8906 18.1522 19.3334 17.2756 19.3334 15.5022V2.13153C19.3334 0.35817 17.8906 -0.476969 16.2812 0.493252L8.11214 5.41788H2.68825C2.38927 5.41788 2.09402 5.47904 1.82377 5.59697C1.11728 5.90524 0.666748 6.56152 0.666748 7.28238Z"
          fill="url(#paint0_linear_6040_21756)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_6040_21756"
            x1="0.666748"
            y1="17.5835"
            x2="9.71324"
            y2="-3.9568"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#59659E" />
            <stop offset="1" stopColor="#8B99DD" />
          </linearGradient>
        </defs>
      </Icon>
    </Center>
  );
};
