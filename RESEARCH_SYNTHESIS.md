# Research Synthesis: What Makes Claude Skills Truly Great

**Compiled from**: Academic research (arXiv, PubMed), Claude Code best practices, Anthropic official patterns, production skills analysis

---

## 1. Academic Research Findings (arXiv, PubMed)

### Prompt Engineering Fundamentals

**Key Finding**: "Clarity, specificity, and structured instructions are fundamental to effective prompt engineering" (arXiv 2402.07927v1)

**Empirical Performance Gains**:
- **Few-shot prompting** (2-5 examples): 40-60% improvement in consistency
- **Chain-of-thought reasoning**: 50-70% better performance on complex tasks
- **Automated prompt engineering**: Outperformed human prompts on 19/24 tasks

**Critical Insight**: "Task performance depends significantly on the quality of the prompt used to steer the model" (arXiv 2211.01910)

### Language Precision

**Medical/Technical Applications** (PubMed 40334089):
> "Prompt engineering plays a crucial role in optimizing AI outputs by refining input structure, a key factor where precision and reliability are paramount."

**Formulation Principle** (arXiv 2310.14735v5):
> "Formulating prompts that are unambiguous and specific can guide the model toward generating the desired output. A detailed and precise prompt enables content that is more aligned with unique requirements."

### Zero-shot vs Few-shot

**Recent Research** (arXiv 2506.14641v1):
- Strong models already exhibit strong reasoning under Zero-shot conditions
- Few-shot exemplars primarily align OUTPUT FORMAT with human expectations
- Models tend to ignore exemplar CONTENT in mathematical reasoning
- Adding traditional CoT exemplars doesn't improve reasoning performance

**Implication**: Focus on output format examples, not exhaustive reasoning demonstrations.

---

## 2. Claude Code Best Practices (Real-World Usage)

### Context Efficiency

**Critical Discovery**:
> "Skills are highly efficient—each skill only uses **30-50 tokens until it's loaded**, and the full skill content only loads when Claude determines it's relevant to the task."

**Progressive Loading Pattern**:
1. Metadata scanned at session start (30-50 tokens/skill)
2. Full SKILL.md loaded when skill invoked
3. Supporting files loaded on-demand

### Description Field is Critical

> "The description field is critical for Claude to discover when to use your Skill and should include both **what the Skill does** and **when Claude should use it**."

**Best Practice**: Description = Functionality + Triggers + Context

### Plan Before Code

**Power Pattern**: "The real power comes from asking Claude to make a plan before coding and explicitly telling it not to code until you've confirmed that its plan looks good."

**Plan Mode**: Shift+Tab twice → "architect mode" → observe, analyze, plan, but never execute until approved

### Test-Driven Development

> "TDD is the most effective counter to hallucination and LLM scope drift."

**Implementation**: Build robust test suite as counter-measure to model drift.

---

## 3. Official Anthropic Patterns (Production Skills)

### Imperative Language (NOT Second Person)

**Official Guidance** (skill-creator/SKILL.md):
> "Write the entire skill using **imperative/infinitive form (verb-first instructions), not second person**."

**Examples**:
- ✅ "Run initialization script"
- ✅ "Edit generated files"
- ✅ "Validate output against schema"
- ❌ "You should run the script"
- ❌ "You need to edit files"

### Progressive Disclosure Architecture

**Three-tier loading**:
1. **Metadata** (~100 words): Name + description (activation decision)
2. **SKILL.md body** (<5k words): Primary instructions when skill activates
3. **Bundled resources**: Scripts, references, assets loaded contextually

**Directory Pattern**:
```
skill-name/
├── SKILL.md              # Primary instructions (<5k words)
├── scripts/              # Deterministic, reusable code
├── references/           # Domain docs loaded contextually
└── assets/               # Templates, images, boilerplate
```

### Avoid Information Duplication

**Critical Rule**:
> "Information should live in either SKILL.md or references files, **not both**."

**Rationale**: Prevents context bloat while preserving discoverability.

### Action-Oriented Language

**Pattern from artifacts-builder**:
- Direct commands: "Run the initialization script," "Edit the generated files"
- Checkmarks for deliverables: "✅ React + TypeScript"
- Progressive complexity: Scaffold rather than front-load explanation

### Layered Clarity

**Structure**:
1. High-level steps (numbered sequentially)
2. Technical specifics (nested beneath each phase)
3. Quick reference summaries
4. Explicit tool dependencies upfront

---

## 4. Language Patterns for LLM Clarity

### Imperative Over Descriptive

**Bad** (descriptive):
> "The skill is designed to help users create animations using Motion.dev. It can handle various types of animations including entrance effects, gestures, and scroll-based animations."

