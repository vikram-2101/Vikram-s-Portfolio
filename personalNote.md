# Portfolio Content Editing Guide

This guide helps you (or any AI) quickly edit the content of your portfolio.

---

## 📍 Quick File Reference

| Section                       | File Path                           |
| ----------------------------- | ----------------------------------- |
| Hero (Name, Tagline, Subhead) | `src/components/Hero.tsx`           |
| Stoic Quotes                  | `src/components/Hero.tsx`           |
| Projects                      | `src/components/Projects.tsx`       |
| Experience/Work History       | `src/components/Experience.tsx`     |
| Testimonials                  | `src/components/Testimonials.tsx`   |
| Footer                        | `src/components/Footer.tsx`         |
| Theme Colors                  | `src/index.css`                     |
| Fonts                         | `index.html` + `tailwind.config.ts` |
| Intro Animation Words         | `src/components/RollingIntro.tsx`   |

---

## 🧑‍💻 Hero Section

**File:** `src/components/Hero.tsx`

### Name (Lines ~75-78)

```tsx
<motion.h1 variants={itemVariants} className="hero-name text-foreground">
  Vikram         <!-- Change first name here -->
  <br />
  Kumar         <!-- Change last name here -->
</motion.h1>
```

### Tagline (Line ~84)

```tsx
I ship production-ready tools in days.
```

### Subhead / Tech Stack (Line ~94)

```tsx
Full-stack (Next.js/Spring Boot) + AI (RAG/Agents). Building the future, one commit at a time.
```

### Social Links (Lines ~50-54)

```tsx
const socialLinks = [
  { icon: Github, href: "https://github.com/YOUR_USERNAME", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/YOUR_USERNAME",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:YOUR_EMAIL@gmail.com", label: "Email" },
];
```

---

## 📜 Stoic Quotes

**File:** `src/components/Hero.tsx` (Lines ~5-16)

Add, remove, or edit quotes in this array:

```tsx
const STOIC_QUOTES = [
  { text: "Your quote text here.", author: "Author Name" },
  { text: "Another quote.", author: "Another Author" },
  // Add more quotes...
];
```

The quote changes randomly on each page reload.

---

## 🚀 Projects

**File:** `src/components/Projects.tsx` (Lines ~21-67)

Each project follows this structure:

```tsx
{
  id: "1",                                    // Unique ID
  title: "Project Name",                      // Display title
  description: "Short tagline",               // One-liner shown on card
  fullDescription: "Detailed description...", // Shown in modal
  tags: ["React", "Node.js", "PostgreSQL"],   // Tech stack tags
  liveUrl: "https://yourproject.com",         // Live demo link (optional)
  githubUrl: "https://github.com/...",        // GitHub repo (optional)
  previewVideo: "/path/to/video.mp4",         // Card preview video (optional)
  fullVideo: "https://youtube.com/embed/...", // Modal video embed (optional)
}
```

### To Add a Project:

Add a new object to `mockProjects` array with incremented `id`.

### To Remove a Project:

Delete the project object from the array.

---

## 💼 Experience / Work History

**File:** `src/components/Experience.tsx` (Lines ~12-37)

Each experience entry:

```tsx
{
  id: "1",
  company: "Company Name",
  role: "Your Job Title",
  startDate: "2023",
  endDate: "Present",          // or "2024" etc.
  description: "Brief description of what you did.",
}
```

Entries appear in order — first item is shown at top.

---

## 💬 Testimonials

**File:** `src/components/Testimonials.tsx` (Lines ~14-39)

Each testimonial:

```tsx
{
  id: "1",
  name: "Person's Name",
  role: "Their Title, Company",
  quote: "What they said about you.",
}
```

---

## 🎨 Theme Colors

**File:** `src/index.css`

### Light Theme (Lines ~10-45)

```css
:root {
  --background: 30 100% 96%; /* Warm cream background */
  --foreground: 0 0% 13%; /* Dark text */
  --primary: 0 0% 13%; /* Primary color */
  --muted-foreground: 0 0% 40%; /* Muted text color */
  /* ... more tokens */
}
```

