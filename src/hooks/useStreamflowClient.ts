import { useMemo } from 'react';
import { StreamflowSolana } from "@streamflow/stream";
import { useNetworkState } from './useNetworkState';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export const useStreamflowClient = () => {
  const { network } = useNetworkState();

  const client = useMemo(() => {
    const endpoint = network === WalletAdapterNetwork.Mainnet
      ? "https://mainnet.helius-rpc.com/?api-key=24084da3-e262-4410-9a02-774ee04b1f22"
      : "https://devnet.helius-rpc.com/?api-key=24084da3-e262-4410-9a02-774ee04b1f22";
    
    // Update how SolanaStreamClient is initialized
    return new StreamflowSolana.SolanaStreamClient(endpoint);
  }, [network]);

  return client;
}

