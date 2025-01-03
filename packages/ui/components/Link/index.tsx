'use client';

import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('span')({});

interface NextLinkComposedProps
  extends Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      'href' | 'onClick' | 'onMouseEnter' | 'onTouchStart'
    >,
    Omit<NextLinkProps, 'href' | 'as'> {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
  nextHref?: NextLinkProps['href'];
  href?: NextLinkProps['href'];
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, forwardedRef) {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars -- need for remove href */
    const { to, linkAs, replace, scroll, shallow, prefetch, locale, href, ...other } = props;

    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref
        locale={locale}
      >
        <Anchor ref={forwardedRef} {...other} />
      </NextLink>
    );
  },
);

export type LinkProps = {
  as?: NextLinkProps['as'];
  href: NextLinkProps['href'];
  linkAs?: NextLinkProps['as']; // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const { as: linkAs, className: classNameProps, href, noLinkStyle, ...other } = props;

  const isExternal =
    typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:'));

  const pn = usePathname();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    active: pn === pathname,
  });

  if (isExternal) {
    return (
      <MuiLink
        className={className}
        href={href}
        ref={ref}
        target='_blank'
        rel='noopener'
        underline='none'
        {...other}
      />
    );
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposed className={className} ref={ref} to={href} underline='none' {...other} />
    );
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      to={href}
      underline='none'
      {...other}
    />
  );
});
