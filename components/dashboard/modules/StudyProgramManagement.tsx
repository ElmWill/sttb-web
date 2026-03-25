import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useStudyProgramData } from "../hooks/useStudyProgramData";
import { useFetchWithAccessToken } from "@/functions/useFetchWithAccessToken";
import { BackendApiUrl } from "@/functions/BackendApiUrl";
import { StudyProgram } from "@/types/Models";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Search, Edit2, Trash2, GraduationCap, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  programName: z.string().min(1, "Nama program wajib diisi"),
  degreeLevel: z.string().optional(),
  degreeTitle: z.string().optional(),
  totalCredits: z.preprocess(
    (val) => (val === "" || val === undefined || val === null ? undefined : Number(val)),
    z.number().optional()
  ),
  studyDuration: z.string().optional(),
  description: z.string().optional(),
});

type FormData = {
  programName: string;
  degreeLevel?: string;
  degreeTitle?: string;
  totalCredits?: number;
  studyDuration?: string;
  description?: string;
};

export default function StudyProgramManagement() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [courseSearchInput, setCourseSearchInput] = useState("");
  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);
  const [selectedCourseCategories, setSelectedCourseCategories] = useState<Record<number, number>>({});
  const [isLoadingProgramDetail, setIsLoadingProgramDetail] = useState(false);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [isLoadingAllCourses, setIsLoadingAllCourses] = useState(false);
  const [courseCategories, setCourseCategories] = useState<Array<{ categoryId: number; categoryName: string }>>([]);
  const [isLoadingCourseCategories, setIsLoadingCourseCategories] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, totalCount, isLoading, actions, isCreating, isUpdating, isDeleting } = useStudyProgramData(page, search);
  const { fetchGET } = useFetchWithAccessToken();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
  });

  const loadCourseCategories = useCallback(async () => {
    setIsLoadingCourseCategories(true);
    try {
      const { data: response, error } = await fetchGET<any>(BackendApiUrl.getCourseCategoryList);
      if (error || !response) {
        setCourseCategories([]);
        return;
      }

      const items = response.categories || response.Categories || [];
      const normalized = items.map((cat: any) => ({
        categoryId: cat.categoryId || cat.CategoryId,
        categoryName: cat.categoryName || cat.CategoryName || "Tanpa Kategori",
      }));

      setCourseCategories(normalized.filter((x: any) => x.categoryId));
    } finally {
      setIsLoadingCourseCategories(false);
    }
  }, [fetchGET]);

  const loadAllCourses = useCallback(async () => {
    setIsLoadingAllCourses(true);
    try {
      const aggregated: any[] = [];
      const pageSize = 100;
      let pageNumber = 1;
      let totalCountFromApi = 0;

      while (true) {
        const query = new URLSearchParams({
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString(),
        });
        const { data: response, error } = await fetchGET<any>(`${BackendApiUrl.getCourseList}?${query.toString()}`);
        if (error || !response) break;

        const items = response.courses || response.Courses || [];
        const total = response.totalCount || response.TotalCount || 0;
        totalCountFromApi = total;

        aggregated.push(...items);

        if (aggregated.length >= totalCountFromApi || items.length === 0) {
          break;
        }

        pageNumber += 1;
      }

      setAllCourses(aggregated);
    } finally {
      setIsLoadingAllCourses(false);
    }
  }, [fetchGET]);

  const filteredCourses = useMemo(() => {
    const keyword = courseSearchInput.trim().toLowerCase();
    if (!keyword) return allCourses;

    return allCourses.filter((course) => {
      const name = (course.courseName || course.CourseName || "").toLowerCase();
      return name.includes(keyword);
    });
  }, [allCourses, courseSearchInput]);

  useEffect(() => {
    const totalSks = selectedCourseIds.reduce((sum, selectedId) => {
      const selectedCourse = allCourses.find((course) => {
        const courseId = course.courseId || course.CourseId;
        return courseId === selectedId;
      });

      if (!selectedCourse) return sum;

      const credits = selectedCourse.credits ?? selectedCourse.Credits ?? 0;
      const numericCredits = Number(credits);
      return sum + (Number.isFinite(numericCredits) ? numericCredits : 0);
    }, 0);

    setValue("totalCredits", totalSks, { shouldValidate: true });
  }, [selectedCourseIds, allCourses, setValue]);

  const openCreateDialog = () => {
    setEditingProgram(null);
    setSelectedCourseIds([]);
    setSelectedCourseCategories({});
    setCourseSearchInput("");
    reset({
      programName: "",
      degreeLevel: "",
      degreeTitle: "",
      totalCredits: 0,
      studyDuration: "",
      description: "",
    });
    void loadAllCourses();
    void loadCourseCategories();
    setIsDialogOpen(true);
  };

  const openEditDialog = async (program: any) => {
    setEditingProgram(program);
    setSelectedCourseIds([]);
    setSelectedCourseCategories({});
    setCourseSearchInput("");
    reset({
      programName: program.programName,
      degreeLevel: program.degreeLevel || "",
      degreeTitle: program.degreeTitle || "",
      totalCredits: program.totalCredits || 0,
      studyDuration: program.studyDuration || "",
      description: program.description || "",
    });
    void loadAllCourses();
    void loadCourseCategories();
    setIsDialogOpen(true);

    const programId = program.programId || program.ProgramId;
    if (!programId) return;

    setIsLoadingProgramDetail(true);
    try {
      const detailUrl = `${BackendApiUrl.getStudyProgramById}/${programId}`;
      const { data: detail, error } = await fetchGET<StudyProgram>(detailUrl);
      if (error || !detail) return;

      const categories = detail.courseCategories || (detail as any).CourseCategories || [];
      const selectedIds = Array.from(
        new Set(
          categories
            .flatMap((cat: any) => cat.courses || cat.Courses || [])
            .map((course: any) => course.courseId || course.CourseId)
            .filter((id: any) => typeof id === "number" && id > 0)
        )
      );
      const selectedMap: Record<number, number> = {};
      categories.forEach((cat: any) => {
        const categoryId = cat.categoryId || cat.CategoryId;
        const courseItems = cat.courses || cat.Courses || [];
        courseItems.forEach((course: any) => {
          const cid = course.courseId || course.CourseId;
          if (cid && categoryId) {
            selectedMap[cid] = categoryId;
          }
        });
      });
      setSelectedCourseIds(selectedIds);
      setSelectedCourseCategories(selectedMap);
    } finally {
      setIsLoadingProgramDetail(false);
    }
  };

  const onSubmit = async (formData: FormData) => {
    let success = false;
    if (editingProgram) {
      success = await actions.onUpdate({
        ...formData,
        courseIds: selectedCourseIds,
        courseSelections: selectedCourseIds.map((courseId) => ({
          courseId,
          categoryId: selectedCourseCategories[courseId] || courseCategories[0]?.categoryId,
        })),
        programId: editingProgram.programId || editingProgram.ProgramId,
      });
    } else {
      success = await actions.onCreate({
        ...formData,
        courseIds: selectedCourseIds,
        courseSelections: selectedCourseIds.map((courseId) => ({
          courseId,
          categoryId: selectedCourseCategories[courseId] || courseCategories[0]?.categoryId,
        })),
      });
    }

    if (success) {
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus program studi ini?")) {
      await actions.onDelete(id);
    }
  };

  const toggleCourseSelection = (courseId: number) => {
    setSelectedCourseIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );

    setSelectedCourseCategories((prev) => {
      const next = { ...prev };
      if (selectedCourseIds.includes(courseId)) {
        delete next[courseId];
      } else if (!next[courseId] && courseCategories.length > 0) {
        next[courseId] = courseCategories[0].categoryId;
      }
      return next;
    });
  };

  const setCourseCategory = (courseId: number, categoryId: number) => {
    setSelectedCourseCategories((prev) => ({ ...prev, [courseId]: categoryId }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold">Kelola Program Studi</h2>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Prodi
        </Button>
      </div>

      <div className="flex items-center px-3 py-2 bg-muted/50 rounded-md max-w-md">
        <Search className="w-4 h-4 text-muted-foreground mr-2" />
        <input
          type="text"
          placeholder="Cari nama prodi..."
          className="bg-transparent border-none outline-none text-sm w-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Program</TableHead>
              <TableHead>Jenjang</TableHead>
              <TableHead>Gelar</TableHead>
              <TableHead>SKS</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memuat data...
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Tidak ada program studi ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              data.map((program) => (
                <TableRow key={program.programId}>
                  <TableCell className="font-medium">{program.programName}</TableCell>
                  <TableCell>{program.degreeLevel}</TableCell>
                  <TableCell>{program.degreeTitle}</TableCell>
                  <TableCell>{program.totalCredits}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(program)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(program.programId)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalCount > 0 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Menampilkan {Math.min((page - 1) * 10 + 1, totalCount)}–{Math.min(page * 10, totalCount)} dari {totalCount} data
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
              <ChevronLeft className="w-4 h-4" /> Sebelumnya
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={page * 10 >= totalCount}>
              Berikutnya <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[620px] overflow-hidden">
          <DialogHeader>
            <DialogTitle>{editingProgram ? "Edit Program Studi" : "Tambah Program Studi"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Program</label>
              <Input {...register("programName")} placeholder="Contoh: Sarjana Teologi" />
              {errors.programName && <p className="text-xs text-destructive">{errors.programName.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Jenjang</label>
                <Input {...register("degreeLevel")} placeholder="Contoh: S1" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gelar</label>
                <Input {...register("degreeTitle")} placeholder="Contoh: S.Th" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Total SKS</label>
                <Input
                  type="number"
                  {...register("totalCredits")}
                  readOnly
                  className="bg-muted/40"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Durasi Studi</label>
                <Input {...register("studyDuration")} placeholder="Contoh: 4 Tahun" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Deskripsi</label>
              <textarea
                {...register("description")}
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Deskripsi singkat program studi..."
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Mata Kuliah</label>
                <span className="text-xs text-muted-foreground">
                  {selectedCourseIds.length} dipilih
                </span>
              </div>

              <div className="flex items-center px-3 py-2 bg-muted/50 rounded-md">
                <Search className="w-4 h-4 text-muted-foreground mr-2" />
                <input
                  type="text"
                  placeholder="Cari mata kuliah..."
                  className="bg-transparent border-none outline-none text-sm w-full"
                  value={courseSearchInput}
                  onChange={(e) => setCourseSearchInput(e.target.value)}
                />
              </div>

              <div className="border rounded-md max-h-48 overflow-y-auto overflow-x-hidden">
                {isLoadingProgramDetail ? (
                  <div className="p-4 text-sm text-muted-foreground flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memuat mata kuliah program...
                  </div>
                ) : isLoadingAllCourses ? (
                  <div className="p-4 text-sm text-muted-foreground flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memuat daftar mata kuliah...
                  </div>
                ) : isLoadingCourseCategories ? (
                  <div className="p-4 text-sm text-muted-foreground flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memuat kategori mata kuliah...
                  </div>
                ) : filteredCourses.length === 0 ? (
                  <div className="p-4 text-sm text-muted-foreground">Tidak ada mata kuliah ditemukan.</div>
                ) : (
                  <div className="divide-y">
                    {filteredCourses.map((course) => {
                      const courseId = course.courseId || (course as any).CourseId;
                      const courseName = course.courseName || (course as any).CourseName;
                      const courseCredits = course.credits ?? (course as any).Credits;
                      return (
                        <label
                          key={courseId}
                          className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 px-3 py-2 hover:bg-muted/40 cursor-pointer"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <input
                              type="checkbox"
                              checked={selectedCourseIds.includes(courseId)}
                              onChange={() => toggleCourseSelection(courseId)}
                              className="h-4 w-4 rounded border-input"
                            />
                            <span className="flex-1 min-w-0 text-sm whitespace-normal break-words leading-snug">{courseName}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-muted-foreground w-12 text-right">
                              {courseCredits ?? "-"} SKS
                            </span>
                            <select
                              value={selectedCourseCategories[courseId] || ""}
                              onChange={(e) => setCourseCategory(courseId, Number(e.target.value))}
                              disabled={!selectedCourseIds.includes(courseId)}
                              className="h-8 rounded-md border border-input bg-background px-2 text-xs w-[145px] disabled:opacity-50"
                            >
                              <option value="" disabled>Pilih Kategori</option>
                              {courseCategories.map((cat) => (
                                <option key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</option>
                              ))}
                            </select>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
              <Button type="submit" disabled={isCreating || isUpdating}>
                {(isCreating || isUpdating) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
