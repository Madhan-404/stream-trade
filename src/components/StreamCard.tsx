"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ParsedStream } from '@/utils/streamflowUtils'
import { HandCoinsIcon, MoreHorizontal,Droplets } from "lucide-react"
import { StreamDetailsModal } from './StreamDetailsModal'
import { StreamOptionsModal } from './StreamOptionsModal'
import { getTokenName } from '@/utils/getTokenName' // Import the utility function

interface StreamCardProps {
  stream: ParsedStream
  onViewDetails: () => void
}

export function StreamCard({ stream, onViewDetails }: StreamCardProps) {
  const [showOptions, setShowOptions] = useState(false)
  const [tokenName, setTokenName] = useState<string | null>(null)
  const isActive = new Date(stream.end) > new Date()

  useEffect(() => {
    const fetchTokenName = async () => {
      const name = await getTokenName(stream.mint); // Use the mint address from the stream
      setTokenName(name);
    };

    fetchTokenName();
  }, [stream.mint]);

  return (
    <Card className={`w-full ${isActive ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold text-blue-400">
          {stream.name || `Stream ${stream.id.slice(0, 8)}...`}
        </CardTitle>
        {stream.streamType === 'vesting' && (
          <div className="relative group">
            <Droplets className="h-5 w-5 text-blue-500" />
            <span className="absolute top-0 right-0 mt-1 mr-1 text-xs bg-gray-200 rounded p-1 hidden group-hover:block">Vesting</span>
          </div>
        )}
        {stream.streamType === 'payment' && (
          <div className="relative group">
            <HandCoinsIcon className="h-5 w-5 text-blue-500" />
            <span className="absolute top-0 right-0 mt-1 mr-1 text-xs bg-gray-200 rounded p-1 hidden group-hover:block">Payments</span>
          </div>
        )}
        {tokenName && (
          <p className="text-sm text-gray-600">{tokenName}</p>
        )}
        {isActive && (
          <Button variant="ghost" size="icon" onClick={() => setShowOptions(true)}>
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <p>Deposited: {stream.depositedAmount} {tokenName || 'Unknown'}</p>
        <p>Withdrawn: {stream.withdrawnAmount} {tokenName || 'Unknown'}</p>
        <p>Remaining: {stream.remainingAmount} {tokenName || 'Unknown'}</p>
        <Button onClick={onViewDetails} className="mt-4">View Stream</Button>
      </CardContent>

      <StreamOptionsModal
        stream={stream}
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
      />
    </Card>
  )
}
