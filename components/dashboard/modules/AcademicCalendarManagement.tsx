import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAcademicCalendarData } from "../hooks/useAcademicCalendarData";
import { useAuth } from "@/contexts/AuthContext";
import { BackendApiUrl } from "@/functions/BackendApiUrl";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  Plus, Search, Edit2, Trash2, Loader2, Eye,
  Image as ImageIcon, X, ChevronLeft, ChevronRight, CalendarDays,
} from "lucide-react";

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

function toDateLocal(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

interface AcademicCalendarForm {
  title: string;
  slug: string;
  description: string;
  academicYear: string;
  semester: string;
  eventType: string;
  startDate: string;
  endDate: string;
  status: string;
  featuredImageId: number | null;
  featuredImageUrl: string | null;
}

const emptyForm: AcademicCalendarForm = {
  title: "",
  slug: "",
  description: "",
  academicYear: "",
  semester: "Ganjil",
  eventType: "Perkuliahan",
  startDate: "",
  endDate: "",
  status: "published",
  featuredImageId: null,
  featuredImageUrl: null,
};

export default function AcademicCalendarManagement() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { data, totalCount, isLoading, actions, isCreating, isUpdating, isDeleting } =
    useAcademicCalendarData(page, search);
  const { user } = useAuth();

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<AcademicCalendarForm>(emptyForm);
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Auto-slug from title only when creating
  useEffect(() => {
    if (!editingId) {
      setForm((f) => ({ ...f, slug: toSlug(f.title) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title]);

  const openCreateDialog = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsDialogOpen(true);
  };

  const openEditDialog = async (id: number) => {
    setEditingId(id);
    setForm(emptyForm);
    setIsDialogOpen(true);
    setIsFetchingDetail(true);
    try {
      const res = await fetch(`${BackendApiUrl.getAcademicCalendarById}/${id}`);
      if (!res.ok) throw new Error("fetch failed");
      const cal = await res.json();
      setForm({
        title: cal.title || cal.Title || "",
        slug: cal.slug || cal.Slug || "",
        description: cal.description || cal.Description || "",
        academicYear: cal.academicYear || cal.AcademicYear || "",
        semester: cal.semester || cal.Semester || "Ganjil",
        eventType: cal.eventType || cal.EventType || "Perkuliahan",
        startDate: toDateLocal(cal.startDate || cal.StartDate),
        endDate: toDateLocal(cal.endDate || cal.EndDate),
        status: cal.status || cal.Status || "published",
        featuredImageId: cal.featuredImageId || cal.FeaturedImageId || null,
        featuredImageUrl: cal.featuredImageUrl || cal.FeaturedImageUrl || null,
      });
    } catch {
      alert("Gagal memuat data kalender akademik.");
      setIsDialogOpen(false);
    } finally {
      setIsFetchingDetail(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setIsUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("uploadedBy", user.userId.toString());
      const res = await fetch(BackendApiUrl.uploadMedia, {
        method: "POST",
        headers: user.token ? { Authorization: `Bearer ${user.token}` } : {},
        body: fd,
      });
      if (!res.ok) throw new Error("upload failed");
      const { mediaId, fileUrl } = await res.json();
      setForm((f) => ({ ...f, featuredImageId: mediaId, featuredImageUrl: fileUrl }));
    } catch {
      alert("Gagal mengunggah gambar.");
    } finally {
      setIsUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  };

  const resolveImgSrc = (url: string) => {
    if (url.startsWith("http") || url.startsWith("/")) return url;
    return `/uploads/${url}`;
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) return alert("Judul wajib diisi.");
    if (!form.startDate) return alert("Tanggal mulai wajib diisi.");
    const payload: any = {
      title: form.title,
      slug: form.slug,
      description: form.description,
      academicYear: form.academicYear,
      semester: form.semester,
      eventType: form.eventType,
      startDate: form.startDate ? new Date(form.startDate).toISOString() : null,
      endDate: form.endDate ? new Date(form.endDate).toISOString() : null,
      status: form.status,
      featuredImageId: form.featuredImageId,
    };
    const ok = editingId
      ? await actions.onUpdate(editingId, payload)
      : await actions.onCreate(payload);
    if (ok) setIsDialogOpen(false);
    else alert("Gagal menyimpan kalender akademik.");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus item kalender ini?")) {
      await actions.onDelete(id);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });

  const statusVariant = (status: string) =>
    status === "published" ? "default" : status === "archived" ? "destructive" : "secondary";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Kelola Kalender Akademik</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-2" /> Tambah Item Kalender
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center px-3 py-2 bg-muted/50 rounded-md max-w-md">
        <Search className="w-4 h-4 text-muted-foreground mr-2" />
        <input
          type="text"
          placeholder="Cari judul kalender..."
          className="bg-transparent border-none outline-none text-sm w-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Tanggal Mulai</TableHead>
              <TableHead>Tahun Akademik</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Memuat data...
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  Tidak ada item kalender ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              data.map((cal) => {
                const slug = cal.slug || (cal as any).Slug || "";
                const startDate = cal.startDate || (cal as any).StartDate || cal.createdAt;
                const academicYear = cal.academicYear || (cal as any).AcademicYear || "-";
                const semester = cal.semester || (cal as any).Semester || "-";
                const eventType = cal.eventType || (cal as any).EventType || "-";
                const status = cal.status || (cal as any).Status || "published";
                const id = cal.academicCalendarId || (cal as any).AcademicCalendarId;
                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {cal.title || (cal as any).Title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <CalendarDays className="w-3 h-3" />
                        {formatDate(startDate)}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{academicYear}</TableCell>
                    <TableCell className="text-sm">{semester}</TableCell>
                    <TableCell className="text-sm">{eventType}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(status)}>{status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {slug && (
                          <Button variant="ghost" size="icon" title="Lihat di web" asChild>
                            <Link href={`/kalender-akademik/${slug}`} target="_blank">
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" title="Edit" onClick={() => openEditDialog(id)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost" size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(id)}
                          disabled={isDeleting}
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <p>Total {totalCount} item kalender</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Sebelumnya
          </Button>
          <Button variant="outline" size="sm" disabled={data.length < 10} onClick={() => setPage(page + 1)}>
            Selanjutnya <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Item Kalender Akademik" : "Tambah Item Kalender Akademik"}
            </DialogTitle>
          </DialogHeader>

          {isFetchingDetail ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-4 py-2">
              {/* Title */}
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Judul <span className="text-destructive">*</span>
                </label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="Judul kegiatan kalender"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Slug</label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="url-slug-kalender"
                />
              </div>

              {/* Academic Year + Semester */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Tahun Akademik</label>
                  <Input
                    value={form.academicYear}
                    onChange={(e) => setForm((f) => ({ ...f, academicYear: e.target.value }))}
                    placeholder="contoh: 2025/2026"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Semester</label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={form.semester}
                    onChange={(e) => setForm((f) => ({ ...f, semester: e.target.value }))}
                  >
                    <option value="Ganjil">Ganjil</option>
                    <option value="Genap">Genap</option>
                    <option value="Keduanya">Keduanya</option>
                  </select>
                </div>
              </div>

              {/* Event Type */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Tipe Kegiatan</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={form.eventType}
                  onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value }))}
                >
                  <option value="Pendaftaran">Pendaftaran</option>
                  <option value="Perkuliahan">Perkuliahan</option>
                  <option value="UTS">UTS</option>
                  <option value="UAS">UAS</option>
                  <option value="Libur">Libur</option>
                  <option value="Wisuda">Wisuda</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Tanggal Mulai <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Tanggal Selesai</label>
                  <Input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Deskripsi</label>
                <textarea
                  rows={5}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Deskripsi kegiatan kalender akademik..."
                />
              </div>

              {/* Status */}
              <div className="space-y-1">
                <label className="text-sm font-medium">Status</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Featured Image */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Gambar Utama</label>
                <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                {(form.featuredImageId || form.featuredImageUrl) ? (
                  <div className="relative w-full h-40 rounded-md overflow-hidden border bg-muted group">
                    <img
                      src={form.featuredImageId
                        ? `/api/media-file/${form.featuredImageId}`
                        : resolveImgSrc(form.featuredImageUrl!)}
                      alt="Featured"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setForm((f) => ({ ...f, featuredImageId: null, featuredImageUrl: null }))}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div
                    className="w-full h-32 rounded-md border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
                    onClick={() => !isUploadingImage && imageInputRef.current?.click()}
                  >
                    {isUploadingImage ? (
                      <><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /><span className="text-sm text-muted-foreground">Mengunggah...</span></>
                    ) : (
                      <><ImageIcon className="w-6 h-6 text-muted-foreground/50" /><span className="text-sm text-muted-foreground">Klik untuk unggah gambar utama</span></>
                    )}
                  </div>
                )}
                {(form.featuredImageId || form.featuredImageUrl) && (
                  <Button type="button" variant="outline" size="sm" onClick={() => imageInputRef.current?.click()} disabled={isUploadingImage}>
                    {isUploadingImage ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ImageIcon className="w-4 h-4 mr-2" />}
                    Ganti Gambar
                  </Button>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isCreating || isUpdating || isFetchingDetail || isUploadingImage}
            >
              {(isCreating || isUpdating) && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {editingId ? "Simpan Perubahan" : "Buat Item Kalender"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
