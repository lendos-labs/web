export enum TxAction {
  APPROVAL,
  MAIN_ACTION,
  GAS_ESTIMATION,
}

export interface TxErrorType {
  blocking: boolean;
  actionBlocked: boolean;
  rawError: Error;
  error: string | undefined;
  txAction: TxAction;
}
