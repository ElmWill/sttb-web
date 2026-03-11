import React from "react"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { Card, CardContent } from "@/components/ui/card"
import { usePageDetail } from "@/hooks/usePageData"

const LogoMeaningCard = ({ title, description, image }: { title: string, description: string, image: string }) => (
  <Card className="h-full">
    <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
      <div className="w-32 h-32 shrink-0 bg-muted/50 rounded-xl flex items-center justify-center p-4">
        <div className="w-full h-full bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${image})` }} />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </CardContent>
  </Card>
)

export default function ArtiLogoFeature() {
  const { page, isLoading } = usePageDetail("arti-logo");

  return (
    <>
      <PageHero 
        title={page?.title || "Arti Logo"} 
        description={page ? undefined : "Makna filosofis di balik identitas visual STTB."} 
      />
      <PageContainer>
        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground transition-all animate-pulse">Memuat...</div>
        ) : page ? (
          <div className="prose prose-sttb max-w-4xl mx-auto dark:prose-invert" dangerouslySetInnerHTML={{ __html: page.content }} />
        ) : (
          <>
            <div className="flex flex-col items-center mb-16">
              <div className="w-48 h-48 md:w-64 md:h-64 bg-muted/50 rounded-full flex items-center justify-center mb-8 p-8 border">
                <div className="w-full h-full bg-cover bg-center opacity-50" style={{ backgroundImage: "url('/placeholders/logo-main.png')" }} />
              </div>
              <SectionHeader 
                title="Identitas Visual" 
                align="center"
                description="Logo STTB melambangkan panggilan pelayanan yang berakar pada kebenaran Firman Tuhan dan bersinar bagi dunia."
              />
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              <LogoMeaningCard 
                title="Alkitab Terbuka" 
                description="Melambangkan otoritas tertinggi Firman Tuhan yang menjadi dasar bagi seluruh pengajaran dan kehidupan di STTB."
                image="/placeholders/logo-part-1.png"
              />
              <LogoMeaningCard 
                title="Salib" 
                description="Melambangkan pengorbanan Kristus sebagai pusat dari pesan Injil yang harus diberitakan oleh setiap lulusan."
                image="/placeholders/logo-part-2.png"
              />
              <LogoMeaningCard 
                title="Nyala Api" 
                description="Melambangkan penyertaan Roh Kudus yang senantiasa membakar semangat pelayanan dan mengilhami kebenaran."
                image="/placeholders/logo-part-3.png"
              />
              <LogoMeaningCard 
                title="Warna Biru dan Merah" 
                description="Warna biru melambangkan kedamaian dan kedalaman teologi, sementara merah melambangkan keberanian dan darah penebusan Kristus."
                image="/placeholders/logo-part-4.png"
              />
            </div>
          </>
        )}
      </PageContainer>
    </>
  )
}
