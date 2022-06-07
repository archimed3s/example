import { Link, LinkProps } from '@chakra-ui/react';
import NLink from 'next/link';
import { FC } from 'react';

type Props = LinkProps & {
  activeClassName?: string;
  href: string;
  as?: never;
};

export const GLink: FC<Props> = ({ children, href, ...props }) => (
  <NLink href={href} passHref={true}>
    <Link {...props}>{children}</Link>
  </NLink>
);
