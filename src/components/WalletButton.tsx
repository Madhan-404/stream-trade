"use client"

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"

export default function WalletButton() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <WalletMultiButton className="bg-primary text-primary-foreground hover:bg-primary/90" />
  )
}
