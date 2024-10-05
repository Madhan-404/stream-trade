import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ParsedStream } from '@/utils/streamflowUtils'

interface StreamDetailsModalProps {
  stream: ParsedStream
  isOpen: boolean
  onClose: () => void
}

export function StreamDetailsModal({ stream, isOpen, onClose }: StreamDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{stream.name || `Stream ${stream.id}`}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
          <div className="space-y-4">
            <DetailItem label="ID" value={stream.id} />
            <DetailItem label="Sender" value={stream.sender} />
            <DetailItem label="Recipient" value={stream.recipient} />
            <DetailItem label="Deposited" value={`${stream.depositedAmount} SOL`} />
            <DetailItem label="Withdrawn" value={`${stream.withdrawnAmount} SOL`} />
            <DetailItem label="Remaining" value={`${stream.remainingAmount} SOL`} />
            <DetailItem label="Mint" value={stream.mint} />
            <DetailItem label="Created" value={stream.createdAt.toLocaleString()} />
            <DetailItem label="Start Time" value={stream.start.toLocaleString()} />
            <DetailItem label="End Time" value={stream.end.toLocaleString()} />
            <DetailItem label="Cliff Amount" value={`${stream.cliffAmount} SOL`} />
            <DetailItem label="Stream Type" value={stream.streamType} />
            <DetailItem label="Cancelable by Sender" value={stream.cancelableBySender ? 'Yes' : 'No'} />
            <DetailItem label="Cancelable by Recipient" value={stream.cancelableByRecipient ? 'Yes' : 'No'} />
            <DetailItem label="Transferable by Sender" value={stream.transferableBySender ? 'Yes' : 'No'} />
            <DetailItem label="Transferable by Recipient" value={stream.transferableByRecipient ? 'Yes' : 'No'} />
            <DetailItem label="Automatic Withdrawal" value={stream.automaticWithdrawal ? 'Yes' : 'No'} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium">{label}:</span>
      <span className="text-right">{value}</span>
    </div>
  )
}
