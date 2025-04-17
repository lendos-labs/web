import axios, { AxiosInstance } from 'axios';

import { AuthState } from '@lendos/types/auth';

export const API_URL = `${process.env['NEXT_PUBLIC_API_BASEURL']}api/v1`;

export enum API {
  AUTH = '/referral/auth',
  LOGOUT = '/referral/auth/logout',
  VOTING = '/referral/voting',
  USER_INFO = '/referral/users',
  USER_CODES = '/referral/codes',
  USER_SQUAD = '/referral/users/squad',
  USER_LEADERBOARD = '/referral/users/leaderboard',
  // USER_BORROW_LEADERBOARD = '/referral/users/borrow_leaderboard',
  // USER_BORROW_STATS = '/referral/users/borrow_stats',
  // MARKET_SIZE = '/referral/contract/market_size',
  // REWARDS = '/referral/rewards',
  // REWARDS_CLAIM = '/referral/rewards/claim',
}

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 0,
  headers: {
    ContentType: 'application/json',
  },
});

export const apiAuth: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 0,
  headers: {
    ContentType: 'application/json',
  },
});

apiAuth.interceptors.request.use(request => {
  try {
    const raw = localStorage.getItem('lendos-auth');
    if (!raw) {
      return request;
    }

    const parsed = JSON.parse(raw) as { state: AuthState };
    const accessToken = parsed.state.tokens.access_token;

    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  } catch (error) {
    console.error('Failed to attach auth token:', error);
    return request;
  }
});