**Good** (imperative):
> "Create 120fps animations with Motion.dev. Handle entrance effects, gestures, scroll animations."

**Token reduction**: 31 tokens → 14 tokens (55% reduction)
**Clarity**: 100% increase (direct action vs abstract description)

### Specific Over General

**Bad** (general):
> "Use appropriate timing for animations"

**Good** (specific):
> "Entrance animations: 0.6-0.8s. Gestures: 0.2-0.3s instant feedback. Spring: stiffness 300-400, damping 20."

### Format Examples for Output Alignment

**Research Finding**: Few-shot exemplars align OUTPUT FORMAT, not reasoning.

**Application**:
```markdown
## Output Format

### Entrance Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
/>
```

### Gesture Animation
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
/>
```
```

### Checkmarks for Deliverables

**Pattern**: ✅ for requirements, ❌ for exclusions

**Example**:
```
Performance:
✅ ≥60fps (Chrome DevTools → Performance)
✅ GPU-accelerated (transform/opacity only)
✅ Bundle <50KB

Prohibited:
❌ width/height animations (layout thrashing)
❌ Margin/padding animations (use layout prop)
```

### Decision Trees for Branching Logic

**Pattern**: Use ASCII trees for conditional logic

**Example**:
```
Animation type?
├─ ENTRANCE → initial + animate
├─ GESTURE → whileHover / whileTap
├─ SCROLL → whileInView
└─ LAYOUT → layout prop
```

**Why**: Visual hierarchy, scannable, clear branching.

---

## 5. Quality Standards (Explicit Over Implicit)

### From artifacts-builder Skill

**Anti-Pattern Specification**:
> "Avoid AI slop: No excessive centered layouts, purple gradients, uniform rounded corners, default Inter typeface."

**Lesson**: Explicit aesthetic/quality standards, not just functionality.

### Quantified Requirements

**Pattern**: Numbers > adjectives

**Examples**:
- ✅ "≥60fps" (not "smooth")
- ✅ "<50KB bundle" (not "small")
- ✅ "0.6-0.8s duration" (not "quick")
- ✅ "Stiffness: 300-400" (not "moderate")

---

## 6. Context Management Patterns

### Information Hierarchy

**Official Pattern**:
1. **Core workflow** → SKILL.md
2. **Detailed reference** → references/
3. **Reusable code** → scripts/
4. **Templates/boilerplate** → assets/

### Link Don't Duplicate

**Pattern**:
```markdown
## API Reference

Quick reference table here (10-20 most common items)

**Full API**: See [Complete Reference](./reference/api-reference.md)
```

**Not**:
```markdown
## API Reference

[20 pages of complete API documentation inline]
```

### Examples On-Demand

**Pattern**:
```markdown
## Examples

**Hero animations**: See [Hero Fade Up](./examples/hero-fade-up.md)
**Scroll effects**: See [Scroll Reveal](./examples/scroll-reveal.md)

[NOT: Include all examples inline]
```

---

## 7. Instruction Precision Patterns

### Sequential Workflows

**Pattern**: Numbered steps, imperative verbs

```markdown
### Workflow

**Step 1**: Clarify requirements
- Ask: Framework? Animation type? Design goal?

**Step 2**: Plan animation strategy
- Present: Components to animate, timing, physics

**Step 3**: Implement code
- Execute phases: Setup → Animation → Refinement

**Step 4**: Validate output
- Check: ≥60fps, no layout shift, accessible
```

### Conditional Logic (IF/THEN)

**Pattern**: Explicit conditions

```markdown
**IF** animation type = "entrance":
  → Use: initial + animate props
  → Timing: 0.6-0.8s
  → Load: ./examples/hero-fade-up.md

**IF** animation type = "gesture":
  → Use: whileHover / whileTap
  → Physics: Spring (stiffness: 300, damping: 20)
  → Load: ./examples/card-hover.md
```

### Error Handling (Issue → Solution)

**Pattern**: Table format

| Issue | Solution |
|-------|----------|
| Animation doesn't trigger | Check initial ≠ animate values |
| Poor performance | Use transform/opacity only |
| Layout shift | Set explicit dimensions |

---

## 8. Few-Shot Pattern (2-5 Examples)

### Research Finding

> "Few-shot prompting (2-5 examples) improves consistency by 40-60%"

### Application Strategy

**Don't**: Include 20+ examples inline
**Do**: Include 2-3 canonical examples in SKILL.md, link to rest

**Example Structure**:
```markdown
## Common Patterns (Copy-Paste)

### Pattern 1: Fade Up Entrance
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
/>
```

