import { ExplorerLinkBuilder } from '@lendos/types/chain';

export const linkBuilder =
  ({
    baseUrl,
    addressPrefix = 'address',
    txPrefix = 'tx',
  }: {
    baseUrl: string;
    addressPrefix?: string;
    txPrefix?: string;
  }) =>
  ({ tx, address }: ExplorerLinkBuilder): string => {
    if (tx) {
      return `${baseUrl}/${txPrefix}/${tx}`;
    }
    if (address) {
      return `${baseUrl}/${addressPrefix}/${address}`;
    }
    return baseUrl;
  };
