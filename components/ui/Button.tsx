import Link from 'next/link'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export default function Button({
  children,
  href,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 inline-flex items-center justify-center'
  
  const variants = {
    primary: 'bg-black text-white hover:bg-neutral-900 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-accent-purple-800 to-accent-purple-700 text-white hover:opacity-90 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-neutral-300 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50',
  }

  const buttonContent = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.div>
  )

  if (href) {
    // Check if it's an external link (starts with http:// or https://)
    const isExternal = href.startsWith('http://') || href.startsWith('https://')
    
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
          {buttonContent}
        </a>
      )
    }
    
    return (
      <Link href={href} className="inline-block">
        {buttonContent}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className="inline-block">
      {buttonContent}
    </button>
  )
}

