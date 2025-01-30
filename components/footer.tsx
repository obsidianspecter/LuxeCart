"use client"

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Github } from 'lucide-react'
import { motion } from "framer-motion"

// Animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export default function Footer() {
  return (
    <motion.footer
      className="w-full border-t bg-background"
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container grid grid-cols-1 gap-8 py-12 md:grid-cols-4">
        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold">About Us</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            LuxeCart is your premier destination for AI-powered shopping experiences,
            offering personalized recommendations and exceptional customer service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/deals" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Deals
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold">Customer Service</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                Shipping Information
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold">Connect With Us</h3>
          <div className="mt-4 flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-transform duration-200 hover:scale-110">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-transform duration-200 hover:scale-110">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-transform duration-200 hover:scale-110">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-transform duration-200 hover:scale-110">
              <Youtube className="h-5 w-5" />
            </Link>
            {/* GitHub Link */}
            <Link href="https://github.com/obsidianspecter" target="_blank" className="text-muted-foreground hover:text-primary transition-transform duration-200 hover:scale-110">
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <p className="text-sm text-muted-foreground">
            © 2024 LuxeCart. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
