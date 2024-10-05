"use client"

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import TradeLayout from '@/components/TradeLayout'

export default function TradePage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <TradeLayout searchTerm={searchTerm}>
          <h1 className="text-2xl font-bold">Trade Page Content</h1>
        </TradeLayout>
      </main>
    </div>
  )
}
