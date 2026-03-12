import React, { useState, useRef, useEffect } from "react";
import { useMediaData } from "../hooks/useMediaData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Upload, Trash2, Search, Loader2, FileIcon, FileText, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function MediaManagement() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { data, totalCount, isLoading, actions, isUploading, isDeleting } = useMediaData(page, search);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadStatus, setUploadStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploadStatus(null);
    const success = await actions.onUpload(file, user.userId);
    
    if (success) {
      setUploadStatus({ success: true, message: "File berhasil diunggah." });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setTimeout(() => setUploadStatus(null), 3000);
    } else {
      setUploadStatus({ success: false, message: "Gagal mengunggah file. Silakan coba lagi." });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus media ini?")) {
      await actions.onDelete(id);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <ImageIcon className="w-4 h-4" />;
    if (fileType.includes("pdf")) return <FileText className="w-4 h-4 text-red-500" />;
    return <FileIcon className="w-4 h-4" />;
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <ImageIcon className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold">Perpustakaan Media</h2>
        </div>
        <div>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,application/pdf,.doc,.docx"
          />
          <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Mengunggah...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Unggah File
              </>
            )}
          </Button>
        </div>
      </div>

      {uploadStatus && (
        <div className={`p-3 rounded-lg border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
          uploadStatus.success 
            ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400" 
            : "bg-destructive/10 border-destructive/20 text-destructive"
        }`}>
          {uploadStatus.success ? <CheckCircle2 className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
          <p className="text-sm font-medium">{uploadStatus.message}</p>
        </div>
      )}

      <div className="flex items-center px-3 py-2 bg-muted/50 rounded-md max-w-md">
        <Search className="w-4 h-4 text-muted-foreground mr-2" />
        <input
          type="text"
          placeholder="Cari file..."
          className="bg-transparent border-none outline-none text-sm w-full"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Pratinjau</TableHead>
              <TableHead>Nama File</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Ukuran</TableHead>
              <TableHead>Tgl Unggah</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memuat data...
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Tidak ada media ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.mediaId || item.id}>
                  <TableCell>
                    <div className="w-10 h-10 rounded border bg-muted flex items-center justify-center overflow-hidden">
                      {item.fileType?.startsWith("image/") ? (
                        <img 
                          src={item.fileUrl || item.filePath} 
                          alt={item.fileName} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as any).src = "https://placehold.co/40x40?text=Error";
                          }}
                        />
                      ) : (
                        getFileIcon(item.fileType || "")
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate font-medium" title={item.fileName}>
                    {item.fileName}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{item.fileType}</TableCell>
                  <TableCell className="text-xs">{formatSize(item.fileSize || item.sizeBytes || 0)}</TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString("id-ID") : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        const id = item.mediaId || item.id;
                        if (id) handleDelete(id);
                      }}
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
            Menampilkan {Math.min((page - 1) * 10 + 1, totalCount)}–{Math.min(page * 10, totalCount)} dari {totalCount} file
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

      <div className="p-4 bg-muted/30 rounded-lg border border-dashed text-center">
        <p className="text-xs text-muted-foreground italic">
          Tip: Media yang diunggah dapat digunakan kembali di dalam artikel atau halaman statis.
          Beban maksimal per file adalah 10 MB.
        </p>
      </div>
    </div>
  );
}
