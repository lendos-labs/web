import { setCookie } from 'cookies-next';

export const toggleCookieStorageClick = async (
  value: boolean,
  func: (val: boolean) => void,
  cookieStorageName: string,
) => {
  await setCookie(cookieStorageName, String(!value));
  func(!value);
};
