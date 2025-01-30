"use client"

import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion } from "framer-motion"
import Image from "next/image"
import { useCart } from "@/components/contexts/CartContext"
import { useState, useEffect } from "react"

// This would typically come from your database
const categories = {
  laptops: {
    name: "Laptops",
    description: "Powerful laptops for work and play",
    products: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Premium Laptop ${i + 1}`,
      price: 999.99 + i * 100,
      image: `https://source.unsplash.com/random/400x400?laptop=${i + 1}`,
      isNew: i < 3,
    })),
  },
  // ... other categories
}

// Define animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" },
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const category = categories[slug as keyof typeof categories]

  if (!category) {
    notFound()
  }

  const { addToCart } = useCart()
  const [sortOrder, setSortOrder] = useState<"newest" | "price-low" | "price-high" | "popular">("newest")
  const [sortedProducts, setSortedProducts] = useState(category.products)

  useEffect(() => {
    let sorted = [...category.products]
    switch (sortOrder) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        sorted.sort((a, b) => b.price - a.price)
        break
      case "popular":
        sorted.sort((a, b) => b.id - a.id) // Placeholder for popularity sorting
        break
      case "newest":
      default:
        sorted.sort((a, b) => b.id - a.id)
        break
    }
    setSortedProducts(sorted)
  }, [sortOrder, category.products])

  return (
    <div className="container py-8">
      <motion.div initial="hidden" animate="visible">
        {/* Category Header with Animation */}
        <motion.div variants={fadeInUp}>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="text-muted-foreground mt-2">{category.description}</p>
        </motion.div>

        {/* Sorting Options with Animation */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between mt-6">
          <p className="text-muted-foreground">
            {category.products.length} products
          </p>
          <div className="flex gap-4">
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as any)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Products Grid with Staggered Animation */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {sortedProducts.map((product) => (
            <motion.div key={product.id} variants={cardVariants} whileHover="hover">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      placeholder="blur"
                      blurDataURL="/placeholder.png" // Ensure you have a placeholder image
                    />
                    {product.isNew && (
                      <Badge className="absolute right-2 top-2">New</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.name}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold">${product.price.toFixed(2)}</span>
                      <motion.button
                        className="px-4 py-2 bg-primary text-white rounded-lg"
                        onClick={() =>
                          addToCart({
                            id: product.id,
                            name: product.name,
                            category: category.name,
                            price: product.price,
                            image: product.image,
                          })
                        }
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Add ${product.name} to cart`}
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
