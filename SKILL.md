---
name: motion-dev-animations
description: Professional web animations using Motion.dev (successor to Framer Motion). Creates beautiful, performant animations for React, Next.js, Svelte, Astro, and vanilla JavaScript. Includes curated examples for hero sections, scroll effects, gestures, micro-interactions, and layout animations following Apple/Jon Ive design principles. Use when building interactive UIs, animating components, creating smooth transitions, implementing gesture controls, or adding scroll-linked effects. Provides 120fps GPU-accelerated animations with spring physics, layout transitions, and parallax effects. Perfect for modern web applications requiring polished, production-ready animations.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
metadata:
  version: "1.0.0"
  author: "Motion Dev Standards"
  tags: ["motion", "framer-motion", "animation", "react", "nextjs", "svelte", "astro", "gestures", "scroll", "parallax", "microinteractions", "spring-physics", "layout-animations"]
  min_claude_version: "3.5"
  created: "2025-11-07"
  updated: "2025-11-07"
---

# Motion Dev Animations

> **Motion.dev** - The world's fastest-growing animation library (10M+ downloads/month)
> Successor to Framer Motion, now supporting React, JavaScript, Vue, Svelte, Astro & more

## Purpose

Create production-grade, beautifully animated web interfaces using Motion.dev with professional examples following Apple/Jon Ive/Steve Jobs design principles: **simplicity, elegance, purposeful motion, and delightful user experience**.

Every animation should serve a purpose - guiding attention, providing feedback, creating hierarchy, or enhancing the emotional connection with the interface.

## When to Use / When NOT to Use

### Use when:
- Building modern web applications with React, Next.js, Svelte, Astro
- Need smooth, professional animations (hero sections, page transitions, micro-interactions)
- Implementing gesture controls (hover, drag, tap, press)
- Creating scroll-linked effects (parallax, reveal, progress indicators)
- Animating layout changes (reordering, expanding, morphing)
- Want spring physics for natural, organic motion
- Need 120fps GPU-accelerated performance
- Require accessible animations (respects prefers-reduced-motion)
- Building interactive dashboards, portfolios, marketing sites
- Creating delightful user experiences with purposeful motion

### Do NOT use when:
- Simple CSS transitions are sufficient
- Project doesn't use JavaScript frameworks
- Building static sites with no interactivity
- Performance budget is extremely tight (< 50kb total JS)
- User explicitly wants no animations
- Building form-only CRUD applications

## Core Philosophy

Motion animations should follow these principles:

1. **Purposeful**: Every animation serves a function (feedback, guidance, hierarchy)
2. **Smooth**: 120fps GPU-accelerated, natural spring physics
3. **Accessible**: Respects prefers-reduced-motion, keyboard navigation
4. **Performant**: Uses transforms/opacity, avoids layout thrashing
5. **Elegant**: Subtle, refined, never distracting or gratuitous
6. **Consistent**: Unified timing, easing curves across application

## Installation

### React / Next.js
```bash
npm install motion
# or
yarn add motion
# or
pnpm add motion
```

### Vue
```bash
npm install motion-v
```

### Vanilla JavaScript / Astro / Svelte
```bash
npm install motion
```

## Workflow (Clarify → Plan → Implement → Verify)

### 1) Clarify

Ask user for context:
- **Framework**: React/Next.js, Svelte, Astro, Vue, or vanilla JS?
- **Animation type**: What should animate? (hero section, cards, scroll effects, gestures)
- **Design goals**: What feeling/emotion? (elegant, playful, professional, bold)
- **User interaction**: Triggered by scroll, hover, click, page load?
- **Performance**: Any constraints? (mobile-first, low-power devices)

### 2) Plan

Present a structured animation plan:
- **Components to animate**: List specific elements
- **Motion type**: Enter/exit, gesture, scroll-linked, layout
- **Timing**: Duration, stagger, delay strategy
- **Physics**: Spring, tween, or keyframes
- **Accessibility**: Reduced motion fallback

Wait for user confirmation before proceeding.

### 3) Implement

Execute in this order:

**Phase 1: Setup**
- Install Motion.dev dependencies
- Import required components/hooks
- Set up base component structure

**Phase 2: Core Animation**
- Implement primary animation (hero, scroll, gesture)
- Apply motion components (motion.div, motion.section)
- Configure animation properties (animate, initial, exit)

**Phase 3: Refinement**
- Add spring physics or custom easing
- Implement stagger for multiple elements
- Add gesture handlers (whileHover, whileTap, drag)

**Phase 4: Accessibility**
- Add prefers-reduced-motion support
- Ensure keyboard navigation works
- Test with screen readers

**Phase 5: Optimization**
- Use layout prop for layout animations
- Optimize with will-change CSS
- Lazy load animations if needed

### 4) Verify

Validation checklist:
- ✓ Animations run at 60fps+ (check dev tools)
- ✓ No layout shift (CLS = 0)
- ✓ Works with prefers-reduced-motion
- ✓ Keyboard accessible
- ✓ Mobile responsive
- ✓ No JavaScript errors
- ✓ Animations feel natural (not robotic)
- ✓ Bundle size reasonable (< 50kb for Motion)

