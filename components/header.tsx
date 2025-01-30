"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useCart } from '@/components/contexts/CartContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  ShoppingCart,
  Search,
  Menu,
  Sun,
  Moon,
  User,
  Heart
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { cart } = useCart() // Access global cart
  const [scrolling, setScrolling] = useState(false)

  // Detect scroll for header background effect
  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        "fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg transition-all duration-300",
        scrolling ? "shadow-lg bg-background/80" : ""
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/products" className="text-sm font-medium hover:text-primary">
                Products
              </Link>
              <Link href="/categories" className="text-sm font-medium hover:text-primary">
                Categories
              </Link>
              <Link href="/deals" className="text-sm font-medium hover:text-primary">
                Deals
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <motion.span
            className="hidden font-bold sm:inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            LuxeCart
          </motion.span>
        </Link>

        {/* Navbar Links (Desktop) */}
        <nav className="hidden lg:flex lg:items-center lg:gap-6 text-sm font-medium">
          <Link href="/products" className="transition hover:text-primary">
            Products
          </Link>
          <Link href="/categories" className="transition hover:text-primary">
            Categories
          </Link>
          <Link href="/deals" className="transition hover:text-primary">
            Deals
          </Link>
        </nav>

        {/* Right Side Icons */}
        <div className="flex flex-1 items-center justify-end gap-4">
          {/* Search Icon */}
          <motion.button
            className="mr-2"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Sun className="h-5 w-5 rotate-0 transition dark:-rotate-90" />
            <Moon className="absolute h-5 w-5 rotate-90 transition dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </motion.button>

          {/* Wishlist */}
          <Link href="/wishlist">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </motion.button>
          </Link>

          {/* Account */}
          <Link href="/account">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </motion.button>
          </Link>

          {/* Cart Button with Floating Count */}
          <Link href="/cart" className="relative">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative flex items-center justify-center p-2 bg-primary text-white rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cart.length}
                </span>
              )}
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Search Bar (Appears when active) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="container pb-4"
          >
            <div className="flex gap-4">
              <Input type="search" placeholder="Search products..." className="flex-1" />
              <Button>Search</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
