'use client';

import React from 'react';

import { useAccount, useConnectUI } from '@fuels/react';

export const Connect = () => {
  const { connect } = useConnectUI();
  const { account } = useAccount();

  return <button onMouseDown={() => connect()}>{account ?? 'Connect Wallet'}</button>;
};
