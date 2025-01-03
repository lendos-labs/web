import React from 'react';

import Typography, { TypographyProps } from '@mui/material/Typography';

export const NoData = <C extends React.ElementType>(
  props: TypographyProps<C, { component?: C; text?: string }>,
) => {
  return <Typography {...props}>{props.text ?? '—'}</Typography>;
};
