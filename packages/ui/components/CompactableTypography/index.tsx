import { Skeleton, Typography, TypographyProps } from '@mui/material';

export interface CompactableTypographyProps extends TypographyProps {
  children: string;
  compactMode?: CompactMode;
  compact?: boolean;
  loading?: boolean;
  skeletonWidth?: number;
}

export enum CompactMode {
  SM,
  MD,
  LG,
  XL,
  XXL,
}

const compactModeMap = {
  [CompactMode.SM]: {
    from: 4,
    to: 4,
  },
  [CompactMode.MD]: {
    from: 7,
    to: 4,
  },
  [CompactMode.LG]: {
    from: 12,
    to: 4,
  },
  [CompactMode.XL]: {
    from: 12,
    to: 3,
  },
  [CompactMode.XXL]: {
    from: 14,
    to: 7,
  },
};

const textCenterEllipsis = (str: string, from: number, to: number) => {
  return `${str.substring(0, from)}...${str.substring(str.length - to, str.length)}`;
};

export const CompactableTypography = ({
  compactMode = CompactMode.SM,
  compact = true,
  children,
  loading = false,
  skeletonWidth = 100,
  ...rest
}: CompactableTypographyProps) => {
  const selectedCompactMode = compactModeMap[compactMode];

  return (
    <Typography fontWeight={600} {...rest}>
      {loading && <Skeleton width={skeletonWidth} />}
      {compact &&
        !loading &&
        textCenterEllipsis(children, selectedCompactMode.from, selectedCompactMode.to)}

      {!compact && !loading && children}
    </Typography>
  );
};
