import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { PageHero } from "@/components/shared/PageHero"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"

interface ContentDetailProps {
  title: string
  date: string
  content: React.ReactNode
  image: string
  backPath: string
  backLabel: string
}

export const ContentDetail = ({ title, date, content, image, backPath, backLabel }: ContentDetailProps) => {
  return (
    <>
      <PageHero title={title} description={<span className="flex items-center gap-2 justify-center"><Calendar className="w-4 h-4"/> {date}</span>} />
      <PageContainer className="max-w-4xl">
        <Button variant="ghost" asChild className="mb-8 -ml-4">
          <Link href={`/${backPath}`}><ArrowLeft className="w-4 h-4 mr-2" /> {backLabel}</Link>
        </Button>
        <div className="w-full h-[400px] md:h-[500px] mb-12 rounded-2xl bg-muted bg-cover bg-center shadow-lg" style={{ backgroundImage: `url(${image})` }} />
        <article className="prose prose-slate max-w-none text-muted-foreground leading-loose text-lg">
          {content}
        </article>
      </PageContainer>
    </>
  )
}
