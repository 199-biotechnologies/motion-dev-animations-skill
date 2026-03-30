# Contributing

Thanks for your interest in improving the Motion.dev Animations Skill. This guide covers how to contribute.

## Ways to Contribute

### Add Animation Examples

Create a new Markdown file in `examples/` with this structure:

1. Title and one-line description
2. Use case (where this animation works best)
3. Performance notes (GPU-accelerated properties used)
4. Full code implementation in React/Next.js
5. Optional: Svelte or Astro variant

Look at `examples/hero-fade-up.md` as a reference.

### Expand API Reference

The `reference/` directory contains Motion.dev API documentation. Add new docs for hooks, components, or utilities that are missing. Keep it practical with code examples.

### Create Templates

Templates live in `templates/`. These are complete, copy-paste starter files. Every template must:

- Use TypeScript
- Include `prefers-reduced-motion` support
- Use GPU-accelerated properties only (transform, opacity, filter)
- Work with React 19+ and Next.js 15+ App Router

### Improve SKILL.md

The core skill instructions in `SKILL.md` should stay under 2,000 tokens. If you add new capabilities, keep the core compressed and add detail in supporting files that load on-demand.

## Pull Request Process

1. Fork the repo and create a branch from `main`.
2. Add or modify files following the patterns above.
3. Test your changes by installing the skill locally and running Claude Code against it.
4. Open a pull request with a clear description of what you changed and why.

## Code Standards

- All animation code must target 60fps+ performance.
- Use `transform` and `opacity` for animations. Avoid `width`, `height`, `top`, `left`.
- Include `prefers-reduced-motion` media query handling.
- TypeScript over JavaScript.
- Spring physics over duration-based easing when possible.

## Reporting Issues

Open a GitHub issue for:

- Incorrect Motion.dev API usage in examples
- Performance problems in generated animations
- Missing animation patterns you want covered
- Accessibility gaps

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
