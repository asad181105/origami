'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-background-light/90 backdrop-blur-md border border-neutral-200 rounded-2xl shadow-lg max-w-7xl mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="The Origami AI Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
              priority
            />
            <span className="font-heading font-bold text-xl text-neutral-900">
              The Origami AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/what-we-do" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              What We Do
            </Link>
            <Link href="/how-it-works" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              How It Works
            </Link>
            <Link href="/agents" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              Our Agents
            </Link>
            <Link href="/contact" className="text-neutral-700 hover:text-neutral-900 transition-colors">
              Contact
            </Link>
            <Button href="/demo" variant="outline">
              Demo
            </Button>
            <Button href="/contact" variant="primary">
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-6 bg-neutral-900"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-6 bg-neutral-900"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-6 bg-neutral-900"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-200 bg-background-light rounded-b-2xl"
          >
            <div className="px-4 py-6 space-y-4">
              <Link
                href="/what-we-do"
                className="block text-neutral-700 hover:text-neutral-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                What We Do
              </Link>
              <Link
                href="/how-it-works"
                className="block text-neutral-700 hover:text-neutral-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/agents"
                className="block text-neutral-700 hover:text-neutral-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Our Agents
              </Link>
              <Link
                href="/contact"
                className="block text-neutral-700 hover:text-neutral-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Button href="/demo" variant="outline" className="w-full">
                Demo
              </Button>
              <Button href="/contact" variant="primary" className="w-full">
                Contact Us
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

