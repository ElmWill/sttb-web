import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface ContentDetailProps {
  title: string
  date: string
  content: React.ReactNode
  image: string
  backPath: string
  backLabel: string
  /** "photo" (default) crops to fill width; "poster" shows full image without cropping */
  imageMode?: "photo" | "poster"
}

export const ContentDetail = ({ title, date, content, image, backPath, backLabel, imageMode = "photo" }: ContentDetailProps) => {
  return (
    <>
      <PageContainer className="max-w-4xl">
        <Button variant="ghost" asChild className="mb-8 -ml-4">
          <Link href={`/${backPath}`}><ArrowLeft className="w-4 h-4 mr-2" /> {backLabel}</Link>
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">{title}</h1>
        {date && <p className="text-sm text-muted-foreground mb-8">{date}</p>}

        {image && (
          <div className={`w-full mb-10 rounded-2xl overflow-hidden shadow-lg bg-muted flex items-center justify-center${imageMode === "poster" ? " p-4" : ""}`}>
            <img
              src={image}
              alt={title}
              className={imageMode === "poster"
                ? "max-w-full max-h-[600px] object-contain rounded-xl"
                : "w-full max-h-[500px] object-cover object-top"
              }
            />
          </div>
        )}

        <article className="prose prose-slate max-w-none text-muted-foreground leading-loose text-lg">
          {content}
        </article>
      </PageContainer>
    </>
  )
}
