"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

// Define animation variants
const tableRowVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  removed: { opacity: 0, x: 50, transition: { duration: 0.3 } },
}

const summaryVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Product 1",
      category: "Electronics",
      price: 199.99,
      quantity: 1,
      image: `https://source.unsplash.com/random/80x80?product=1`,
    },
    {
      id: 2,
      name: "Premium Product 2",
      category: "Electronics",
      price: 199.99,
      quantity: 1,
      image: `https://source.unsplash.com/random/80x80?product=2`,
    },
  ])

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  const shipping = subtotal > 0 ? 9.99 : 0
  const total = subtotal + shipping

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.tr
                    key={item.id}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="removed"
                    layout
                    className="border-b"
                  >
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20">
                          <Image
                            src={item.image}
                            alt={item.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <motion.button
                          className="p-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus className="h-4 w-4" />
                        </motion.button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <motion.button
                          className="p-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <motion.button
                        className="p-2 border rounded hover:bg-red-100 dark:hover:bg-red-900"
                        onClick={() => handleRemoveItem(item.id)}
                        whileHover={{ scale: 1.2, color: "#e53e3e" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>

          {/* Empty Cart Animation */}
          {cartItems.length === 0 && (
            <motion.p
              className="mt-4 text-center text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Your cart is empty.{" "}
              <Link href="/products" className="text-primary underline">
                Start shopping now!
              </Link>
            </motion.p>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <motion.div
            className="rounded-lg border p-6"
            variants={summaryVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <motion.button
              className="w-full mt-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-80 disabled:opacity-50"
              disabled={cartItems.length === 0}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Proceed to Checkout
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
