---
name: animated-web
description: Build polished, award-level animated components and websites (GSAP, ScrollTrigger, Lenis/Locomotive, CSS, Canvas/WebGL) without breaking existing code. Use for any request involving scroll animation, page transitions, loaders, hover/cursor effects, text reveals, parallax, marquees, or "Awwwards-style" work, and when editing this repo's Locomotive/GSAP pages.
---

# Animated web: build it well, break nothing

## 0. Before touching code
1. Read every file you will change, plus what loads it (`index.html`, CSS, JS). Note which libraries and versions are already loaded and reuse them; never add a second scroll or animation engine.
2. Run the page (or open it headless with the preinstalled Playwright) and take a "before" screenshot. A regression is only provable against a baseline.
3. Say what you will change in one or two sentences. Change only that. Preserve unrelated code, styles and behaviour.
4. If the user gave a reference, name the technique (pinned scroll, clip-path reveal, magnetic cursor) and build that technique. Recreate the effect, never copy another site's brand, copy or imagery.

## 1. Design direction (decide before animating)
- Motion serves the subject. Pick ONE orchestrated hero moment (loader, hero reveal, or scroll story) and keep everything else quiet. Scattered effects read as template work.
- Fix the system first: 3-5 colour tokens, 2 type roles, a spacing scale, and one easing and duration vocabulary (see section 3). Put them in CSS variables at the top.
- Typography carries most of the polish: large fluid sizes (`clamp`/`vw`), tight leading, deliberate case and weight contrasts. Prefer flat colour planes and generous whitespace over borders, shadows and rounded cards.
- Content must be real. Never ship lorem ipsum or empty shells.

## 2. Engine choice
| Need | Use |
|---|---|
| Entrance, timelines, sequencing | GSAP timeline (`gsap.timeline`, labels, position params) |
| Scroll-linked or pinned motion | GSAP ScrollTrigger |
| Smooth scrolling | ONE of Lenis or Locomotive, wired to ScrollTrigger via `scroller`/`update` |
| Hover, focus, small state changes | Plain CSS transitions |
| Endless loops (marquee) | CSS keyframes, `linear` |
| Shaders, particles, 3D | Canvas/WebGL (Three.js), lazy and capped |

Pin library versions exactly (never `latest`). In claude.ai artifacts, scripts load only from cdnjs, jsdelivr/npm, unpkg and a few others; images must be embedded as data URIs.

## 3. Motion vocabulary (this repo's house style)
- Entrances: `expo.out` (fast start, long settle), 0.7-1.2s.
- Hover: `ease`, 0.2-0.5s. Hover is feedback, so keep it under 0.5s.
- Marquees/belts: `linear`, 10s+, infinite, duplicated content for a seamless loop.
- Smooth scroll: Locomotive `lerp: 0.06`.
- Stagger text reveals 0.03-0.08s per unit. Overlap sequences with position params instead of chained delays.
- Animate only `transform` and `opacity` (plus `clip-path`, `filter` sparingly). Never animate `width`, `height`, `top`, `left`, or `background-size` on large layers when a transform will do.

## 4. Do-not-break checklist
**Compatibility**
- Do not rename IDs/classes that JS or CSS already references. Grep for each selector before changing it.
- Do not reorder scripts. GSAP and the scroll library load before the page script.
- After DOM or image changes call `scroll.update()` / `ScrollTrigger.refresh()`.
- Pass functions, never call them: `addEventListener('DOMContentLoaded', fn)`, not `fn()`.
- Kill and clean up: `ScrollTrigger.kill()`, `tl.kill()`, remove listeners, cancel `requestAnimationFrame` when a component unmounts or re-inits.

**Accessibility (required, not optional)**
- Wrap motion in `@media (prefers-reduced-motion: reduce)` and `gsap.matchMedia()`. Provide a calm or static fallback.
- Every hover reveal also works on `:focus-visible` and has a touch alternative (tap or always-visible state). Hover-only content is a bug.
- Keep real text in the DOM (don't bake headings into canvas). Keep visible focus rings. Keep contrast legible, especially yellow-on-white style pairs.
- Loaders must not trap users: cap duration, and never block content if a video or asset fails to load.

**Layout and CSS hygiene**
- IDs must be unique. Use classes for repeated elements.
- Units need units (`letter-spacing: -0.03em`, not `-3.2`).
- No horizontal overflow. Test at ~400px and ~1440px.
- Hide pre-animation states with JS-added classes, not permanent `opacity:0`, so the page is complete if JS fails.
- Reserve space for media (aspect-ratio) to avoid layout shift.

**Performance**
- Target 60fps. Use `will-change` only on elements actively animating, and remove it after.
- Lazy-load media, cap `devicePixelRatio` for WebGL (max 2), pause off-screen canvas and video.
- One `requestAnimationFrame` loop; drive Lenis and ScrollTrigger from it rather than competing loops.
- Avoid scroll listeners that read layout every event; prefer ScrollTrigger or IntersectionObserver.

## 5. Build workflow
1. Make the smallest working version of the effect in isolation (component or single section).
2. Integrate behind existing structure; leave a clear toggle or single init function.
3. Verify: load the page in headless Chromium, check the console for errors, screenshot desktop and phone widths, scroll through the page programmatically, confirm the "before" behaviours still work (existing hovers, links, scroll-to-top).
4. Test with reduced motion emulated (`page.emulateMedia({reducedMotion:'reduce'})`).
5. Report honestly: what was verified, and what only a human can judge (easing feel, timing). Claude cannot perceive motion; ask the user to play it and tune.

## 6. Pattern snippets
**Loader curtain (GSAP)**
```js
const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
tl.to(".curtain", { yPercent: -100, duration: 1.2, delay: 0.5 })
  .to(".hero-title", { color: "#000", duration: 0.7 }, "<0.1")
  .set(".loader", { display: "none" });
```
**Split-text reveal**: wrap lines in `overflow:hidden` spans, animate inner `yPercent: 110 -> 0`, `stagger: 0.06`, `ease: "expo.out"`.
**Pinned horizontal scroll**: `ScrollTrigger.create({ trigger, pin: true, scrub: 1, end: () => "+=" + track.scrollWidth })` with `x: () => -(track.scrollWidth - innerWidth)`; use function-based values and `invalidateOnRefresh: true`.
**Magnetic button**: `mousemove` -> `gsap.to(el, { x: dx*0.3, y: dy*0.3, duration: 0.4, ease: "power3.out" })`; reset on `mouseleave` with `elastic.out(1, 0.4)`; disable on touch and reduced motion.
**Hover image reveal**: set image via one delegated listener, fade with CSS; never swap `background-image` without preloading.
**Marquee**: duplicate the track, `translateX(0 -> -100%)`, `linear`, `infinite`; pause on reduced motion.

## 7. Known issues in this repo (fix when touched, do not mass-refactor)
- Duplicate IDs (`#elem`, `#moving`, `#moving-in`, `#blur`, `#card`).
- `letter-spacing: -3.2` has no unit.
- `loading()` is invoked immediately instead of passed to `DOMContentLoaded`.
- No reduced-motion handling; hover-only reveals.
- Cards use inline-style hover listeners that a CSS `:hover` rule would replace.

## 8. Reporting
End each task with: what changed, how it was verified (commands/screenshots actually run), and remaining risks. Never claim motion "feels right"; state that it needs human review.
