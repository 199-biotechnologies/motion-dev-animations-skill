---
name: motion-dev-animations
description: |
  Creates 120fps GPU-accelerated animations with Motion.dev (Framer Motion successor).

  TRIGGERS: User requests animations for React/Next.js/Svelte/Astro projects.
  Keywords: "animation", "motion", "framer motion", "scroll effect", "parallax",
  "hero animation", "gesture", "drag", "spring physics", "whileHover", "whileInView",
  "animated UI", "micro-interaction", "page transition", "layout animation"

  INPUT: Framework (React/Next/Svelte/Astro) + animation type + design goals
  OUTPUT: Production TypeScript/JSX with accessibility + performance validation

  NOT FOR: CSS-only transitions (use native CSS), static sites (no JS),
  Vue animations (use motion-v variant), SVG/Canvas (use GSAP skill)
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
metadata:
  version: "2.0.0"
  author: "Motion Dev Standards"
  tags: ["motion", "framer-motion", "animation", "react", "nextjs", "svelte", "astro", "gestures", "scroll", "parallax", "microinteractions", "spring-physics", "layout-animations"]
  min_claude_version: "3.5"
  created: "2025-11-07"
  updated: "2025-11-08"
  optimization: "Progressive loading, compressed core, reality-based caching"
---

# Motion Dev Animations

> **Motion.dev** - 10M+ downloads/month, successor to Framer Motion
> 120fps GPU-accelerated animations for React, Next.js, Svelte, Astro, Vue

## Purpose

Generate production-grade animations using Motion.dev following Apple/Jon Ive principles:
**Purposeful** (serves function) | **Smooth** (120fps) | **Accessible** (reduced-motion) | **Performant** (GPU-only) | **Elegant** (subtle) | **Consistent** (unified timing)

## When to Use

✅ **Use for**:
- React 19+/Next.js 15+/Svelte 5+/Astro 4+ animation implementation
- Scroll effects (parallax, reveal), gestures (hover, drag, tap), layout animations
- Hero sections, cards, micro-interactions requiring 60fps+ performance
- Projects needing spring physics, natural motion, accessibility

❌ **Don't use for**:
- CSS-only transitions (use native `transition` property)
- Static sites without JavaScript frameworks
- Vue projects (use `motion-v` package - different API)
- SVG/Canvas complex animations (GSAP better suited)
- Form-only CRUD apps (overkill)

## Workflow: Clarify → Plan → Implement → Verify

### 1) Clarify
Ask: Framework? Animation type? Design goal? Trigger? Performance constraints?

### 2) Plan
Present: Components to animate, motion type, timing, physics, accessibility approach

### 3) Implement
Execute phases: Setup → Core animation → Refinement → Accessibility → Optimization

### 4) Verify
Checklist: ≥60fps, no layout shift, prefers-reduced-motion, keyboard nav, mobile responsive

## Animation Pattern Decision Tree

```
INPUT: What should animate?

├─ ENTRANCE (page load, mount)
│   → Pattern: initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
│   → Timing: 0.6-0.8s, ease: [0.22, 1, 0.36, 1]
│   → Stagger: 0.1-0.2s between elements
│   → Example: ./examples/hero-fade-up.md
│
├─ GESTURE (hover, tap, drag)
│   → Pattern: whileHover={{scale: 1.05}}, whileTap={{scale: 0.95}}
│   → Physics: Spring (stiffness: 300-400, damping: 20)
│   → Timing: Instant response (no duration)
│   → Examples: ./examples/card-hover.md, ./examples/magnetic-button.md
│
├─ SCROLL (reveal, parallax)
│   → Pattern: whileInView + viewport OR useScroll + useTransform
│   → Trigger: viewport={{once: true, amount: 0.3}}
│   → Performance: Transform/opacity only
│   → Examples: ./examples/scroll-reveal.md, ./examples/parallax-layers.md
│
└─ LAYOUT (reorder, expand)
    → Pattern: layout prop (auto FLIP)
    → Shared: layoutId="id" for morphing
    → Caveat: Only animates transforms
```

## API Quick Reference

| Component/Hook | Usage | When |
|----------------|-------|------|
| **motion.div** | `<motion.div animate={{x: 100}}>` | Basic animations |
| **whileHover** | `whileHover={{scale: 1.05}}` | Hover states (0.2-0.3s) |
| **whileTap** | `whileTap={{scale: 0.95}}` | Click feedback |
| **whileInView** | `whileInView={{opacity: 1}}` | Scroll reveal |
| **drag** | `drag="x"` dragConstraints | Draggable elements |
| **layout** | `<motion.div layout />` | Auto FLIP animation |
| **useScroll** | Track scroll progress | Parallax, progress bars |
| **useTransform** | Map values | Scroll-linked effects |
| **useSpring** | Spring physics | Smooth value changes |
| **useInView** | Viewport detection | Trigger animations |

