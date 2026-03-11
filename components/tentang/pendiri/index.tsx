import React from "react"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"

const FounderCard = ({ name, image }: { name: string, image: string }) => (
  <div className="flex flex-col items-center text-center space-y-4">
    <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl bg-muted overflow-hidden bg-cover bg-center border-4 border-white shadow-lg shadow-black/5" style={{ backgroundImage: `url(${image})` }} />
    <div>
      <h3 className="text-2xl font-bold">{name}</h3>
    </div>
  </div>
)

export default function PendiriFeature() {
  return (
    <>
      <PageHero title="Pendiri STTB" description="" />
      <PageContainer>
        <SectionHeader 
          title="" 
          align="center" 
          description=""
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <FounderCard 
            name="Rev. DR. Caleb Tong (Alm.)" 
            image="/placeholders/founder-1.jpg" 
          />
          <FounderCard 
            name="Rev. DR. Joseph Tong, Ph.D" 
            image="/placeholders/founder-2.jpg" 
          />
          <FounderCard 
            name="Rev. DR. Dorothy I. Marx (Alm.)" 
            image="/placeholders/founder-3.jpg" 
          />
        </div>
      </PageContainer>
    </>
  )
}
