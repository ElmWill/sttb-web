import { PageContainer } from "@/components/layouts/PageContainer";
import { ProgramHeader } from "./ProgramHeader";
import { ProgramInfo } from "./ProgramInfo";
import { CourseTable, CourseGroup } from "./CourseTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useStudyProgramDetail } from "../hooks/useStudyProgramData";

export default function ProgramDetailFeature({
  programSlug,
}: {
  programSlug: string;
}) {
  const { program, isLoading, error } = useStudyProgramDetail(programSlug);

  if (isLoading) {
    return (
      <PageContainer>
        <p className="text-center py-20 text-muted-foreground">
          Loading program...
        </p>
      </PageContainer>
    );
  }

  if (error || !program) {
    return (
      <PageContainer>
        <p className="text-center py-20 text-red-500">
          Program tidak ditemukan atau gagal mengambil data
        </p>
      </PageContainer>
    );
  }

  const courseCategoriesRaw = program.courseCategories || (program as any).CourseCategories || [];
  
  const categories: CourseGroup[] = courseCategoriesRaw.map((cat: any) => ({
    category: cat.categoryName || cat.CategoryName,
    courses: (cat.courses || cat.Courses || []).map((course: any) => ({
      name: course.courseName || course.CourseName,
      credits: course.credits ?? course.Credits ?? 0,
    })),
  }));

  return (
    <>
      <ProgramHeader
        title={program.programName || program.ProgramName || ""}
        description={program.description || program.Description || ""}
      />

      <PageContainer className="max-w-4xl">
        <ProgramInfo
          credits={program.totalCredits || program.TotalCredits || 0}
          duration={program.studyDuration || program.StudyDuration || ""}
          degree={`${program.degreeLevel || program.DegreeLevel || ""} (${program.degreeTitle || program.DegreeTitle || ""})`}
        />

        <CourseTable categories={categories} />

        <div className="mt-12 text-center p-8 bg-muted rounded-xl border">
          <h3 className="text-xl font-bold mb-4">
            Tertarik Mengambil Program Ini?
          </h3>

          <p className="text-muted-foreground mb-6">
            Jadwal gelombang admisi saat ini terbuka. Segera daftarkan diri
            Anda.
          </p>

          <Button size="lg" asChild>
            <Link href="/admisi/prosedur">Daftar Sekarang</Link>
          </Button>
        </div>
      </PageContainer>
    </>
  );
}
