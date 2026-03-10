import React from "react"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const ProgramBeasiswa = ({ title, type, desc, reqs }: { title: string, type: string, desc: string, reqs: string[] }) => (
  <Card className="hover:border-primary/50 transition-colors h-full flex flex-col">
    <CardHeader>
      <div className="mb-2"><Badge variant="default">{type}</Badge></div>
      <CardTitle className="text-2xl">{title}</CardTitle>
      <CardDescription className="text-base pt-2">{desc}</CardDescription>
    </CardHeader>
    <CardContent className="mt-auto">
      <h4 className="font-semibold text-sm mb-3">Persyaratan Utama:</h4>
      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
        {reqs.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
    </CardContent>
  </Card>
)

export default function BeasiswaFeature() {
  const beasiswaList = [
    {
      title: "Beasiswa Prestasi Akademik",
      type: "Potongan BPP",
      desc: "Diberikan kepada mahasiswa dengan capaian Indeks Prestasi Kumulatif (IPK) terbaik di setiap angkatan, sebagai bentuk penghargaan atas dedikasi belajarnya.",
      reqs: ["Minimal IPK 3.50", "Tidak ada nilai C atau mengulang", "Aktif dalam satu bidang asisten dosen/kampus"]
    },
    {
      title: "Beasiswa Anak Hamba Tuhan",
      type: "Potongan BPP Pokok",
      desc: "Potongan biaya khusus bagi anak-anak pendeta atau gembala sidang penuh waktu sebagai bentuk dukungan STTB terhadap pelayanan gereja lokal.",
      reqs: ["Menyertakan SK Penahbisan Pendeta (Orang Tua)", "Surat Keterangan dari Sinode terkait", "Lulus seleksi wawancara beasiswa"]
    },
    {
      title: "Beasiswa Ikatan Dinas / Utusan Gereja",
      type: "Cakupan Penuh",
      desc: "Beasiswa kolaborasi antara STTB dan gereja/yayasan pengutus. Seluruh atau sebagian biaya ditanggung langsung oleh institusi pengutus dengan ikatan pelayanan.",
      reqs: ["MOU resmi antara Gereja dan STTB", "Lulus tes potensi akademik reguler"]
    }
  ]

  return (
    <>
      <PageHero title="Program Beasiswa" description="Dukungan finansial bagi mereka yang sungguh-sungguh terpanggil." />
      <PageContainer>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-muted-foreground">
            Sekolah Tinggi Teologi Bandung berkomitmen bahwa tidak ada individu yang jelas-jelas terpanggil Tuhan, gagal diproses dan dibina hanya karena keterbatasan finansial semata.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {beasiswaList.map((b, i) => <ProgramBeasiswa key={i} {...b} />)}
        </div>
      </PageContainer>
    </>
  )
}
