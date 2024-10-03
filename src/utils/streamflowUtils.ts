import BN from 'bn.js'
import { StreamflowSolana, IStreamData } from "@streamflow/stream"

export const getNumberFromBN = (bn: BN, decimals: number): number => {
  return bn.div(new BN(10).pow(new BN(decimals))).toNumber() + 
         bn.mod(new BN(10).pow(new BN(decimals))).toNumber() / Math.pow(10, decimals)
}

export const formatAmount = (amount: BN, decimals: number): string => {
  return getNumberFromBN(amount, decimals).toFixed(2)
}

export const parseStreamData = (stream: IStreamData) => {
  return {
    id: stream.id,
    name: stream.name,
    sender: stream.sender,
    recipient: stream.recipient,
    depositedAmount: formatAmount(stream.depositedAmount, stream.tokenDecimals),
    withdrawnAmount: formatAmount(stream.withdrawnAmount, stream.tokenDecimals),
    remainingAmount: formatAmount(stream.remainingAmount, stream.tokenDecimals),
    createdAt: new Date(stream.createdAt * 1000).toLocaleString(),
    startTime: new Date(stream.startTime * 1000).toLocaleString(),
    endTime: stream.endTime ? new Date(stream.endTime * 1000).toLocaleString() : 'Ongoing',
    status: stream.status,
  }
}
