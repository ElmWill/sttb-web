import React from "react"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Lightbulb, Compass } from "lucide-react"

export default function VisiMisiFeature() {
  return (
    <>
      <PageHero title="Visi & Misi" description="Fondasi dan Arah Pelayanan Kami" />
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">Visi</h2>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              &quot;Menjadi lembaga teologi yang unggul, berintegritas, dan transformatif dalam memperlengkapi hamba Tuhan yang setia bekerja di ladang pelayanan.&quot;
            </p>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
                <Compass className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold">Misi</h2>
            </div>
            <ul className="space-y-4 text-muted-foreground list-disc pl-5">
              <li>Menyelenggarakan pendidikan teologi yang alkitabiah dan akademis.</li>
              <li>Membentuk kerohanian dan karakter pelayan Tuhan.</li>
              <li>Melakukan riset teologi terapan untuk merespon kebutuhan konteks masa kini.</li>
              <li>Melaksanakan pengabdian holistik bagi gereja dan masyarakat.</li>
            </ul>
          </div>
        </div>

        <SectionHeader title="Core Values" align="center" description="Nilai-nilai utama yang menghidupi kampus." />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 bg-muted/50">
            <h3 className="text-xl font-bold mb-2">Christ-Centered</h3>
            <p className="text-sm text-muted-foreground">Berpusat sepenuhnya pada Kristus dalam segala aspek.</p>
          </Card>
          <Card className="text-center p-6 bg-muted/50">
            <h3 className="text-xl font-bold mb-2">Integrity</h3>
            <p className="text-sm text-muted-foreground">Menghidupi kebenaran secara konsisten.</p>
          </Card>
          <Card className="text-center p-6 bg-muted/50">
            <h3 className="text-xl font-bold mb-2">Excellence</h3>
            <p className="text-sm text-muted-foreground">Berupaya memberikan yang terbaik di bidang akademik dan pelayanan.</p>
          </Card>
          <Card className="text-center p-6 bg-muted/50">
            <h3 className="text-xl font-bold mb-2">Servant Leadership</h3>
            <p className="text-sm text-muted-foreground">Memimpin dengan hati hamba untuk melayani.</p>
          </Card>
        </div>
      </PageContainer>
    </>
  )
}
