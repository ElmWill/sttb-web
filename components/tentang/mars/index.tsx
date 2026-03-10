import React from "react"
import { PageHero } from "@/components/shared/PageHero"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Card, CardContent } from "@/components/ui/card"

export default function MarsFeature() {
  return (
    <>
      <PageHero title="Mars STTB" description="Lagu kebanggaan sivitas akademika." />
      <PageContainer className="max-w-4xl">
        <Card className="mb-8">
          <CardContent className="p-0 overflow-hidden rounded-xl aspect-video bg-muted relative">
            {/* Media Integration Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors cursor-pointer">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-6 text-lg font-medium leading-loose text-foreground/80 max-w-2xl mx-auto">
          <p>
            Majulah STT Bandung<br/>
            Angkatlah panji kebenaran<br/>
            Bentara Kristus yang mulia<br/>
            Setia memikul salib-Nya
          </p>
          <p>
            Alkitab dasar iman kita<br/>
            Berkobar roh pelayanan<br/>
            Dengan kasih dan pengorbanan<br/>
            Beritakan Injil keselamatan
          </p>
          <p>
            Maju terus STT Bandung<br/>
            Jadilah terang di kegelapan<br/>
            Membangun tubuh Kristus<br/>
            Bagi kemuliaan nama Tuhan!
          </p>
        </div>
      </PageContainer>
    </>
  )
}
