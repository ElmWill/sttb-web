import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const RequirementBox = ({ text }: { text: string }) => (
  <Card className="hover:border-primary/50 transition-colors">
    <CardContent className="p-4 flex items-center gap-4">
      <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
      <span className="font-medium">{text}</span>
    </CardContent>
  </Card>
)

export default function PersyaratanFeature() {
  const commonReqs = [
    "Telah lahir baru dan memberi diri dibaptis (dewasa)",
    "Usia maksimal 35 tahun (untuk S1 Reguler)",
    "Memiliki rekomendasi resmi dari Majelis Jemaat/Gembala Sidang",
    "Surat Keterangan Berbadan Sehat dari Dokter/Rumah Sakit",
    "Fotokopi KTP dan Akta Kelahiran",
    "Pas foto terbaru ukuran 3x4 dan 4x6 (masing-masing 3 lembar)"
  ]

  const academicReqs = [
    "S1: Fotokopi Legalisir Ijazah SMA/SMK sederajat",
    "S2: Fotokopi Legalisir Ijazah S1 (Teologi atau Non-Teologi yang relevan)",
    "Transkrip Nilai dengan IPK minimal sesuai ketentuan program",
    "Lulus Ujian Masuk (Tes Potensi Akademik, Pengetahuan Alkitab, Bahasa Inggris)",
    "Lulus Wawancara dengan Panitia Admisi STTB"
  ]

  return (
    <>
      <PageContainer className="max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <SectionHeader title="Persyaratan Umum" className="mb-6" />
            <div className="space-y-4">
              {commonReqs.map((r, i) => <RequirementBox key={i} text={r} />)}
            </div>
          </div>
          <div>
            <SectionHeader title="Persyaratan Akademik" className="mb-6" />
            <div className="space-y-4">
              {academicReqs.map((r, i) => <RequirementBox key={i} text={r} />)}
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  )
}