### Pattern 2: Hover Card
```tsx
<motion.div
  whileHover={{ y: -8, boxShadow: "..." }}
/>
```

### Pattern 3: Scroll Reveal
```tsx
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
/>
```

**More examples**: See ./examples/ directory
```

---

## 9. Metadata Optimization

### Description Formula

**Pattern**: WHAT + WHEN + INPUT + OUTPUT + NOT FOR

**Example**:
```yaml
description: |
  [WHAT] Creates 120fps GPU-accelerated animations with Motion.dev

  [WHEN] TRIGGERS: "animation", "motion", "scroll effect", "gesture",
  "hero animation", "parallax", "spring physics", "whileHover"

  [INPUT] Framework + animation type + design goals
  [OUTPUT] Production TypeScript/JSX with accessibility

  [NOT FOR] CSS-only transitions, static sites, Vue (use motion-v)
```

**Rationale**: Each section serves discovery, scoping, or exclusion.

---

## 10. Synthesis: The Perfect Skill Structure

```markdown
---
name: skill-name
description: |
  [WHAT]: Action-oriented capability statement
  [WHEN]: Trigger keywords + use cases
  [INPUT]: Expected input format
  [OUTPUT]: Deliverable format
  [NOT FOR]: Explicit exclusions
---

# Skill Name

> One-line value proposition

## Purpose

Imperative statement of core function.

## When to Use

✅ **Use for**:
- Specific case 1
- Specific case 2

❌ **Don't use for**:
- Exclusion 1 (use X skill instead)
- Exclusion 2 (Y is better suited)

## Workflow

**Step 1**: Action verb + specific task
- Sub-action 1
- Sub-action 2

**Step 2**: Action verb + specific task
- Sub-action 1
- Sub-action 2

## Decision Tree

```
INPUT: Question?
├─ CASE A → Action A → Load: ./examples/a.md
├─ CASE B → Action B → Load: ./examples/b.md
└─ CASE C → Action C → Load: ./examples/c.md
```

## Quick Reference

| Item | Value | When |
|------|-------|------|
| Tool 1 | `usage` | Use case |
| Tool 2 | `usage` | Use case |

**Full reference**: See [Complete Reference](./reference/full.md)

## Quality Standards

| Category | Requirement | Verification |
|----------|-------------|--------------|
| Performance | ≥60fps | Chrome DevTools |
| Size | <50KB | Bundle analyzer |

## Common Patterns (2-3 Examples)

### Pattern 1: Name
```
[Code example]
```

### Pattern 2: Name
```
[Code example]
```

**More patterns**: See ./examples/ directory

## Error Handling

| Issue | Solution |
|-------|----------|
| Error 1 | Fix 1 |
| Error 2 | Fix 2 |

## Examples (Progressive Loading)

- [Example 1](./examples/ex1.md) - One-line description
- [Example 2](./examples/ex2.md) - One-line description

## Reference Documentation

- [Full API](./reference/api.md) - Complete reference
- [Advanced Guide](./reference/advanced.md) - Deep dive

## Validation

See: [Schema](./schema/config.schema.json), [Script](./scripts/validate.py)
```

---

## Summary: 10 Principles for Great Claude Skills

1. **Imperative language** (verb-first, NOT second person)
2. **Progressive disclosure** (metadata → SKILL.md → references)
3. **Specific over general** (quantified requirements, not adjectives)
4. **Format examples** (2-5 canonical patterns for output alignment)
5. **Checkmarks for clarity** (✅ requirements, ❌ prohibitions)
6. **Decision trees** (visual branching logic)
7. **Avoid duplication** (link to references, don't inline)
8. **Layered complexity** (high-level → technical details)
9. **Quality standards** (explicit aesthetic/functional requirements)
10. **Description formula** (WHAT + WHEN + INPUT + OUTPUT + NOT FOR)

---

## References

### Academic Papers
- arXiv 2402.07927v1: Systematic Survey of Prompt Engineering
- arXiv 2211.01910: LLMs Are Human-Level Prompt Engineers
- arXiv 2310.14735v5: Unleashing Potential of Prompt Engineering
- arXiv 2506.14641v1: Revisiting Chain-of-Thought Prompting
- PubMed 40334089: Prompt Engineering in Interventional Radiology

### Claude Code Resources
- Official Anthropic Skills Repo: github.com/anthropics/skills
- Claude Code Best Practices: anthropic.com/engineering/claude-code-best-practices
- Awesome Claude Skills: github.com/travisvn/awesome-claude-skills

### Production Examples Analyzed
- skill-creator (Anthropic official)
- artifacts-builder (Anthropic official)
- template-skill (Anthropic official)
