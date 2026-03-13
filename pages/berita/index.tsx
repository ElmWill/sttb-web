import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentList, ContentItem } from "@/components/shared/ContentList"
import { usePostList } from "@/components/berita/hooks/usePostData"

export default function Berita() {
  const { posts: postItems, isLoading, error } = usePostList(1);

  // Map Backend Posts to the Frontend ContentItem shape
  const posts: ContentItem[] = postItems.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    date: post.publishedAt 
      ? new Date(post.publishedAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      : new Date(post.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }),
    image: (post.featuredImageId || (post as any).FeaturedImageId)
      ? `/api/media-file/${post.featuredImageId || (post as any).FeaturedImageId}`
      : "/placeholders/berita-1.jpg",
  }));

  return (
    <>
      <Head><title>Berita Kampus | {AppSettings.appName}</title></Head>
      <div className="min-h-screen">
        {isLoading && <div className="p-8 text-center text-muted-foreground">Memuat Berita...</div>}
        {error && <div className="p-8 text-center text-destructive">Gagal memuat berita: {error.message || "Terjadi kesalahan"}</div>}
        {!isLoading && !error && (
          <ContentList 
            title="Berita STTB" 
            description="Kabar terkini seputar kehidupan kampus dan pelayanan." 
            basePath="berita" 
            items={posts} 
          />
        )}
      </div>
    </>
  )
}

Berita.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
