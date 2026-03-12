import React, { useState, useEffect } from "react";
import { useStudyProgramData } from "../hooks/useStudyProgramData";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, totalCount, isLoading, actions, isCreating, isUpdating, isDeleting } = useStudyProgramData(page, search);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
  });

  const openCreateDialog = () => {
    setEditingProgram(null);
    reset({
      programName: "",
      degreeLevel: "",
      degreeTitle: "",
      totalCredits: 0,
      studyDuration: "",
      description: "",
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (program: any) => {
    setEditingProgram(program);
    reset({
      programName: program.programName,
      degreeLevel: program.degreeLevel || "",
      degreeTitle: program.degreeTitle || "",
      totalCredits: program.totalCredits || 0,
      studyDuration: program.studyDuration || "",
      description: program.description || "",
    });
    setIsDialogOpen(true);
  };

  const onSubmit = async (formData: FormData) => {
    let success = false;
    if (editingProgram) {
      success = await actions.onUpdate({ ...formData, programId: editingProgram.programId });
    } else {
      success = await actions.onCreate(formData);
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
        <DialogContent className="sm:max-w-[500px]">
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
                <Input type="number" {...register("totalCredits")} />
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
