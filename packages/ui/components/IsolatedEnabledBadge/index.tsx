import { ReactNode } from 'react';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, SvgIcon, Typography, TypographyProps, useTheme } from '@mui/material';

import { ContentWithTooltip } from '../ContentWithTooltip';

const contentSx = {
  borderRadius: '4px',
  display: 'inline-flex',
  alignItems: 'center',
  p: '2px',
  mt: '2px',
  cursor: 'pointer',
  '&:hover': { opacity: 0.6 },
};

interface InfoIconProps {
  color?: string;
}

const InfoIcon = ({ color }: InfoIconProps) => (
  <SvgIcon
    sx={{
      ml: '3px',
      color: color ? color : 'text.muted',
      fontSize: '14px',
    }}
  >
    <InfoOutlinedIcon />
  </SvgIcon>
);

const IsolationModeTooltipTemplate = ({ content }: { content: ReactNode }) => {
  return (
    <Box>
      <Box>{content}</Box>
    </Box>
  );
};

export const IsolatedEnabledBadge = ({
  typographyProps,
}: {
  typographyProps?: TypographyProps;
}) => {
  const theme = useTheme();

  const sx = {
    border: `1px solid ${theme.palette.warning.main}`,
    color: theme.palette.warning.main,
    ...contentSx,
  };
  return (
    <ContentWithTooltip
      withoutHover
      tooltipContent={
        <IsolationModeTooltipTemplate
          content={
            <>
              Isolated assets have limited borrowing power and other assets cannot be used as
              collateral.
            </>
          }
        />
      }
    >
      <Box sx={sx}>
        <Typography
          variant='secondary12'
          sx={{
            lineHeight: '0.75rem',
          }}
          color={theme.palette.warning.main}
          {...typographyProps}
        >
          Isolated
        </Typography>
        <InfoIcon color={theme.palette.warning.main} />
      </Box>
    </ContentWithTooltip>
  );
};
