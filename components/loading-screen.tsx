"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          <motion.div
            className="relative h-40 w-40"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {/* Primary Spinning Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary"
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0, 1, 1],
                rotate: [0, 360, 720],
                borderRadius: ["50%", "50%", "30%"]
              }}
              transition={{
                duration: 1.5,
                ease: [0.76, 0, 0.24, 1],
                repeat: Infinity
              }}
            />

            {/* Secondary Ring (Lighter Effect) */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary opacity-50"
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0, 1, 1],
                rotate: [0, -360, -720],
                borderRadius: ["50%", "50%", "30%"]
              }}
              transition={{
                duration: 1.5,
                ease: [0.76, 0, 0.24, 1],
                repeat: Infinity,
                delay: 0.5
              }}
            />

            {/* Brand Name / Logo */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-primary font-bold text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              LuxeCart
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
