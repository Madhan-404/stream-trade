"use client"

import React, { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useStreamflow } from '@/providers/StreamflowProvider'
import { useNetworkState } from '@/hooks/useNetworkState'
import { StreamflowSolana,IGetAllData,StreamType,StreamDirection } from "@streamflow/stream"
import { StreamCard } from '@/components/StreamCard'
import { StreamDetailsModal } from '@/components/StreamDetailsModal'
import { parseStreamData } from '@/utils/streamflowUtils'

export default function PortfolioPage() {
  const { connected, publicKey } = useWallet()
  const { network } = useNetworkState()
  const streamflowClient = useStreamflow()
  const [streams, setStreams] = useState<ReturnType<typeof parseStreamData>[]>([])
  const [selectedStream, setSelectedStream] = useState<ReturnType<typeof parseStreamData> | null>(null)

  useEffect(() => {
    const fetchStreams = async () => {
      if (connected && publicKey) {
        try {
          const fetchedStreams = await streamflowClient.get({
            address: publicKey.toBase58(),
            type: StreamflowSolana.Types.StreamType.All,
            direction: StreamflowSolana.Types.StreamDirection.All,
          })
          setStreams(fetchedStreams.map(parseStreamData))
        } catch (error) {
          console.error("Error fetching streams:", error)
        }
      }
    }

    fetchStreams()
  }, [connected, publicKey, streamflowClient])

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-4">Portfolio</h1>
        <p className="text-xl">Please connect your wallet to view your portfolio.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Streams</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map((stream) => (
          <StreamCard
            key={stream.id}
            stream={stream}
            onViewDetails={() => setSelectedStream(stream)}
          />
        ))}
      </div>
      {selectedStream && (
        <StreamDetailsModal
          stream={selectedStream}
          isOpen={!!selectedStream}
          onClose={() => setSelectedStream(null)}
        />
      )}
    </div>
  )
}
