import axios, { AxiosInstance } from 'axios';

export const API_URL = `${process.env['NEXT_PUBLIC_API_BASEURL']}api/v1`;

export enum API {
  AUTH = '/referral/auth',
  LOGOUT = '/referral/auth/logout',
  VOTING = '/referral/voting',
  // USER_INFO = '/referral/users',
  // USER_CODES = '/referral/codes',
  // USER_SQUAD = '/referral/users/squad',
  // USER_LEADERBOARD = '/referral/users/leaderboard',
  // USER_BORROW_LEADERBOARD = '/referral/users/borrow_leaderboard',
  // USER_BORROW_STATS = '/referral/users/borrow_stats',
  // MARKET_SIZE = '/referral/contract/market_size',
  // REWARDS = '/referral/rewards',
  // REWARDS_CLAIM = '/referral/rewards/claim',
}

export const apiAuth: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 0,
  headers: {
    ContentType: 'application/json',
  },
});

apiAuth.interceptors.request.use(request => {
  // TODO: Fix this
  // const data: { state: AuthState } = JSON.parse(localStorage.getItem('lendos-auth') ?? '{}');
  // const accessToken = data.state?.tokens?.access_token || '';
  // request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});
