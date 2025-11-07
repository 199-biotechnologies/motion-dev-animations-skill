# Hero Fade Up - Classic Apple-Style Animation

**Design Principle**: Simplicity and elegance. Elements gently fade in while sliding up, creating a sense of content emerging from below.

**Use Case**: Landing pages, product launches, portfolio hero sections

**Performance**: GPU-accelerated (transform + opacity only), 60fps+

---

## React / Next.js Implementation

```tsx
import { motion } from "motion/react"

export function HeroFadeUp() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-4xl px-8 text-center">
        {/* Title */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1], // Custom ease-out curve
          }}
        >
          Think Different
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1, // Stagger after title
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          The people who are crazy enough to think they can change the world
          are the ones who do.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2, // Stagger after subtitle
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </div>
    </section>
  )
}
```

---

## Vanilla JavaScript / Astro

```javascript
import { animate, stagger } from "motion"

// Animate all hero elements on page load
const heroElements = document.querySelectorAll(".hero-element")

animate(
  heroElements,
  { opacity: [0, 1], y: [20, 0] },
  {
    duration: 0.8,
    easing: [0.22, 1, 0.36, 1],
    delay: stagger(0.1), // 0.1s between each element
  }
)
```

**HTML**:
```html
<section class="hero">
  <h1 class="hero-element">Think Different</h1>
  <p class="hero-element">The people who are crazy enough...</p>
  <button class="hero-element">Learn More</button>
</section>
```

---

## With Reduced Motion Support

```tsx
import { motion, useReducedMotion } from "motion/react"

export function AccessibleHeroFadeUp() {
  const shouldReduceMotion = useReducedMotion()

  const animationProps = shouldReduceMotion
    ? {} // No animation if user prefers reduced motion
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <motion.h1 {...animationProps}>
      Think Different
    </motion.h1>
  )
}
```

---

## Customization Options

### Faster Animation (Snappier Feel)
```tsx
transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
```

### Softer Animation (More Dramatic)
```tsx
transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
```

### Larger Distance (More Dramatic Entry)
```tsx
initial={{ opacity: 0, y: 40 }} // Start further down
```

### Spring Physics (Natural Bounce)
```tsx
transition={{
  type: "spring",
  stiffness: 100,
  damping: 20,
}}
```

---

## Design Notes

**Why this works:**
- **Opacity fade** - Gentle appearance, not jarring
- **Small y offset** (20px) - Subtle movement, not dramatic
- **Ease-out curve** - Starts fast, ends slow (natural deceleration)
- **Stagger delay** - Creates reading order hierarchy
- **GPU-accelerated** - Uses transform, not top/margin

**When to use:**
- Landing pages
- Product hero sections
- Portfolio headers
- Blog post headers
- Feature announcements

**Avoid when:**
- User has prefers-reduced-motion
- Page has many simultaneous animations
- Content is critical (don't delay important info)
