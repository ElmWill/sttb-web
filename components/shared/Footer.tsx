import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Sekolah Tinggi Teologi Bandung</h3>
          <p className="text-sm text-secondary-foreground/80">
            Mempersiapkan pelayan Tuhan yang setia, berintegritas, dan berkompeten.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Tentang Kami</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/80">
            <li><Link href="/tentang/sejarah" className="hover:text-white">Sejarah</Link></li>
            <li><Link href="/tentang/visi-misi" className="hover:text-white">Visi & Misi</Link></li>
            <li><Link href="/tentang/dewan-dosen" className="hover:text-white">Dewan Dosen</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Informasi</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/80">
            <li><Link href="/admisi" className="hover:text-white">Admisi</Link></li>
            <li><Link href="/keuangan/biaya-studi" className="hover:text-white">Biaya Studi</Link></li>
            <li><Link href="/berita" className="hover:text-white">Berita</Link></li>
            <li><Link href="/kalender-akademik" className="hover:text-white">Kalender Akademik</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Hubungi Kami</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/80">
            <li>Jl. Dr. Junjunan No. 105, Bandung</li>
            <li>info@sttb.ac.id</li>
            <li>(022) 123-4567</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10 py-6 text-center text-sm text-secondary-foreground/60">
        &copy; {new Date().getFullYear()} Sekolah Tinggi Teologi Bandung. All rights reserved.
      </div>
    </footer>
  )
}
