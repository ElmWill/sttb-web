import React from "react"
import Head from "next/head"
import Link from "next/link"
import { AppSettings } from "@/functions/AppSettings"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | {AppSettings.appName}</title>
        <meta name="description" content="Masuk ke portal STTB" />
      </Head>
      <div className="min-h-screen flex flex-col md:flex-row">

        {/* Left Branding Panel */}
        <div className="hidden md:flex md:w-1/2 bg-primary flex-col justify-center items-center p-12 text-primary-foreground">
          <Link href="/" className="flex flex-col items-center gap-4 mb-12">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
              ST
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight">STT Bandung</h1>
              <p className="text-primary-foreground/70 text-sm uppercase tracking-widest mt-1">Teologi &amp; Pelayanan</p>
            </div>
          </Link>
          <blockquote className="text-center max-w-xs">
            <p className="text-lg font-medium leading-relaxed text-primary-foreground/90">
              &ldquo;Sebab itu pergilah, jadikanlah semua bangsa murid-Ku ...&rdquo;
            </p>
            <footer className="mt-3 text-sm text-primary-foreground/60">Matius 28:19</footer>
          </blockquote>
        </div>

        {/* Right Login Panel */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
          <div className="w-full max-w-sm">
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center gap-3 mb-8 justify-center">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground">
                ST
              </div>
              <span className="font-bold text-lg">STT Bandung</span>
            </div>

            <h2 className="text-3xl font-bold text-foreground mb-2">Selamat Datang</h2>
            <p className="text-muted-foreground mb-8">Masuk ke portal civitas akademika STTB.</p>

            <LoginForm />
          </div>
        </div>

      </div>
    </>
  )
}
