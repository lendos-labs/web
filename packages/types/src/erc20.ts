import { Address } from 'viem';

export interface ApproveData {
  amount: number;
  spender: Address;
  user: Address;
  token: Address;
}
