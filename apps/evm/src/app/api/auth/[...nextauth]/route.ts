import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import TwitterProvider from 'next-auth/providers/twitter';
import { cookies } from 'next/headers';

import { API, API_URL } from '@lendos/constants/utils/api';

export const nextAuthOptions = (): NextAuthOptions => {
  const upd = async ({
    twitter_id,
    discord_name,
  }: {
    twitter_id?: string | undefined;
    discord_name?: string | undefined;
  }) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('t')?.value;
    return await fetch(API_URL + API.USER_INFO, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...(discord_name && { discord_name }),
        ...(twitter_id && { twitter_id }),
      }),
    });
  };

  return {
    providers: [
      TwitterProvider({
        clientId: 'WUc3Nk9helRSSzRCa2dYSlBwenE6MTpjaQ',
        clientSecret: 'YgPVOA-q000CzWRS7hetEAA5oynvU53ELD6Dxf5ZdylVD_2h0E',
        version: '2.0',
      }),

      DiscordProvider({
        clientId: '1222191402180673618',
        clientSecret: 'ODGUUmKGq1zHpWBdhfCuxA_LnpEo2MSA',
      }),
    ],
    theme: {
      colorScheme: 'light',
      logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
    },

    callbacks: {
      async jwt({ account, profile }) {
        if (account?.provider === 'discord') {
          await upd({
            discord_name: (profile as { username?: string }).username ?? '',
          });
        } else if (account?.provider === 'twitter') {
          await upd({
            twitter_id: (profile as { data?: { id: string } }).data?.id ?? '',
          });
        }

        return {};
      },
    },
  };
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- fix it
const handler = NextAuth(nextAuthOptions());

export { handler as GET, handler as POST };
