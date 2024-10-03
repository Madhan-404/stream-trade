"use client"

import React, { createContext, useMemo } from 'react'
import { StreamflowSolana } from "@streamflow/stream"
import { useNetworkState } from '@/hooks/useNetworkState'

export const StreamflowContext = createContext<StreamflowSolana.SolanaStreamClient | null>(null)

export function StreamflowProvider({ children }: { children: React.ReactNode }) {
  const { network } = useNetworkState()
  
  const client = useMemo(() => {
    const endpoint = network === 'mainnet-beta' 
      ? "https://api.mainnet-beta.solana.com" 
      : "https://api.devnet.solana.com"
    return new StreamflowSolana.SolanaStreamClient(endpoint)
  }, [network])

  return (
    <StreamflowContext.Provider value={client}>
      {children}
    </StreamflowContext.Provider>
  )
}
