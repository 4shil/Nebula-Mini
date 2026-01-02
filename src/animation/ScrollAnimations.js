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

export function createScrollAnimations(camera, sceneGroups, lenis) {
    // Integrate Lenis with ScrollTrigger
    if (lenis) {
        lenis.on('scroll', ScrollTrigger.update);
    }

    const totalScenes = sceneGroups.length;

    // STRICT ONE-SCENE-AT-A-TIME: Hide all scenes except first
    sceneGroups.forEach((group, i) => {
        group.visible = (i === 0);
    });

    // Track current scene for visibility toggling
    let currentSceneIndex = 0;

    // Create ScrollTrigger for each scene to toggle visibility
    const sections = document.querySelectorAll('section');

    sections.forEach((section, i) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => switchScene(i),
            onEnterBack: () => switchScene(i)
        });
    });

    function switchScene(newIndex) {
        if (newIndex === currentSceneIndex) return;

        // Hide current scene
        if (sceneGroups[currentSceneIndex]) {
            sceneGroups[currentSceneIndex].visible = false;
        }

        // Show new scene
        if (sceneGroups[newIndex]) {
            sceneGroups[newIndex].visible = true;
        }

        // Move camera to new scene position
        gsap.to(camera.position, {
            z: SCENE_POSITIONS[newIndex] + 10,
            duration: 0.8,
            ease: 'power2.inOut'
        });

        currentSceneIndex = newIndex;
    }

    // Content visibility animations
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
