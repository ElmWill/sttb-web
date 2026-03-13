import React, { useEffect, useState } from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Copy, HeartHandshake } from "lucide-react"

export default function DukungFeature() {
  const accountNumber = "282 300 5555"
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (!isCopied) return

    const timeoutId = window.setTimeout(() => {
      setIsCopied(false)
    }, 2000)

    return () => window.clearTimeout(timeoutId)
  }, [isCopied])

  const fallbackCopyToClipboard = (value: string) => {
    const textArea = document.createElement("textarea")
    textArea.value = value
    textArea.setAttribute("readonly", "")
    textArea.style.position = "absolute"
    textArea.style.left = "-9999px"
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand("copy")
    document.body.removeChild(textArea)
  }

  const handleCopyAccountNumber = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(accountNumber)
      } else {
        fallbackCopyToClipboard(accountNumber)
      }

      setIsCopied(true)
    } catch {
      fallbackCopyToClipboard(accountNumber)
      setIsCopied(true)
    }
  }

  return (
    <>
      <PageContainer className="max-w-4xl">
        <div className="text-center mb-12">
          <HeartHandshake className="w-16 h-16 text-primary mx-auto mb-6" />
          <SectionHeader title="Mari Bermitra Bersama Kami" align="center" 
            description="Pelayanan STTB tidak dapat berjalan sendiri tanpa keterlibatan anak-anak Tuhan, gereja, dan simpatisan yang rindu berinvestasi dalam pendidikan pengerja gereja. Donasi Anda sangat berarti." 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-primary/20 bg-muted/30">
            <CardContent className="p-8 text-center flex flex-col items-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Transfer Bank</h3>
              <p className="text-muted-foreground mb-6">Kirimkan donasi atau persembahan kasih Anda langsung ke rekening resmi STTB.</p>
              
              <div className="bg-card p-4 rounded-xl shadow-sm border w-full text-left mb-6 relative">
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block mb-1">BCA - Bandung</span>
                <span className="text-2xl font-bold tracking-widest font-mono">{accountNumber}</span>
                <span className="block mt-2 text-sm">a/n. Yayasan STT Bandung</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  title={isCopied ? "Nomor rekening tersalin" : "Salin nomor rekening"}
                  aria-label={isCopied ? "Nomor rekening tersalin" : "Salin nomor rekening"}
                  onClick={handleCopyAccountNumber}
                >
                  {isCopied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5" />}
                </Button>
              </div>

              <p className="min-h-6 text-sm text-primary" aria-live="polite">
                {isCopied ? "Nomor rekening berhasil disalin." : ""}
              </p>
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-center border-dashed border-2">
            <CardContent className="p-8 text-center space-y-4">
              <h3 className="text-xl font-bold">Informasi Donatur</h3>
              <p className="text-muted-foreground">Agar kami dapat mengirimkan tanda terima resmi dan laporan keuangan rutin, silakan konfirmasikan transfer Anda ke tim administrasi kami.</p>
              <Button size="lg" className="w-full mt-4" variant="default">Konfirmasi Donasi</Button>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </>
  )
}
