import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"

const toBackgroundImage = (path: string) => `url("${encodeURI(path)}")`

const FounderCard = ({ name, image }: { name: string, image: string }) => (
  <div className="flex flex-col items-center text-center space-y-4">
    <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl bg-muted overflow-hidden bg-cover bg-center border-4 border-white shadow-lg shadow-black/5" style={{ backgroundImage: toBackgroundImage(image) }} />
    <div>
      <h3 className="text-2xl font-bold">{name}</h3>
    </div>
  </div>
)

export default function PendiriFeature() {
  return (
    <>
      <PageContainer>
        <SectionHeader 
          title="Pendiri STTB" 
          align="center" 
          description="Tokoh-tokoh yang dipakai Tuhan dalam berdirinya STTB."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          <FounderCard 
            name="Rev. DR. Caleb Tong (Alm.)" 
            image="/images/founders/CalebTong.png" 
          />
          <FounderCard 
            name="Rev. DR. Joseph Tong, Ph.D" 
            image="/images/founders/JosephTong.png" 
          />
          <FounderCard 
            name="Rev. DR. Dorothy I. Marx (Alm.)" 
            image="/images/founders/Dorothy.png" 
          />
        </div>
      </PageContainer>
    </>
  )
}
