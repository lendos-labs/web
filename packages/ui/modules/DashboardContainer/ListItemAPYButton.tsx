import LaunchIcon from '@mui/icons-material/Launch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckIcon from '@mui/icons-material/Check';
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { CustomMarket } from '@lendos/types/market';
import { InterestRate } from '@lendos/types/reserves';
import { FormattedNumber } from '../../components/FormattedNumber';
import { Link } from '../../components/Link';
import { Routes } from '@lendos/constants/routes';

interface ListItemAPYButtonProps {
  stableBorrowRateEnabled: boolean;
  borrowRateMode: string;
  disabled: boolean;
  onClick: () => void;
  stableBorrowAPY: string;
  variableBorrowAPY: string;
  underlyingAsset: string;
  currentMarket: CustomMarket;
}

export const ListItemAPYButton = ({
  stableBorrowRateEnabled,
  borrowRateMode,
  disabled,
  onClick,
  variableBorrowAPY,
  underlyingAsset,
  currentMarket,
}: ListItemAPYButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant='outlined'
        onClick={handleClick}
        size='small'
        endIcon={
          stableBorrowRateEnabled && (
            <SvgIcon sx={{ fontSize: '14px !important' }}>
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </SvgIcon>
          )
        }
        disabled={disabled}
        data-cy={`apyButton_${borrowRateMode}`}
      >
        {borrowRateMode}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        keepMounted={true}
        data-cy={`apyMenu_${borrowRateMode}`}
      >
        <Typography variant='subheader2' sx={{ px: 4, py: 3 }}>
          Select APY type to switch
        </Typography>

        <MenuItem
          selected={(borrowRateMode as InterestRate) === InterestRate.Variable}
          value={InterestRate.Variable}
          onClick={() => {
            if ((borrowRateMode as InterestRate) === InterestRate.Stable) {
              onClick();
            }
            handleClose();
          }}
        >
          <ListItemIcon>
            <SvgIcon>
              {(borrowRateMode as InterestRate) === InterestRate.Variable && <CheckIcon />}
            </SvgIcon>
          </ListItemIcon>
          <ListItemText
            slotProps={{
              primary: { variant: 'description' },
            }}
          >
            APY, variable
          </ListItemText>
          <FormattedNumber value={Number(variableBorrowAPY)} percent variant='description' />
        </MenuItem>

        <Divider sx={{ borderColor: theme => theme.palette.border.grey }} />

        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            sx={{ my: 2, ml: 4, minWidth: 'auto' }}
            size='small'
            component={Link}
            target='_blank'
            href={`${Routes.reserveOverview}/?underlyingAsset=${underlyingAsset}&marketName=${currentMarket}`}
            variant='text'
            endIcon={
              <SvgIcon>
                <LaunchIcon />
              </SvgIcon>
            }
          >
            SEE CHARTS
          </Button>
        </Box>
      </Menu>
    </>
  );
};
