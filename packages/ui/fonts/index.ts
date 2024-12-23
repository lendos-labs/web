import { Aldrich, Montserrat } from 'next/font/google';

export const aldrich = Aldrich({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-aldrich',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-monserrat',
});
