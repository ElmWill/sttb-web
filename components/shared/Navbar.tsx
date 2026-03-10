import Link from "next/link"
import { Button } from "@/components/ui/button"

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-primary/20 rounded-md flex items-center justify-center font-bold text-primary">
            STTB
          </div>
          <span className="font-bold text-lg hidden sm:inline-block">
            STT Bandung
          </span>
        </Link>
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <Link href="/tentang">Tentang Kami</Link>
          <Link href="/akademik">Akademik</Link>
          <Link href="/admisi">Admisi</Link>
          <Link href="/keuangan">Keuangan</Link>
          <Link href="/kehidupan-kampus">Kehidupan Kampus</Link>
          <Link href="/dashboard">Portal</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild className="hidden md:inline-flex">
            <Link href="/keuangan/dukung">Dukung STTB</Link>
          </Button>
          <Button asChild>
            <Link href="/admisi/prosedur">Daftar Sekarang</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
