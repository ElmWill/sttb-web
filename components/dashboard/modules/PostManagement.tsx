import React, { useState } from "react";
import { usePostData } from "../hooks/usePostData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit2, Trash2, Globe, Loader2 } from "lucide-react";

export default function PostManagement() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, totalCount, isLoading, actions, isDeleting } = usePostData(page, search);

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus postingan ini?")) {
      await actions.onDelete(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Kelola Postingan</h2>
        <Button onClick={() => alert("Fitur Tambah Postingan akan segera hadir")}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Baru
        </Button>
      </div>

      <div className="flex items-center px-3 py-2 bg-muted/50 rounded-md max-w-md">
        <Search className="w-4 h-4 text-muted-foreground mr-2" />
        <input
          type="text"
          placeholder="Cari judul postingan..."
          className="bg-transparent border-none outline-none text-sm w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Tanggal</TableHead>
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
                  Tidak ada postingan ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              data.map((post) => (
                <TableRow key={post.postId}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === "Published" ? "default" : "secondary"}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{post.authorName}</TableCell>
                  <TableCell>{new Date(post.createdAt).toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric' })}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(post.postId)}
                        disabled={isDeleting}
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      {post.status !== "Published" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Publish"
                          onClick={() => actions.onPublish(post.postId)}
                        >
                          <Globe className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <p>Total {totalCount} postingan</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={data.length < 10} // Simple check
          >
            Selanjutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
