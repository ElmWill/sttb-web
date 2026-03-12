import React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { AppSettings } from "@/functions/AppSettings"
import { MainLayout } from "@/components/layouts/MainLayout"
import { ContentDetail } from "@/components/shared/ContentDetail"
import { usePostDetail } from "@/components/berita/hooks/usePostData"

export default function BeritaDetail() {
  const router = useRouter()
  const { slug } = router.query
  const { post, isLoading, error } = usePostDetail(typeof slug === 'string' ? slug : null);

  const title = post?.title || (post as any)?.Title || (typeof slug === 'string' 
    ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : "Detail Berita")

  const publishedAt = post?.publishedAt || (post as any)?.PublishedAt
  const createdAt = post?.createdAt || (post as any)?.CreatedAt

  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
    : createdAt
    ? new Date(createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
    : ""

  if (isLoading) {
    return <div className="p-20 text-center text-muted-foreground">Memuat Konten...</div>
  }

  if (error || (!isLoading && !post)) {
    return <div className="p-20 text-center text-red-500">Berita tidak ditemukan</div>
  }

  return (
    <>
      <Head><title>{title} | {AppSettings.appName}</title></Head>
      <ContentDetail 
        title={title}
        date={date}
        image={
          (post?.featuredImageId || (post as any)?.FeaturedImageId)
            ? `/api/media-file/${post?.featuredImageId || (post as any)?.FeaturedImageId}`
            : post?.featuredImageUrl || "/placeholders/berita-hero.jpg"
        }
        backPath="berita"
        backLabel="Kembali ke Daftar Berita"
        content={
          <div dangerouslySetInnerHTML={{ __html: post?.content || (post as any)?.Content || "" }} />
        }
      />
    </>
  )
}

BeritaDetail.layout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>
