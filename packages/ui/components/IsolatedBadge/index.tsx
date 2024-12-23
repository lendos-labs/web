import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, SvgIcon, Typography, TypographyProps, useTheme } from '@mui/material';
import { ReactNode } from 'react';

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
      color: color ?? 'text.muted',
      fontSize: '14px',
    }}
  >
    <InfoOutlinedIcon />
  </SvgIcon>
);
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

export const IsolatedDisabledBadge = () => {
  return (
    <ContentWithTooltip
      tooltipContent={
        <IsolationModeTooltipTemplate
          content={
            <>
              Asset can be only used as collateral in isolation mode with limited borrowing power.
              To enter isolation mode, disable all other collateral.
            </>
          }
        />
      }
    >
      <Box sx={contentSx}>
        <Typography variant='numberS' color='error.main'>
          Unavailable
        </Typography>
        <InfoIcon />
      </Box>
    </ContentWithTooltip>
  );
};

export const UnavailableDueToIsolationBadge = () => {
  return (
    <ContentWithTooltip
      tooltipContent={
        <IsolationModeTooltipTemplate
          content={<>Collateral usage is limited because of isolation mode.</>}
        />
      }
    >
      <Box sx={contentSx}>
        <Typography variant='numberS' color='error.main'>
          Unavailable
        </Typography>
        <InfoIcon />
      </Box>
    </ContentWithTooltip>
  );
};

const IsolationModeTooltipTemplate = ({ content }: { content: ReactNode }) => {
  return (
    <Box>
      <Box>{content}</Box>
    </Box>
  );
};
