# Scroll Reveal - Intersection Observer Fade-In

**Design Principle**: Progressive disclosure. Elements reveal themselves as user scrolls, creating a sense of discovery and maintaining engagement.

**Use Case**: Feature sections, testimonials, blog content, product showcases

**Performance**: Uses Intersection Observer (native browser API), GPU-accelerated

---

## React / Next.js Implementation

### Simple Scroll Reveal

```tsx
import { motion } from "motion/react"
import { useRef } from "react"

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
```

**Usage**:
```tsx
<ScrollReveal>
  <h2>This fades in when scrolled into view</h2>
  <p>Beautiful, performant, accessible.</p>
</ScrollReveal>
```

---

### Advanced: Different Directions

```tsx
type Direction = "up" | "down" | "left" | "right"

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: Direction
  delay?: number
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
}: ScrollRevealProps) {
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
```

**Usage**:
```tsx
<ScrollReveal direction="left" delay={0.1}>
  <h2>From left</h2>
</ScrollReveal>

<ScrollReveal direction="right" delay={0.2}>
  <p>From right</p>
</ScrollReveal>
```

---

### Staggered List Reveal

```tsx
import { motion } from "motion/react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 0.1s between each child
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

export function FeatureList({ features }: { features: string[] }) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-4"
    >
      {features.map((feature, i) => (
        <motion.li
          key={i}
          variants={itemVariants}
          className="p-6 bg-white rounded-xl shadow-lg"
        >
          {feature}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

---

## Vanilla JavaScript / Astro

```javascript
import { inView, animate } from "motion"

// Reveal all elements with class "reveal"
const revealElements = document.querySelectorAll(".reveal")

revealElements.forEach((element) => {
  inView(
    element,
    () => {
      animate(
        element,
        { opacity: [0, 1], y: [50, 0] },
        { duration: 0.6, easing: "ease-out" }
      )
    },
    { amount: 0.3 } // Trigger when 30% visible
  )
})
```

**HTML**:
```html
<div class="reveal">
  <h2>Appears on scroll</h2>
</div>

<div class="reveal">
  <p>This too!</p>
</div>
```

---

## With useInView Hook (More Control)

```tsx
import { motion } from "motion/react"
import { useInView } from "motion/react"
import { useRef } from "react"

export function AdvancedScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true, // Only animate once
    amount: 0.3, // Trigger when 30% visible
    margin: "0px 0px -100px 0px", // Offset trigger point
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
```

---

## Complete Example: Feature Section

```tsx
import { motion } from "motion/react"

const features = [
  { title: "Fast", description: "Lightning quick performance" },
  { title: "Beautiful", description: "Stunning visual design" },
  { title: "Accessible", description: "Works for everyone" },
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

export function FeaturesSection() {
  return (
    <section className="py-24 px-8 bg-gray-50">
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
```

---

## Customization Options

### Reveal Multiple Times (Not Just Once)
```tsx
viewport={{ once: false }}
```

### Trigger Earlier (Before Element Is Visible)
```tsx
viewport={{ margin: "0px 0px -200px 0px" }} // Trigger 200px before
```

### Only Trigger When Fully Visible
```tsx
viewport={{ amount: 1 }} // 100% visible required
```

### Slower, More Dramatic
```tsx
transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
```

---

## Design Notes

**Why this works:**
- **Intersection Observer** - Native browser API, very performant
- **once: true** - Prevents animation on every scroll (less distracting)
- **amount: 0.3** - Triggers early enough to complete before fully visible
- **Stagger** - Creates natural rhythm for lists

**When to use:**
- Feature grids
- Testimonial sections
- Blog post paragraphs
- Image galleries
- Pricing tables

**Avoid when:**
- Critical content (don't hide important info)
- Many elements on page (performance)
- User has prefers-reduced-motion
- Above the fold content (should be visible immediately)
