import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const BoardSection = ({ title, members }: { title: string, members: string[] }) => (
  <Card className="mb-8 overflow-hidden">
    <CardHeader className="bg-primary/5 border-b">
      <CardTitle className="text-xl text-primary">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-6">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map(m => (
          <li key={m} className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-secondary mr-3" />
            <span className="font-medium">{m}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

export default function YayasanFeature() {
  return (
    <>
      <PageContainer className="max-w-4xl">
        <div className="mb-12 text-lg text-muted-foreground leading-relaxed text-center">
        </div>
        <BoardSection 
          title="Dewan Pembina" 
          members={["Pdt. Agus Gunawan,Ph.D.","Pnt. Subianto Tjandra", "Pdt. Budiyanto Santosa"]} 
        />
        
        <BoardSection 
          title="Dewan Pengurus" 
          members={["Pnts. Benny Soenarjo (Ketua)", "Pnts. Ginawan Chondro (Wakil Ketua)", "Pnt. Arif Subagyo (Sekretaris)", "Pnt. Widianto Tjandradipura (Bendahara)"]} 
        />
        
        <BoardSection 
          title="Anggota" 
          members={["Pnts. Agus Tjandra", "Ev. Doroti Tunggal Widjaja, M.Th.", "Bp. Eddy Samuel Affendie", "Pnts.Edi Sukamto Josana", "Bp. Herjanto Gunawan", "Pnts. Joseph Koshan", "Pnt. Suwito Kwee"]} 
        />
      </PageContainer>
    </>
  )
}
