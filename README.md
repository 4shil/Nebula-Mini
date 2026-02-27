# Nebula Mini

A Three.js tutorial/learning website with scroll-driven 3D scenes, GSAP animations, and smooth scrolling via Lenis. Built with vanilla JavaScript — no framework.

![3d nebula scene](https://media.giphy.com/media/xT9IgG50Lg7ruszbCU/giphy.gif)

## What it is

A small vanilla JS site built to practice Three.js scene management, GSAP ScrollTrigger animations, and Lenis smooth scroll — organized around a space/nebula visual theme.

## Stack

- [Three.js](https://threejs.org/) — 3D rendering
- [GSAP](https://gsap.com/) — scroll-driven animations
- [Lenis](https://lenis.darkroom.engineering/) — smooth scrolling
- Vanilla JavaScript (no framework)
- Vite (bundler)

## Getting Started

```bash
git clone https://github.com/4shil/Nebula-Mini.git
cd Nebula-Mini
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build    # production build
```

## Project Structure

```
Nebula-Mini/
├── src/
│   ├── main.js             # Entry point: Lenis, GSAP init
│   ├── style.css
│   ├── three/
│   │   ├── SceneManager.js # Three.js scene setup and render loop
│   │   └── scenes/         # Individual 3D scenes
│   ├── animation/          # GSAP animation definitions
│   ├── interaction/        # User interaction handlers
│   ├── components/         # DOM section helpers
│   └── styles/
├── public/
└── index.html
```

## License

MIT
