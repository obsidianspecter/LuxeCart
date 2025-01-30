"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { Percent, Tag, Gift, TrendingUp } from "lucide-react"

// Define deals
const deals = [
  { name: "Flash Sale", icon: Percent, discount: "Up to 50% Off", link: "/deals/flash-sale" },
  { name: "Exclusive Offers", icon: Tag, discount: "Limited-Time Discounts", link: "/deals/exclusive-offers" },
  { name: "Bundles & Combos", icon: Gift, discount: "Save More on Combos", link: "/deals/bundles" },
  { name: "Top Trending", icon: TrendingUp, discount: "Hottest Deals Right Now", link: "/deals/trending" },
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

export default function DealsPage() {
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
        Best Deals & Offers
      </motion.h1>

      {/* Deals Grid */}
      <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {deals.map((deal) => {
          const Icon = deal.icon
          return (
            <motion.div
              key={deal.name}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={deal.link}
                className="group block focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              >
                <Card className="relative overflow-hidden border border-border rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary">
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="relative">
                      <Icon className="h-12 w-12 text-primary mb-2 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <CardTitle className="text-lg font-semibold transition-colors duration-200 group-hover:text-primary">
                      {deal.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground transition-opacity duration-200 group-hover:opacity-80">
                      {deal.discount}
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
