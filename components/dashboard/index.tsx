import React from "react";
import { PageContainer } from "@/components/layouts/PageContainer";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Users, Calendar, Megaphone, LayoutDashboard, UserPlus, BookOpen, GraduationCap, Image as ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProtectedRoute from "../auth/ProtectedRoute";
import PostManagement from "./modules/PostManagement";
import AdminRegistration from "./modules/AdminRegistration";
import StudyProgramManagement from "./modules/StudyProgramManagement";
import CourseManagement from "./modules/CourseManagement";
import MediaManagement from "./modules/MediaManagement";

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
  return (
    <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
      <div className="pt-24 pb-12">
        <PageContainer>
          <div className="mb-8">
            <SectionHeader
              title="Dashboard Administrator"
              description="Ringkasan data Content Management System STTB."
            />
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
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
            </TabsList>

            <TabsContent value="overview" className="space-y-8 animate-in fade-in-50 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Berita" count={124} icon={FileText} />
                <StatCard title="Pendaftar Baru" count={48} icon={Users} />
                <StatCard title="Kegiatan Aktif" count={12} icon={Calendar} />
                <StatCard title="Publikasi Media" count={89} icon={Megaphone} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Aktivitas Terbaru</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 py-3 border-b last:border-0"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              Admin memperbarui artikel Berita
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {i * 2} jam yang lalu
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Akses Cepat</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <button className="text-left px-4 py-3 rounded-md bg-muted/50 hover:bg-muted font-medium text-sm transition-colors text-muted-foreground">
                        Kelola Pendaftar Admisi (Soon)
                      </button>
                      <button className="text-left px-4 py-3 rounded-md bg-muted/50 hover:bg-muted font-medium text-sm transition-colors text-muted-foreground">
                        Tambah Berita Baru (Soon)
                      </button>
                      <button className="text-left px-4 py-3 rounded-md bg-muted/50 hover:bg-muted font-medium text-sm transition-colors text-muted-foreground">
                        Tinjau Pengumuman (Soon)
                      </button>
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
          </Tabs>

        </PageContainer>
      </div>
    </ProtectedRoute>
  );
}

