import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { parseStreamData } from '@/utils/streamflowUtils'

interface StreamDetailsModalProps {
  stream: ReturnType<typeof parseStreamData>
  isOpen: boolean
  onClose: () => void
}

export function StreamDetailsModal({ stream, isOpen, onClose }: StreamDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{stream.name || `Stream ${stream.id}`}</DialogTitle>
          <DialogDescription>Detailed information about the stream</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>ID: {stream.id}</p>
          <p>Sender: {stream.sender}</p>
          <p>Recipient: {stream.recipient}</p>
          <p>Deposited: {stream.depositedAmount}</p>
          <p>Withdrawn: {stream.withdrawnAmount}</p>
          <p>Remaining: {stream.remainingAmount}</p>
          <p>Created: {stream.createdAt}</p>
          <p>Start Time: {stream.startTime}</p>
          <p>End Time: {stream.endTime}</p>
          <p>Status: {stream.status}</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
