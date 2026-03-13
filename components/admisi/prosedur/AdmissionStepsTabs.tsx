import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    id: "step-1",
    label: "Tahap 1",
    title: "Memperoleh Formulir Pendaftaran",
    content: (
      <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
        <div>
          <h4 className="mb-2 text-lg font-semibold text-foreground">
            Melakukan pendaftaran awal ke sistem admisi online dengan mengakses alamat sis.sttb.ac.id/pmb
          </h4>
          <ul className="list-disc space-y-2 pl-5">
            <li>Setelah mengisi data maka formulir dapat diunduh di halaman situs berikutnya.</li>
            <li>Foto yang dilampirkan harus berbentuk format JPEG dan ukuran tidak lebih dari 400 kb.</li>
            <li>Jangan menggunakan tanda koma atau tanda baca apa pun dalam teks yang diketik.</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-lg font-semibold text-foreground">
            Form pendaftaran juga dapat diminta dengan menghubungi email xxxxxxx atau WhatsApp: xxxxxxxxx
          </h4>
          <ul className="list-disc space-y-2 pl-5">
            <li>Pengiriman form tidak dipungut biaya.</li>
            <li>Form dapat diperoleh secara hardcopy melalui pos atau secara softcopy melalui WhatsApp atau email sesuai permintaan pendaftar.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "step-2",
    label: "Tahap 2",
    title: "Mengisi Form dan Mempersiapkan Berkas",
    content: (
      <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
        <div>
          <h4 className="mb-2 text-lg font-semibold text-foreground">
            Mengisi 1 set formulir pendaftaran yang terdiri dari:
          </h4>
          <ul className="list-disc space-y-2 pl-5">
            <li>Form pendaftaran</li>
            <li>Form Kesaksian A (Pertobatan Pribadi)</li>
            <li>Form Kesaksian B (Panggilan Pelayanan)</li>
            <li>Form Data Kesehatan 1 & 2</li>
            <li>Form Data Keluarga</li>
            <li>Form Konfirmasi Dukungan Pembiayaan Studi</li>
            <li>Form Persetujuan 1 & 2</li>
            <li>Form Rekomendasi 1 (dari gembala atau pembina rohani)</li>
            <li>Form Rekomendasi 2 (dari teman atau rekan kerja)</li>
            <li>Form Rekomendasi 3 (dari guru, dosen, atau atasan)</li>
          </ul>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Bila ingin mengajukan permohonan beasiswa mohon hubungi petugas kami untuk memperoleh form pengajuan beasiswa.</li>
            <li>Form dapat diisi secara digital dan tidak perlu dicetak. Tanda tangan tetap wajib dicantumkan secara digital.</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-lg font-semibold text-foreground">
            Melampirkan dokumen dokumen tambahan yang juga menjadi syarat pendaftaran
          </h4>
          <ul className="list-disc space-y-2 pl-5">
            <li>Fotocopy Akte Kelahiran</li>
            <li>Fotocopy KTP</li>
            <li>Pasfoto terbaru berwarna ukuran 4 x 6</li>
            <li>Fotocopy Surat Kelulusan atau Ijazah</li>
            <li>Fotocopy Raport terakhir atau transkrip yang dilegalisir</li>
            <li>Fotocopy Kartu BPJS atau Kartu Indonesia Sehat atau Asuransi Kesehatan</li>
            <li>Paper Akademik atau book review bagi pendaftar studi S2</li>
          </ul>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Bila belum memiliki KTP harap cantumkan Kartu Pelajar.</li>
            <li>Bila ijazah belum terbit karena tanggal ujian belum berlangsung saat Anda mendaftar mohon sertakan surat keterangan dari sekolah bahwa Anda adalah pelajar kelas 3 yang akan menempuh ujian akhir.</li>
            <li>Bagi mahasiswa pindahan dari STT lain wajib menyerahkan surat pindah atau keluar dari STT tersebut dan menyerahkan transkrip terakhir.</li>
            <li>Bila gereja tempat Anda dibaptis memiliki baptis anak dan baptis sidi maka surat baptis sidi wajib dilampirkan sehingga ada 2 surat baptis.</li>
            <li>Bila tidak memiliki BPJS atau KIS maka Anda harus menyertakan surat pernyataan dari orang tua atau pribadi bahwa mereka akan menanggung biaya kesehatan atau pengobatan calon mahasiswa.</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-lg font-semibold text-foreground">
            Mengirimkan berkas berkas pendaftaran yang sudah lengkap sebelum periode pendaftaran berakhir ke alamat STT Bandung dan ditujukan kepada:
          </h4>
          <div className="rounded-lg border border-border bg-muted/30 p-4 text-foreground">
            <p>Bagian Admisi - Kantor STT Bandung</p>
            <p>Jl. Dr. Djunjunan 105</p>
            <p>Kelurahan Cicendo Kecamatan Andir</p>
            <p>Bandung, Jawa Barat 40173</p>
          </div>
          <p className="mt-4">
            Bagian Admisi STT Bandung akan menghubungi calon mahasiswa melalui email atau WhatsApp untuk mengkomunikasikan status dan kelengkapan pendaftaran calon mahasiswa maksimal 3 hari kerja setelah berkas diterima.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Berkas dapat dikirimkan secara hardcopy melalui pos atau secara softcopy.</li>
            <li>Berkas yang dikirimkan dalam bentuk softcopy dikirim melalui email: xxxx atau melalui WhatsApp: xxxxx.</li>
            <li>Jika belum mendapatkan email atau WhatsApp pemberitahuan calon mahasiswa dapat menghubungi bagian admisi STT Bandung.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "step-3",
    label: "Tahap 3",
    title: "Membayar Biaya Pendaftaran dan Tes Masuk",
    content: (
      <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
        <div>
          <h4 className="mb-2 text-lg font-semibold text-foreground">
            Membayar biaya formulir pendaftaran sebesar Rp500.000,-
          </h4>
          <p className="mb-3">Wajib ditransfer ke rekening BCA a.n. Yayasan STT Bandung, ac: 282 300 5555.</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Biaya pendaftaran tidak dapat dikembalikan.</li>
            <li>Berkas yang tidak disertai biaya pendaftaran tidak akan diproses untuk tes masuk.</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-lg font-semibold text-foreground">
            Mengirimkan bukti transfer melalui WhatsApp: xxxxxxx
          </h4>
        </div>
      </div>
    )
  },
  {
    id: "step-4",
    label: "Tahap 4",
    title: "Mengikuti Tes Seleksi Penerimaan",
    content: (
      <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
        <div>
          <h4 className="mb-2 text-lg font-semibold text-foreground">
            Berkas pendaftaran yang telah dikumpulkan akan diseleksi oleh direktur admisi STT Bandung
          </h4>
          <p>
            Setelah seleksi dokumen, surat panggilan tes dan instruksi detail mengenai pelaksanaan tes masuk akan dikirimkan via email dan pendaftar akan menerima notifikasi melalui WhatsApp.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Bila dokumen memenuhi persyaratan dan pembayaran telah dilunasi maka pendaftar akan menerima surat tes masuk.</li>
            <li>Pendaftar yang berkasnya tidak lolos seleksi dokumen pendaftaran tidak akan dipanggil untuk ikut tes.</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-lg font-semibold text-foreground">
            Mengikuti 5 tes penerimaan online yang meliputi:
          </h4>
          <ol className="list-decimal space-y-4 pl-5">
            <li>
              <div className="font-medium text-foreground">Psikotes (3 tahapan tes)</div>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>Pengisian form</li>
                <li>Tes bersama</li>
                <li>Wawancara dengan psikolog</li>
              </ul>
              <p className="mt-2">Psikotes bertujuan mengukur tingkat kecerdasan, sikap dan cara kerja, emosi, serta relasi sosial calon mahasiswa.</p>
            </li>
            <li>
              <div className="font-medium text-foreground">Pengetahuan Teologi</div>
              <p className="mt-2">Tes Pengetahuan Teologi menguji pengetahuan calon mahasiswa mengenai tokoh tokoh Alkitab, ayat ayat penting dalam Alkitab, serta pemahaman iman Kristen calon mahasiswa.</p>
            </li>
            <li>
              <div className="font-medium text-foreground">Bahasa Indonesia</div>
              <p className="mt-2">Tes Bahasa Indonesia menguji kemampuan calon mahasiswa dalam menyusun tata bahasa yang baik, memahami bacaan, dan menuliskan ide ide dalam Bahasa Indonesia.</p>
            </li>
            <li>
              <div className="font-medium text-foreground">Bahasa Inggris</div>
              <p className="mt-2">Tes Bahasa Inggris menguji kemampuan calon mahasiswa dalam menyusun tata bahasa yang baik, memahami bacaan, dan menuliskan ide ide dalam Bahasa Inggris.</p>
            </li>
            <li>
              <div className="font-medium text-foreground">Wawancara dengan dosen STTB</div>
              <p className="mt-2">Wawancara memiliki penilaian terbesar dalam tes masuk untuk menguji keseriusan panggilan dan rencana pelayanan mahasiswa di masa depan.</p>
            </li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: "step-5",
    label: "Tahap 5",
    title: "Pengumuman Penerimaan dan Konfirmasi MABA",
    content: (
      <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
        <div>
          <h4 className="mb-2 text-lg font-semibold text-foreground">
            Dalam kurun waktu 2 sampai 3 minggu setelah tanggal tes terakhir, pendaftar akan menerima pemberitahuan hasil penerimaan
          </h4>
          <ul className="list-disc space-y-2 pl-5">
            <li>Surat keputusan penerimaan akan dikirimkan melalui email dan WhatsApp.</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-lg font-semibold text-foreground">
            Calon mahasiswa yang diterima wajib mengisi dan mengembalikan form yang dikirimkan oleh petugas admisi STTB
          </h4>
          <ul className="list-disc space-y-2 pl-5">
            <li>Form konfirmasi yang menyatakan bersedia menjadi mahasiswa dikirimkan kembali kepada pihak STTB melalui email.</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-lg font-semibold text-foreground">
            Mahasiswa baru menyelesaikan pembayaran uang kuliah dan administrasi pertama lalu mengikuti proses orientasi
          </h4>
          <ul className="list-disc space-y-2 pl-5">
            <li>Mahasiswa resmi diterima dan selanjutnya proses studi mahasiswa akan ditangani oleh bagian kemahasiswaan dan akademik.</li>
          </ul>
        </div>
      </div>
    )
  }
]

export const AdmissionStepsTabs = () => {
  return (
    <Tabs defaultValue={steps[0].id} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto md:h-12 mb-8">
        {steps.map(step => (
          <TabsTrigger key={step.id} value={step.id} className="py-2.5">
            {step.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {steps.map((step, idx) => (
        <TabsContent key={step.id} value={step.id} className="mt-4 outline-none">
          <Card className="border-primary/20">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl shrink-0">
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  {step.content}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}
