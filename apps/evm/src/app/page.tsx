import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { CookieKey } from '@lendos/constants/cookie';

import { marketsData } from '../config/supported-markets';

const Home = async () => {
  const cookieStore = await cookies();

  const selectedMarket =
    cookieStore.get(CookieKey.SELECTED_MARKET)?.value ?? Object.values(marketsData)[0]?.market;

  redirect(`/${selectedMarket}`);
};

export default Home;
