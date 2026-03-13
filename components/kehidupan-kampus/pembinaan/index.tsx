import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Card, CardContent } from "@/components/ui/card"
import { HeartPulse, ShieldAlert, Sparkles, Users } from "lucide-react"

export default function PembinaanFeature() {
  return (
    <>
      <PageContainer className="max-w-4xl">
        <div className="mb-12 text-center text-lg text-muted-foreground leading-relaxed">
          <p>
            Di STTB, kami percaya bahwa pendidikan teologi harus sejalan dengan pembentukan hati. Program pembinaan dirancang untuk menolong mahasiswa bertumbuh dalam kekudusan, kepemimpinan hamba, dan kecintaan akan firman Tuhan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-primary/5 hover:bg-primary/10 transition-colors border-transparent">
            <CardContent className="p-8">
              <HeartPulse className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3">Ibadah Kapel</h3>
              <p className="text-muted-foreground">Dilaksanakan dua kali seminggu, ibadah ini menjadi pusat kehidupan spiritual kampus di mana seluruh sivitas akademika berkumpul memuji Tuhan.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary/5 hover:bg-secondary/10 transition-colors border-transparent">
            <CardContent className="p-8">
              <Users className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-xl font-bold mb-3">Kelompok Sel (KKS)</h3>
              <p className="text-muted-foreground">Mahasiswa dibagi dalam kelompok-kelompok kecil (KKS) yang dipimpin oleh dosen untuk saling mendoakan, akuntabilitas, dan berbagi pergumulan.</p>
            </CardContent>
          </Card>

          <Card className="bg-accent/5 hover:bg-accent/10 transition-colors border-transparent">
            <CardContent className="p-8">
              <ShieldAlert className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-xl font-bold mb-3">Retreat & KKR</h3>
              <p className="text-muted-foreground">Setiap awal semester, retreat diselenggarakan untuk menyegarkan kembali panggilan pelayanan mahasiswa melalui persekutuan dan perenungan firman yang intensif.</p>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 hover:bg-muted transition-colors border-transparent">
            <CardContent className="p-8">
              <Sparkles className="w-12 h-12 text-foreground/60 mb-6" />
              <h3 className="text-xl font-bold mb-3">Pembinaan Asrama</h3>
              <p className="text-muted-foreground">Bagi mahasiswa yang tinggal di asrama, terdapat program renungan malam, doa puasa, dan pendisiplinan guna membentuk kedewasaan rohani dan mental.</p>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </>
  )
}
