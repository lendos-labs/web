import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { ESupportedTimeRanges, FormattedReserveHistoryItem, ReserveRateTimeRange } from '../types';
import { useStateContext } from '../../../providers/StateProvider';

interface APIResponse {
  liquidityRate_avg: number;
  variableBorrowRate_avg: number;
  stableBorrowRate_avg: number;
  utilizationRate_avg: number;
  x: { year: number; month: number; date: number; hours: number };
}

const fetchStats = async (
  address: string,
  timeRange: ReserveRateTimeRange,
  endpointURL: string,
) => {
  const { from, resolutionInHours } = resolutionForTimeRange(timeRange);
  try {
    const url = `${endpointURL}?reserveId=${address}&from=${from}&resolutionInHours=${resolutionInHours}`;
    const result = await fetch(url);
    const json = (await result.json()) as APIResponse[];
    return json;
  } catch {
    return [];
  }
};

const resolutionForTimeRange = (
  timeRange: ReserveRateTimeRange,
): {
  from: number;
  resolutionInHours: number;
} => {
  // Return today as a fallback
  let calculatedDate = dayjs().unix();
  switch (timeRange) {
    case ESupportedTimeRanges.OneMonth:
      calculatedDate = dayjs().subtract(30, 'day').unix();
      return {
        from: calculatedDate,
        resolutionInHours: 6,
      };
    case ESupportedTimeRanges.SixMonths:
      calculatedDate = dayjs().subtract(6, 'month').unix();
      return {
        from: calculatedDate,
        resolutionInHours: 24,
      };
    case ESupportedTimeRanges.OneYear:
      calculatedDate = dayjs().subtract(1, 'year').unix();
      return {
        from: calculatedDate,
        resolutionInHours: 24,
      };
    default:
      return {
        from: calculatedDate,
        resolutionInHours: 6,
      };
  }
};

const makeCancelable = <T>(promise: Promise<T>) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- TODO fix it
      val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      (error: unknown) =>
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- TODO fix it
        hasCanceled_ ? reject({ isCanceled: true }) : reject(new Error(error as string)),
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      hasCanceled_ = true;
    },
  };
};
export function useReserveRatesHistory(reserveAddress: string, timeRange: ReserveRateTimeRange) {
  const { currentNetworkData } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<FormattedReserveHistoryItem[]>([]);

  const ratesHistoryApiUrl = currentNetworkData.ratesHistoryApiUrl;

  const refetchData = useCallback<() => () => void>(() => {
    // reset
    setLoading(true);
    setError(false);
    setData([]);

    if (reserveAddress && ratesHistoryApiUrl) {
      const cancelable = makeCancelable(fetchStats(reserveAddress, timeRange, ratesHistoryApiUrl));

      cancelable.promise
        .then(data => {
          setData(
            data.map(d => ({
              date: new Date(d.x.year, d.x.month, d.x.date, d.x.hours).getTime(),
              liquidityRate: d.liquidityRate_avg,
              variableBorrowRate: d.variableBorrowRate_avg,
              utilizationRate: d.utilizationRate_avg,
              stableBorrowRate: d.stableBorrowRate_avg,
            })),
          );
          setLoading(false);
          setError(false);
        })
        .catch((e: unknown) => {
          console.error('useReservesHistory(): Failed to fetch historical reserve data.', e);
          setError(true);
          setLoading(false);
        });

      return cancelable.cancel;
    }

    setLoading(false);
    return () => null;
  }, [reserveAddress, timeRange, ratesHistoryApiUrl]);

  useEffect(() => {
    const cancel = refetchData();
    return () => cancel();
  }, [refetchData]);

  return {
    loading,
    data,
    error: error || (!loading && data.length === 0),
    refetch: refetchData,
  };
}
