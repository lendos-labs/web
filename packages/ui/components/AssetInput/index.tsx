import { forwardRef, ReactNode } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { CapType } from '@lendos/types/cap';
import {
  Box,
  BoxProps,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputBase,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material';
import { AvailableTooltip } from '../infoTooltips/AvailableTooltip.tsx';
import { TokenIcon } from '../TokenIcon';
import { FormattedNumber } from '../FormattedNumber';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  value: string;
}

export const NumberFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={values => {
          if (values.value !== props.value) {
            onChange({
              target: {
                name: props.name,
                value: values.value || '',
              },
            });
          }
        }}
        thousandSeparator
        allowNegative={false}
      />
    );
  },
);

export interface Asset {
  balance?: string;
  symbol: string;
  iconSymbol?: string;
  address?: string;
  aToken?: boolean;
  priceInUsd?: string;
  decimals?: number;
}

export interface AssetInputProps<T extends Asset = Asset> {
  value: string;
  usdValue: string;
  symbol: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  disableInput?: boolean;
  onSelect?: (asset: T) => void;
  assets: T[];
  capType?: CapType;
  maxValue?: string;
  isMaxSelected?: boolean;
  inputTitle?: ReactNode;
  balanceText?: ReactNode;
  loading?: boolean;
  selectOptionHeader?: ReactNode;
  selectOption?: (asset: T) => ReactNode;
  sx?: BoxProps;
  exchangeRateComponent?: ReactNode;
}

