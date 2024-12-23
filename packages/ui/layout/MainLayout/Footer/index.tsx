import { Box, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ComponentType, MouseEventHandler } from 'react';
import { Link, LinkProps } from '../../../components/Link';
import { Routes } from '@lendos/constants/routes';
import Image from 'next/image';

interface StyledLinkProps {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const StyledLink = styled(Link)<StyledLinkProps>(({ theme }) => ({
  color: theme.palette.text.muted,
  '&:hover': {
    color: theme.palette.text.primary,
  },
  display: 'flex',
  alignItems: 'center',
})) as ComponentType<LinkProps>;

export const FOOTER_ICONS = [
  {
    href: 'https://twitter.com/lendOSorg',
    icon: '/icons/twitter.svg',
    title: 'Lens',
  },
  {
    href: 'https://discord.gg/Z7eydVFjhA',
    icon: '/icons/discord.svg',
    title: 'Discord',
  },
  {
    href: 'https://medium.com/@lendos',
    icon: '/icons/medium.svg',
    title: 'Medium',
  },
];

export function Footer() {
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));

  const FOOTER_LINKS = [
    {
      href: Routes.declaration,
      label: <>Disclaimer</>,
      key: 'disclaimer',
    },
    {
      href: 'https://docs.lendos.org/lendos-knowledge-hub',
      label: <>Docs</>,
      key: 'documentation',
    },
  ];

  return (
    <Box
      sx={theme => ({
        display: 'flex',
        height: '48px',
        px: '20px',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '22px',
        backgroundColor: theme.palette.primary.main,
      })}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '10px', alignItems: 'center' }}>
        {FOOTER_LINKS.map(link => (
          <StyledLink key={link.key} href={link.href} target={'_blank'}>
            <Typography variant='buttonL' color={'text.grey'}>
              {link.label}
            </Typography>
          </StyledLink>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {FOOTER_ICONS.map(icon => (
          <Box
            key={icon.title}
            component={Link}
            href={icon.href}
            aria-label='Go to homepage'
            sx={{
              lineHeight: 0,
              transition: '0.3s ease all',
              '&:hover': { opacity: 0.7 },
            }}
          >
            <Image
              src={icon.icon}
              alt={`lendOS ${icon.title}`}
              width={md ? 24 : 20}
              height={md ? 24 : 20}
            />
          </Box>
          // <StyledLink href={icon.href} key={icon.title}>
          //   <SvgIcon
          //     viewBox='0 0 20 20'
          //     sx={{
          //       fontSize: [24, 24, 20],
          //       '&:hover': {
          //         opacity: 0.7,
          //       },
          //     }}
          //   >
          //     {icon.icon}
          //   </SvgIcon>
          // </StyledLink>
        ))}
      </Box>
    </Box>
  );
}
