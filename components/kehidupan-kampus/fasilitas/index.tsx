import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card, CardContent } from "@/components/ui/card"

const FasilitasItem = ({ name, description, image }: { name: string, description: string, image: string }) => (
  <Card className="overflow-hidden border-transparent shadow-md hover:shadow-lg transition-all h-full flex flex-col">
    <div className="h-48 w-full bg-cover bg-center bg-muted" style={{ backgroundImage: `url(${image})` }} />
    <CardContent className="p-6 mt-auto">
      <h3 className="font-bold text-xl mb-3">{name}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </CardContent>
  </Card>
)

export default function FasilitasFeature() {
  const fasilitas = [
    {
      name: "Perpustakaan",
      description: "Pusat sumber belajar dengan koleksi ribuan buku teologi, jurnal akademik, dan fasilitas e-library yang terintegrasi untuk mendukung riset mahasiswa dan dosen.",
      image: "/images/campus/PerpustakaanUtama.png"
    },
    {
      name: "Kapel STTB",
      description: "Ruang ibadah utama untuk kebaktian kapel rutin, perayaan hari besar gerejawi, dan kegiatan kerohanian mahasiswa. Kapel ini menampung hingga 300 jemaat.",
      image: "/images/campus/RuangKonseling.png"
    },
    {
      name: "Asrama Mahasiswa",
      description: "Fasilitas tempat tinggal yang aman dan nyaman, didesain untuk mendukung program pembinaan karakter, kedisiplinan, dan persekutuan antar mahasiswa.",
      image: "/images/campus/Asrama.png"
    },
    {
      name: "Ruang Kelas Multimedia",
      description: "Ruang perkuliahan full-AC yang dilengkapi dengan sistem proyeksi, audio visual, dan akses internet berkecepatan tinggi.",
      image: "/images/campus/Ruang kelas.png"
    },
    {
      name: "Laboratorium Komputer",
      description: "Menyediakan perangkat komputer modern bagi mahasiswa untuk keperluan riset, penulisan karya ilmiah, dan pelatihan sistem IT gereja.",
      image: "/images/campus/StudioAudioVisual.png"
    },
    {
      name: "Ruang Komunal & Kantin",
      description: "Area terbuka bagi mahasiswa untuk berdiskusi, bersantai, dan makan bersama, menciptakan interaksi yang hangat antar anggota komunitas STTB.",
      image: "/images/campus/Cafetaria.png"
    }
  ]

  return (
    <>
      <PageContainer>
        <SectionHeader title="Lingkungan Belajar Ideal" align="center" description="STTB menyediakan fasilitas yang memadai untuk menunjang aktivitas akademik, spiritual, dan sosial mahasiswa." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {fasilitas.map((f, i) => <FasilitasItem key={i} {...f} />)}
        </div>
      </PageContainer>
    </>
  )
}
