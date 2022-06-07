import { AvatarProps, Avatar as ChakraAvatar } from '@chakra-ui/react';

export const Avatar = ({ ...rest }: AvatarProps) => <ChakraAvatar {...rest} sx={{ '& >img': { borderRadius: 0 } }} />;
