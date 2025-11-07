# Spring Physics Guide

Understanding and tuning spring animations in Motion.dev for natural, organic motion.

---

## What Are Spring Animations?

Springs simulate real-world physics:
- **Natural bounce** - Like a physical spring
- **No fixed duration** - Animation completes when physics settle
- **Responsive** - Adapts to interrupted animations
- **Organic feel** - More lifelike than tween animations

**When to use:**
- Gestures (drag, hover, tap)
- Interactive elements
- Layout animations
- Any animation that should feel "alive"

**When NOT to use:**
- Fixed-duration requirements (e.g., timed with audio)
- Very long distances (can be slow)
- Simple fade-ins (tween is simpler)

---

## Basic Spring Syntax

```tsx
<motion.div
  animate={{ x: 100 }}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 20,
  }}
/>
```

---

## Spring Parameters

### stiffness
How "tight" the spring is. Higher = faster, snappier.

```tsx
stiffness: 100  // Slow, gentle
stiffness: 300  // Default, balanced
stiffness: 500  // Fast, snappy
stiffness: 1000 // Very fast, rigid
```

**Recommendations:**
- **100-200** - Soft, gentle (modals, large elements)
- **300-400** - Standard (buttons, cards, most UI)
- **500-700** - Snappy (micro-interactions, toggles)
- **800-1000** - Very responsive (cursor tracking, instant feedback)

### damping
Resistance, controls oscillation. Lower = more bounce.

```tsx
damping: 10  // Very bouncy
damping: 20  // Default, some bounce
damping: 30  // Minimal bounce
damping: 50  // No bounce (critically damped)
```

**Recommendations:**
- **10-15** - Playful, bouncy (fun brands, games)
- **20-25** - Balanced, professional (most applications)
- **30-40** - Subtle bounce (serious, professional)
- **50+** - No bounce (when you need precision)

### mass
"Weight" of the animated object. Higher = slower, heavier feel.

```tsx
mass: 0.5  // Light, quick
mass: 1    // Default
mass: 2    // Heavy, slow
mass: 5    // Very heavy
```

**Use cases:**
- **0.5** - Small, light elements (icons, badges)
- **1** - Standard elements (buttons, cards)
- **2** - Large elements (modals, panels)
- **3-5** - Very large elements (full-screen overlays)

### velocity
Initial velocity (pixels per second).

```tsx
velocity: 0     // Start from rest
velocity: 100   // Moving towards target
velocity: -100  // Moving away from target
```

**Use cases:**
- Inherit velocity from drag/gesture
- Create momentum effects
- Chain animations smoothly

---

## Common Spring Presets

### Gentle (Default)
Balanced, professional feel.

```tsx
transition={{
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 1,
}}
```

### Snappy
Fast, responsive, modern.

```tsx
transition={{
  type: "spring",
  stiffness: 500,
  damping: 25,
  mass: 0.8,
}}
```

### Bouncy
Playful, fun, energetic.

```tsx
transition={{
  type: "spring",
  stiffness: 400,
  damping: 12,
  mass: 1,
}}
```

### Slow & Smooth
Elegant, luxurious.

```tsx
transition={{
  type: "spring",
  stiffness: 100,
  damping: 30,
  mass: 2,
}}
```

### Critically Damped
No bounce, precise.

```tsx
transition={{
  type: "spring",
  stiffness: 300,
  damping: 50,
  mass: 1,
}}
```

---

## Real-World Examples

### Button Hover
Fast, responsive feedback.

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  transition={{
    type: "spring",
    stiffness: 400,
    damping: 20,
  }}
/>
```

### Modal Entrance
Soft, gentle appearance.

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 1.5,
  }}
/>
```

### Drag Release
Bouncy snap back.

```tsx
<motion.div
  drag
  dragElastic={0.2}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 15,
  }}
/>
```

### Magnetic Button
Smooth cursor following.

```tsx
const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20,
}

<motion.button style={{ x: springX, y: springY }} />
```

### Toggle Switch
Quick, satisfying flip.

```tsx
<motion.div
  animate={{ x: isOn ? 20 : 0 }}
  transition={{
    type: "spring",
    stiffness: 600,
    damping: 30,
  }}
/>
```

---

## Spring vs. Tween

| Aspect | Spring | Tween |
|--------|--------|-------|
| Duration | Dynamic (physics-based) | Fixed |
| Interruption | Seamlessly adapts | Can feel abrupt |
| Feel | Organic, natural | Mechanical |
| Control | Stiffness, damping, mass | Duration, easing |
| Best for | Gestures, interactions | Entrance/exit, timing-critical |

---

## useSpring Hook

For motion values that update frequently.

```tsx
import { useMotionValue, useSpring } from "motion/react"

const x = useMotionValue(0)
const springX = useSpring(x, {
  stiffness: 300,
  damping: 20,
  mass: 1,
})

// Update x, springX follows with spring physics
x.set(100)
```

**Benefits:**
- No re-renders (motion values)
- Smooth interpolation
- Perfect for cursor tracking, scroll effects

---

## Tuning Springs (Step-by-Step)

### 1. Start with defaults
```tsx
stiffness: 300
damping: 20
mass: 1
```

### 2. Adjust speed (stiffness)
- Too slow? Increase stiffness (400, 500)
- Too fast? Decrease stiffness (200, 100)

### 3. Adjust bounce (damping)
- Too bouncy? Increase damping (30, 40)
- Not bouncy enough? Decrease damping (15, 10)

### 4. Adjust weight (mass)
- Feels too light? Increase mass (1.5, 2)
- Feels too heavy? Decrease mass (0.8, 0.5)

### 5. Test edge cases
- Very short distances
- Very long distances
- Rapid changes (spam clicking)

---

## Common Mistakes

### ❌ Too Stiff + Too Bouncy
```tsx
stiffness: 1000
damping: 5 // Creates harsh, jarring motion
```

**Fix:** Balance stiffness and damping
```tsx
stiffness: 500
damping: 25
```

### ❌ Too Soft + Heavy Mass
```tsx
stiffness: 100
mass: 5 // Painfully slow
```

**Fix:** Increase stiffness or reduce mass
```tsx
stiffness: 200
mass: 2
```

### ❌ Using Spring for Everything
Some animations are better with tween:
- Simple fades
- Timed sequences
- Entrance animations

---

## Performance Tips

1. **Use useSpring** for frequently updating values (no re-renders)
2. **Avoid overly bouncy** springs (more calculations)
3. **Test on low-end devices** - springs can be CPU-intensive
4. **Critically damp when possible** (damping: 50) - faster to settle

---

## Accessibility

For users with `prefers-reduced-motion`:

```tsx
import { useReducedMotion } from "motion/react"

const shouldReduceMotion = useReducedMotion()

const transition = shouldReduceMotion
  ? { duration: 0.01 } // Instant
  : {
      type: "spring",
      stiffness: 300,
      damping: 20,
    }
```

---

## Design Philosophy (Apple/Jon Ive)

Springs align with minimalist design:

- **Natural** - Mimics real-world physics
- **Responsive** - Adapts to user input
- **Delightful** - Subtle bounce adds personality
- **Unobtrusive** - Feels right, doesn't distract

**Golden rules:**
1. Start gentle, add energy only if needed
2. Higher stiffness for smaller elements
3. Match spring energy to brand personality
4. Test on real devices (physics feel different)
