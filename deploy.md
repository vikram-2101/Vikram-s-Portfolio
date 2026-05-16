# Deployment Guide

This guide covers how to deploy your portfolio site to various hosting platforms.

---

## Table of Contents

1. [Vercel (Recommended)](#vercel-recommended)
2. [Netlify](#netlify)
3. [GitHub Pages](#github-pages)
4. [Cloudflare Pages](#cloudflare-pages)
5. [Railway](#railway)
6. [Build Output](#build-output)

---

## Vercel (Recommended)

Vercel is the easiest option for deploying React/Vite projects.

### Option 1: Deploy via GitHub

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings

3. **Configure (Optional)**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at `your-project.vercel.app`

### Option 2: Deploy via CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Custom Domain on Vercel

1. Go to your project dashboard on Vercel
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

---

## Netlify

### Option 1: Drag and Drop

1. **Build your project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist` folder to the deploy area

### Option 2: Connect GitHub

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. Click "Deploy site"

### Option 3: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**
   ```bash
   netlify init
   netlify deploy --prod
   ```

### Netlify Redirects (Important for SPA)

Create a `public/_redirects` file:
```
/*    /index.html   200
```

This ensures client-side routing works correctly.

---

## GitHub Pages

### Setup

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/', // Add this line
     // ... rest of config
   })
   ```

3. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`

Your site will be at: `https://yourusername.github.io/your-repo-name/`

### Custom Domain on GitHub Pages

1. Create `public/CNAME` file with your domain:
   ```
   yourdomain.com
   ```

2. Update DNS records to point to GitHub Pages

---

## Cloudflare Pages

### Connect GitHub

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Click "Create a project"
3. Connect your GitHub account
4. Select your repository
5. Configure build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Click "Save and Deploy"

### Benefits
- Free SSL
- Global CDN
- Unlimited bandwidth
- Web analytics included

---

## Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect and select your repository
5. Railway auto-detects Vite and configures it

### Add Custom Start Command (if needed)

In Railway dashboard:
- Build Command: `npm run build`
- Start Command: `npx serve dist`

---

## Build Output

Before deploying anywhere, you can test your production build locally:

### Build
```bash
npm run build
```

This creates a `dist` folder with all static files.

### Preview Locally
```bash
npm run preview
```

This serves the production build at `http://localhost:4173`

### What's in the `dist` folder?
```
dist/
├── index.html          # Entry HTML
├── assets/
│   ├── index-[hash].js # Bundled JavaScript
│   └── index-[hash].css # Bundled CSS
├── favicon.ico
└── robots.txt
```

---

## Environment Variables

If you add environment variables later, configure them in each platform:

| Platform | Location |
|----------|----------|
| Vercel | Project Settings → Environment Variables |
| Netlify | Site Settings → Build & Deploy → Environment |
| Cloudflare | Settings → Environment Variables |
| Railway | Variables tab in project dashboard |

**Important:** Vite requires environment variables to be prefixed with `VITE_` to be exposed to the client.

```bash
# .env
VITE_API_KEY=your-api-key
```

---

## Troubleshooting

### Blank Page After Deploy

1. Check `base` in `vite.config.ts` matches your deploy path
2. Ensure `dist` folder contains `index.html`
3. Check browser console for errors

### Routes Not Working (404 on refresh)

Add a redirect rule for SPA:
- **Vercel**: Create `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```
- **Netlify**: Create `public/_redirects`:
  ```
  /*    /index.html   200
  ```

### Assets Not Loading

Check that all asset paths are relative or use the correct base URL.

---

## Quick Comparison

| Platform | Free Tier | Custom Domain | SSL | Build Minutes |
|----------|-----------|---------------|-----|---------------|
| Vercel | ✅ Generous | ✅ Free | ✅ Auto | 6000/mo |
| Netlify | ✅ Generous | ✅ Free | ✅ Auto | 300/mo |
| GitHub Pages | ✅ Unlimited | ✅ Free | ✅ Auto | Via Actions |
| Cloudflare | ✅ Unlimited | ✅ Free | ✅ Auto | 500/mo |
| Railway | ✅ $5 credit | ✅ Free | ✅ Auto | Unlimited |

---

## Recommended Workflow

1. **Development**: Use Lovable's built-in preview
2. **Staging**: Deploy to Vercel preview (automatic on PR)
3. **Production**: Deploy to Vercel production (on main branch merge)

This gives you automatic deployments on every push!
