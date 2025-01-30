"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Chatbot from "@/components/chat-bot"
import LoadingScreen from "@/components/loading-screen"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { CartProvider } from "@/components/contexts/CartContext"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading-screen"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeOut" } }}
                >
                  <LoadingScreen />
                </motion.div>
              ) : (
                <motion.div
                  key="main-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
                  className="flex min-h-screen flex-col"
                >
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <Chatbot />
                </motion.div>
              )}
            </AnimatePresence>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
