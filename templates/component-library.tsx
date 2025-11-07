/**
 * Reusable Animated Components Library
 *
 * Collection of common animated components following Apple/Jon Ive design principles.
 * Copy individual components as needed.
 */

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"
import { useRef, MouseEvent, ReactNode } from "react"

// ============================================================================
// 1. FADE UP (Entrance Animation)
// ============================================================================

interface FadeUpProps {
  children: ReactNode
  delay?: number
}

export function FadeUp({ children, delay = 0 }: FadeUpProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// 2. SCROLL REVEAL
// ============================================================================

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}

export function ScrollReveal({ children, direction = "up", delay = 0 }: ScrollRevealProps) {
  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// 3. HOVER CARD (Interactive Card)
// ============================================================================

interface HoverCardProps {
  children: ReactNode
  className?: string
}

export function HoverCard({ children, className = "" }: HoverCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-2xl p-6 cursor-pointer ${className}`}
      initial={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
      }}
      whileFocus={{
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
        outline: "2px solid #3b82f6",
        outlineOffset: "2px",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      tabIndex={0}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// 4. MAGNETIC BUTTON (Cursor Following)
// ============================================================================

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    x.set(distanceX * 0.3)
    y.set(distanceY * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      className={`px-8 py-4 bg-blue-500 text-white rounded-full font-medium ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

// ============================================================================
// 5. STAGGERED LIST
// ============================================================================

interface StaggeredListProps {
  items: ReactNode[]
  className?: string
}

export function StaggeredList({ items, className = "" }: StaggeredListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {items.map((item, i) => (
        <motion.li key={i} variants={itemVariants}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}

// ============================================================================
// 6. SCALE BUTTON (Simple Hover/Tap)
// ============================================================================

interface ScaleButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function ScaleButton({ children, className = "", onClick }: ScaleButtonProps) {
  return (
    <motion.button
      className={`px-6 py-3 bg-blue-500 text-white rounded-lg font-medium ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

// ============================================================================
// 7. ACCORDION (Expand/Collapse)
// ============================================================================

interface AccordionProps {
  title: string
  children: ReactNode
  isOpen: boolean
  onToggle: () => void
}

export function Accordion({ title, children, isOpen, onToggle }: AccordionProps) {
  return (
    <div className="border-b border-gray-200">
      <motion.button
        className="w-full py-4 text-left font-medium flex justify-between items-center"
        onClick={onToggle}
        whileHover={{ color: "#3b82f6" }}
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.2, delay: isOpen ? 0.1 : 0 },
        }}
        className="overflow-hidden"
      >
        <div className="pb-4 text-gray-600">{children}</div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// 8. MODAL (With Backdrop)
// ============================================================================

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl">
          {children}
        </div>
      </motion.div>
    </>
  )
}

// ============================================================================
// 9. LOADING SPINNER (Spring Animation)
// ============================================================================

export function LoadingSpinner() {
  return (
    <motion.div
      className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

// ============================================================================
// 10. TOGGLE SWITCH
// ============================================================================

interface ToggleSwitchProps {
  isOn: boolean
  onToggle: () => void
}

export function ToggleSwitch({ isOn, onToggle }: ToggleSwitchProps) {
  return (
    <motion.button
      className="relative w-14 h-8 rounded-full p-1"
      onClick={onToggle}
      animate={{
        backgroundColor: isOn ? "#3b82f6" : "#e5e7eb",
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow-md"
        animate={{
          x: isOn ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 30,
        }}
      />
    </motion.button>
  )
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/*
import {
  FadeUp,
  ScrollReveal,
  HoverCard,
  MagneticButton,
  ScaleButton,
  Accordion,
  Modal,
  LoadingSpinner,
  ToggleSwitch,
} from "./component-library"

export default function Example() {
  return (
    <>
      <FadeUp delay={0.1}>
        <h1>Hello World</h1>
      </FadeUp>

      <ScrollReveal direction="up">
        <HoverCard>
          <h3>Feature Card</h3>
        </HoverCard>
      </ScrollReveal>

      <MagneticButton onClick={() => console.log("Clicked!")}>
        Magnetic Button
      </MagneticButton>

      <ToggleSwitch isOn={isOn} onToggle={() => setIsOn(!isOn)} />
    </>
  )
}
*/
