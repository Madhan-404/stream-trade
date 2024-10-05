"use client"

import React, { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useStreamflowClient } from '@/hooks/useStreamflowClient'
import { StreamCard } from '@/components/StreamCard'
import { StreamDetailsModal } from '@/components/StreamDetailsModal'
import { getMultipleStreams, ParsedStream } from '@/utils/streamflowUtils'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Navbar from '@/components/Navbar' // Import the Navbar component
import { LoadingState } from '@/components/LoadingState'

export default function PortfolioPage() {
  const { connected, publicKey } = useWallet()
  const streamflowClient = useStreamflowClient()
  const [streams, setStreams] = useState<ParsedStream[]>([])
  const [selectedStream, setSelectedStream] = useState<ParsedStream | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStreams = async () => {
      setLoading(true)
      if (connected && publicKey) {
        try {
          console.log('Fetching streams for wallet:', publicKey.toBase58())
          const fetchedStreams = await getMultipleStreams(streamflowClient, publicKey.toBase58())
          console.log('Streams fetched:', fetchedStreams.length)
          setStreams(fetchedStreams)
        } catch (error) {
          console.error("Error fetching streams:", error)
        }
      }
      setLoading(false)
    }

    fetchStreams()
  }, [connected, publicKey, streamflowClient])

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Your Streams</h1>
        {loading ? (
          <LoadingState />
        ) : (
          <>
            {!connected ? (
              <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
                <h2 className="text-2xl font-bold mb-4">Please connect your wallet to view your streams.</h2>
              </div>
            ) : streams.length === 0 ? (
              <div className="flex flex-col items-center justify-center bg-background text-foreground">                <h2 className="text-2xl font-bold mt-8 mb-4">No streams found</h2>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4" onClick={() => window.open('http://localhost:3000/trade', '_blank')}>
                  Get some streams
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4" onClick={() => window.open('https://streamflow.finance', '_blank')}>
                  Make some streams
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {streams.map((stream) => (
                  <StreamCard
                    key={stream.id}
                    stream={stream}
                    onViewDetails={() => setSelectedStream(stream)}
                  />
                ))}
              </div>
            )}
          </>
        )}
        {selectedStream && (
          <StreamDetailsModal
            stream={selectedStream}
            isOpen={!!selectedStream}
            onClose={() => setSelectedStream(null)}
          />
        )}
      </div>
    </div>
  )
}
