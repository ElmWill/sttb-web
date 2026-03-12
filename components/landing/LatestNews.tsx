import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { PageContainer } from "@/components/layouts/PageContainer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import { usePostList } from "@/components/berita/hooks/usePostData"

export const LatestNews = () => {
  const { posts, isLoading } = usePostList(1);
  const latestPosts = posts.slice(0, 3);

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

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-full overflow-hidden animate-pulse">
              <div className="h-48 bg-muted w-full" />
              <CardHeader className="p-5 pb-2">
                <div className="h-3 bg-muted rounded w-1/3 mb-3" />
                <div className="h-5 bg-muted rounded w-full mb-2" />
                <div className="h-5 bg-muted rounded w-2/3" />
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : latestPosts.length === 0 ? null : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {latestPosts.map((news) => {
          const slug = news.slug || news.Slug || String(news.postId || news.PostId);
          const tag = news.categories?.[0] || "";
          const rawDate = news.publishedAt || news.PublishedAt || news.createdAt || news.CreatedAt || "";
          const date = rawDate
            ? new Date(rawDate).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
            : "";
          return (
          <Link href={`/berita/${slug}`} key={news.postId || slug} className="group block">
            <Card className="h-full overflow-hidden border-transparent shadow-sm hover:shadow-md transition-all group-hover:border-primary/20">
              <div className="h-48 bg-muted w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors" />
                {tag && (
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    {tag}
                  </div>
                )}
              </div>
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  {date}
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                  {news.title || news.Title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <span className="text-sm text-primary font-medium flex items-center h-8">
                  Baca selengkapnya <ArrowRight className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
                </span>
              </CardContent>
            </Card>
          </Link>
          );
        })}
      </div>
      )}
    </PageContainer>
  )
}