### Dark Theme (Lines ~48-82)

```css
.dark {
  --background: 0 0% 13%; /* Dark background */
  --foreground: 45 23% 95%; /* Light text */
  /* ... more tokens */
}
```

Colors use HSL format: `hue saturation% lightness%`

---

## 🔤 Fonts

### Change Display Font (Headings)

1. **index.html** — Update Google Fonts import:

```html
<link
  href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

2. **tailwind.config.ts** — Update font family:

```ts
fontFamily: {
  display: ["Your Font Name", "sans-serif"],
  body: ["Inter", "sans-serif"],
}
```

### Change Body Font

Same process — update both `index.html` and `tailwind.config.ts`.

---

## 🎬 Intro Animation

**File:** `src/components/RollingIntro.tsx`

### Words Sequence (Line ~4)

```tsx
const WORDS = [
  "DEVELOPER",
  "BUILDER",
  "ENGINEER",
  "CREATOR",
  "HARSHIT",
  "SHUKLA",
];
```

Last 2 words should be your name (they stay visible longest).

### Animation Speed (Lines ~5-6)

```tsx
const ROLL_DURATION = 200; // ms per word (higher = slower)
const FINAL_DELAY = 1100; // ms before exit animation
```

---

## 🧭 Navigation & Footer

**File:** `src/components/Footer.tsx`

Update copyright text, additional links, or social icons here.

---

## 💡 Pro Tips

1. **Always keep unique IDs** — Projects, experience, and testimonials use `id` for React keys.

2. **Test after changes** — Preview your changes in the browser to catch typos.

3. **Use proper quotes** — If your text contains apostrophes, wrap in double quotes:

   ```tsx
   // ❌ Wrong
   quote: 'I can't do this'

   // ✅ Correct
   quote: "I can't do this"
   ```

4. **Optional fields** — `liveUrl`, `githubUrl`, `previewVideo`, `fullVideo` can be omitted.

5. **Order matters** — Items appear in the order they're listed in arrays.

---

## 👁️ Hiding / Showing Sections

**File:** `src/pages/Index.tsx`

The main page imports and renders all sections. To hide or show sections, edit this file.

### Current Section Layout (Lines ~38-44)

```tsx
<main className="bg-background min-h-screen overflow-x-hidden">
  <Hero />
  <Projects />
  <Experience /> {/* Remove or comment to hide */}
  <Testimonials /> {/* Remove or comment to hide */}
  <Footer />
</main>
```

### To Hide Experience Section

**Option 1: Comment out (recommended — easy to restore)**

```tsx
<main className="bg-background min-h-screen overflow-x-hidden">
  <Hero />
  <Projects />
  {/* <Experience /> */}
  <Testimonials />
  <Footer />
</main>
```

**Option 2: Delete the line entirely**

```tsx
<main className="bg-background min-h-screen overflow-x-hidden">
  <Hero />
  <Projects />
  <Testimonials />
  <Footer />
</main>
```

Also remove the import at top of file if deleting:

```tsx
// Remove this line:
import Experience from "@/components/Experience";
```

### To Hide Testimonials Section

Same approach — comment out or delete:

```tsx
{
  /* <Testimonials /> */
}
```

### To Show Section Again

Simply uncomment the line:

```tsx
// Change this:
{
  /* <Experience /> */
}

// Back to this:
<Experience />;
```

Make sure the import exists at the top of the file:

```tsx
import Experience from "@/components/Experience";
```

### To Rearrange Section Order

Simply change the order of components:

```tsx
<main className="bg-background min-h-screen overflow-x-hidden">
  <Hero />
  <Testimonials /> {/* Now before Projects */}
  <Projects />
  <Experience />
  <Footer />
</main>
```

---

## 🔗 Useful Links

- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- [Google Fonts](https://fonts.google.com/)
- [Lucide Icons](https://lucide.dev/icons/) — for adding new icons
- [Framer Motion](https://www.framer.com/motion/) — for animations

---

_Last updated: December 2024_
