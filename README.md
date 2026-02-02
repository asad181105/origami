# The Origami AI - SaaS Website

A modern, high-converting SaaS website for The Origami AI, built with Next.js, Tailwind CSS, and Framer Motion.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
origamiai/
├── app/
│   ├── layout.tsx          # Root layout with Navbar & Footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── contact/
│       └── page.tsx        # Contact/Demo page
├── components/
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx
│   │   ├── WhatWeDo.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── OurAgents.tsx
│   │   ├── WhyOrigami.tsx
│   │   ├── Industries.tsx
│   │   ├── CTASection.tsx
│   │   └── Testimonials.tsx
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ContactForm.tsx
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## 🎨 Design System

### Colors
- **Background**: Off-white (#FAFAFA) / Soft dark (#0A0A0A)
- **Accent**: Gold (#D4AF37) and Teal (#2DD4BF)
- **Neutral**: Gray scale from 50-900

### Typography
- **Primary Font**: Inter (via Next.js Google Fonts)
- **Display Font**: Inter (can be replaced with Satoshi/General Sans)

### Components
- Fully responsive
- Smooth animations with Framer Motion
- Accessible and SEO-friendly

## 📦 Features

- ✅ Modern, clean design
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth animations and micro-interactions
- ✅ SEO-optimized
- ✅ Component-based architecture
- ✅ TypeScript for type safety
- ✅ Contact form with validation
- ✅ Ready for pricing and login pages

## 📱 Contact & Demo

- Contact form with Supabase backend integration
- Demo page showcasing AI agent capabilities  
- All CTAs redirect to contact page or demo page

## 🚀 Deployment

The site is ready for Vercel. See **[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)** for step-by-step deployment, env vars, and troubleshooting.

### Quick checks

```bash
npm run build
npm start
```

## 🚧 Future Enhancements

- Add pricing page
- Add login/authentication
- Integrate with backend API
- Add blog section
- Add case studies
- Integrate analytics

## 📝 License

Private - The Origami AI

