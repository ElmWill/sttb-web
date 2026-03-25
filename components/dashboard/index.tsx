import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layouts/PageContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Users, Calendar, LayoutDashboard, UserPlus, BookOpen, GraduationCap, Image as ImageIcon, CalendarRange, ExternalLink, Newspaper, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedRoute from "../auth/ProtectedRoute";
import PostManagement from "./modules/PostManagement";
import AdminRegistration from "./modules/AdminRegistration";
import StudyProgramManagement from "./modules/StudyProgramManagement";
import CourseManagement from "./modules/CourseManagement";
import MediaManagement from "./modules/MediaManagement";
import EventManagement from "./modules/EventManagement";
import { usePostData } from "./hooks/usePostData";
import { useEventData } from "./hooks/useEventData";
import { useMediaData } from "./hooks/useMediaData";
import { usePostList } from "@/components/berita/hooks/usePostData";
import { useFetchWithAccessToken } from "@/functions/useFetchWithAccessToken";
import { BackendApiUrl } from "@/functions/BackendApiUrl";

const StatCard = ({
  title,
  count,
  icon: Icon,
}: {
  title: string;
  count: string | number;
  icon: any;
}) => (
  <Card>
    <CardContent className="p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-bold">{count}</h3>
      </div>
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="w-6 h-6" />
      </div>
    </CardContent>
  </Card>
);

export default function DashboardFeature() {
  const [activeTab, setActiveTab] = useState("overview");
  const { totalCount: postCount, isLoading: postsLoading } = usePostData(1);
  const { totalCount: eventCount, isLoading: eventsLoading } = useEventData(1);
  const { totalCount: mediaCount, isLoading: mediaLoading } = useMediaData(1);
  const { posts: recentPosts, isLoading: recentPostsLoading } = usePostList(1);
  const { fetchGET } = useFetchWithAccessToken();
  const [nonAdminUserCount, setNonAdminUserCount] = useState(0);
  const [isLoadingNonAdminUserCount, setIsLoadingNonAdminUserCount] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadNonAdminUsers = async () => {
      setIsLoadingNonAdminUserCount(true);
      try {
        let pageNumber = 1;
        const pageSize = 50;
        let totalCount = 0;
        let aggregatedCount = 0;

        while (true) {
          const query = new URLSearchParams({
            pageNumber: pageNumber.toString(),
            pageSize: pageSize.toString(),
          });

          const { data: response, error } = await fetchGET<any>(`${BackendApiUrl.getUserList}?${query.toString()}`);
          if (error || !response) break;

          const users = response.users || response.Users || [];
          totalCount = response.totalCount || response.TotalCount || 0;

          aggregatedCount += users.filter((u: any) => {
            const roleName = (u.roleName || u.RoleName || "").toLowerCase();
            return roleName !== "admin" && roleName !== "super_admin";
          }).length;

          if (users.length === 0 || pageNumber * pageSize >= totalCount) {
            break;
          }

          pageNumber += 1;
        }

        if (isMounted) {
          setNonAdminUserCount(aggregatedCount);
        }
      } finally {
        if (isMounted) {
          setIsLoadingNonAdminUserCount(false);
        }
      }
    };

    void loadNonAdminUsers();
    return () => {
      isMounted = false;
    };
  }, [fetchGET]);

  return (
    <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
      <div className="pt-24 pb-12">
        <PageContainer>
          <div className="mb-8">
            <SectionHeader
              title="Dashboard Administrator"
              // description="Ringkasan data Content Management System STTB."
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-background border p-1 h-auto flex-wrap justify-start">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 px-4">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Ikhtisar
              </TabsTrigger>
              <TabsTrigger value="posts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 px-4">
                <FileText className="w-4 h-4 mr-2" />
                Postingan
              </TabsTrigger>
              <TabsTrigger value="registration" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 px-4">
                <UserPlus className="w-4 h-4 mr-2" />
                Tambah Admin
              </TabsTrigger>
              <TabsTrigger value="programs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 px-4">
                <GraduationCap className="w-4 h-4 mr-2" />
                Program Studi
              </TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 px-4">
                <BookOpen className="w-4 h-4 mr-2" />
                Mata Kuliah
              </TabsTrigger>
              <TabsTrigger value="media" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 px-4">
                <ImageIcon className="w-4 h-4 mr-2" />
                Media
              </TabsTrigger>
              <TabsTrigger value="academic-calendar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 px-4">
                <CalendarRange className="w-4 h-4 mr-2" />
                Kalender Akademik
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8 animate-in fade-in-50 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Berita" count={postsLoading ? "..." : postCount} icon={FileText} />
                <StatCard title="Pendaftar Baru" count={isLoadingNonAdminUserCount ? "..." : nonAdminUserCount} icon={Users} />
                <StatCard title="Total Kegiatan" count={eventsLoading ? "..." : eventCount} icon={Calendar} />
                <StatCard title="Publikasi Media" count={mediaLoading ? "..." : mediaCount} icon={ImageIcon} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Postingan Terbaru</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {recentPostsLoading && (
                        <p className="text-sm text-muted-foreground py-4">Memuat...</p>
                      )}
                      {!recentPostsLoading && recentPosts.length === 0 && (
                        <p className="text-sm text-muted-foreground py-4">Belum ada postingan yang dipublikasikan.</p>
                      )}
                      {recentPosts.slice(0, 5).map((post) => {
                        const date = post.publishedAt || post.PublishedAt || post.createdAt || post.CreatedAt;
                        const title = post.title || (post as any).Title || "-";
                        return (
                          <div key={post.postId || (post as any).PostId} className="flex items-start gap-3 py-3 border-b last:border-0">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium line-clamp-1">{title}</p>
                              <p className="text-xs text-muted-foreground">
                                {date ? new Date(date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : ""}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Lihat di Situs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/berita"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 rounded-md bg-muted/50 hover:bg-muted font-medium text-sm transition-colors group"
                      >
                        <span className="flex items-center gap-2"><Newspaper className="w-4 h-4 text-muted-foreground" />Halaman Berita</span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </Link>
                      <Link
                        href="/kalender-akademik"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 rounded-md bg-muted/50 hover:bg-muted font-medium text-sm transition-colors group"
                      >
                        <span className="flex items-center gap-2"><CalendarRange className="w-4 h-4 text-muted-foreground" />Kalender Akademik</span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </Link>
                      <Link
                        href="/admisi/prosedur"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 rounded-md bg-muted/50 hover:bg-muted font-medium text-sm transition-colors group"
                      >
                        <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-muted-foreground" />Halaman Admisi</span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </Link>
                      <Link
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 rounded-md bg-muted/50 hover:bg-muted font-medium text-sm transition-colors group"
                      >
                        <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-muted-foreground" />Beranda Utama</span>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="posts" className="animate-in slide-in-from-left-2 duration-300">
              <Card>
                <CardContent className="pt-6">
                  <PostManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="registration" className="animate-in slide-in-from-left-2 duration-300">
              <Card>
                <CardContent className="pt-6">
                  <AdminRegistration />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="programs" className="animate-in slide-in-from-left-2 duration-300">
              <Card>
                <CardContent className="pt-6">
                  <StudyProgramManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="animate-in slide-in-from-left-2 duration-300">
              <Card>
                <CardContent className="pt-6">
                  <CourseManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="animate-in slide-in-from-left-2 duration-300">
              <Card>
                <CardContent className="pt-6">
                  <MediaManagement />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic-calendar" className="animate-in slide-in-from-left-2 duration-300">
              <Card>
                <CardContent className="pt-6">
                  <EventManagement />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </PageContainer>
      </div>
    </ProtectedRoute>
  );
}

