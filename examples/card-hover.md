# Card Hover - Elegant Lift with Shadow

**Design Principle**: Delightful feedback. Cards gently lift and cast a shadow on hover, creating tactile depth and encouraging interaction.

**Use Case**: Product cards, blog posts, portfolio items, feature grids

**Performance**: GPU-accelerated transforms, instant response

---

## React / Next.js Implementation

### Basic Card Hover

```tsx
import { motion } from "motion/react"

export function HoverCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 cursor-pointer"
      whileHover={{
        y: -8, // Lift up 8px
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)", // Elevated shadow
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}
```

**Usage**:
```tsx
<HoverCard>
  <h3>Product Name</h3>
  <p>Beautiful description</p>
</HoverCard>
```

---

### Advanced: Scale + Shadow + Border Glow

```tsx
import { motion } from "motion/react"

export function PremiumCard({
  title,
  description,
  image,
}: {
  title: string
  description: string
  image: string
}) {
  return (
    <motion.article
      className="bg-white rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent"
      initial={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}
      whileHover={{
        y: -12,
        scale: 1.02,
        boxShadow: "0 24px 48px rgba(0, 0, 0, 0.15)",
        borderColor: "rgba(59, 130, 246, 0.5)", // Blue glow
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <motion.img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>

        <motion.button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </div>
    </motion.article>
  )
}
```

---

### Apple-Style: Minimal Lift + Subtle Scale

```tsx
import { motion } from "motion/react"

export function AppleCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="bg-white rounded-3xl p-8 shadow-sm"
      whileHover={{
        y: -4, // Very subtle lift
        scale: 1.01, // Barely noticeable scale
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
      style={{ willChange: "transform" }} // Performance hint
    >
      {children}
    </motion.div>
  )
}
```

---

## Grid of Cards with Stagger

```tsx
import { motion } from "motion/react"

const products = [
  { id: 1, title: "Product 1", price: "$99" },
  { id: 2, title: "Product 2", price: "$149" },
  { id: 3, title: "Product 3", price: "$199" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function ProductGrid() {
  return (
    <motion.div
      className="grid md:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={cardVariants}
          whileHover={{
            y: -8,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
          }}
          className="bg-white rounded-2xl p-6 cursor-pointer"
        >
          <h3 className="text-xl font-bold">{product.title}</h3>
          <p className="text-2xl font-bold mt-2">{product.price}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
```

---

## Vanilla JavaScript

```javascript
import { animate } from "motion"

const cards = document.querySelectorAll(".card")

cards.forEach((card) => {
  // Hover in
  card.addEventListener("mouseenter", () => {
    animate(
      card,
      {
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
      },
      {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    )
  })

  // Hover out
  card.addEventListener("mouseleave", () => {
    animate(
      card,
      {
        y: 0,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
      },
      {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    )
  })
})
```

---

## With Click Animation

```tsx
import { motion } from "motion/react"

export function InteractiveCard({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 cursor-pointer"
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
      }}
      whileTap={{
        scale: 0.98, // Slight press-down effect
        y: -4, // Less lift when tapping
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      onClick={onClick}
    >
      <h3>Click me</h3>
    </motion.div>
  )
}
```

---

## Accessibility: Keyboard Focus State

```tsx
import { motion } from "motion/react"

export function AccessibleCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 cursor-pointer focus:outline-none"
      tabIndex={0} // Make keyboard focusable
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
      }}
      whileFocus={{
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
        outline: "2px solid #3b82f6", // Blue focus ring
        outlineOffset: "2px",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}
```

---

## Customization Options

### Subtle (Apple-Style)
```tsx
whileHover={{ y: -2, scale: 1.005 }}
```

### Dramatic (Product Showcase)
```tsx
whileHover={{ y: -16, scale: 1.05, rotate: 2 }}
```

### Glow Effect
```tsx
whileHover={{
  y: -8,
  boxShadow: "0 20px 60px rgba(59, 130, 246, 0.4)", // Blue glow
}}
```

### Slower, Smoother
```tsx
transition={{ duration: 0.4, ease: "easeOut" }}
```

---

## Design Notes

**Why this works:**
- **Lift (y: -8)** - Creates tactile depth, suggests clickability
- **Shadow** - Reinforces elevation, adds realism
- **Spring physics** - Natural, organic response
- **Instant feedback** - User knows it's interactive

**When to use:**
- Product cards
- Blog post previews
- Portfolio items
- Feature grids
- Team member cards
- Pricing tables

**Avoid when:**
- Too many cards (overwhelming)
- Small touch targets on mobile
- User has prefers-reduced-motion
- Cards are purely informational (not interactive)

**Performance tips:**
- Use `will-change: transform` CSS
- Avoid animating width/height
- Limit number of simultaneously hoverable elements
- Test on mobile devices
