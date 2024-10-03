"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

export default function TradeLayout({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  const connectWallet = async () => {
    // Implement Solana wallet connection logic here
    setWallet("Connected")
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="h-[20vh] flex items-center justify-between px-6 border-b">
        <h1 className="text-2xl font-bold">Stream.trade</h1>
        <div className="flex items-center space-x-4">
          <Input className="w-64" placeholder="Search..." />
          <Button onClick={connectWallet}>
            {wallet ? 'Connected' : 'Connect Wallet'}
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="h-[8vh] flex items-center justify-center border-t">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
      </footer>
    </div>
  )
}
