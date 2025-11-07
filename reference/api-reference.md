# Motion.dev Complete API Reference

Complete reference for Motion.dev (formerly Framer Motion) components, hooks, and utilities.

---

## Core Components (React)

### motion.element

Every HTML and SVG element has a motion component: `motion.div`, `motion.button`, `motion.svg`, etc.

```tsx
import { motion } from "motion/react"

<motion.div
  // Animation props
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}

  // Transition
  transition={{ duration: 0.5, ease: "easeOut" }}

  // Gestures
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  whileFocus={{ outline: "2px solid blue" }}
  whileInView={{ opacity: 1 }}

  // Drag
  drag
  dragConstraints={{ left: 0, right: 300 }}
  dragElastic={0.2}

  // Layout
  layout
  layoutId="unique-id"

  // Style
  style={{ x: motionValue }}
/>
```

---

## Animation Props

### initial
Starting state before component mounts.

```tsx
<motion.div initial={{ opacity: 0, y: 20 }} />
<motion.div initial={false} /> // Disable initial animation
<motion.div initial="hidden" variants={variants} />
```

### animate
Target state to animate to.

```tsx
<motion.div animate={{ opacity: 1, y: 0 }} />
<motion.div animate="visible" variants={variants} />
<motion.div animate={isOpen ? "open" : "closed"} />
```

### exit
State when component unmounts (requires AnimatePresence).

```tsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

### transition
Controls animation behavior.

```tsx
<motion.div
  animate={{ x: 100 }}
  transition={{
    duration: 0.5,
    delay: 0.2,
    ease: "easeOut",
    type: "spring",
    stiffness: 300,
    damping: 20,
  }}
/>
```

**Transition Types:**
- `tween` (default) - Duration-based
- `spring` - Physics-based
- `inertia` - Momentum-based

**Easing:**
- `"linear"`, `"easeIn"`, `"easeOut"`, `"easeInOut"`
- Custom: `[0.17, 0.67, 0.83, 0.67]` (cubic bezier)

---

## Gesture Props

### whileHover
Animation state during hover.

```tsx
<motion.button
  whileHover={{
    scale: 1.1,
    backgroundColor: "#3b82f6",
  }}
/>
```

### whileTap
Animation state during tap/click.

```tsx
<motion.button
  whileTap={{ scale: 0.95 }}
/>
```

### whileFocus
Animation state during keyboard focus.

```tsx
<motion.button
  whileFocus={{
    outline: "2px solid blue",
    outlineOffset: "2px",
  }}
/>
```

### whileInView
Animation state when element enters viewport.

```tsx
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{
    once: true, // Only animate once
    amount: 0.3, // Trigger when 30% visible
    margin: "0px 0px -100px 0px", // Offset trigger
  }}
/>
```

### whileDrag
Animation state while dragging.

```tsx
<motion.div
  drag
  whileDrag={{ scale: 1.1, cursor: "grabbing" }}
/>
```

---

## Drag Props

### drag
Enable dragging.

```tsx
<motion.div drag /> // Both x and y
<motion.div drag="x" /> // Horizontal only
<motion.div drag="y" /> // Vertical only
```

### dragConstraints
Limit drag area.

```tsx
// Pixel values
<motion.div
  drag
  dragConstraints={{ left: 0, right: 300, top: 0, bottom: 300 }}
/>

// Ref to parent
const constraintsRef = useRef(null)
<div ref={constraintsRef}>
  <motion.div drag dragConstraints={constraintsRef} />
</div>
```

### dragElastic
Resistance when dragging outside constraints.

```tsx
<motion.div drag dragElastic={0.2} /> // Low resistance
<motion.div drag dragElastic={0} /> // No overscroll
<motion.div drag dragElastic={1} /> // Full freedom
```

### dragMomentum
Enable momentum scrolling on release.

```tsx
<motion.div drag dragMomentum={true} />
```

---

## Layout Animations

### layout
Automatically animate layout changes (position, size).

```tsx
<motion.div layout />
```

**How it works:**
- Uses FLIP technique (First, Last, Invert, Play)
- Animates transforms, not actual layout properties
- Very performant

### layoutId
Shared layout between different components.

```tsx
// Component A
<motion.div layoutId="shared-element" />

// Component B (different location)
<motion.div layoutId="shared-element" /> // Morphs between them
```

---

## Variants

Define animation states for orchestration.

```tsx
const variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1, // Delay between children
      delayChildren: 0.2, // Delay before first child
    },
  },
}

