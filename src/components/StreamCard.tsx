import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { parseStreamData } from '@/utils/streamflowUtils'

interface StreamCardProps {
  stream: ReturnType<typeof parseStreamData>
  onViewDetails: () => void
}

export function StreamCard({ stream, onViewDetails }: StreamCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{stream.name || `Stream ${stream.id.slice(0, 8)}...`}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Deposited: {stream.depositedAmount}</p>
        <p>Withdrawn: {stream.withdrawnAmount}</p>
        <p>Remaining: {stream.remainingAmount}</p>
        <p>Status: {stream.status}</p>
        <Button onClick={onViewDetails}>View Details</Button>
      </CardContent>
    </Card>
  )
}
