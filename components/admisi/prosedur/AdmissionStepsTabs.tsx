import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    id: "step-1",
    label: "Tahap 1",
    title: "Membeli Formulir & Mendaftar Akun",
    content: "Calon mahasiswa wajib membeli PIN formulir pendaftaran melalui bagian keuangan STTB, kemudian membuat akun di Portal Admisi STTB menggunakan PIN tersebut."
  },
  {
    id: "step-2",
    label: "Tahap 2",
    title: "Mengisi Data & Unggah Dokumen",
    content: "Lengkapi semua data diri, riwayat pendidikan, serta latar belakang pelayanan pada Portal Admisi. Unggah seluruh dokumen persyaratan (Ijazah, KTP, Surat Rekomendasi Gereja, Kesaksian Pertobatan) dalam format PDF."
  },
  {
    id: "step-3",
    label: "Tahap 3",
    title: "Verifikasi Berkas",
    content: "Tim Admisi STTB akan melakukan verifikasi terhadap kelengkapan dan keabsahan dokumen yang diunggah. Informasi kelolosan administrasi akan dikirimkan melalui email dan Portal Admisi."
  },
  {
    id: "step-4",
    label: "Tahap 4",
    title: "Ujian Tulis & Wawancara",
    content: "Kandidat yang lolos tahap administrasi diwajibkan mengikuti ujian tertulis (Pengetahuan Alkitab, Bahasa Inggris, TPA) dan sesi wawancara dengan Dewan Dosen STTB secara offline di kampus."
  },
  {
    id: "step-5",
    label: "Tahap 5",
    title: "Pengumuman & Daftar Ulang",
    content: "Pengumuman hasil seleksi akhir dapat diakses melalui Portal Admisi. Bagi yang dinyatakan diterima, wajib segera melakukan daftar ulang dan melunasi biaya administrasi awal sesuai tenggat waktu."
  }
]

export const AdmissionStepsTabs = () => {
  return (
    <Tabs defaultValue={steps[0].id} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto md:h-12 mb-8">
        {steps.map(step => (
          <TabsTrigger key={step.id} value={step.id} className="py-2.5">
            {step.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {steps.map((step, idx) => (
        <TabsContent key={step.id} value={step.id} className="mt-4 outline-none">
          <Card className="border-primary/20">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {step.content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}
