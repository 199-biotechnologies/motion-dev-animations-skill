<div align="center">

# Motion.dev Animations Skill

**Production-grade web animations for Claude Code, powered by Motion.dev.**

[![Star this repo](https://img.shields.io/github/stars/199-biotechnologies/motion-dev-animations-skill?style=for-the-badge&logo=github&label=%E2%AD%90%20Star%20this%20repo&color=yellow)](https://github.com/199-biotechnologies/motion-dev-animations-skill/stargazers)
[![Follow @longevityboris](https://img.shields.io/badge/Follow_%40longevityboris-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/longevityboris)

[![Claude Code](https://img.shields.io/badge/Claude_Code-Skill-6C47FF?style=for-the-badge&logo=anthropic&logoColor=white)](https://docs.anthropic.com/en/docs/claude-code)
[![Motion.dev](https://img.shields.io/badge/Motion.dev-v11-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://motion.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A Claude Code skill that generates 120fps GPU-accelerated animations using Motion.dev (the successor to Framer Motion). Say "add a hero animation" or "create scroll effects" and get production-ready TypeScript code with accessibility and performance baked in.

---

[Why This Exists](#why-this-exists) | [Install](#install) | [Quick Start](#quick-start) | [How It Works](#how-it-works) | [Animation Types](#animation-types) | [What's Inside](#whats-inside) | [Contributing](#contributing) | [License](#license)

</div>

---

## Why This Exists

Motion.dev has 10M+ downloads per month. It is the standard for web animations in React, Next.js, Svelte, and Astro. But writing good animations is hard. You need spring physics, GPU-accelerated properties, `prefers-reduced-motion` support, and 60fps+ performance targets.

This skill gives Claude Code deep knowledge of Motion.dev patterns so it can generate production animation code from natural language. No more copying from docs. No more guessing spring values. Just describe what you want.

## Install

Add to your Claude Code skills directory:

```bash
# Clone into your skills folder
git clone https://github.com/199-biotechnologies/motion-dev-animations-skill.git ~/.claude/skills/motion-dev-animations

# Or add as a git submodule in your project
git submodule add https://github.com/199-biotechnologies/motion-dev-animations-skill.git .claude/skills/motion-dev-animations
```

The skill activates automatically when you mention animations, Motion.dev, scroll effects, parallax, hover effects, or interactive UI in your prompts.

## Quick Start

Once installed, use natural language with Claude Code:

```
"Create a hero section with a fade-up entrance animation"
"Add parallax scrolling to this landing page"
"Build a card component with hover lift and shadow effects"
"Implement drag-to-reorder for this list"
"Add a magnetic button effect to the CTA"
```

Claude Code will clarify your framework, plan the animation strategy, generate the code, and verify performance.

## How It Works

The skill follows a four-step workflow:

1. **Clarify** -- Determines your framework (React 19+, Next.js 15+, Svelte 5+, Astro 4+), animation type, and design goals.
2. **Plan** -- Selects the right Motion.dev patterns, spring physics, and easing curves for your use case.
3. **Implement** -- Generates TypeScript/JSX code using GPU-accelerated properties (transform, opacity, filter only). No layout thrashing.
4. **Verify** -- Checks for 60fps+ performance, `prefers-reduced-motion` support, keyboard navigation, and bundle size under 50KB.

The skill uses progressive loading. The core instructions are ~2,000 tokens. Examples, API reference, and templates load on-demand only when needed. This means 87% less context consumption compared to loading everything upfront.

## Animation Types

### Entrance Animations
- **Hero Fade Up** -- Apple-style fade + slide entrance for landing pages
- **Hero Stagger** -- Orchestrated title, subtitle, CTA sequence
- **Scroll Reveal** -- Intersection Observer fade-in on scroll

### Scroll Effects
- **Parallax Layers** -- Multi-speed depth effect with `useScroll` and `useTransform`
- **Scroll Progress** -- Reading progress bar tied to scroll position

### Gesture Interactions
- **Card Hover** -- Lift with shadow using `whileHover`
- **Magnetic Button** -- Cursor-following effect for CTAs
- **Drag Carousel** -- Touch-friendly horizontal slider with `drag` constraints

### Micro-interactions
- **Button Press** -- Tactile tap feedback with `whileTap`
- **Toggle Switch** -- Smooth state transitions with `layout` animations
- **Loading Spinner** -- Spring-based loader animation

### Layout Animations
- **List Reorder** -- Drag-to-reorder with FLIP technique
- **Accordion** -- Smooth expand/collapse with `AnimatePresence`
- **Tab Switch** -- Shared layout transitions with `layoutId`

## What's Inside

```
motion-dev-animations-skill/
├── SKILL.md                          # Core instructions (~2,000 tokens)
├── examples/                         # Animation patterns (loaded on-demand)
│   ├── hero-fade-up.md               # Apple-style entrance animation
│   ├── scroll-reveal.md              # Intersection Observer reveals
│   ├── card-hover.md                 # Hover lift + shadow effect
│   ├── parallax-layers.md            # Multi-speed parallax
│   ├── magnetic-button.md            # Cursor-following button
│   └── example-config.json           # Sample motion config
├── reference/                        # API docs (loaded on-demand)
│   ├── api-reference.md              # Full Motion.dev API
│   └── spring-physics.md             # Spring values and presets
├── templates/                        # Starter code
│   ├── nextjs-page.tsx               # Full page with animations
│   └── component-library.tsx         # Reusable animation components
├── schema/                           # Validation
│   └── motion-config.schema.json     # JSON schema for configs
└── scripts/                          # Tools
    └── validate_motion_config.py     # Config validator
```

## Performance Standards

Every animation this skill generates meets these targets:

| Metric | Target | Method |
|--------|--------|--------|
| Frame rate | 60fps+ (120fps ideal) | GPU-accelerated transforms only |
| Bundle size | < 50KB | Tree-shaking, code splitting |
| Accessibility | Full | `prefers-reduced-motion` respected |
| Layout shifts | Zero | No width/height animations |
| Keyboard support | Full | Focus states, navigation |

## Framework Support

| Framework | Version | Status |
|-----------|---------|--------|
| React | 19+ | Full support |
| Next.js | 15+ | Full support (App Router) |
| Svelte | 5+ | Full support |
| Astro | 4+ | Full support |
| Vue | 3+ | Use `motion-v` package |
| Vanilla JS | ES2020+ | Via `motion` package |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. The short version: add examples in `examples/`, expand API docs in `reference/`, or create templates in `templates/`.

## License

[MIT](LICENSE)

---

<div align="center">

Built by [Boris Djordjevic](https://github.com/longevityboris) at [199 Biotechnologies](https://github.com/199-biotechnologies) | [Paperfoot AI](https://paperfoot.ai)

[![Star this repo](https://img.shields.io/github/stars/199-biotechnologies/motion-dev-animations-skill?style=for-the-badge&logo=github&label=%E2%AD%90%20Star%20this%20repo&color=yellow)](https://github.com/199-biotechnologies/motion-dev-animations-skill/stargazers)
[![Follow @longevityboris](https://img.shields.io/badge/Follow_%40longevityboris-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/longevityboris)

</div>
