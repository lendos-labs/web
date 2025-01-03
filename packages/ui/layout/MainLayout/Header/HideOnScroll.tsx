import { ReactElement, ReactNode } from 'react';

import { Slide, useMediaQuery, useScrollTrigger, useTheme } from '@mui/material';

interface ChildProps {
  children: ReactNode;
}

export const HideOnScroll = ({ children }: ChildProps) => {
  const { breakpoints } = useTheme();
  const md = useMediaQuery(breakpoints.down('md'));
  const trigger = useScrollTrigger({ threshold: md ? 160 : 80 });
  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children as ReactElement}
    </Slide>
  );
};
