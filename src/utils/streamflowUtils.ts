import BN from 'bn.js';
import { StreamflowSolana, StreamType, StreamDirection, IGetAllData } from "@streamflow/stream";
import { useStreamflowClient } from '@/hooks/useStreamflowClient';

export const getNumberFromBN = (bn: BN, decimals: number): number => {
  return bn.div(new BN(10).pow(new BN(decimals))).toNumber() + 
         bn.mod(new BN(10).pow(new BN(decimals))).toNumber() / Math.pow(10, decimals);
};

export const formatAmount = (amount: string, decimals: number): string => {
  const bn = new BN(amount);
  return getNumberFromBN(bn, decimals).toFixed(2);
};

export interface ParsedStream {
  id: string;
  name: string;
  createdAt: Date;
  start: Date;
  end: Date;
  depositedAmount: string;
  withdrawnAmount: string;
  remainingAmount: string;
  sender: string;
  recipient: string;
  mint: string;
  cliffAmount: string;
  cancelableBySender: boolean;
  cancelableByRecipient: boolean;
  transferableBySender: boolean;
  transferableByRecipient: boolean;
  automaticWithdrawal: boolean;
  streamType: string;
}

export const parseStreamData = (streamData: [string, any][]): ParsedStream[] => {
  return streamData.map(([id, stream]) => {
    const depositedAmount = formatAmount(stream.depositedAmount, 9); // Assuming 9 decimals for SOL
    const withdrawnAmount = formatAmount(stream.withdrawnAmount, 9);
    const remainingAmount = formatAmount(
      new BN(stream.depositedAmount).sub(new BN(stream.withdrawnAmount)).toString(),
      9
    );

    return {
      id,
      name: stream.name.replace(/\0/g, '').trim(),
      createdAt: new Date(stream.createdAt * 1000),
      start: new Date(stream.start * 1000),
      end: new Date(stream.end * 1000),
      depositedAmount,
      withdrawnAmount,
      remainingAmount,
      sender: stream.sender,
      recipient: stream.recipient,
      mint: stream.mint,
      cliffAmount: formatAmount(stream.cliffAmount, 9),
      cancelableBySender: stream.cancelableBySender,
      cancelableByRecipient: stream.cancelableByRecipient,
      transferableBySender: stream.transferableBySender,
      transferableByRecipient: stream.transferableByRecipient,
      automaticWithdrawal: stream.automaticWithdrawal,
      streamType: stream.type,
    };
  });
};

export const getMultipleStreams = async (client: StreamflowSolana.SolanaStreamClient, address: string): Promise<ParsedStream[]> => {
  const data: IGetAllData = {
    address,
    type: StreamType.All,
    direction: StreamDirection.All,
  };

  try {
    const streams = await client.get(data);
    return parseStreamData(streams);
  } catch (exception) {
    console.error('Error fetching multiple streams:', exception);
    throw exception;
  }
};
