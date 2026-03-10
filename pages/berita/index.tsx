import React from "react"
import Head from "next/head"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentList, ContentItem } from "@/components/shared/ContentList"
import useSWR from "swr"
import { useSwrFetcherWithAccessToken } from "@/functions/useSwrFetcherWithAccessToken"
import { GetPostList } from "@/functions/BackendApiUrl"
import { PagedResult, Post } from "@/types/Models"

export default function Berita() {
  const fetcher = useSwrFetcherWithAccessToken();
  const { data, isLoading, error } = useSWR<PagedResult<Post>>(
    GetPostList(1), // Fetching page 1 initially
    fetcher
  );

  // Map Backend Posts to the Frontend ContentItem shape
  const posts: ContentItem[] = data?.items?.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.content ? post.content.substring(0, 100) + "..." : "", // Simple excerpt
    date: new Date(post.createdAt).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }),
    image: post.featuredImageId ? `/api/media/${post.featuredImageId}` : "/placeholders/berita-1.jpg", 
  })) || [];

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
