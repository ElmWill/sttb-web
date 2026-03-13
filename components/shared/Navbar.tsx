import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Menu, X, ChevronDown, GraduationCap, BookOpen, HeartHandshake, Users, Info, LogIn, LogOut, LayoutDashboard, CalendarDays, CalendarRange } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { usePermission } from "@/contexts/PermissionContext"

export const Navbar = () => {
  const headerRef = useRef<HTMLElement | null>(null)
  const mobileMenuScrollRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  const { isAdmin } = usePermission()
  const [activeTab, setActiveTab] = useState<string>("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuTop, setMobileMenuTop] = useState(80)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Close dropdown when route changes
  useEffect(() => {
    setActiveTab("")
    setIsMobileMenuOpen(false)
  }, [router.asPath])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (!headerRef.current) return
      setMobileMenuTop(Math.ceil(headerRef.current.getBoundingClientRect().height))
    }

    updateHeaderHeight()
    window.addEventListener("resize", updateHeaderHeight)

    return () => {
      window.removeEventListener("resize", updateHeaderHeight)
    }
  }, [isScrolled])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    requestAnimationFrame(() => {
      if (mobileMenuScrollRef.current) {
        mobileMenuScrollRef.current.scrollTop = 0
      }
    })

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMobileMenuOpen])

  const menuItems = [
    {
      value: "tentang",
      label: "Tentang Kami",
      icon: <Info className="h-5 w-5 mb-2 text-primary/80" />,
      mobileLinks: [
        { href: "/tentang", label: "Profil STTB", desc: "Mengenal STTB lebih dekat" },
        { href: "/tentang/sejarah", label: "Sejarah", desc: "Perjalanan STTB dari masa ke masa" },
        { href: "/tentang/visi-misi", label: "Visi & Misi", desc: "Arah dan tujuan institusi" },
        { href: "/tentang/pengakuan-iman", label: "Pengakuan Iman", desc: "Dasar teologis STTB" },
        { href: "/tentang/pendiri", label: "Pendiri", desc: "Tokoh di balik berdirinya STTB" },
        { href: "/tentang/mars", label: "Mars STTB", desc: "Lagu kebanggaan almamater" },
      ],
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="col-span-1 border-r border-border pr-6">
            <h4 className="text-lg font-bold text-primary mb-2">Profil STTB</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Mengenal lebih dekat Sekolah Tinggi Teologi Bandung, sejarah, dan nilai-nilai inti kami.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/tentang">Lihat Semua</Link>
            </Button>
          </div>
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Link href="/tentang/sejarah" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Sejarah</div>
                <div className="text-xs text-muted-foreground mt-1">Perjalanan STTB dari masa ke masa</div>
              </Link>
              <Link href="/tentang/visi-misi" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Visi & Misi</div>
                <div className="text-xs text-muted-foreground mt-1">Arah dan tujuan institusi</div>
              </Link>
              <Link href="/tentang/pengakuan-iman" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Pengakuan Iman</div>
                <div className="text-xs text-muted-foreground mt-1">Dasar teologis STTB</div>
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="/tentang/pendiri" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Pendiri</div>
                <div className="text-xs text-muted-foreground mt-1">Tokoh di balik berdirinya STTB</div>
              </Link>
              <Link href="/tentang/mars" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Mars STTB</div>
                <div className="text-xs text-muted-foreground mt-1">Lagu kebanggaan almamater</div>
              </Link>
            </div>
          </div>
        </div>
      )
    },
    {
      value: "akademik",
      label: "Akademik",
      icon: <GraduationCap className="h-5 w-5 mb-2 text-primary/80" />,
      mobileLinks: [
        { href: "/akademik", label: "Info Akademik", desc: "Gambaran umum akademik STTB" },
        { href: "/akademik/sarjana", label: "Program Sarjana (S1)", desc: "S.Th., S.Ag." },
        { href: "/akademik/magister", label: "Program Magister (S2)", desc: "M.Th., M.Ag." },
        { href: "/akademik/doktoral", label: "Program Doktoral (S3)", desc: "D.Th." },
        { href: "/kalender-akademik", label: "Kalender Akademik", desc: "Jadwal kegiatan perkuliahan" },
      ],
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="col-span-1 border-r border-border pr-6">
            <h4 className="text-lg font-bold text-primary mb-2">Program Studi</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Pilihan program pendidikan teologi berkualitas untuk memperlengkapi pelayan Tuhan.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/akademik">Info Akademik</Link>
            </Button>
          </div>
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Link href="/akademik/sarjana" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Program Sarjana (S1)</div>
                <div className="text-xs text-muted-foreground mt-1">S.Th., S.Ag.</div>
              </Link>
              <Link href="/akademik/magister" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Program Magister (S2)</div>
                <div className="text-xs text-muted-foreground mt-1">M.Th., M.Ag.</div>
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="/akademik/doktoral" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Program Doktoral (S3)</div>
                <div className="text-xs text-muted-foreground mt-1">D.Th.</div>
              </Link>
              <Link href="/kalender-akademik" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="flex items-center gap-1.5">
                  <CalendarRange className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                  <span className="font-medium group-hover:text-primary transition-colors">Kalender Akademik</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Jadwal kegiatan perkuliahan & UTS/UAS</div>
              </Link>
            </div>
          </div>
        </div>
      )
    },
    {
      value: "admisi",
      label: "Admisi",
      icon: <BookOpen className="h-5 w-5 mb-2 text-primary/80" />,
      mobileLinks: [
        { href: "/admisi/prosedur", label: "Prosedur", desc: "Langkah-langkah pendaftaran" },
        { href: "/admisi/jadwal", label: "Jadwal Admisi", desc: "Gelombang & tanggal penting" },
        { href: "/admisi/persyaratan", label: "Persyaratan", desc: "Dokumen yang dibutuhkan" },
        { href: "/admisi/faq", label: "FAQ", desc: "Pertanyaan yang sering diajukan" },
      ],
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="col-span-1 border-r border-border pr-6">
            <h4 className="text-lg font-bold text-primary mb-2">Penerimaan Mahasiswa Baru</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Bergabunglah bersama kami untuk dididik menjadi pelayan Tuhan yang setia.
            </p>
            <Button size="sm" asChild>
              <Link href="/admisi/prosedur">Daftar Sekarang</Link>
            </Button>
          </div>
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Link href="/admisi/jadwal" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Jadwal Admisi</div>
                <div className="text-xs text-muted-foreground mt-1">Gelombang & tanggal penting</div>
              </Link>
              <Link href="/admisi/prosedur" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Prosedur</div>
                <div className="text-xs text-muted-foreground mt-1">Langkah-langkah pendaftaran</div>
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="/admisi/persyaratan" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Persyaratan</div>
                <div className="text-xs text-muted-foreground mt-1">Dokumen yang dibutuhkan</div>
              </Link>
              <Link href="/admisi/faq" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">FAQ</div>
                <div className="text-xs text-muted-foreground mt-1">Pertanyaan yang sering diajukan</div>
              </Link>
            </div>
          </div>
        </div>
      )
    },
    {
      value: "keuangan",
      label: "Keuangan",
      icon: <HeartHandshake className="h-5 w-5 mb-2 text-primary/80" />,
      mobileLinks: [
        { href: "/keuangan/biaya-studi", label: "Biaya Studi", desc: "Rincian biaya pendidikan" },
        { href: "/keuangan/beasiswa", label: "Beasiswa", desc: "Program bantuan finansial" },
        { href: "/keuangan/dukung", label: "Dukung STTB", desc: "Menjadi mitra pelayanan kami" },
      ],
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="col-span-1 border-r border-border pr-6">
            <h4 className="text-lg font-bold text-primary mb-2">Informasi Keuangan</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Informasi mengenai biaya studi, beasiswa, dan peluang kemitraan.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/keuangan/dukung">Dukung STTB</Link>
            </Button>
          </div>
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Link href="/keuangan/biaya-studi" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Biaya Studi</div>
                <div className="text-xs text-muted-foreground mt-1">Rincian biaya pendidikan</div>
              </Link>
              <Link href="/keuangan/beasiswa" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Beasiswa</div>
                <div className="text-xs text-muted-foreground mt-1">Program bantuan finansial</div>
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="/keuangan/dukung" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Dukung STTB</div>
                <div className="text-xs text-muted-foreground mt-1">Menjadi mitra pelayanan kami</div>
              </Link>
            </div>
          </div>
        </div>
      )
    },
    {
      value: "kehidupan",
      label: "Kehidupan Kampus",
      icon: <Users className="h-5 w-5 mb-2 text-primary/80" />,
      mobileLinks: [
        { href: "/kehidupan-kampus", label: "Kehidupan Kampus", desc: "Pengalaman kampus STTB" },
        { href: "/kehidupan-kampus/fasilitas", label: "Fasilitas", desc: "Sarana prasarana kampus" },
        { href: "/kehidupan-kampus/pembinaan", label: "Pembinaan Spiritual", desc: "Kegiatan rohani mahasiswa" },
        { href: "/kehidupan-kampus/senat", label: "Senat Mahasiswa", desc: "Organisasi kemahasiswaan" },
        { href: "/kegiatan", label: "Kegiatan Kampus", desc: "Agenda & acara kampus" },
        { href: "/berita", label: "Berita", desc: "Kabar terkini dari STTB" },
      ],
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="col-span-1 border-r border-border pr-6">
            <h4 className="text-lg font-bold text-primary mb-2">Komunitas STTB</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Lebih dari sekadar belajar, temukan pengalaman pembentukan spiritual dan karakter.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/kehidupan-kampus">Selengkapnya</Link>
            </Button>
          </div>
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Link href="/kehidupan-kampus/fasilitas" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Fasilitas</div>
                <div className="text-xs text-muted-foreground mt-1">Sarana prasarana kampus</div>
              </Link>
              <Link href="/kehidupan-kampus/pembinaan" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Pembinaan Spiritual</div>
                <div className="text-xs text-muted-foreground mt-1">Kegiatan rohani mahasiswa</div>
              </Link>
              <Link href="/kehidupan-kampus/senat" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Senat Mahasiswa</div>
                <div className="text-xs text-muted-foreground mt-1">Organisasi kemahasiswaan</div>
              </Link>
            </div>
            <div className="space-y-3">
              <Link href="/kegiatan" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                  <span className="font-medium group-hover:text-primary transition-colors">Kegiatan Kampus</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">Agenda & acara kampus STTB</div>
              </Link>
              <Link href="/berita" className="block p-2 -mx-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group">
                <div className="font-medium group-hover:text-primary transition-colors">Berita</div>
                <div className="text-xs text-muted-foreground mt-1">Kabar terkini dari STTB</div>
              </Link>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-[70] w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 lg:backdrop-blur-md border-b border-border shadow-sm py-2" 
          : "bg-background border-b border-transparent py-4"
      }`}
      onMouseLeave={() => setActiveTab("")} // Close all menus when mouse leaves header
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-3 z-50 transition-transform hover:scale-105">
          <div className="w-11 h-11 rounded-lg bg-white border border-border/70 shadow-sm flex items-center justify-center p-1.5">
            <Image src="/images/logo/sttb-logo.svg" alt="Logo STTB" width={34} height={34} priority />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none tracking-tight">STT Bandung</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Bandung Theological Seminary</span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION (TABS MEGA MENU) */}
        <div className="hidden lg:flex flex-1 justify-center px-6">
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full max-w-3xl flex justify-center"
          >
            <TabsList className="bg-transparent h-auto p-0 space-x-1">
              {menuItems.map((item) => (
                <TabsTrigger 
                  key={item.value}
                  value={item.value}
                  onMouseEnter={() => setActiveTab(item.value)}
                  className="data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none bg-transparent hover:bg-accent hover:text-accent-foreground px-4 py-2.5 rounded-full transition-all duration-200"
                >
                  {item.label}
                  <ChevronDown className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${activeTab === item.value ? "rotate-180" : ""}`} />
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Render Mega Menu contents */}
            <div className="absolute top-full left-0 w-full px-4 lg:px-8 pt-4">
              <div 
                className={`w-full max-w-6xl mx-auto bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform origin-top ${
                  activeTab ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none absolute"
                }`}
              >
                {menuItems.map((item) => (
                  <TabsContent 
                    key={item.value} 
                    value={item.value}
                    className="p-8 m-0 mt-0 data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-50 data-[state=active]:slide-in-from-top-2"
                  >
                    {item.content}
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="hidden lg:flex items-center space-x-3 z-50">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Button variant="ghost" size="sm" asChild className="font-medium hover:text-primary hover:bg-primary/10">
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4 mr-1.5" />
                    Dashboard
                  </Link>
                </Button>
              )}
              <span className="text-sm text-muted-foreground hidden xl:block">{user?.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-1.5">
                <LogOut className="h-4 w-4" />
                Keluar
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="font-medium transition-colors hover:text-primary hover:bg-primary/10">
                <Link href="/auth/login">
                  <LogIn className="h-4 w-4 mr-1.5" />
                  Login
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button 
          className={`lg:hidden p-2 -mr-2 rounded-md z-[80] transition-colors ${
            isScrolled
              ? "text-foreground bg-background/90 border border-border shadow-sm"
              : "text-foreground hover:bg-accent"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

      </div>

      {/* MOBILE FULLSCREEN MENU */}
      <div 
        style={{ top: `${mobileMenuTop}px` }}
        className={`fixed left-0 right-0 bottom-0 bg-background/98 backdrop-blur-xl z-[60] lg:hidden transition-all duration-300 pt-6 pb-8 px-6 ${
          isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div ref={mobileMenuScrollRef} className="h-full overflow-y-auto">
          <div className="w-full max-w-md mx-auto space-y-8 pb-8">
            {menuItems.map((item) => (
              <div key={item.value} className="space-y-4">
                <div className="flex items-center space-x-3 text-lg font-bold text-primary border-b border-border/50 pb-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <div className="grid gap-1 pl-4">
                  {item.mobileLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-2 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="font-medium text-sm group-hover:text-primary transition-colors">{link.label}</div>
                      <div className="text-xs text-muted-foreground">{link.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="w-full max-w-md mx-auto pt-6 border-t border-border grid gap-3">
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Button variant="outline" className="w-full justify-center text-base h-12" asChild onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/dashboard"><LayoutDashboard className="h-4 w-4 mr-2" />Dashboard</Link>
                    </Button>
                  )}
                  <Button variant="destructive" className="w-full justify-center text-base h-12" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
                    <LogOut className="h-4 w-4 mr-2" />Keluar ({user?.name})
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full justify-center text-base h-12" asChild onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/auth/login"><LogIn className="h-4 w-4 mr-2" />Login</Link>
                  </Button>
                  <Button className="w-full justify-center text-base h-12" asChild onClick={() => setIsMobileMenuOpen(false)}>
                    <Link href="/admisi/prosedur">Daftar Sekarang</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