<motion.ul
  variants={variants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.li variants={itemVariants} /> // Inherits parent state
  ))}
</motion.ul>
```

---

## Hooks

### useMotionValue
Create a motion value (doesn't trigger re-renders).

```tsx
import { useMotionValue } from "motion/react"

const x = useMotionValue(0)
x.set(100) // Update value
const current = x.get() // Read value
```

### useTransform
Transform one motion value into another.

```tsx
import { useTransform } from "motion/react"

const x = useMotionValue(0)
const opacity = useTransform(x, [0, 100], [0, 1])
const scale = useTransform(x, [0, 100], [0.5, 1])
```

### useScroll
Track scroll progress.

```tsx
import { useScroll } from "motion/react"

const { scrollYProgress, scrollY } = useScroll({
  target: ref, // Element to track
  offset: ["start start", "end start"], // When to start/end
})

// scrollY: absolute pixels
// scrollYProgress: 0 to 1
```

### useSpring
Create spring-animated motion value.

```tsx
import { useSpring } from "motion/react"

const x = useMotionValue(0)
const springX = useSpring(x, { stiffness: 300, damping: 20 })
```

### useInView
Detect when element is in viewport.

```tsx
import { useInView } from "motion/react"

const ref = useRef(null)
const isInView = useInView(ref, {
  once: true,
  amount: 0.3,
})

return <div ref={ref}>{isInView && "In view!"}</div>
```

### useAnimate
Imperative animations.

```tsx
import { useAnimate } from "motion/react"

const [scope, animate] = useAnimate()

const handleClick = () => {
  animate(scope.current, { x: 100 }, { duration: 0.5 })
}

return <div ref={scope} onClick={handleClick} />
```

### useReducedMotion
Detect user's motion preference.

```tsx
import { useReducedMotion } from "motion/react"

const shouldReduceMotion = useReducedMotion()

return (
  <motion.div
    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
  />
)
```

---

## Utilities

### AnimatePresence
Enable exit animations.

```tsx
import { AnimatePresence } from "motion/react"

<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      key="item"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

**Modes:**
- `sync` (default) - Exit and enter simultaneously
- `wait` - Wait for exit before entering new
- `popLayout` - Exiting elements don't affect layout

### MotionConfig
Set default transition for all children.

```tsx
import { MotionConfig } from "motion/react"

<MotionConfig transition={{ duration: 0.5, ease: "easeOut" }}>
  <motion.div animate={{ x: 100 }} /> // Uses default
  <motion.div animate={{ y: 100 }} /> // Uses default
</MotionConfig>
```

---

## Vanilla JavaScript API

### animate()
Animate any element.

```javascript
import { animate } from "motion"

animate("#element", { x: 100, opacity: 1 }, { duration: 1 })
```

### stagger()
Stagger animations for multiple elements.

```javascript
import { animate, stagger } from "motion"

animate("li", { opacity: 1 }, { delay: stagger(0.1) })
```

### scroll()
Scroll-linked animations.

```javascript
import { scroll } from "motion"

scroll(({ y }) => {
  animate("#element", { opacity: y.progress })
})
```

### inView()
Intersection Observer wrapper.

```javascript
import { inView } from "motion"

inView("#element", ({ target }) => {
  animate(target, { opacity: 1 })
})
```

---

## TypeScript Types

```tsx
import { motion, AnimationProps, Variant, Transition } from "motion/react"

const variants: { [key: string]: Variant } = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const transition: Transition = {
  duration: 0.5,
  ease: "easeOut",
}
```

---

## Performance Tips

1. **Use transforms** - `x`, `y`, `scale`, `rotate` (GPU-accelerated)
2. **Avoid layout properties** - `width`, `height`, `top`, `left`
3. **Use will-change** - Hint browser for optimization
4. **Use layout prop** - For size/position changes
5. **Limit simultaneous animations** - Max 10-15 elements
6. **Use variants** - Better performance than inline props
7. **Respect reduced motion** - Honor user preferences

---

## Common Patterns

### Fade In
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.5 }}
```

### Slide Up
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: "easeOut" }}
```

### Scale Up
```tsx
initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ type: "spring", stiffness: 300, damping: 20 }}
```

### Stagger Children
```tsx
variants={{
  visible: {
    transition: { staggerChildren: 0.1 }
  }
}}
```

### Exit Animation
```tsx
<AnimatePresence>
  {isVisible && (
    <motion.div exit={{ opacity: 0, scale: 0.8 }} />
  )}
</AnimatePresence>
```
