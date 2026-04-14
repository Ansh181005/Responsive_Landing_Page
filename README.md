# ⬡ NexaFlow — Responsive Landing Page

> **Task 01 — Code Craft** | An interactive, fully responsive landing page with a dynamic navigation menu built using pure HTML, CSS, and JavaScript.

![NexaFlow Preview](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-8b5cf6?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Sections](#-sections)
- [Navigation Interactivity](#-navigation-interactivity)
- [Responsive Breakpoints](#-responsive-breakpoints)
- [Getting Started](#-getting-started)
- [Screenshots](#-screenshots)

---

## 🌟 Overview

**NexaFlow** is a modern, premium-quality responsive landing page built as part of the **Code Craft — Task 01** challenge. The goal was to create an interactive navigation menu that:

- Changes **color and style** when the page is scrolled
- Changes **font color** when hovering over individual menu items
- Maintains a **fixed position** and stays visible on all pages

The project goes well beyond the base requirements, incorporating a full multi-section landing page with scroll animations, animated counters, particle effects, form validation, and a mobile hamburger menu — all using **zero external libraries or frameworks**.

---

## 🚀 Live Demo

Simply open `index.html` in any modern browser — no build step, no server required.

```bash
# Clone the repo
git clone https://github.com/Ansh181005/Responsive_Landing_Page.git

# Open in browser
cd Responsive_Landing_Page
start index.html       # Windows
open index.html        # macOS
xdg-open index.html    # Linux
```

---

## ✨ Features

### 🧭 Navigation (Core Task)
| Feature | Description |
|---------|-------------|
| **Fixed navbar** | Stays at the top on all scroll positions |
| **Scroll color change** | Transparent on top → frosted glass (blur + dark bg) on scroll |
| **Per-item hover colors** | Each nav item lights up with its own unique accent color |
| **Active link tracking** | Highlights the current section's link automatically via `IntersectionObserver` |
| **Smooth scroll** | All anchor links scroll smoothly to their sections |
| **Mobile hamburger** | Animated hamburger → X with slide-in menu and overlay |

### 🎨 Design & Animations
- **Dark glassmorphism** aesthetic with deep navy/purple color palette
- **Gradient text** and gradient CTAs using CSS `background-clip`
- **Floating ring animations** in the hero section
- **Animated particles** rising in the hero background
- **Scroll reveal** — elements fade/slide in as you scroll (Intersection Observer)
- **Floating stat cards** in the About section
- **Cursor glow effect** that lazily follows the mouse (desktop only)
- **Micro-hover interactions** on every card and button

### 🔢 JavaScript Modules
- **Animated counters** — numbers count up when the Stats section enters the viewport
- **Contact form validation** — real-time client-side validation with error messages and success state
- **Keyboard accessibility** — service cards support `Enter`/`Space` key activation
- **Smooth scroll** for all internal anchor links

---

## 🛠 Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic structure (`<nav>`, `<section>`, `<article>`, `<footer>`) |
| **CSS3** | Custom properties, Flexbox, Grid, animations, `@media` queries |
| **Vanilla JavaScript** | DOM manipulation, Intersection Observer, `requestAnimationFrame` |
| **Google Fonts** | `Outfit` (headings) + `Inter` (body text) |

> No frameworks. No libraries. No build tools required.

---

## 📁 Project Structure

```
Responsive_Landing_Page/
│
├── index.html       # Full HTML structure — all sections & components
├── style.css        # Complete styling — variables, layout, animations, responsive
├── script.js        # All JS interactivity — navbar, reveal, counters, form, particles
└── README.md        # You are here
```

---

## 📄 Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Full-viewport intro with animated rings, particles, badge, and CTAs |
| 2 | **About** | Two-column layout with AI illustration, floating stat cards, and feature items |
| 3 | **Services** | 3-column card grid with 6 services, tags, hover effects, and a featured card |
| 4 | **Stats** | Animated counter grid (500+ Projects, 98% Satisfaction, 40+ Countries, 8+ Years) |
| 5 | **Contact** | Split layout with contact details on the left and validated form on the right |
| 6 | **Footer** | Four-column footer with brand info, nav links, social icons, and back-to-top |

---

## 🧭 Navigation Interactivity

The navbar behaviour is fully handled in `script.js`:

```js
// 1. Scroll detection — adds .scrolled class after 50px
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// 2. Active link tracking via IntersectionObserver
// Highlights the nav item matching the currently visible section

// 3. Per-item hover colour — each link has a unique accent
const colors = {
  'nav-home':     '#a78bfa',
  'nav-about':    '#67e8f9',
  'nav-services': '#f9a8d4',
  'nav-stats':    '#6ee7b7',
  'nav-contact':  '#fcd34d',
};
```

**CSS transitions** for the scrolled state:

```css
#navbar {
  background: transparent;            /* default — transparent */
  transition: background 0.35s ease, backdrop-filter 0.35s ease;
}

#navbar.scrolled {
  background: rgba(7, 7, 17, 0.85);   /* scrolled — dark frosted glass */
  backdrop-filter: blur(20px);
  box-shadow: 0 1px 0 rgba(255,255,255,0.08);
}
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|---------------|
| **> 1024px** | Full desktop layout — 3-col services, 4-col stats, 2-col about & contact |
| **≤ 1024px** | Tablet — 2-col services, 2-col stats, stacked about & contact |
| **≤ 768px** | Mobile — hamburger menu, 1-col services, hero stacked, form adjusts |
| **≤ 480px** | Small mobile — 1-col stats, stacked hero actions, compact contact form |

---

## 🏁 Getting Started

No dependencies. No install needed.

1. **Clone** or **download** the repository
2. Open `index.html` in your browser
3. That's it ✅

```bash
git clone https://github.com/Ansh181005/Responsive_Landing_Page.git
cd Responsive_Landing_Page
# Open index.html in your browser
```

---

## 📸 Screenshots

### Hero Section
> Fixed transparent navbar → frosted glass on scroll | Animated rings, particles, gradient heading

### About Section
> Two-column layout with floating stat badges and AI-generated illustration

### Services Section
> 3×2 service card grid with hover lift effects and "Most Popular" featured card

### Stats Section
> Animated counters triggered on scroll with glowing background

### Contact Section
> Real-time validated form with success state feedback

---

## 🙌 Acknowledgements

- Fonts via [Google Fonts](https://fonts.google.com/) — `Outfit` & `Inter`
- Color palette inspired by modern dark-mode SaaS design trends
- Built as part of the **Code Craft** internship challenge — Task 01

---

<p align="center">Made with ❤️ by <strong>Ansh</strong></p>