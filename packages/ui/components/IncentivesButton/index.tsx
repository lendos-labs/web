import { valueToBigNumber } from '@aave/math-utils';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Box, SvgIcon, Typography } from '@mui/material';
import { useState } from 'react';
import { ContentWithTooltip } from '../ContentWithTooltip';
import { ReserveIncentiveResponse } from '@lendos/types/reserves';
import { FormattedNumber } from '../FormattedNumber';
import { IncentivesTooltipContent } from './IncentivesTooltipContent';
import { TokenIcon } from '../TokenIcon';

interface IncentivesButtonProps {
  symbol: string;
  incentives?: ReserveIncentiveResponse[];
  displayBlank?: boolean;
}

const BlankIncentives = () => {
  return (
    <Box
      sx={{
        p: { xs: '0 4px', xsm: '3.625px 4px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant='main12' color='text.secondary'>
        &nbsp;
      </Typography>
    </Box>
  );
};

export const IncentivesButton = ({ incentives, symbol, displayBlank }: IncentivesButtonProps) => {
  const [open, setOpen] = useState(false);

  if (!(incentives && incentives.length > 0)) {
    if (displayBlank) {
      return <BlankIncentives />;
    } else {
      return null;
    }
  }

  const isIncentivesInfinity = incentives.some(incentive => incentive.incentiveAPR === 'Infinity');
  const incentivesAPRSum = isIncentivesInfinity
    ? 'Infinity'
    : incentives.reduce((aIncentive, bIncentive) => aIncentive + +bIncentive.incentiveAPR, 0);

  const incentivesNetAPR = isIncentivesInfinity
    ? 'Infinity'
    : incentivesAPRSum !== 'Infinity'
      ? valueToBigNumber(incentivesAPRSum || 0).toNumber()
      : 'Infinity';

  if (incentivesNetAPR === 0) {
    if (displayBlank) {
      return <BlankIncentives />;
    } else {
      return null;
    }
  }

  const incentivesButtonValue = () => {
    if (incentivesNetAPR !== 'Infinity' && incentivesNetAPR < 10000) {
      return (
        <FormattedNumber
          value={incentivesNetAPR}
          percent
          variant='secondary12'
          color='text.secondary'
        />
      );
    } else if (incentivesNetAPR !== 'Infinity' && incentivesNetAPR > 9999) {
      return (
        <FormattedNumber
          value={incentivesNetAPR}
          percent
          compact
          variant='secondary12'
          color='text.secondary'
        />
      );
    } else if (incentivesNetAPR === 'Infinity') {
      return (
        <Typography variant='main12' color='text.secondary'>
          ∞
        </Typography>
      );
    }
  };

  const iconSize = 12;

  return (
    <ContentWithTooltip
      tooltipContent={
        <IncentivesTooltipContent
          incentives={incentives}
          incentivesNetAPR={incentivesNetAPR}
          symbol={symbol}
        />
      }
      withoutHover
      setOpen={setOpen}
      open={open}
    >
      <Box
        sx={theme => ({
          p: { xs: '0 4px', xsm: '2px 4px' },
          border: `1px solid ${open ? theme.palette.action.disabled : theme.palette.divider}`,
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.2s ease',
          bgcolor: open ? 'action.hover' : 'transparent',
          '&:hover': {
            bgcolor: 'action.hover',
            borderColor: 'action.disabled',
          },
        })}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Box sx={{ mr: 2 }}>{incentivesButtonValue()}</Box>

        <Box sx={{ display: 'inline-flex' }}>
          <>
            {incentives.length < 5 ? (
              <>
                {incentives.map(incentive => (
                  <TokenIcon
                    size={iconSize}
                    symbol={incentive.rewardTokenSymbol}
                    sx={{ ml: -1 }}
                    key={incentive.rewardTokenSymbol}
                  />
                ))}
              </>
            ) : (
              <>
                {incentives.slice(0, 3).map(incentive => (
                  <TokenIcon
                    size={iconSize}
                    symbol={incentive.rewardTokenSymbol}
                    sx={{ ml: -1 }}
                    key={incentive.rewardTokenSymbol}
                  />
                ))}
                <SvgIcon
                  sx={{
                    fontSize: `${iconSize}px`,
                    borderRadius: '50%',
                    bgcolor: 'common.white',
                    color: 'common.black',
                    ml: -1,
                    zIndex: 5,
                  }}
                >
                  <MoreHorizOutlinedIcon />
                </SvgIcon>
              </>
            )}
          </>
        </Box>
      </Box>
    </ContentWithTooltip>
  );
};