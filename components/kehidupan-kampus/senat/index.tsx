import React from "react"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card, CardContent } from "@/components/ui/card"

const DepartmentCard = ({ name, desc }: { name: string, desc: string }) => (
  <Card className="hover:border-primary/50 transition-colors h-full">
    <CardContent className="p-6">
      <h3 className="text-xl font-bold mb-3 text-primary">{name}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </CardContent>
  </Card>
)

export default function SenatFeature() {
  const depts = [
    { name: "Departemen Kerohanian", desc: "Bertanggung jawab memfasilitasi kebutuhan rohani mahasiswa melalui KKS, doa puasa, dan kelompok tumbuh bersama." },
    { name: "Departemen Olahraga & Seni", desc: "Mewadahi bakat dan minat mahasiswa melalui kompetisi internal, latihan paduan suara, serta kegiatan kebugaran." },
    { name: "Departemen Kesejahteraan", desc: "Berfokus pada pelayanan kasih bagi mahasiswa yang sakit, kedukaan, serta kebutuhan esensial lainnya di asrama." },
    { name: "Departemen Misi & PI", desc: "Mengorganisir program pelayanan keluar kampus, penginjilan jalanan, serta kunjungan ke gereja-gereja binaan." },
    { name: "Departemen Publikasi & Humas", desc: "Mengelola buletin mahasiswa, dokumentasi kegiatan, serta komunikasi eksternal dari Senat ke publik." },
    { name: "Departemen Logistik", desc: "Bertanggung jawab atas pengelolaan alat-alat Senat, inventaris, dan dukungan teknis setiap acara mahasiswa." }
  ]

  return (
    <>
      <PageHero title="Senat Mahasiswa" description="Wadah organisasi untuk melatih kepemimpinan hamba." />
      <PageContainer className="max-w-5xl">
        <div className="mb-12 text-center text-lg text-muted-foreground leading-relaxed">
          <p>
            Senat Mahasiswa STTB (SEMA STTB) adalah badan eksekutif kemahasiswaan tertinggi. Keanggotaan dan kepengurusan di dalam Senat bukan sekadar aktivitas organisasi, namun pelatihan nyata dalam kepemimpinan, kerja tim, dan pelayanan antar wadah gerejawi.
          </p>
        </div>

        <SectionHeader title="Struktur Departemen SEMA" align="center" description="Pelayanan senat digerakkan melalui berbagai departemen fungsional." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {depts.map((d, i) => <DepartmentCard key={i} {...d} />)}
        </div>
      </PageContainer>
    </>
  )
}
