import { deleteCookie, getCookie } from 'cookies-next';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { API, API_URL, api } from '@lendos/constants/utils/api';
import { fingerprint } from '@lendos/constants/utils/fingerprint';

export interface User {
  discord_name: null | string;
  id: number;
  name: null | string;
  picture: null | string;
  twitter_id: null | string;
  wallet: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface AuthState {
  user: User;
  tokens: AuthTokens;
}

interface Actions {
  login: (wallet: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create(
  immer(
    persist<AuthState & Actions>(
      set => ({
        user: {} as User,
        tokens: {} as AuthTokens,

        login: async wallet => {
          let referral_code = '';
          try {
            const raw = await getCookie('referral_code');
            referral_code = raw ? (JSON.parse(raw)?.value as string) : '';
          } catch (e) {
            console.warn('Failed to parse referral_code cookie:', e);
          }

          const { data } = await api
            .post<{ user: User; tokens: AuthTokens }>(API_URL + API.AUTH, {
              wallet,
              ...(referral_code && { referral_code }),
              fingerprint: fingerprint(),
            })
            .then(async res => {
              await deleteCookie('referral_code');
              return res;
            });

          set({ user: data.user, tokens: data.tokens });
        },
        logout: () => {
          set({
            user: {} as User,
            tokens: {} as AuthTokens,
          });
        },
      }),
      {
        name: 'lendos-auth',
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
      },
    ),
  ),
);
