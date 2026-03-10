import React from "react"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"

const FounderCard = ({ name, title, image }: { name: string, title: string, image: string }) => (
  <div className="flex flex-col items-center text-center space-y-4">
    <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl bg-muted overflow-hidden bg-cover bg-center border-4 border-white shadow-lg shadow-black/5" style={{ backgroundImage: `url(${image})` }} />
    <div>
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="text-muted-foreground">{title}</p>
    </div>
  </div>
)

export default function PendiriFeature() {
  return (
    <>
      <PageHero title="Pendiri STTB" description="Mengenang tokoh perintis yang meletakkan dasar Sekolah Tinggi Teologi Bandung." />
      <PageContainer>
        <SectionHeader 
          title="Tokoh Perintis" 
          align="center" 
          description="Melalui doa, visi, dan kerja keras para pendiri, STTB lahir sebagai wadah untuk melatih pelayan Tuhan."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <FounderCard 
            name="Pdt. Dr. Founder Satu" 
            title="Ketua Perintis" 
            image="/placeholders/founder-1.jpg" 
          />
          <FounderCard 
            name="Pdt. Founder Dua" 
            title="Anggota Perintis" 
            image="/placeholders/founder-2.jpg" 
          />
          <FounderCard 
            name="Dr. Founder Tiga" 
            title="Anggota Perintis" 
            image="/placeholders/founder-3.jpg" 
          />
        </div>
      </PageContainer>
    </>
  )
}
