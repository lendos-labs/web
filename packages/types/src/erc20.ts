export interface ApproveData<T = string> {
  amount: number;
  spender: T;
  user: T;
  token: T;
}
