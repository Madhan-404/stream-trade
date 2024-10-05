import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface TradingCardProps {
  name: string
  symbol: string
  listingPrice: number
  remainingTokens: number
  totalTokens: number
  currentPrice: number
}

export function TradingCard({ name, symbol, listingPrice, remainingTokens, totalTokens, currentPrice }: TradingCardProps) {
  const [showModal, setShowModal] = useState(false)
  const percentage = (remainingTokens / totalTokens) * 100
  const streamValue = remainingTokens * currentPrice

  const data = [
    { name: 'Start', tokens: totalTokens },
    { name: 'Current', tokens: remainingTokens },
  ]

  const handleBuyNow = () => {
    // Implement wallet popup and payment logic here
    console.log('Buy Now clicked')
  }

  const handleBid = () => {
    // Implement wallet popup and bidding logic here
    console.log('Bid clicked')
  }

  return (
    <Card className="w-full max-w-sm aspect-square bg-gray-800 text-white border-2 border-purple-500 animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className=" font-bold text-center">{name} ({symbol})</CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setShowModal(true)}>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">Stream: {remainingTokens}/{totalTokens} ({percentage.toFixed(2)}%)</p>
        <p className="text-lg font-semibold">Current Price: ${currentPrice}</p>
        <p className="text-lg font-semibold">Stream Value: ${streamValue.toFixed(2)}</p>
        <div className="flex justify-between mt-4">
          <Button onClick={handleBuyNow}>Buy Now</Button>
          <Button onClick={handleBid}>Bid</Button>
        </div>
      </CardContent>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{name} ({symbol}) Stream Details</DialogTitle>
          </DialogHeader>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="tokens" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}