**Full API**: See [Complete API Reference](./reference/api-reference.md)

## Framework Integration

| Framework | Import | Components | Exit Animations |
|-----------|--------|------------|-----------------|
| **React/Next.js** | `"motion/react"` | `<motion.div>` | `<AnimatePresence>` |
| **Svelte** | `"motion"` | Vanilla API | N/A |
| **Astro** | `"motion"` | Client scripts | N/A |
| **Vue** | `"motion-v"` | `<motion.div>` | Similar to React |

## Quality Standards

| Category | Requirement | How to Verify |
|----------|-------------|---------------|
| **Performance** | ≥60fps | Chrome DevTools → Performance |
| **GPU-accel** | transform/opacity only | No width/height/left/top |
| **Bundle** | <50KB | webpack-bundle-analyzer |
| **Accessibility** | prefers-reduced-motion | System settings test |
| **Mobile** | Touch-friendly | iOS/Android testing |
| **Layout shift** | CLS = 0 | Lighthouse audit |

## Examples Library (Progressive Loading)

Load on-demand based on animation type:

### Hero Sections
- [Hero Fade Up](./examples/hero-fade-up.md) - Classic Apple-style entrance
- Hero Stagger - Orchestrated elements
- Hero Split Text - Character reveal

### Scroll Effects
- [Scroll Reveal](./examples/scroll-reveal.md) - Intersection Observer fade-in
- [Parallax Layers](./examples/parallax-layers.md) - Multi-speed depth
- Scroll Progress - Reading indicator

### Gestures & Interactions
- [Card Hover](./examples/card-hover.md) - Elegant lift + shadow
- [Magnetic Button](./examples/magnetic-button.md) - Cursor-following
- Drag Carousel - Touch slider

### Layout Animations
- List Reorder - Drag-to-reorder FLIP
- Accordion - Expand/collapse
- Tab Switch - Shared layout

**Full examples**: All files in `./examples/` directory

## Reference Documentation (Load On-Demand)

- [Complete API Reference](./reference/api-reference.md) - All components, hooks, props
- [Spring Physics Guide](./reference/spring-physics.md) - Tuning stiffness, damping, mass
- Performance Optimization - GPU, will-change, lazy loading
- Accessibility Guide - Reduced motion, keyboard, screen readers
- Troubleshooting - Common issues, solutions
- Framer Motion Migration - Upgrade guide

## Templates (Production-Ready)

- [Next.js Page Template](./templates/nextjs-page.tsx) - Hero + features + testimonials
- [Component Library](./templates/component-library.tsx) - 10+ reusable components
- Scroll Template - Parallax + reveal patterns
- Dashboard Template - Interactive cards, charts

## Installation

```bash
# React/Next.js/Svelte/Astro
npm install motion

# Vue
npm install motion-v
```

## Common Patterns (Copy-Paste)

### Fade Up Entrance
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
/>
```

### Hover Card
```tsx
<motion.div
  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
/>
```

### Scroll Reveal
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
/>
```

### Staggered List
```tsx
const containerVariants = {
  visible: { transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}
```

## Error Handling

| Issue | Solution |
|-------|----------|
| Animation doesn't trigger | Check initial ≠ animate values |
| Poor performance | Use transform/opacity only + will-change CSS |
| Layout shift | Set explicit dimensions, use layout prop |
| Exit not working | Wrap with `<AnimatePresence>`, add key prop |

## Best Practices

1. Start simple (fade + slide) → add complexity
2. Use variants for maintainability
3. Spring physics by default (more natural)
4. Stagger lists for rhythm/hierarchy
5. Test on mobile (touch gestures, performance)
6. Always provide reduced-motion fallback
7. Profile with Chrome DevTools → Performance tab

## Design Philosophy (Apple/Jon Ive)

- **Simplicity**: 200-400ms duration, minimal simultaneous motion, prefer transforms
- **Natural Physics**: Spring animations, avoid linear easing, mass-based movement
- **Purposeful Motion**: Guide attention, provide feedback, create hierarchy
- **Elegant Restraint**: Less is more, consistent timing, respect user preferences

## Validation

For structured output validation, see:
- [Motion Config Schema](./schema/motion-config.schema.json) - JSON schema
- [Validation Script](./scripts/validate_motion_config.py) - Automated checks

## Metadata

**Version**: 2.0.0
**Optimization**: Progressive loading (87% token reduction)
**Motion.dev**: v11+
**Frameworks**: React 19+, Next.js 15+, Svelte 5+, Astro 4+, Vue 3+
**License**: MIT
