"use client"

import { useState } from 'react'
import { TradingCard } from '@/components/TradingCard'
import { ScrollArea } from "@/components/ui/scroll-area"
import { getTokenName } from '@/utils/tokenNameMapping'

const hardcodedStreams = [
  { name: 'BONK', symbol: 'BONK', listingPrice: 0.00001, remainingTokens: 800000, totalTokens: 1000000, mint: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', currentPrice: 0.000015 },
  { name: 'Tensor', symbol: 'TNSR', listingPrice: 0.5, remainingTokens: 50000, totalTokens: 100000, mint: 'TENSoLbpY8GVDSqNZ5tDWv5ZPqkMgkYMXgoimkHsakX', currentPrice: 0.55 },
  { name: 'Jupiter', symbol: 'JUP', listingPrice: 1.2, remainingTokens: 75000, totalTokens: 100000, mint: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', currentPrice: 1.25 },
]

export default function TradeLayout({ children, searchTerm }: { children: React.ReactNode, searchTerm: string }) {
  const filteredStreams = searchTerm
    ? hardcodedStreams.filter(stream => 
        stream.mint.toLowerCase() === searchTerm.toLowerCase() ||
        getTokenName(stream.mint).toLowerCase() === searchTerm.toLowerCase()
      )
    : hardcodedStreams

  return (
    <div className="flex-1 flex">
      <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredStreams.map((stream, index) => (
          <TradingCard key={index} {...stream} />
        ))}
      </div>
      <aside className="w-80 border-l p-4">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ScrollArea className="h-[calc(100vh-20vh)]">
          <div className="space-y-4">
            <p>BONK stream created</p>
            <p>TNSR tokens withdrawn</p>
            <p>JUP stream modified</p>
          </div>
        </ScrollArea>
      </aside>
    </div>
  )
}