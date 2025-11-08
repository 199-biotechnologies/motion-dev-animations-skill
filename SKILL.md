---
name: motion-dev-animations
description: Creates 120fps GPU-accelerated animations with Motion.dev (Framer Motion successor) for React, Next.js, Svelte, and Astro projects. Use when user requests animation, motion, scroll effects, parallax, hero animations, gestures, drag interactions, spring physics, whileHover effects, whileInView animations, animated UI, micro-interactions, page transitions, or layout animations. Generates production TypeScript/JSX code with accessibility (prefers-reduced-motion) and performance validation (≥60fps). Supports entrance animations, gesture interactions (hover/tap/drag), scroll-based reveals, and layout transitions using spring physics and natural timing. Do NOT use for CSS-only transitions (use native CSS), static sites without JavaScript, Vue animations (use motion-v variant instead), or SVG/Canvas complex animations (GSAP better suited).
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
metadata:
  version: "3.0.0"
  author: "Motion Dev Standards"
  tags: ["motion", "framer-motion", "animation", "react", "nextjs", "svelte", "astro", "gestures", "scroll", "parallax", "microinteractions", "spring-physics", "layout-animations"]
  min_claude_version: "3.5"
  created: "2025-11-07"
  updated: "2025-11-08"
  optimization: "Research-backed: imperative language, few-shot (3 examples), layered complexity, progressive loading"
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

### Step 1: Clarify Requirements
Determine project context and animation goals:
- Framework (React 19+, Next.js 15+, Svelte 5+, Astro 4+)
- Animation type (entrance, gesture, scroll, layout)
- Design goal (subtle, prominent, playful, professional)
- Performance constraints (target device, bundle limits, accessibility requirements)
- Trigger mechanism (mount, viewport, user interaction)

### Step 2: Plan Animation Strategy
Define implementation approach:
- Components to animate (headers, cards, buttons, sections)
- Motion patterns (fade, slide, scale, spring, parallax)
- Timing specifications (duration, delay, stagger intervals)
- Physics parameters (stiffness: 300-400, damping: 20, mass: 1)
- Accessibility fallbacks (prefers-reduced-motion alternatives)

### Step 3: Implement in Phases
Build animations incrementally:
- **Setup**: Install Motion.dev, configure imports, prepare component structure
- **Core Animation**: Apply motion properties (initial, animate, transition)
- **Refinement**: Tune timing, easing curves, spring physics for natural feel
- **Accessibility**: Add reduced-motion detection, keyboard navigation support
- **Optimization**: Verify GPU-acceleration, minimize bundle size, test performance

### Step 4: Verify Quality Standards
Check against requirements:
- **Performance**: ≥60fps (Chrome DevTools → Performance tab)
- **Layout Stability**: CLS = 0 (Lighthouse audit)
- **Accessibility**: Honors prefers-reduced-motion (system settings test)
- **Keyboard Navigation**: All interactive elements keyboard-accessible
- **Mobile Responsive**: Touch-friendly gestures, tested on iOS/Android

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

## Common Patterns (Copy-Paste Ready)

### Pattern 1: Fade Up Entrance
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
/>
```

### Pattern 2: Hover Card
```tsx
<motion.div
  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
/>
```

### Pattern 3: Scroll Reveal
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
/>
```

**More patterns**: Staggered lists, exit animations, layout transitions → `./examples/` directory

## Error Handling

| Issue | Solution |
|-------|----------|
| Animation doesn't trigger | Check initial ≠ animate values |
| Poor performance | Use transform/opacity only + will-change CSS |
| Layout shift | Set explicit dimensions, use layout prop |
| Exit not working | Wrap with `<AnimatePresence>`, add key prop |

## Implementation Best Practices

1. **Start simple** → Build from fade + slide, add complexity incrementally
2. **Extract variants** → Define animation states as named variants for maintainability
3. **Prefer spring physics** → Default to spring transitions (more natural than tween)
4. **Stagger list items** → Use staggerChildren (0.1-0.2s) for rhythm and hierarchy
5. **Test mobile thoroughly** → Verify touch gestures, performance on iOS/Android devices
6. **Include reduced-motion** → Always provide prefers-reduced-motion fallback animations
7. **Profile performance** → Use Chrome DevTools Performance tab, target ≥60fps

## Design Philosophy (Apple/Jon Ive Principles)

Apply these design principles to all animations:

- **Simplicity**: Use 200-400ms durations, minimize simultaneous motion, prefer transform properties
- **Natural Physics**: Implement spring-based transitions, avoid linear easing, apply mass-based movement
- **Purposeful Motion**: Guide user attention, provide interaction feedback, establish visual hierarchy
- **Elegant Restraint**: Apply "less is more" principle, maintain consistent timing, respect user motion preferences

## Validation

For structured output validation, see:
- [Motion Config Schema](./schema/motion-config.schema.json) - JSON schema
- [Validation Script](./scripts/validate_motion_config.py) - Automated checks

## Metadata

**Version**: 3.0.0 (Research-Backed Optimization)
**Optimization**: Imperative language, few-shot patterns (3 examples), layered complexity, progressive loading
**Token Efficiency**: 87% core reduction (15K → 2K) + auto-caching
**Motion.dev**: v11+
**Frameworks**: React 19+, Next.js 15+, Svelte 5+, Astro 4+, Vue 3+
**Research**: arXiv 2402.07927v1, 2211.01910, 2310.14735v5, PubMed 40334089
**License**: MIT
