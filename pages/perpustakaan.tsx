import React, { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Target } from "lucide-react"

export default function Perpustakaan() {
  const router = useRouter()

  useEffect(() => {
    // In production, you would redirect to the actual library system URL
    // router.push("https://library.sttb.ac.id")
    const timer = setTimeout(() => {
      window.open("https://library.sttb.ac.id", "_blank")
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Head>
        <title>Perpustakaan | {AppSettings.appName}</title>
      </Head>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <PageContainer>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Mengarahkan ke Sistem Perpustakaan...</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Anda sedang diarahkan ke sistem informasi perpustakaan STTB eksternal. Jika tidak diarahkan secara otomatis, silakan klik tombol di bawah ini.
          </p>
          <a
            href="https://library.sttb.ac.id" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Buka Perpustakaan STTB
          </a>
        </PageContainer>
      </div>
    </>
  )
}

Perpustakaan.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
