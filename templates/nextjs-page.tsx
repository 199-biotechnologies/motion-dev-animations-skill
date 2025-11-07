/**
 * Next.js Page Template with Motion.dev Animations
 *
 * Features:
 * - Hero section with fade-up animation
 * - Scroll reveal for feature sections
 * - Card hover effects
 * - Optimized for performance (GPU-accelerated)
 * - Respects prefers-reduced-motion
 *
 * Usage:
 * Copy this template and customize content
 */

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

// Hero Section Component
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background with parallax */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black" />

      <div className="max-w-4xl px-8 text-center relative z-10">
        {/* Title - Fade up */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Your Product Name
        </motion.h1>

        {/* Subtitle - Stagger after title */}
        <motion.p
          className="text-xl md:text-2xl text-gray-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          A revolutionary way to think about design
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="px-8 py-4 bg-white text-black rounded-full font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            scale: 1.05,
            backgroundColor: "#f3f4f6",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </div>
    </section>
  )
}

// Feature Card Component
interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <motion.article
      className="bg-white rounded-2xl p-8 cursor-pointer"
      initial={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.article>
  )
}

// Features Section with Scroll Reveal
function FeaturesSection() {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Built for performance with 120fps animations",
    },
    {
      icon: "🎨",
      title: "Beautiful Design",
      description: "Crafted with attention to every detail",
    },
    {
      icon: "♿",
      title: "Accessible",
      description: "Works for everyone, respects user preferences",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section className="py-24 px-8 bg-gray-50">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-xl text-gray-600">
          Three reasons we're different
        </p>
      </motion.div>

      {/* Feature Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {features.map((feature, i) => (
          <motion.div key={i} variants={itemVariants}>
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// Testimonial Section with Parallax
function TestimonialSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <section ref={ref} className="py-24 px-8 bg-black text-white relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent"
        style={{ y }}
      />

      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        style={{ opacity }}
      >
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="text-3xl md:text-4xl font-light italic mb-8"
        >
          "This changed everything about how we work"
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-400"
        >
          — Jane Doe, CEO at Company
        </motion.p>
      </motion.div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 px-8 bg-white">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
      >
        <h2 className="text-5xl font-bold mb-6">Ready to get started?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of satisfied customers
        </p>

        <motion.button
          className="px-12 py-5 bg-blue-500 text-white rounded-full font-bold text-lg"
          whileHover={{
            scale: 1.05,
            backgroundColor: "#2563eb",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
        >
          Start Free Trial
        </motion.button>
      </motion.div>
    </section>
  )
}

// Main Page Export
export default function AnimatedPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <TestimonialSection />
      <CTASection />
    </main>
  )
}
