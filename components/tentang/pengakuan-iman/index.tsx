import React from "react"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Card, CardContent } from "@/components/ui/card"

const ImanItem = ({ title, desc }: { title: string, desc: string }) => (
  <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors">
    <CardContent className="p-6">
      <h3 className="font-bold text-lg mb-3 text-primary">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </CardContent>
  </Card>
)

export default function PengakuanImanFeature() {
  return (
    <>
      <PageHero title="Pengakuan Iman" description="Dasar keyakinan teologis yang kami pegang teguh." />
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ImanItem 
            title="1. Alkitab" 
            desc="Kami percaya bahwa Alkitab, yang terdiri dari Perjanjian Lama dan Perjanjian Baru, adalah Firman Allah yang diilhamkan, mutlak benar, dan merupakan otoritas tertinggi dalam iman dan kehidupan." 
          />
          <ImanItem 
            title="2. Allah Tritunggal" 
            desc="Kami percaya kepada satu Allah yang hidup dan benar, yang ada dalam tiga Pribadi: Bapa, Anak, dan Roh Kudus, yang setara dalam kekuasaan dan kemuliaan." 
          />
          <ImanItem 
            title="3. Yesus Kristus" 
            desc="Kami percaya bahwa Yesus Kristus adalah Anak Allah yang menjelma manjadi manusia, lahir dari anak dara Maria, mati di kayu salib untuk menebus dosa manusia, bangkit, dan naik ke surga." 
          />
          <ImanItem 
            title="4. Roh Kudus" 
            desc="Kami percaya bahwa Roh Kudus menginsafkan dunia dari dosa, melahirkan baru orang percaya, serta mendiami, mengajar, dan memimpin mereka dalam kebenaran." 
          />
          <ImanItem 
            title="5. Kejatuhan Manusia" 
            desc="Kami percaya bahwa manusia diciptakan menurut gambar Allah, namun telah jatuh ke dalam dosa sehingga terpisah dari Allah dan membutuhkan keselamatan." 
          />
          <ImanItem 
            title="6. Keselamatan" 
            desc="Kami percaya bahwa keselamatan adalah kasih karunia Allah sepenuhnya melalui iman kepada Yesus Kristus, bukan karena perbuatan baik manusia." 
          />
          <ImanItem 
            title="7. Gereja" 
            desc="Kami percaya bahwa Gereja adalah tubuh Kristus yang terdiri dari semua orang percaya sejati, yang dipanggil untuk beribadah, bertumbuh, dan memberitakan Injil." 
          />
          <ImanItem 
            title="8. Kedatangan Kembali" 
            desc="Kami percaya bahwa Yesus Kristus akan datang kembali ke dunia secara fisik dan mulia untuk menghakimi yang hidup dan yang mati." 
          />
        </div>
      </PageContainer>
    </>
  )
}
