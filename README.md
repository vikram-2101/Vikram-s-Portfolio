# Harshit Portfolio (React + Vite)

Editorial-style portfolio with a dark-first theme, responsive navbar/menu, project lightbox demos, and section-based layout.

---

## Quick start

```bash
npm install
npm run dev
```

Build production bundle:

```bash
npm run build
```

---

## Current architecture

### Routes
- `/` → portfolio page (`src/pages/Index.tsx`)
- `/harshit110927` → admin placeholder (`src/pages/AdminPanel.tsx`)

### Main page composition
`src/pages/Index.tsx` renders:
1. Rolling intro (`RollingIntro`)
2. Navbar + theme toggle + mobile menu
3. Hero (`Hero`)
4. Selected Work (`Projects`)
5. About (`Experience` component currently used as About)
6. Contact + footer (`Footer`)

---

## Where to edit content

## 1) Navbar links, theme toggle, mobile menu
**File:** `src/pages/Index.tsx`

- `navItems` controls top navigation labels/anchors.
- Theme default + persistence are in the `localStorage` effect.
- `.scrolled` class behavior (after 60px) is handled in scroll listener.
- Mobile menu open/close + outside click handling also lives here.

---

## 2) Hero section
**File:** `src/components/Hero.tsx`

Edit:
- Role label text
- Main headline
- Supporting paragraph

Styling is controlled in `src/index.css` by:
- `.hero-section`
- `.role-label`
- `.hero-headline`
- `.hero-copy`

---

## 3) Projects / Selected Work
**File:** `src/components/Projects.tsx`

Projects are defined in the `projects` array.
Each project supports:
- `id`
- `title`
- `description`
- `fullDescription` (optional)
- `fullVideo` (YouTube embed URL; used for modal)
- `liveUrl` (optional)
- `githubUrl` (optional)
- `tags` (string[])
- `type` (e.g. `Case Study`, `Product`)

### Add a new project
Append a new object to `projects`:

```ts
{
  id: "5",
  title: "New Project",
  description: "One-line summary",
  fullDescription: "Longer editorial description.",
  fullVideo: "https://www.youtube.com/embed/VIDEO_ID", // optional
  liveUrl: "https://example.com", // optional
  githubUrl: "https://github.com/user/repo", // optional
  tags: ["React", "TypeScript"],
  type: "Case Study",
}
```

### Video modal behavior
- Uses `youtube-nocookie.com` embed at runtime.
- Closes on backdrop click, Escape key, or close button.
- Iframe is unmounted on close to stop playback.

---

## 4) About section
**File:** `src/components/Experience.tsx`

Despite filename, this currently renders the **About** section.

Edit:
- Intro and supporting paragraphs in `.about-copy`
- Value cards from the `values` array

---

## 5) Contact + footer
**File:** `src/components/Footer.tsx`

Edit:
- Personal name in headline
- CTA links (Email, GitHub, LinkedIn, Resume)
- Footer copy line

---

## How to add a dedicated “Writings” section

Recommended approach: create a new component and add it into `Index.tsx` between Projects and About.

### Step A — create component
Create `src/components/Writings.tsx`:

```tsx
const writings = [
  {
    id: "01",
    title: "Designing AI UX for real users",
    publication: "Medium",
    date: "2026-03-10",
    url: "https://...",
  },
];

const Writings = () => (
  <section className="section section-divider" id="writings">
    <div className="content-wrap">
      <p className="section-number fade-in">02</p>
      <h2 className="section-title fade-in">Writings</h2>
      {/* map list rows */}
    </div>
  </section>
);

export default Writings;
```

### Step B — insert into page
In `src/pages/Index.tsx`:
- `import Writings from "@/components/Writings";`
- Place `<Writings />` in `<main>` where you want it.
- Add `{ label: "Writings", href: "#writings" }` to `navItems`.

### Step C — style rows in `src/index.css`
Use existing typography tokens:
- headings: `Cormorant Garamond`
- body: `Syne`
- labels/meta: `JetBrains Mono`

Reuse section utilities:
- `.section`
- `.section-divider`
- `.section-number`
- `.section-title`

---

## How to split “About” and “Experience” into two columns/sections

Right now `Experience.tsx` is used as About. If you want a true Experience block:

### Option 1 (recommended): separate components
1. Keep current `Experience.tsx` as `About` and rename file to `About.tsx`.
2. Create new `Experience.tsx` with timeline or role list.
3. Update imports in `src/pages/Index.tsx` accordingly.

### Option 2: keep one file, two columns
Inside current `Experience.tsx`, expand `about-grid` from:
- left: bio
- right: values

to include a third block (or nested block) for role history.

If making columns, extend CSS in `src/index.css` near:
- `.about-grid`
- `.value-item`

---

## Theme, colors, and typography

### Tokens
All palette tokens are in `src/index.css` under `:root` and `.dark`.

### Fonts
- Imported in `index.html`
- Tailwind aliases in `tailwind.config.ts`:
  - `font-display` → Cormorant Garamond
  - `font-body` → Syne
  - `font-mono` → JetBrains Mono

### Global layout utilities
`src/index.css` includes:
- `.content-wrap` (max-width 1100)
- `.section` spacing
- `.section-divider`
- fade-in animation (`.fade-in`, `.visible`)

---

## Animation system

Scroll reveal is controlled in `src/pages/Index.tsx` using `IntersectionObserver` with threshold `0.08`.

To animate any new element:
1. add class `fade-in`
2. it will receive `.visible` when observed

Hero is forced visible immediately by also using `hero-immediate`.

---

## Common edit recipes

### Add a new nav item
- Add to `navItems` in `src/pages/Index.tsx`
- Ensure target section has matching `id`

### Change accent color
- Edit `--accent` in both `:root` and `.dark` in `src/index.css`

### Change section order
- Reorder components inside `<main>` in `src/pages/Index.tsx`

### Disable rolling intro
- In `src/pages/Index.tsx`, remove or bypass `showIntro` logic and `<RollingIntro />`

---

## Notes
- Routing/data logic is intentionally minimal and should remain unchanged for style-only iterations.
- If you add new visual sections, keep section IDs synced with `navItems` for smooth anchor navigation.
