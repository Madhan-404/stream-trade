import Navbar from '@/components/Navbar'

export default function TradePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Trade Page Content</h1>
      </main>
    </div>
  )
}
