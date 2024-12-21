'use client';

import { ReactNode } from 'react';
import { TopInfoPanel } from '../../components/TopInfoPanel';
import { Box, Container } from '@mui/material';
import { TopInfoPanelItem } from '../../components/TopInfoPanelItem';
import { usePathname } from 'next/navigation';
import { Link } from '../../components/Link';
import { FormattedNumber } from '../../components/FormattedNumber';
import { StyledToggleTabGroup } from '../../components/StyledToggleButtonGroup';
import { StyledToggleTabButton } from '../../components/StyledToggleTabButton';
import { MarketDataType } from '@lendos/types/market';
import { Routes } from '@lendos/constants/routes';
import { isFeatureEnabled } from '@lendos/constants/markets';
import { useStateContext } from '../../providers/StateProvider';

const marketDexTabs: {
  label: string;
  href?: string;
  isVisible?: (data: MarketDataType) => boolean | undefined;
}[] = [
  {
    label: 'Markets',
    href: Routes.markets,
  },
  {
    label: 'DEX LP',
    href: Routes.dexLp,
    isVisible: data => isFeatureEnabled.dexLp(data),
  },
];

export const EarnLayout = ({
  children,
  showTab = true,
  loading,
  data,
}: {
  children: ReactNode;
  showTab?: boolean;
  loading: boolean;
  data: {
    totalLiquidity: bigint;
    totalDebt: bigint;
  };
}) => {
  const pathname = usePathname();
  const { currentMarketData } = useStateContext();

  return (
    <>
      <TopInfoPanel containerProps={earnContainerProps} pageTitle='Markets' withMarketSwitcher>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: { xs: 3, xsm: 8 },
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            <TopInfoPanelItem hideIcon title='Total market size' loading={loading}>
              <FormattedNumber
                value={data.totalLiquidity.toString()}
                symbol='USD'
                variant='numberM'
                visibleDecimals={2}
                compact
              />
            </TopInfoPanelItem>
            <TopInfoPanelItem hideIcon title='Total available' loading={loading}>
              <FormattedNumber
                value={(data.totalLiquidity - data.totalDebt).toString()}
                symbol='USD'
                variant='numberM'
                visibleDecimals={2}
                compact
              />
            </TopInfoPanelItem>
            <TopInfoPanelItem hideIcon title='Total borrows' loading={loading}>
              <FormattedNumber
                value={data.totalDebt.toString()}
                symbol='USD'
                variant='numberM'
                visibleDecimals={2}
                compact
              />
            </TopInfoPanelItem>
          </Box>
          {showTab && (
            <StyledToggleTabGroup sx={{ mt: 5 }}>
              {marketDexTabs
                .filter(item => !item.isVisible || item.isVisible(currentMarketData))
                .map(i => (
                  <StyledToggleTabButton
                    key={i.href}
                    value={i.label}
                    selected={pathname === i.href}
                    component={Link}
                    href={i.href}
                    sx={{ flexGrow: 1, width: '117px' }}
                  >
                    {i.label}
                  </StyledToggleTabButton>
                ))}
            </StyledToggleTabGroup>
          )}
        </Box>
      </TopInfoPanel>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          mt: { xs: -18, md: -20, lg: '-94px', xl: '-92px', xxl: '-96px' },
        }}
      >
        <Container sx={{ ...earnContainerProps.sx, mt: { xs: showTab ? 10 : 0 } }}>
          {children}
        </Container>
      </Box>
    </>
  );
};

export const earnContainerProps = {
  sx: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    pb: '39px',
    px: {
      xs: 2,
      xsm: 5,
      sm: 12,
      md: 5,
      lg: 0,
      xl: '96px',
      xxl: 0,
    },
    maxWidth: {
      xs: 'unset',
      lg: '1240px',
      xl: 'unset',
      xxl: '1440px',
    },
  },
};
