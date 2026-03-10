import React from "react"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card, CardContent } from "@/components/ui/card"

const LecturerCard = ({ image, name, status, gelar }: { image: string, name: string, status: string, gelar: string }) => (
  <Card className="min-w-[250px] md:min-w-[300px] shrink-0 snap-start overflow-hidden border-transparent shadow-md hover:shadow-lg transition-all">
    <div className="h-[300px] w-full bg-cover bg-center bg-muted" style={{ backgroundImage: `url(${image})` }} />
    <CardContent className="p-5 text-center bg-card z-10 relative">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-sm font-medium text-primary mb-1">{gelar}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-widest">{status}</p>
    </CardContent>
  </Card>
)

export default function DewanDosenFeature() {
  const pimpinan = [
    { name: "Dr. Budi Santoso", gelar: "M.Th., D.Th.", status: "Ketua", image: "/placeholders/dosen-1.jpg" },
    { name: "Dr. Maria Kristina", gelar: "M.Pd.K., Ph.D.", status: "Wakil Ketua I", image: "/placeholders/dosen-2.jpg" },
    { name: "Pdt. Johanes Lie", gelar: "M.Div., D.Min.", status: "Wakil Ketua II", image: "/placeholders/dosen-3.jpg" },
    { name: "Dr. Andreas Wijaya", gelar: "M.Th., D.Th.", status: "Ketua Program Studi S1", image: "/placeholders/dosen-4.jpg" },
    { name: "Dr. Samuel Lase", gelar: "M.Th., Ph.D.", status: "Ketua Program Studi S2", image: "/placeholders/dosen-5.jpg" },
  ]

  const jajaranDosen = [
    { name: "Pdt. Daniel Putra", gelar: "M.Th.", status: "Dosen Tetap", image: "/placeholders/dosen-6.jpg" },
    { name: "Ester Magdalena", gelar: "M.Pd.K.", status: "Dosen Tetap", image: "/placeholders/dosen-7.jpg" },
    { name: "Dr. Joshua Haryanto", gelar: "D.Min.", status: "Dosen Luar Biasa", image: "/placeholders/dosen-8.jpg" },
    { name: "Pdt. Lukas Tan", gelar: "M.Th.", status: "Dosen Praktik", image: "/placeholders/dosen-9.jpg" },
    { name: "Rut Naomi", gelar: "M.A.", status: "Dosen Tetap", image: "/placeholders/dosen-10.jpg" },
  ]

  return (
    <>
      <PageHero title="Dewan Dosen" description="Para pengajar yang mendedikasikan hidupnya untuk melengkapi hamba Tuhan." />
      <PageContainer>
        <SectionHeader title="Pimpinan Institusi" align="center" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 justify-center">
          {pimpinan.map((p) => <LecturerCard key={p.name} {...p} />)}
        </div>

        <SectionHeader title="Jajaran Dosen" align="left" description="Geser untuk melihat staf pengajar STTB." />
        <div className="flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory hide-scrollbar">
          {jajaranDosen.map((p) => <LecturerCard key={p.name} {...p} />)}
        </div>
      </PageContainer>
    </>
  )
}
