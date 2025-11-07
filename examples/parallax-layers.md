# Parallax Layers - Multi-Speed Scroll Effect

**Design Principle**: Depth through motion. Different layers move at different speeds, creating a sense of 3D depth and immersion.

**Use Case**: Hero backgrounds, storytelling sections, product showcases

**Performance**: Uses useScroll + useTransform, GPU-accelerated

---

## React / Next.js Implementation

### Simple Two-Layer Parallax

```tsx
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export function ParallaxHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // Track from element start to end
  })

  // Background moves slower (0.5x speed)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Foreground moves normal (1x speed is default scroll)
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background Layer - Slowest */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <img
          src="/mountains-bg.jpg"
          alt="Mountains"
          className="w-full h-[120%] object-cover"
        />
      </motion.div>

      {/* Foreground Layer - Faster */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ y: foregroundY }}
      >
        <h1 className="text-6xl font-bold text-white">
          Explore the Mountains
        </h1>
      </motion.div>
    </section>
  )
}
```

---

### Advanced: Multi-Layer Parallax (3+ Layers)

```tsx
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export function MultiLayerParallax() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Different speeds for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const midgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) // Moves up

  return (
    <section ref={ref} className="relative h-[150vh]">
      {/* Far Background - Slowest (Mountains) */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <img
          src="/mountains.jpg"
          alt="Mountains"
          className="w-full h-full object-cover opacity-70"
        />
      </motion.div>

      {/* Midground (Trees) */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ y: midgroundY }}
      >
        <img
          src="/trees.png"
          alt="Trees"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Foreground (Grass) */}
      <motion.div
        className="absolute inset-0 z-20"
        style={{ y: foregroundY }}
      >
        <img
          src="/grass.png"
          alt="Grass"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Text - Moves opposite direction */}
      <motion.div
        className="absolute inset-0 z-30 flex items-center justify-center"
        style={{ y: textY }}
      >
        <div className="text-center text-white">
          <h1 className="text-7xl font-bold mb-4">Journey Through Nature</h1>
          <p className="text-2xl">Discover the untold stories</p>
        </div>
      </motion.div>
    </section>
  )
}
```

---

### Horizontal Parallax (Cards)

```tsx
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export function HorizontalParallax() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Different cards move at different speeds
  const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const x2 = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"])
  const x3 = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]) // Static
  const x4 = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])

  return (
    <section ref={containerRef} className="py-24 overflow-hidden">
      <div className="flex gap-8 px-8">
        <motion.div style={{ x: x1 }} className="card">
          Card 1
        </motion.div>
        <motion.div style={{ x: x2 }} className="card">
          Card 2
        </motion.div>
        <motion.div style={{ x: x3 }} className="card">
          Card 3
        </motion.div>
        <motion.div style={{ x: x4 }} className="card">
          Card 4
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Vanilla JavaScript

```javascript
import { scroll } from "motion"

scroll(
  ({ y }) => {
    // Background layer - slow
    const background = document.querySelector(".parallax-bg")
    if (background) {
      background.style.transform = `translateY(${y.current * 0.5}px)`
    }

    // Foreground layer - faster
    const foreground = document.querySelector(".parallax-fg")
    if (foreground) {
      foreground.style.transform = `translateY(${y.current * 0.3}px)`
    }

    // Text - opposite direction
    const text = document.querySelector(".parallax-text")
    if (text) {
      text.style.transform = `translateY(${-y.current * 0.2}px)`
    }
  },
  { target: document.querySelector(".parallax-section") }
)
```

---

## With Scale + Opacity

```tsx
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export function ParallaxWithScale() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]) // Zoom in
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]) // Fade out

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          y,
          scale,
          opacity,
        }}
      >
        <img
          src="/hero-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-6xl font-bold text-white">
          Parallax with Scale
        </h1>
      </div>
    </section>
  )
}
```

---

## Performance Optimization

```tsx
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export function OptimizedParallax() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          y,
          willChange: "transform", // Performance hint
        }}
      >
        <img
          src="/bg.jpg"
          alt="Background"
          className="w-full h-full object-cover"
          loading="eager" // Load immediately for above-fold
          fetchPriority="high"
        />
      </motion.div>
    </section>
  )
}
```

---

## With Reduced Motion Support

```tsx
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { useRef } from "react"

export function AccessibleParallax() {
  const ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Disable parallax if user prefers reduced motion
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "50%"]
  )

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src="/bg.jpg" alt="Background" className="w-full h-full object-cover" />
      </motion.div>
    </section>
  )
}
```

---

## Design Notes

**Why this works:**
- **Depth perception** - Different speeds create 3D illusion
- **Engagement** - Encourages scrolling, creates discovery
- **Visual interest** - More dynamic than static backgrounds
- **Storytelling** - Can reveal elements progressively

**Parallax speeds:**
- **0.1-0.3x** - Very slow (far background, mountains)
- **0.4-0.6x** - Medium (mid-ground, trees)
- **0.7-0.9x** - Fast (foreground, grass)
- **1.0x** - Normal scroll speed (default)
- **-0.2x to -0.5x** - Reverse (text moving up)

**When to use:**
- Hero sections
- Product showcases
- Storytelling pages
- Portfolio headers
- Landing pages

**Avoid when:**
- User has prefers-reduced-motion
- Mobile with poor performance
- Critical content (accessibility concern)
- Too many layers (performance)
- Horizontal scrolling sections

**Performance tips:**
- Use transforms only (not top/left)
- Add `will-change: transform`
- Limit number of layers (3-5 max)
- Use `offset` to only animate when in view
- Test on lower-end devices
