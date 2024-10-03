"use client"

import { Input } from "@/components/ui/input"
import WalletButton from "@/components/WalletButton"
import { MoonIcon, SunIcon, CircleIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {SquirrelIcon, Briefcase } from "lucide-react"
import Link from "next/link"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { useWallet } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/navigation'
import { useNetworkState } from '@/hooks/useNetworkState'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { network, setNetwork } = useNetworkState()
  const { connected } = useWallet()
  const router = useRouter()

  const handleNetworkChange = (newNetwork: WalletAdapterNetwork) => {
    setNetwork(newNetwork)
    console.log(`Switched to ${newNetwork}`)
  }

  const handlePortfolioClick = () => {
    router.push('/portfolio')
  }

  return (
    <nav className="h-[8vh] flex items-center justify-between px-6 border-b bg-background relative overflow-hidden group">
      <Link href="/trade" className="flex items-center space-x-2 hover:text-primary transition-colors">
        <SquirrelIcon className="h-6 w-6" />
        <h1 className="text-xl font-bold">Stream.trade</h1>
      </Link>
      <div className="flex-1 flex justify-center relative">
        {/* <Input className="w-64 mx-4 pl-10" placeholder="Search..." /> */}
        {/* <SquirrelIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground" /> */}
      </div>
      <div className="flex items-center space-x-4">
        <WalletButton />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <CircleIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleNetworkChange(WalletAdapterNetwork.Mainnet)}>
              Mainnet
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNetworkChange(WalletAdapterNetwork.Devnet)}>
              Devnet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="ghost" size="icon" onClick={handlePortfolioClick}>
          <Briefcase className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-primary/10 to-transparent group-hover:translate-x-full ease-in-out duration-700 transition-transform"></div>
    </nav>
  )
}
