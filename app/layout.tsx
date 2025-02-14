import "./globals.css"
import { Montserrat, Merriweather } from "next/font/google"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { AuthProvider } from "./contexts/AuthContext"
import type React from "react"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
})

export const metadata = {
  title: "QuickCare",
  description: "Your trusted healthcare companion",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${merriweather.variable}`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gradient-to-br from-sky-100 to-white">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