export const AssetInput = <T extends Asset = Asset>({
  value,
  usdValue,
  symbol,
  onChange,
  disabled,
  disableInput,
  onSelect,
  assets,
  capType,
  maxValue,
  isMaxSelected,
  inputTitle,
  balanceText,
  loading = false,
  selectOptionHeader,
  selectOption,
  sx = {},
  exchangeRateComponent,
}: AssetInputProps<T>) => {
  const theme = useTheme();
  const handleSelect = (event: SelectChangeEvent) => {
    const newAsset = assets.find(asset => asset.symbol === event.target.value);
    if (!newAsset) {
      return;
    }
    onSelect?.(newAsset);
    onChange?.('');
  };

  const asset = assets.length === 1 ? assets[0] : assets.find(asset => asset.symbol === symbol);

  return (
    <Box {...sx}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant='h3' color='text.secondary'>
          {inputTitle ?? 'Amount'}
        </Typography>
        {capType && <AvailableTooltip capType={capType} />}
      </Box>

      <Box
        sx={theme => ({
          border: `1px solid ${theme.palette.background.surface}`,
          backgroundColor: theme.palette.background.surface2,
          boxShadow: theme.palette.shadow.card,
          borderRadius: '4px',
          overflow: 'hidden',
        })}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            mb: 0.5,
            px: 3,
            py: 2,
          }}
        >
          {loading ? (
            <Box sx={{ flex: 1 }}>
              <CircularProgress sx={{ color: 'text.primary' }} size='16px' />
            </Box>
          ) : (
            <Box
              sx={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <InputBase
                sx={{ flex: 1, color: 'text.dark' }}
                placeholder='0.00'
                disabled={disabled ?? disableInput}
                value={value}
                autoFocus
                onChange={e => {
                  if (!onChange) {
                    return;
                  }
                  if (Number(e.target.value) > Number(maxValue)) {
                    onChange('-1');
                  } else {
                    onChange(e.target.value);
                  }
                }}
                inputProps={{
                  'aria-label': 'amount input',
                  style: {
                    ...theme.typography.numberM,
                    height: '28px',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  },
                }}
                // eslint-disable-next-line -- this is a known issue with the types
                inputComponent={NumberFormatCustom as any}
              />
              {value !== '' && !disableInput && (
                <IconButton
                  sx={{
                    minWidth: 0,
                    p: 0,
                    right: 0,
                    zIndex: 1,
                    color: 'text.dark',
                    '&:hover': {
                      opacity: 0.7,
                    },
                  }}
                  onClick={() => {
                    onChange?.('');
                  }}
                  disabled={disabled}
                >
                  <CancelOutlinedIcon sx={{ fontSize: '16px' }} />
                </IconButton>
              )}
            </Box>
          )}

          {!onSelect || assets.length === 1 ? (
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <TokenIcon
                aToken={asset?.aToken}
                symbol={asset?.iconSymbol ?? asset?.symbol ?? ''}
                fontSize='small'
              />
              <Typography variant='subtitle' data-cy={'inputAsset'} ml={2}>
                {symbol}
              </Typography>
            </Box>
          ) : (
            <FormControl>
              <Select
                disabled={disabled}
                value={asset?.symbol}
                onChange={handleSelect}
                variant='outlined'
                className='AssetInput__select'
                data-cy={'assetSelect'}
                MenuProps={{
                  sx: {
                    maxHeight: '240px',
                    '.MuiPaper-root': {
                      border: theme.palette.mode === 'dark' ? '1px solid #EBEBED1F' : 'unset',
                      boxShadow: '0px 2px 10px 0px #0000001A',
                    },
                  },
                }}
                sx={{
                  p: 0,
                  '&.AssetInput__select .MuiOutlinedInput-input': {
                    p: 0,
                    backgroundColor: 'transparent',
                    pr: '24px !important',
                    boxShadow: 'none',
                  },
                  '&.AssetInput__select .MuiOutlinedInput-notchedOutline': { display: 'none' },
                  '&.AssetInput__select .MuiSelect-icon': {
                    color: 'text.primary',
                    right: '0%',
                  },
                }}
                renderValue={symbol => {
                  const asset =
                    assets.length === 1 ? assets[0] : assets.find(asset => asset.symbol === symbol);
                  return (
                    <Box
                      sx={{ display: 'flex', alignItems: 'center' }}
                      data-cy={`assetsSelectedOption_${asset?.symbol.toUpperCase()}`}
                    >
                      <TokenIcon
                        symbol={asset?.iconSymbol ?? asset?.symbol ?? ''}
                        aToken={asset?.aToken}
                        sx={{ mr: 2, ml: 4 }}
                        fontSize='small'
                      />
                      <Typography variant='main16' color='text.primary'>
                        {symbol}
                      </Typography>
                    </Box>
                  );
                }}
              >
                {selectOptionHeader ?? undefined}
                {assets.map(asset => (
                  <MenuItem
                    key={asset.symbol}
                    value={asset.symbol}
                    data-cy={`assetsSelectOption_${asset.symbol.toUpperCase()}`}
                  >
                    {selectOption ? (
                      selectOption(asset)
                    ) : (
                      <>
                        <TokenIcon
                          aToken={asset.aToken}
                          symbol={asset.iconSymbol ?? asset.symbol}
                          sx={{ fontSize: '22px', mr: 1 }}
                        />
                        <ListItemText sx={{ mr: 6 }}>{asset.symbol}</ListItemText>
                        {asset.balance && <FormattedNumber value={asset.balance} compact />}
                      </>
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', height: '16px', px: 3, py: 2, mb: 3.5 }}>
          {loading ? (
            <Box sx={{ flex: 1 }} />
          ) : (
            <FormattedNumber
              value={isNaN(Number(usdValue)) ? 0 : Number(usdValue)}
              compact
              symbol='USD'
              variant='numberS'
              color='text.muted'
              symbolsColor='text.muted'
              flexGrow={1}
            />
          )}

          {asset?.balance && onChange && (
            <>
              {!disableInput && (
                <Button
                  variant='white'
                  size='small'
                  sx={{ minWidth: 45, ml: '7px', p: 0, height: 20 }}
                  onClick={() => {
                    onChange('-1');
                  }}
                  disabled={disabled ?? isMaxSelected}
                >
                  max
                </Button>
              )}
            </>
          )}
        </Box>

        {exchangeRateComponent && (
          <Box
            sx={{
              background: theme.palette.background.surface,
              borderTop: `1px solid ${theme.palette.divider}`,
              px: 3,
              py: 2,
            }}
          >
            {exchangeRateComponent}
          </Box>
        )}
      </Box>
      {asset?.balance && onChange && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Typography component='div' variant='subtitle' color='text.secondary'>
            {balanceText && balanceText !== '' ? balanceText : <>Balance</>}{' '}
          </Typography>
          <FormattedNumber value={asset.balance || '0'} compact variant='numberS' />
        </Box>
      )}
    </Box>
  );
};
