import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "STUDYFLOW AI — Суралцах самбар",
  description: "Монгол хэл дээрх хувийн суралцах самбар"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="mn"><body>{children}</body></html>
}