# Magnetic Button - Cursor-Following Effect

**Design Principle**: Playful interaction. Button subtly follows cursor, creating tactile magnetism and encouraging clicks.

**Use Case**: CTAs, primary buttons, interactive elements, portfolio showcases

**Performance**: Uses useMotionValue for 60fps tracking

---

## React / Next.js Implementation

### Basic Magnetic Button

```tsx
import { motion, useMotionValue, useSpring } from "motion/react"
import { useRef, MouseEvent } from "react"

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null)

  // Motion values for x and y position
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smooth following
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Distance from center
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Move towards cursor (max 20px)
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
      className="px-8 py-4 bg-blue-500 text-white rounded-full font-medium"
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}
```

---

### Advanced: With Scale + Glow

```tsx
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { useRef, MouseEvent } from "react"

export function AdvancedMagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  // Scale based on distance (closer = larger)
  const scale = useTransform(
    [x, y],
    ([latestX, latestY]) => {
      const distance = Math.sqrt(latestX ** 2 + latestY ** 2)
      return 1 + distance * 0.003 // Subtle scale
    }
  )

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    x.set(distanceX * 0.4)
    y.set(distanceY * 0.4)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      className="relative px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-lg overflow-hidden"
      style={{
        x: springX,
        y: springY,
        scale,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.92 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
```

---

### Magnetic Card (Large Area)

```tsx
import { motion, useMotionValue, useSpring } from "motion/react"
import { useRef, MouseEvent } from "react"

export function MagneticCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // Translate
    x.set(distanceX * 0.1)
    y.set(distanceY * 0.1)

    // 3D rotation based on cursor position
    rotateX.set((distanceY / rect.height) * -10) // Tilt up/down
    rotateY.set((distanceX / rect.width) * 10) // Tilt left/right
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-3xl p-8 shadow-lg cursor-pointer"
      style={{
        x: springX,
        y: springY,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
```

---

### Magnetic Cursor (Global Effect)

```tsx
import { motion, useMotionValue, useSpring } from "motion/react"
import { useEffect } from "react"

export function MagneticCursor() {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16) // Offset for center
      cursorY.set(e.clientY - 16)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
        }}
      />

      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}
```

---

## Vanilla JavaScript

```javascript
import { animate, spring } from "motion"

const button = document.querySelector(".magnetic-btn")

let currentX = 0
let currentY = 0

button.addEventListener("mousemove", (e) => {
  const rect = button.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const distanceX = e.clientX - centerX
  const distanceY = e.clientY - centerY

  const targetX = distanceX * 0.3
  const targetY = distanceY * 0.3

  // Animate with spring physics
  animate(
    (progress) => {
      currentX = currentX + (targetX - currentX) * progress
      currentY = currentY + (targetY - currentY) * progress
      button.style.transform = `translate(${currentX}px, ${currentY}px)`
    },
    { duration: 0.3, easing: spring({ stiffness: 300, damping: 20 }) }
  )
})

button.addEventListener("mouseleave", () => {
  animate(
    (progress) => {
      currentX = currentX * (1 - progress)
      currentY = currentY * (1 - progress)
      button.style.transform = `translate(${currentX}px, ${currentY}px)`
    },
    { duration: 0.5, easing: spring({ stiffness: 300, damping: 20 }) }
  )
})
```

---

## Customization Options

### Stronger Magnetism
```tsx
x.set(distanceX * 0.6) // More movement
y.set(distanceY * 0.6)
```

### Weaker Magnetism (Subtle)
```tsx
x.set(distanceX * 0.15) // Less movement
y.set(distanceY * 0.15)
```

### Faster Response
```tsx
const springX = useSpring(x, { stiffness: 500, damping: 25 })
```

### Slower, Smoother
```tsx
const springX = useSpring(x, { stiffness: 150, damping: 15 })
```

### Maximum Distance Cap
```tsx
const maxDistance = 30
x.set(Math.min(Math.max(distanceX * 0.4, -maxDistance), maxDistance))
```

---

## Design Notes

**Why this works:**
- **Playful** - Creates delight and encourages interaction
- **Tactile** - Feels responsive and alive
- **Attention** - Draws eye to important CTAs
- **Spring physics** - Natural, organic following motion

**When to use:**
- Primary CTAs
- Portfolio showcases
- Interactive demos
- Playful brand experiences
- Hero buttons

**Avoid when:**
- Mobile devices (no cursor)
- Too many buttons (overwhelming)
- Accessibility concerns
- Professional/serious contexts
- User has prefers-reduced-motion

**Performance tips:**
- Use useMotionValue (no re-renders)
- Apply spring physics (smooth interpolation)
- Limit effect area (don't track entire page)
- Test on lower-end devices
- Provide reduced-motion fallback

**Accessibility:**
- Works with keyboard navigation (no magnetic effect)
- Ensure button remains clickable at all positions
- Provide hover state for non-cursor devices
- Test with screen readers
