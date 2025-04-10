import { FormattedReservesAndIncentives, Reserves } from '@lendos/types/reserves';
import { ExtendedFormattedUser } from '@lendos/types/user';

import { API_ETH_MOCK_ADDRESS } from '@lendos/constants/addresses';

import { useAccountContext } from '../../providers/AccountProvider';
import { AssetCapsProvider } from '../../providers/AssetCapsProvider';
import { useBalanceContext } from '../../providers/BalanceProvider';
import { useModalContext } from '../../providers/ModalProvider';
import { useReservesContext } from '../../providers/ReservesProvider';
import { useStateContext } from '../../providers/StateProvider';
import { ChangeNetworkWarning } from '../ChangeNetworkWarning';
import { TxErrorView } from '../TxErrorView';
import { TxModalTitle } from '../TxModalTitle';

export interface ModalWrapperProps {
  underlyingAsset: string;
  poolReserve: FormattedReservesAndIncentives;
  userReserve: ExtendedFormattedUser['userReservesData'][0];
  symbol: string;
  tokenBalance: string;
  nativeBalance: string;
  isWrongNetwork: boolean;
  action?: string;
}

export const ModalWrapper = ({
  hideTitleSymbol,
  underlyingAsset,
  children,
  title,
}: {
  underlyingAsset: string;
  title: string;
  hideTitleSymbol?: boolean;
  children: (props: ModalWrapperProps) => React.ReactNode;
  action?: string;
}) => {
  const { currentMarketData } = useStateContext();
  const { walletBalances } = useBalanceContext();
  const { chainId } = useAccountContext();

  const { accountSummary, reserves, lpReserves } = useReservesContext();
  const { txError, mainTxState, args } = useModalContext();
  const keepWrappedSymbol = !args.unWrapped;

  const isWrongNetwork = Number(currentMarketData.chain.id) !== chainId;

  if (txError?.blocking) {
    return <TxErrorView txError={txError} />;
  }

  const poolReserve = [...reserves, ...lpReserves].find(reserve => {
    if (underlyingAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
      return reserve.isWrappedBaseAsset;
    }
    return underlyingAsset === reserve.underlyingAsset;
  });

  const userReserve = accountSummary?.userReservesData.find(userReserve => {
    if (underlyingAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
      return userReserve.reserve.isWrappedBaseAsset;
    }
    return underlyingAsset === userReserve.underlyingAsset;
  });

  if (!poolReserve || !userReserve) {
    return null;
  }

  let symbol = undefined;
  if (poolReserve.type === Reserves.ASSET) {
    symbol =
      poolReserve.isWrappedBaseAsset && !keepWrappedSymbol
        ? currentMarketData.chain.nativeCurrency.symbol
        : poolReserve.symbol;
  } else {
    symbol = `${poolReserve.token0.symbol}/${poolReserve.token1.symbol}`;
  }

  return (
    <AssetCapsProvider asset={poolReserve}>
      {!mainTxState.success && (
        <TxModalTitle title={title} symbol={hideTitleSymbol ? undefined : symbol} />
      )}
      {isWrongNetwork && <ChangeNetworkWarning networkName={currentMarketData.chain.name} />}
      {children({
        isWrongNetwork,
        nativeBalance: walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amount ?? '0',
        tokenBalance: walletBalances[poolReserve.underlyingAsset.toLowerCase()]?.amount ?? '0',
        poolReserve,
        symbol,
        underlyingAsset,
        userReserve,
      })}
    </AssetCapsProvider>
  );
};
