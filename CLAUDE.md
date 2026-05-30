# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static marketing landing page for **Auria AI** (autonomous AI for security monitoring centers), deployed at `https://www.auria-ai.com.br/`. No build system, no package manager — everything is plain HTML/CSS/JavaScript.

## Git workflow

Commit and push directly to `main` — no feature branches, no pull requests. Vercel auto-deploys from `main`.

## Development

To preview, serve the directory with any static file server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open `http://localhost:8000` in a browser.

There are no lint, test, or build commands.

## File structure

- `index.html` — main landing page (all CSS and JS are inline, no external files)
- `demo/index.html` — demo placeholder ("coming soon") page
- `og-template.html` — 1200×630 template used to generate the social preview image (`og-image.png`)
- Article pages (separate HTML files): `ia-na-seguranca-residencial.html`, `sistemas-autonomos-na-seguranca.html`, `visao-computacional-auria.html`

## Architecture

All CSS and JS live inline in each HTML file — there are no shared stylesheets or script files. The main page (`index.html`) is ~2000 lines.

### Design system (CSS custom properties)

Defined in `:root` at the top of each file. The palette:

| Variable | Value | Role |
|---|---|---|
| `--bg-primary` | `#08060e` | Page background |
| `--accent-1` | `#8b5cf6` | Primary purple |
| `--accent-2` | `#a78bfa` | Light purple |
| `--accent-3` | `#6d28d9` | Dark purple |
| `--accent-cyan` | `#06b6d4` | Secondary accent |

Fonts loaded from Google Fonts: **Inter** (body text) and **Space Grotesk** (headings, labels, logos).

### Bilingual content (PT/EN)

All user-visible strings carry two data attributes: `data-pt="..."` and `data-en="..."`. The active language is toggled by the `setLang(lang)` function in the inline `<script>` block, which walks every `[data-pt][data-en]` element and sets `textContent` (or `placeholder` for inputs). Default is Portuguese (`pt`).

When adding new text content, always add both `data-pt` and `data-en` attributes — never hardcode text directly.

### Scroll reveal

Sections that should animate in on scroll carry the class `fade-in`. An `IntersectionObserver` adds `visible` when the element enters the viewport, triggering the CSS transition. New sections should use this pattern.

### Page sections (in order)

`#solution` → `#challenges` → before/after → `#how-it-works` → human-in-the-loop → `#use-cases` → `#product` → `#articles` → `#cta`

The CTA button links to an external Google Form.
