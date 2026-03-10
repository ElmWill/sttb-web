import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"

const recentNews = [
  { id: 1, title: "Ibadah Pembukaan Semester Ganjil 2024", date: "15 Agu 2024", tag: "Akademik", image: "/placeholders/news-1.jpg" },
  { id: 2, title: "Seminar Nasional Teologi Publik", date: "10 Agu 2024", tag: "Seminar", image: "/placeholders/news-2.jpg" },
  { id: 3, title: "Penerimaan Mahasiswa Baru Gelombang Terakhir", date: "05 Agu 2024", tag: "Admisi", image: "/placeholders/news-3.jpg" },
]

export const LatestNews = () => {
  return (
    <PageContainer>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <SectionHeader 
          title="Berita Terkini" 
          description="Kabar terbaru dari sivitas akademika STTB."
          className="mb-0"
        />
        <Button variant="ghost" className="mt-4 md:mt-0 flex items-center gap-2" asChild>
          <Link href="/berita">
            Lihat Semua Berita <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recentNews.map((news) => (
          <Link href={`/berita/${news.id}`} key={news.id} className="group block">
            <Card className="h-full overflow-hidden border-transparent shadow-sm hover:shadow-md transition-all group-hover:border-primary/20">
              <div className="h-48 bg-muted w-full relative overflow-hidden">
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  {news.tag}
                </div>
              </div>
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  {news.date}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                  {news.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <span className="text-sm text-primary font-medium flex items-center h-8">
                  Baca selengkapnya <ArrowRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}
