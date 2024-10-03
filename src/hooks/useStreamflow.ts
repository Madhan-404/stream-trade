import { useContext } from 'react'
import { StreamflowContext } from '@/providers/StreamflowProvider'

export const useStreamflow = () => {
  const context = useContext(StreamflowContext)
  if (!context) {
    throw new Error('useStreamflow must be used within a StreamflowProvider')
  }
  return context
}
