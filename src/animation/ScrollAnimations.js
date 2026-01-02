import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Scene positions (z-axis depth for each scene)
const SCENE_POSITIONS = [
    0,      // Scene 1: Nebula
    -25,    // Scene 2: Crystal
    -50,    // Scene 3: Grid
    -75,    // Scene 4: Void
    -100,   // Scene 5: Aurora
    -125,   // Scene 6: Solar
    -150,   // Scene 7: Quantum
    -175,   // Scene 8: Fractal
    -200,   // Scene 9: Neural
    -225,   // Scene 10: Mirror
    -250,   // Scene 11: Storm
    -275,   // Scene 12: Spiral
    -300,   // Scene 13: Warp
    -325    // Scene 14: Genesis
];

export function createScrollAnimations(camera, sceneGroups) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.8
        }
    });

    // Camera movement through scenes
    const totalScenes = 14;

    for (let i = 0; i < totalScenes - 1; i++) {
        const progress = i / (totalScenes - 1);
        const nextProgress = (i + 1) / (totalScenes - 1);
        const duration = nextProgress - progress;

        // Move camera to next scene
        tl.to(camera.position, {
            z: SCENE_POSITIONS[i + 1] + 10,
            duration: duration,
            ease: 'power2.inOut'
        }, progress);

        // Fade out current scene, fade in next
        if (sceneGroups[i]) {
            tl.to(sceneGroups[i].scale, {
                x: 0, y: 0, z: 0,
                duration: duration * 0.5,
                ease: 'power2.in'
            }, progress + duration * 0.3);
        }
    }

    // Content visibility animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section, i) => {
        const content = section.querySelector('.content');

        ScrollTrigger.create({
            trigger: section,
            start: 'top 70%',
            end: 'bottom 30%',
            onEnter: () => content?.classList.add('visible'),
            onLeave: () => content?.classList.remove('visible'),
            onEnterBack: () => content?.classList.add('visible'),
            onLeaveBack: () => content?.classList.remove('visible')
        });
    });

    // Scene indicator dots
    const dots = document.querySelectorAll('.scene-dot');
    sections.forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => updateActiveDot(dots, i),
            onEnterBack: () => updateActiveDot(dots, i)
        });
    });

    // Progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        gsap.to(progressBar, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5
            }
        });
    }

    // Hide scroll cue after first scroll
    const scrollCue = document.querySelector('.scroll-cue');
    if (scrollCue) {
        ScrollTrigger.create({
            trigger: 'body',
            start: 'top+=100 top',
            onEnter: () => gsap.to(scrollCue, { opacity: 0, duration: 0.5 })
        });
    }

    return tl;
}

function updateActiveDot(dots, activeIndex) {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
    });
}

// Optional: Click navigation on dots
export function setupDotNavigation() {
    const dots = document.querySelectorAll('.scene-dot');
    const sections = document.querySelectorAll('section');

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            sections[i]?.scrollIntoView({ behavior: 'smooth' });
        });
    });
}
