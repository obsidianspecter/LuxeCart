"use client"

import Link from 'next/link'
import { motion } from "framer-motion"
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingBag, Zap, Shield, HeadphonesIcon } from 'lucide-react'
import Background3D from '@/components/3d-background'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Background3D />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
          <motion.h1 
            className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome to the Future of{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Shopping
            </span>
          </motion.h1>
          <motion.p 
            className="max-w-[42rem] text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Experience personalized recommendations and AI-powered assistance for a seamless shopping journey.
          </motion.p>
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/products">
              <Button size="lg">Shop Now</Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="lg">
                Browse Categories
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12">
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              icon: ShoppingBag,
              title: "Wide Selection",
              description: "Browse through thousands of products from top brands"
            },
            {
              icon: Zap,
              title: "Fast Delivery",
              description: "Get your orders delivered quickly and efficiently"
            },
            {
              icon: Shield,
              title: "Secure Shopping",
              description: "Your transactions are protected with top-tier security"
            },
            {
              icon: HeadphonesIcon,
              title: "24/7 Support",
              description: "Get help anytime with our AI-powered support"
            }
          ].map((feature, i) => (
            <motion.div key={i} variants={fadeIn}>
              <Card>
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="container py-12">
        <motion.div 
          className="flex items-center justify-between"
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-muted-foreground">
              Discover our handpicked selection of premium products
            </p>
          </div>
          <Link href="/products">
            <Button variant="ghost">View All</Button>
          </Link>
        </motion.div>
        <motion.div 
          className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div key={i} variants={fadeIn}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <img
                      src={`https://source.unsplash.com/random/400x400?product=${i}`}
                      alt="Product"
                      className="object-cover"
                    />
                    <Badge className="absolute right-2 top-2">New</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Product Name</h3>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold">$99.99</span>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}