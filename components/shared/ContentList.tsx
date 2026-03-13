import React from "react"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export interface ContentItem {
  slug: string
  title: string
  excerpt: string
  date: string
  image: string
}

interface ContentListProps {
  title: string
  description: string
  basePath: string
  items: ContentItem[]
}

export const ContentList = ({ title, description, basePath, items }: ContentListProps) => {
  return (
    <>
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(item => (
            <Card key={item.slug} className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 w-full bg-cover bg-center bg-muted" style={{ backgroundImage: `url(${item.image})` }} />
              <CardHeader>
                <div className="text-xs text-muted-foreground mb-2">{item.date}</div>
                <CardTitle className="text-xl line-clamp-2">{item.title}</CardTitle>
                <CardDescription className="line-clamp-3 mt-2">{item.excerpt}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/${basePath}/${item.slug}`}>Baca Selengkapnya</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageContainer>
    </>
  )
}
