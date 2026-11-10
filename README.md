# LabTrack 🔬 — Laboratory Inventory & Equipment Tracker

> A minimal, modern **Light Yellow and Snowy themed** frontend application to solve apparatus bottlenecks, prevent wasted practical session time, track equipment conditions, pinpoint exact bench/cabinet locations, and streamline maintenance tickets.

![Theme](https://img.shields.io/badge/Theme-Light%20Yellow%20%26%20Snowy-FDE047?labelColor=F8FAFC&style=flat-square)
![Stack](https://img.shields.io/badge/Stack-React%2018%20%2B%20TypeScript%20%2B%20Vite%20%2B%20TailwindCSS-0284C7?style=flat-square)
![Deployment](https://img.shields.io/badge/Deployment-Ready-10B981?style=flat-square)

---

## 🎯 The Problem Solved

In university and high-school science/engineering laboratories, **students consistently lose 15–30 minutes per practical session** searching across multiple rooms and cabinets for apparatus, or setting up experiments only to find that an essential multimeter, microscope objective, laser diode, or power supply is broken or uncalibrated.

**LabTrack** solves this directly:
1. **Zero-Wandering Location Tracker**: Shows the exact Room, Cabinet, and Shelf coordinates for every single apparatus.
2. **Live Session Availability**: Instantly reveals what is free to grab vs. currently checked out at which student bench.
3. **Condition & Damage Prevention**: Visual indicator of equipment health (`Excellent`, `Good`, `Fair`, `Needs Service`).
4. **Instant Checkout & Return Flow**: Students register their name and bench in 2 clicks.
5. **Fast Maintenance Tickets**: Any student or technician can flag damaged apparatus with one tap, immediately routing it to `Under Maintenance` so others don't waste time trying to use a broken device.
6. **Persistence**: Saves state in `localStorage` with a 1-click **Reset Demo** option for demonstrations and evaluation.

---

## 🎨 Theme & Aesthetics

Designed with a **minimal and modern light yellow and snowy theme**:
- **Snowy Canvas**: Pure `#F8FAFC` slate-white background with frosted glass cards (`snow-glass`).
- **Warm Light Yellow Accents**: Butter & canary accents (`#FEF08A`, `#FDE047`, `#EAB308`) for action buttons, highlights, and active session badges.
- **Micro-interactions**: Subtle hover elevations, responsive pill controls, and crisp typography with **Plus Jakarta Sans** and **JetBrains Mono**.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in your browser (default http://localhost:5173)
```

---

## 📦 Production Build

```bash
npm run build
```
The optimized static bundle will be built into the `./dist` directory.

You can preview the production build locally:
```bash
npm run preview
```

---

## 🌐 Direct Deployment Guide

This project is direct-deployment ready and works seamlessly on any static hosting provider:

### 1. GitHub Pages (Automated via GitHub Actions)
A pre-configured GitHub Actions workflow is included at `.github/workflows/deploy.yml`.
1. Push this repository to GitHub.
2. Go to **Settings > Pages** on your GitHub repo.
3. Set **Source** to **GitHub Actions**.
4. Pushing to `main` will automatically build and deploy the live site!

### 2. Vercel
A `vercel.json` file is already included.
- Connect your GitHub repository to [Vercel](https://vercel.com).
- Framework Preset: **Vite**.
- Click **Deploy**.

### 3. Netlify
- Drag and drop the `dist/` folder into Netlify Drop, or connect your Git repo with build command `npm run build` and publish directory `dist`.

---

## 🛠️ Project Structure

```
labtrack/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages automated CI/CD pipeline
├── src/
│   ├── components/
│   │   ├── AddEquipmentModal.tsx     # Add new apparatus to catalog
│   │   ├── CheckoutModal.tsx         # Fast 2-click student checkout modal
│   │   ├── EquipmentCard.tsx         # Apparatus card with exact location & condition
│   │   ├── EquipmentDetailsModal.tsx # Full specs, blueprints & maintenance logs
│   │   ├── FilterBar.tsx             # Lab category & live status filter bar
│   │   ├── Navbar.tsx                # Brand header with demo reset & stats
│   │   ├── ReportIssueModal.tsx      # Maintenance ticket logger
│   │   ├── ReturnModal.tsx           # Check-in return with condition verification
│   │   └── StatsOverview.tsx         # Metric overview cards
│   ├── data/
│   │   └── mockEquipment.ts          # Curated multi-domain laboratory dataset
│   ├── types/
│   │   └── inventory.ts              # TypeScript interfaces for apparatus & tickets
│   ├── App.tsx                       # Core application state & layout
│   ├── index.css                     # Custom styles, snowy & butter theme tokens
│   └── main.tsx                      # Application mount point
├── index.html                        # HTML root with fonts & SVG icon
├── tailwind.config.js                # Custom color palette & shadows
├── package.json
├── vercel.json                       # Vercel deployment configuration
└── README.md
```

---

## 📄 License
MIT License. Created for frictionless university and school laboratory sessions.
