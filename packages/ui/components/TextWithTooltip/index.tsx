'use client';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, BoxProps, IconButton, SvgIcon, Typography } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';
import { ReactElement, ReactNode, useState } from 'react';
import { ContentWithTooltip } from '../ContentWithTooltip';

export interface TextWithTooltipProps extends TypographyProps {
  text?: ReactNode;
  icon?: ReactNode;
  iconSize?: number;
  iconColor?: string;
  iconMargin?: number;
  textColor?: string;
  children?: ReactNode;
  cont?: ReactElement;
  wrapperProps?: BoxProps;
  open?: boolean;
  disableHoverListener?: boolean;
  setOpen?: (open: boolean) => void;
}

export const TextWithTooltip = ({
  text,
  icon,
  iconSize = 14,
  iconColor,
  cont,
  iconMargin,
  children,
  textColor,
  wrapperProps: { sx: boxSx, ...boxRest } = {},
  open: openProp = false,
  setOpen: setOpenProp,
  disableHoverListener = true,
  ...rest
}: TextWithTooltipProps) => {
  const [open, setOpen] = useState(openProp);

  const toggleOpen = () => {
    if (setOpenProp) {
      setOpenProp(!open);
    }
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...boxSx }} {...boxRest}>
      {text && (
        <Typography {...rest} color={textColor}>
          {text}
        </Typography>
      )}

      <ContentWithTooltip
        tooltipContent={children}
        open={open}
        setOpen={toggleOpen}
        disableHoverListener={disableHoverListener}
      >
        {cont ?? (
          <IconButton
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: iconSize,
              height: iconSize,
              borderRadius: '50%',
              p: 0,
              minWidth: 0,
              ml: iconMargin ?? 0.5,
            }}
          >
            <SvgIcon
              sx={{
                fontSize: iconSize,
                color: iconColor ?? 'text.dark',
                borderRadius: '50%',
                '&:hover': { color: iconColor ?? 'text,dark' },
              }}
            >
              {icon ?? <InfoOutlinedIcon />}
            </SvgIcon>
          </IconButton>
        )}
      </ContentWithTooltip>
    </Box>
  );
};
