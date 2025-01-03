'use client';
import { useAccount, useConnectUI } from '@fuels/react';
import React from 'react';

export const Connect = () => {
  const { connect } = useConnectUI();
  const { account } = useAccount();

  return <button onMouseDown={() => connect()}>{account ?? 'Connect Wallet'}</button>;
};
