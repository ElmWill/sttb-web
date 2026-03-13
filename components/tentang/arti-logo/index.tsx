import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card, CardContent } from "@/components/ui/card"

const toBackgroundImage = (path: string) => ({
  backgroundImage: `url("${encodeURI(path)}")`,
})

const LogoMeaningCard = ({ title, description, image }: { title: string, description: string, image: string }) => (
  <Card className="h-full">
    <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
      <div className="w-32 h-32 shrink-0 bg-muted/50 rounded-xl flex items-center justify-center p-4">
        <div className="w-full h-full bg-contain bg-center bg-no-repeat opacity-100" style={toBackgroundImage(image)} />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </CardContent>
  </Card>
)

export default function ArtiLogoFeature() {
  return (
    <>
      <PageContainer>
        <div className="flex flex-col items-center mb-16">
          <div className="w-48 h-48 md:w-64 md:h-64 bg-muted/50 rounded-2xl flex items-center justify-center mb-8 p-8 border">
            <div className="w-full h-full bg-contain bg-center bg-no-repeat opacity-100" style={toBackgroundImage("/images/logo/Image (STTB Logo).png")} />
          </div>
          <SectionHeader 
            title="Identitas Visual" 
            align="center"
            description="Logo STTB menggambarkan pola pendidikan teologi yang akan memperlengkapi para mahasiswa untuk menjadi hamba Allah yang baik, setia, dan penih hikmat, seta siap dipakai dalam pelayanan di ladangNya."
          />
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          <LogoMeaningCard 
            title="Alkitab" 
            description="adalah satu-satunya sumber pengetahuan yang benar tentang Allah dan dasar bagi panggilan serta pelayanan (Sola Scriptura)"
            image="/images/logo/Image (Alkitab).png"
          />
          <LogoMeaningCard 
            title="Salib & Mahkota" 
            description="Melambangkan panggilan untuk berpegang kepada kebenaran dan merajakan Kristus."
            image="/images/logo/Image (Salib & Mahkota).png"
          />
          <LogoMeaningCard 
            title="Api" 
            description="di atas logo menggambarkan penyertaan dan pemenuhan dari Allah Roh Kudus yang menjadi sumber hikmat, kuasa, dan kasih serta merupakan syarat mutlak bagi pelayan Tuhan."
            image="/images/logo/Image (Api).png"
          />
          <LogoMeaningCard 
            title="Tongkat Gembala" 
            description="melambangkan panggilan Tuhan untuk menggembalakan umat-Nya"
            image="/images/logo/Image (Tongkat Gembala).png"
          />
        </div>
      </PageContainer>
    </>
  )
}
