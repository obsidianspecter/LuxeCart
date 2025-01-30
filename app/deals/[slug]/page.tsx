"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Timer, Percent, Tag, Gift, TrendingUp, ShoppingCart, CreditCard } from "lucide-react"

// Mock product data
const products = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: (Math.random() * 200 + 50).toFixed(2),
  discount: Math.floor(Math.random() * 30) + 10, // 10-30% discount
  image: `https://source.unsplash.com/random/400x400?product=${i + 1}`,
}))

// Deal configuration based on slug
const dealConfig = {
  "flash-sale": {
    title: "🔥 Limited-Time Flash Sale!",
    icon: Timer,
    description: "Hurry up! These discounts are valid only for a short time.",
    hasCountdown: true,
    endTime: new Date().getTime() + 1000 * 60 * 10, // 10 minutes from now
  },
  "exclusive-offers": {
    title: "⭐ Exclusive Offers",
    icon: Tag,
    description: "Get the best exclusive deals available only on LuxeCart.",
  },
  bundles: {
    title: "🎁 Bundles & Combos",
    icon: Gift,
    description: "Save more when you buy in bundles! Check out our combos.",
  },
  trending: {
    title: "🔥 Trending Deals",
    icon: TrendingUp,
    description: "Discover the hottest deals that are trending right now!",
  },
}

// Framer Motion page transition
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.1 },
  },
}

// Countdown timer hook
function useCountdown(targetTime: number) {
  const [timeLeft, setTimeLeft] = useState(targetTime - new Date().getTime())

  useEffect(() => {
    if (timeLeft <= 0) return
    const interval = setInterval(() => {
      setTimeLeft(targetTime - new Date().getTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [targetTime, timeLeft])

  return timeLeft
}

export default function DealPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const deal = dealConfig[slug as keyof typeof dealConfig]
  const countdown = deal?.hasCountdown ? useCountdown(deal.endTime!) : null

  if (!deal) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-3xl font-bold text-red-600">❌ Deal Not Found</h1>
        <p className="mt-2 text-muted-foreground">Sorry, this deal does not exist.</p>
      </div>
    )
  }

  return (
    <motion.div className="container py-8" variants={pageVariants} initial="hidden" animate="visible">
      {/* Deal Header */}
      <motion.div className="mb-8 text-center" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <deal.icon className="h-12 w-12 text-primary mx-auto mb-3" />
        <h1 className="text-3xl font-bold">{deal.title}</h1>
        <p className="mt-2 text-muted-foreground">{deal.description}</p>
      </motion.div>

      {/* Countdown Timer for Flash Sale */}
      {deal.hasCountdown && countdown! > 0 && (
        <motion.div className="mb-6 flex justify-center items-center gap-2 p-3 bg-red-100 dark:bg-red-900 rounded-lg">
          <Timer className="h-5 w-5 text-red-600 dark:text-red-400" />
          <span className="text-lg font-semibold text-red-600 dark:text-red-400">
            Deal Ends In: {new Date(countdown!).toISOString().substr(14, 5)}
          </span>
        </motion.div>
      )}

      {/* Products on Sale */}
      <motion.div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <motion.div key={product.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card className="relative overflow-hidden border border-border rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary">
              {/* Discount Badge */}
              <Badge className="absolute left-2 top-2 bg-red-500 text-white">{product.discount}% OFF</Badge>
              <CardHeader className="flex flex-col items-center text-center">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
                <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg font-bold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</p>
                <p className="text-sm text-muted-foreground line-through">${product.price}</p>

                {/* Buttons Section */}
                <div className="mt-4 flex justify-center gap-3">
                  <motion.button
                    className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert(`Added ${product.name} to cart`)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </motion.button>

                  <motion.button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert(`Buying ${product.name} now`)}
                  >
                    <CreditCard className="h-4 w-4" />
                    Buy Now
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