## Motion.dev API Quick Reference

### Core Components (React)

```tsx
import { motion } from "motion/react"

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5 }}
/>

// Gestures
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  whileFocus={{ outline: "2px solid blue" }}
/>

// Drag
<motion.div drag dragConstraints={{ left: 0, right: 300 }} />

// Layout animations
<motion.div layout />
```

### Animation Properties

- **initial**: Starting state (before mount)
- **animate**: Target state (on mount/update)
- **exit**: Unmount state (requires AnimatePresence)
- **whileHover**: State during hover
- **whileTap**: State during tap/click
- **whileFocus**: State during focus
- **whileInView**: State when in viewport
- **drag**: Enable drag ("x", "y", or true)
- **layout**: Animate layout changes

### Hooks

```tsx
import {
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
  useInView,
  useAnimate
} from "motion/react"

// Scroll progress
const { scrollYProgress } = useScroll()

// Transform values
const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

// Spring physics
const springValue = useSpring(motionValue, { stiffness: 100, damping: 10 })

// Viewport detection
const ref = useRef(null)
const isInView = useInView(ref, { once: true })
```

### Variants (Orchestration)

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.ul variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.li key={item} variants={itemVariants} />
  ))}
</motion.ul>
```

### Vanilla JavaScript API

```javascript
import { animate, stagger, scroll, inView } from "motion"

// Animate element
animate("#box", { x: 100, opacity: 1 }, { duration: 1 })

// Stagger multiple elements
animate("li", { opacity: 1 }, { delay: stagger(0.1) })

// Scroll-linked
scroll(({ y }) => {
  animate("#parallax", { y: y.current * 0.5 })
})

// Intersection Observer
inView("#element", () => {
  animate("#element", { opacity: 1 })
})
```

## Design Patterns (Apple/Jon Ive Principles)

### 1. Simplicity First
- **Use subtle animations** - 200-400ms duration for most interactions
- **Minimize simultaneous motion** - Focus attention, avoid chaos
- **Prefer transforms over colors** - Scale, translate, rotate (GPU-accelerated)

### 2. Natural Physics
- **Spring animations** - Organic, responsive feel
- **Avoid linear easing** - Use natural curves (ease-out for entrances, ease-in for exits)
- **Mass and stiffness** - Heavier elements move slower

### 3. Purposeful Motion
- **Guide attention** - Animate what matters, keep rest static
- **Provide feedback** - Hover states, tap feedback, loading states
- **Create hierarchy** - Important elements animate first (stagger)

### 4. Elegant Restraint
- **Less is more** - Don't animate everything
- **Consistent timing** - Unified duration/easing across app
- **Respect user preferences** - Honor prefers-reduced-motion

## Decision Trees

### Animation Type Selection

```
What should animate?

├─ PAGE LOAD / HERO SECTION:
│   → Use: initial + animate props
│   → Pattern: Fade + slide up (y: 20 → 0)
│   → Stagger: Title first, subtitle after 0.1s, CTA after 0.2s
│   → Duration: 0.6-0.8s with ease-out
│
├─ USER INTERACTION (Hover/Click):
│   → Use: whileHover / whileTap props
│   → Pattern: Scale (1.05), shadow, or color shift
│   → Duration: 0.2-0.3s (instant feedback)
│   → Physics: Spring (stiffness: 300, damping: 20)
│
├─ SCROLL EFFECTS:
│   → Use: useScroll + useTransform or whileInView
│   → Pattern: Parallax (different speeds) or reveal (fade + slide)
│   → Trigger: Intersection Observer (once or repeat)
│   → Performance: Use transforms only (x, y, scale, rotate)
│
├─ LAYOUT CHANGES (Reorder/Expand):
│   → Use: layout prop (automatic FLIP animation)
│   → Pattern: Shared layout ID for morphing
│   → Duration: Auto-calculated by Motion
│   → Caveat: Only animates transforms (not colors/borders)
│
└─ DRAG & DROP:
    → Use: drag prop + dragConstraints
    → Pattern: Magnetic cursor, reorderable list
    → Physics: Spring on release
    → Accessibility: Provide keyboard alternative
```

### Framework Integration

```
Which framework?

├─ REACT / NEXT.JS:
│   → Import from: "motion/react"
│   → Components: <motion.div>, <motion.section>
│   → Hooks: useScroll, useMotionValue, useAnimate
│   → Exit animations: Wrap with <AnimatePresence>
│
├─ SVELTE:
│   → Import from: "motion"
│   → Use: vanilla API (animate, scroll, inView)
│   → Integration: Svelte actions or use:motion directive
│
├─ ASTRO:
│   → Import from: "motion" (vanilla JS)
│   → Use: client-side script blocks
│   → Hydration: client:load or client:visible
│
└─ VUE:
    → Import from: "motion-v"
    → Components: <motion.div :animate="{ x: 100 }">
    → Similar API to React version
