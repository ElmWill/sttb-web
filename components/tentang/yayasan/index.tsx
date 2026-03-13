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
          <p>
            Yayasan Sekolah Tinggi Teologi Bandung didirikan sebagai badan hukum penyelenggara yang menaungi seluruh aktivitas Tri Dharma Perguruan Tinggi di STTB. Yayasan bertanggung jawab atas tata kelola fundamental, pengembangan fasilitas, dan arah masa depan institusi.
          </p>
        </div>

        <BoardSection 
          title="Dewan Pembina" 
          members={["Pdt. Dr. Abraham Tio (Ketua)", "Pdt. Yohanes Halim", "Dr. Handoko Lie"]} 
        />
        
        <BoardSection 
          title="Dewan Pengurus" 
          members={["Bpk. Samuel Setiawan (Ketua)", "Ibu Maria Liana (Sekretaris)", "Bpk. David Tjandra (Bendahara)", "Pdt. Filemon Suryanto"]} 
        />
        
        <BoardSection 
          title="Anggota Yayasan" 
          members={["Bpk. Anton Winata", "Ibu Esther Purnomo", "Bpk. Timotius Hadi", "Pdt. Barnabas Siregar", "Ibu Lidya Kusuma", "Bpk. Setio Budi"]} 
        />
      </PageContainer>
    </>
  )
}
