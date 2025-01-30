"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { Laptop, Smartphone, Watch, Headphones, Camera, Gamepad, Tv, Speaker } from "lucide-react"

// Define categories
const categories = [
  { name: "Laptops", icon: Laptop, count: 124 },
  { name: "Smartphones", icon: Smartphone, count: 89 },
  { name: "Smartwatches", icon: Watch, count: 45 },
  { name: "Headphones", icon: Headphones, count: 67 },
  { name: "Cameras", icon: Camera, count: 34 },
  { name: "Gaming", icon: Gamepad, count: 78 },
  { name: "TVs", icon: Tv, count: 56 },
  { name: "Speakers", icon: Speaker, count: 43 },
]

// Page transition variants
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
  },
}

// Card animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function CategoriesPage() {
  return (
    <motion.div
      className="container py-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Title */}
      <motion.h1
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Shop by Category
      </motion.h1>

      {/* Categories Grid */}
      <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <motion.div
              key={category.name}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={`/categories/${category.name.toLowerCase()}`}
                className="group block focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              >
                <Card className="relative overflow-hidden border border-border rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary">
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="relative">
                      <Icon className="h-12 w-12 text-primary mb-2 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <CardTitle className="text-lg font-semibold transition-colors duration-200 group-hover:text-primary">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground transition-opacity duration-200 group-hover:opacity-80">
                      {category.count} Products
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
