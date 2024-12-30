import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { Box, FormControlLabel, Skeleton, SvgIcon, Switch, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { FormattedNumber, FormattedNumberProps } from '../FormattedNumber';
import { Row } from '../Row';
import { TokenIcon } from '../TokenIcon';
import { CollateralType } from '@lendos/types/collateral';
import {
  IsolatedDisabledBadge,
  IsolatedEnabledBadge,
  UnavailableDueToIsolationBadge,
} from '../IsolatedBadge';
import { ReserveIncentiveResponse } from '@lendos/types/reserves';
import { IncentivesButton } from '../IncentivesButton';
import { HealthFactorNumber } from '../HealthFactorNumber';
import { TextWithTooltip } from '../TextWithTooltip';

export interface TxModalDetailsProps {
  gasLimit?: string;
  slippageSelector?: ReactNode;
  skipLoad?: boolean;
  disabled?: boolean;
  chainId?: number;
  children: ReactNode;
}

const ArrowRightIcon = (
  <SvgIcon sx={{ fontSize: '14px', mx: 1 }}>
    <ArrowRightAltOutlinedIcon />
  </SvgIcon>
);

export const TxModalDetails: React.FC<TxModalDetailsProps> = ({ children }) => {
  return (
    <Box sx={{ pt: 10 }}>
      <Typography variant='h3' sx={{ mb: 2 }}>
        Transaction overview
      </Typography>

      <Box
        sx={theme => ({
          p: 3,
          border: `1px solid ${theme.palette.background.surface}`,
          backgroundColor: theme.palette.background.surface2,
          boxShadow: theme.palette.shadow.card,
          borderRadius: '4px',
          '.MuiBox-root:last-of-type': {
            mb: 0,
          },
        })}
      >
        {children}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* // TODO add GasStations */}
        {/* <GasStations
          chainId={chainId}
          gasLimit={parseUnits(gasLimit ? gasLimit : '0', 'wei')}
          skipLoad={skipLoad}
          disabled={disabled}
          rightComponent={slippageSelector}
        /> */}
      </Box>
    </Box>
  );
};

interface DetailsNumberLineProps extends FormattedNumberProps {
  description: ReactNode;
  value: FormattedNumberProps['value'];
  futureValue?: FormattedNumberProps['value'];
  numberPrefix?: ReactNode;
  iconSymbol?: string;
  loading?: boolean;
}

export const DetailsNumberLine = ({
  description,
  value,
  futureValue,
  numberPrefix,
  iconSymbol,
  loading = false,
  ...rest
}: DetailsNumberLineProps) => {
  return (
    <Row caption={description} captionVariant='subtitle' mb={4}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {loading ? (
          <Skeleton variant='rectangular' height={20} width={100} sx={{ borderRadius: '4px' }} />
        ) : (
          <>
            {iconSymbol && <TokenIcon symbol={iconSymbol} sx={{ mr: 1, fontSize: '16px' }} />}
            {numberPrefix && <Typography sx={{ mr: 1 }}>{numberPrefix}</Typography>}
            <FormattedNumber value={value} variant='numberS' {...rest} />
            {futureValue && (
              <>
                {ArrowRightIcon}
                <FormattedNumber value={futureValue} variant='secondary14' {...rest} />
              </>
            )}
          </>
        )}
      </Box>
    </Row>
  );
};

interface DetailsNumberLineWithSubProps {
  description: ReactNode;
  symbol: ReactNode;
  value?: string;
  valueUSD?: string;
  futureValue: string;
  futureValueUSD: string;
  hideSymbolSuffix?: boolean;
  color?: string;
  tokenIcon?: string;
  loading?: boolean;
}

export const DetailsNumberLineWithSub = ({
  description,
  symbol,
  value,
  valueUSD,
  futureValue,
  futureValueUSD,
  hideSymbolSuffix,
  color,
  tokenIcon,
  loading = false,
}: DetailsNumberLineWithSubProps) => {
  return (
    <Row caption={description} captionVariant='subtitle' mb={4} align='flex-start'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        {loading ? (
          <>
            <Skeleton variant='rectangular' height={20} width={100} sx={{ borderRadius: '4px' }} />
            <Skeleton
              variant='rectangular'
              height={15}
              width={80}
              sx={{ borderRadius: '4px', marginTop: '4px' }}
            />
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {value && (
                <>
                  <FormattedNumber value={value} variant='numberS' color={color} />
                  {!hideSymbolSuffix && (
                    <Typography ml={1} variant='numberS'>
                      {symbol}
                    </Typography>
                  )}
                  {ArrowRightIcon}
                </>
              )}
              {tokenIcon && <TokenIcon symbol={tokenIcon} sx={{ mr: 1, fontSize: '14px' }} />}
              <FormattedNumber value={futureValue} variant='numberS' color={color} />
              {!hideSymbolSuffix && (
                <Typography ml={1} variant='numberS'>
                  {symbol}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {valueUSD && (
                <>
                  <FormattedNumber value={valueUSD} variant='subtitle' compact symbol='USD' />
                  {ArrowRightIcon}
                </>
              )}
              <FormattedNumber value={futureValueUSD} variant='subtitle' compact symbol='USD' />
            </Box>
          </>
        )}
      </Box>
    </Row>
  );
};

export interface DetailsCollateralLine {
  collateralType: CollateralType;
}

export const DetailsCollateralLine = ({ collateralType }: DetailsCollateralLine) => {
  return (
    <Row caption={<>Collateralization</>} captionVariant='subtitle' mb={4}>
      <CollateralState collateralType={collateralType} />
    </Row>
  );
};

interface CollateralStateProps {
  collateralType: CollateralType;
}

export const CollateralState = ({ collateralType }: CollateralStateProps) => {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
      {
        {
          [CollateralType.ENABLED]: (
            <Typography variant='numberS' color='success.main'>
              Enabled
            </Typography>
          ),
          [CollateralType.ISOLATED_ENABLED]: (
            <IsolatedEnabledBadge
              typographyProps={{ variant: 'description', color: 'warning.main' }}
            />
          ),
          [CollateralType.DISABLED]: (
            <Typography variant='numberS' color='error.main'>
              Disabled
            </Typography>
          ),
          [CollateralType.UNAVAILABLE]: (
            <Typography variant='numberS' color='error.main'>
              Unavailable
            </Typography>
          ),
          [CollateralType.ISOLATED_DISABLED]: <IsolatedDisabledBadge />,
          [CollateralType.UNAVAILABLE_DUE_TO_ISOLATION]: <UnavailableDueToIsolationBadge />,
        }[collateralType]
      }
    </Box>
  );
};

interface DetailsIncentivesLineProps {
  futureIncentives?: ReserveIncentiveResponse[];
  futureSymbol?: string;
  incentives?: ReserveIncentiveResponse[];
  // the token yielding the incentive, not the incentive itself
  symbol: string;
  loading?: boolean;
}

export const DetailsIncentivesLine = ({
  incentives,
  symbol,
  futureIncentives,
  futureSymbol,
  loading = false,
}: DetailsIncentivesLineProps) => {
  if (!incentives || incentives.filter(i => i.incentiveAPR !== '0').length === 0) {
    return null;
  }
  return (
    <Row caption={<>Rewards APR</>} captionVariant='subtitle' mb={4} minHeight={24}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {loading ? (
          <Skeleton variant='rectangular' height={20} width={100} sx={{ borderRadius: '4px' }} />
        ) : (
          <>
            <IncentivesButton incentives={incentives} symbol={symbol} />
            {futureSymbol && (
              <>
                {ArrowRightIcon}
                <IncentivesButton incentives={futureIncentives} symbol={futureSymbol} />
                {futureIncentives && futureIncentives.length === 0 && (
                  <Typography variant='numberS'>None</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Row>
  );
};

export interface DetailsHFLineProps {
  healthFactor: string;
  futureHealthFactor: string;
  visibleHfChange: boolean;
  loading?: boolean;
}

export const DetailsHFLine = ({
  healthFactor,
  futureHealthFactor,
  visibleHfChange,
  loading = false,
}: DetailsHFLineProps) => {
  if (healthFactor === '-1' && futureHealthFactor === '-1') {
    return null;
  }
  return (
    <Row caption={<>Health factor</>} captionVariant='subtitle' mb={4} align='flex-start'>
      <Box sx={{ textAlign: 'right' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {loading ? (
            <Skeleton variant='rectangular' height={20} width={80} sx={{ borderRadius: '4px' }} />
          ) : (
            <>
              <HealthFactorNumber value={healthFactor} variant='numberS' />

              {visibleHfChange && (
                <>
                  {ArrowRightIcon}

                  <HealthFactorNumber
                    value={isNaN(Number(futureHealthFactor)) ? healthFactor : futureHealthFactor}
                    variant='numberS'
                  />
                </>
              )}
            </>
          )}
        </Box>

        <Typography variant='subtitle'>
          Liquidation at
          {' <1.0'}
        </Typography>
      </Box>
    </Row>
  );
};

export interface DetailsUnwrapSwitchProps {
  unwrapped: boolean;
  disabled: boolean;
  setUnWrapped: (value: boolean) => void;
  label: ReactNode;
}

export const DetailsUnwrapSwitch = ({
  unwrapped,
  setUnWrapped,
  label,
  disabled,
}: DetailsUnwrapSwitchProps) => {
  return (
    <Row captionVariant='description' sx={{ mt: 5 }}>
      {disabled ? (
        <TextWithTooltip
          cont={
            <FormControlLabel
              sx={{ mx: 0 }}
              control={
                <Switch
                  disableRipple
                  disabled
                  checked={unwrapped}
                  onClick={() => setUnWrapped(!unwrapped)}
                  data-cy={'wrappedSwitcher'}
                />
              }
              labelPlacement='end'
              label={label}
            />
          }
        >
          Currently unavailable
        </TextWithTooltip>
      ) : (
        <FormControlLabel
          sx={{ mx: 0 }}
          control={
            <Switch
              disableRipple
              checked={unwrapped}
              onClick={() => setUnWrapped(!unwrapped)}
              data-cy={'wrappedSwitcher'}
            />
          }
          labelPlacement='end'
          label={label}
        />
      )}
    </Row>
  );
};