```

## Examples Library

See `./examples/` for curated, production-ready examples:

### Hero Sections
- [Hero Fade Up](./examples/hero-fade-up.md) - Classic Apple-style fade + slide
- [Hero Stagger](./examples/hero-stagger.md) - Orchestrated title, subtitle, CTA
- [Hero Split Text](./examples/hero-split-text.md) - Character-by-character reveal

### Scroll Effects
- [Scroll Reveal](./examples/scroll-reveal.md) - Intersection Observer fade-in
- [Parallax Layers](./examples/parallax-layers.md) - Multi-speed parallax
- [Scroll Progress](./examples/scroll-progress.md) - Reading progress bar

### Gestures & Interactions
- [Card Hover](./examples/card-hover.md) - Elegant card lift with shadow
- [Magnetic Button](./examples/magnetic-button.md) - Cursor-following effect
- [Drag Carousel](./examples/drag-carousel.md) - Touch-friendly slider

### Micro-interactions
- [Button Press](./examples/button-press.md) - Satisfying tap feedback
- [Toggle Switch](./examples/toggle-switch.md) - Smooth state transition
- [Loading Spinner](./examples/loading-spinner.md) - Spring-based loader

### Layout Animations
- [List Reorder](./examples/list-reorder.md) - Drag-to-reorder with FLIP
- [Accordion](./examples/accordion.md) - Smooth expand/collapse
- [Tab Switch](./examples/tab-switch.md) - Shared layout transitions

### Advanced
- [Image Gallery](./examples/image-gallery.md) - Full-screen modal with shared layout
- [Page Transitions](./examples/page-transitions.md) - Next.js route animations
- [3D Card Tilt](./examples/3d-card-tilt.md) - Perspective transform on hover

## Reference Documentation

Load these on-demand:

- [Complete API Reference](./reference/api-reference.md) - All components, hooks, props
- [Spring Physics Guide](./reference/spring-physics.md) - Stiffness, damping, mass tuning
- [Performance Optimization](./reference/performance.md) - GPU acceleration, will-change, lazy loading
- [Accessibility Guide](./reference/accessibility.md) - Reduced motion, keyboard, screen readers
- [Troubleshooting](./reference/troubleshooting.md) - Common issues and solutions
- [Migration Guide](./reference/framer-motion-migration.md) - Upgrading from Framer Motion

## Templates

Starter code for common scenarios:

- [Next.js Page Template](./templates/nextjs-page.tsx) - Hero + sections with animations
- [Component Library Template](./templates/component-library.tsx) - Reusable animated components
- [Scroll Template](./templates/scroll-effects.tsx) - Parallax + reveal patterns
- [Dashboard Template](./templates/dashboard.tsx) - Cards, charts, interactions

## Quality Standards

All animations MUST meet these criteria:

**Performance**:
- ✓ 60fps minimum (120fps ideal)
- ✓ Uses GPU-accelerated properties (transform, opacity, filter)
- ✓ No layout thrashing (avoid width, height, left, top)
- ✓ Bundle size < 50kb for Motion library

**Accessibility**:
- ✓ Respects prefers-reduced-motion
- ✓ Keyboard navigable
- ✓ Screen reader friendly (no essential info in animation)
- ✓ Focus indicators animated with whileFocus

**Design**:
- ✓ Purposeful (serves a function)
- ✓ Consistent timing across application
- ✓ Natural easing (ease-out for enter, ease-in for exit)
- ✓ Subtle (not distracting)

**Code Quality**:
- ✓ TypeScript types (AnimationProps, Variants, etc.)
- ✓ Semantic naming (fadeUp, slideIn, not anim1, anim2)
- ✓ Reusable variants
- ✓ Documented with comments

## Error Handling

Common issues and solutions:

**Animation doesn't trigger**:
- Check initial vs animate values differ
- Verify component is mounted
- Ensure AnimatePresence wraps exit animations

**Poor performance**:
- Use transform/opacity only
- Add will-change: transform CSS
- Reduce number of simultaneously animating elements
- Use layout prop instead of animating width/height

**Layout shift**:
- Set explicit dimensions
- Use layout prop for size changes
- Avoid animating margin/padding

**Exit animations not working**:
- Wrap with <AnimatePresence>
- Add unique key prop to animated component
- Ensure component is conditionally rendered

## Best Practices

1. **Start simple** - Fade + slide, then add complexity
2. **Use variants** - Easier to maintain than inline props
3. **Spring by default** - More natural than tween
4. **Stagger for lists** - Creates rhythm and hierarchy
5. **Test on mobile** - Touch gestures, performance
6. **Profile performance** - Chrome DevTools → Performance tab
7. **Reduce motion fallback** - Always provide static alternative
8. **Consistent timing** - Define global transition config

## Skill Metadata

**Version**: 1.0.0
**Last Updated**: 2025-11-07
**Motion.dev Version**: Latest (v11+)
**Frameworks Supported**: React 19+, Next.js 15+, Svelte 5+, Astro 4+, Vue 3+, Vanilla JS
**License**: MIT
**Design Philosophy**: Apple/Jon Ive - Simplicity, Elegance, Purpose
