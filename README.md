# Modern Dark Portfolio (Stranger Things Edition)

A high-performance, interactive portfolio website built with Next.js, featuring a custom "Stranger Things" aesthetic, immersive animations, and a modern dark mode design.

## 🌟 Features

### 🎨 Design & Aesthetic
- **Stranger Things Theme**: Deep black background, vibrant red accents (`#ff3333`), and subtle atmospheric effects (red fog, floating particles).
- **Blood Drip Effect**: A custom `BloodDrip` component adds a thematic "Upside Down" touch to the homepage.
- **Glassmorphism**: Translucent UI elements with background blur for a modern, premium feel.

### 🧩 Components
- **Fixed Navbar**: Full-width, fixed-top navigation with a "spotlight" hover effect and glowing red borders.
- **Hero Section**: Dynamic text animations and a 3D-style profile image card.
- **Tech Stack Marquee**: Infinite scrolling carousel displaying skills and technologies.
- **Project Cards**: Interactive cards with hover effects, showcasing GitHub and Live Demo links.
- **Contact Form**: Functional form with `mailto` fallback and immediate UI feedback (loading/success states).

### ⚡ Functionality
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Animations**: Powered by `framer-motion` for smooth page transitions and micro-interactions.
- **Performance**: Optimized images and code splitting via Next.js.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/portfolio.git
    ```

2.  **Install dependencies:**
    ```bash
    cd portfolio
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open locally:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── about/          # About page
│   ├── community/      # Community page
│   ├── contact/        # Contact page (with form)
│   ├── projects/       # Projects showcase
│   ├── globals.css     # Global styles & animations
│   ├── layout.tsx      # Root layout (Navbar/Footer)
│   └── page.tsx        # Homepage
├── components/         # Reusable UI components
│   ├── ui/             # Atomic components (Buttons, Cards)
│   ├── BloodDrip.tsx   # Custom background effect
│   ├── Navbar.tsx      # Main navigation
│   ├── Footer.tsx      # Site footer
│   └── TechStack.tsx   # Infinite marquee
└── lib/                # Utilities (cn helper)
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
