# Motion Dev Animations Skill

> Professional web animations using Motion.dev (successor to Framer Motion)

## Overview

This Claude Code skill helps you create beautiful, performant animations for modern web applications using Motion.dev. Includes curated examples, templates, and comprehensive documentation following Apple/Jon Ive design principles.

## Features

- ✅ **Comprehensive Examples**: Hero sections, scroll effects, gestures, micro-interactions
- ✅ **Production Templates**: Ready-to-use Next.js pages and component libraries
- ✅ **Complete API Reference**: All Motion.dev components, hooks, and utilities
- ✅ **Design Principles**: Following Apple/Jon Ive philosophy (simplicity, elegance, purpose)
- ✅ **Performance Optimized**: GPU-accelerated, 120fps animations
- ✅ **Accessibility First**: Respects prefers-reduced-motion, keyboard navigation
- ✅ **Framework Support**: React, Next.js, Svelte, Astro, Vue, Vanilla JS

## Quick Start

This skill is automatically available when you mention Motion.dev, animations, or interactive UI in your requests to Claude Code.

**Trigger phrases:**
- "Create animations with Motion.dev"
- "Add scroll effects"
- "Implement hero section animation"
- "Build interactive cards with hover effects"

## Structure

```
motion-dev-animations/
├── SKILL.md                    # Main skill instructions
├── README.md                   # This file
├── examples/                   # Curated animation examples
│   ├── hero-fade-up.md
│   ├── scroll-reveal.md
│   ├── card-hover.md
│   ├── parallax-layers.md
│   └── magnetic-button.md
├── reference/                  # Technical documentation
│   ├── api-reference.md
│   └── spring-physics.md
└── templates/                  # Starter code
    ├── nextjs-page.tsx
    └── component-library.tsx
```

## Examples Included

### Hero Sections
- **Hero Fade Up** - Classic Apple-style fade + slide entrance
- **Hero Stagger** - Orchestrated title, subtitle, CTA animations

### Scroll Effects
- **Scroll Reveal** - Intersection Observer fade-in on scroll
- **Parallax Layers** - Multi-speed depth effect
- **Scroll Progress** - Reading progress bar

### Gestures & Interactions
- **Card Hover** - Elegant lift with shadow
- **Magnetic Button** - Cursor-following effect
- **Drag Carousel** - Touch-friendly slider

### Micro-interactions
- **Button Press** - Satisfying tap feedback
- **Toggle Switch** - Smooth state transition
- **Loading Spinner** - Spring-based loader

### Layout Animations
- **List Reorder** - Drag-to-reorder with FLIP
- **Accordion** - Smooth expand/collapse
- **Tab Switch** - Shared layout transitions

## Design Philosophy

All animations follow these principles:

1. **Purposeful** - Every animation serves a function
2. **Smooth** - 120fps GPU-accelerated performance
3. **Accessible** - Respects user preferences
4. **Performant** - Uses transforms/opacity only
5. **Elegant** - Subtle, refined, never distracting
6. **Consistent** - Unified timing across application

## Installation

Motion.dev is automatically installed when needed:

```bash
npm install motion
```

For Vue:
```bash
npm install motion-v
```

## Usage Example

When you ask Claude Code to create animations, it will:

1. **Clarify** - Ask about framework, animation type, design goals
2. **Plan** - Present structured animation strategy
3. **Implement** - Generate code with proper Motion.dev patterns
4. **Verify** - Check performance, accessibility, mobile responsiveness

## Performance Standards

All generated animations must meet:

- ✓ 60fps minimum (120fps ideal)
- ✓ GPU-accelerated properties (transform, opacity, filter)
- ✓ No layout thrashing
- ✓ Bundle size < 50kb
- ✓ Respects prefers-reduced-motion
- ✓ Keyboard navigable

## Contributing

This skill is part of your personal Claude Code skills. Feel free to:

- Add more examples in `examples/`
- Expand reference documentation in `reference/`
- Create new templates in `templates/`
- Customize SKILL.md instructions

## Resources

- **Official Docs**: https://motion.dev
- **Examples**: https://examples.motion.dev
- **GitHub**: https://github.com/motiondivision/motion

## License

MIT

## Version

1.0.0 (2025-11-07)
