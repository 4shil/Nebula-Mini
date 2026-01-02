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
    const totalScenes = sceneGroups.length;
    let currentSceneIndex = 0;
    let isScrolling = false;
    let scrollTimeout = null;

    // Initialize: All scenes hidden except first
    sceneGroups.forEach((group, i) => {
        group.visible = (i === 0);
        setGroupOpacity(group, i === 0 ? 1 : 0);
    });

    // Get all sections
    const sections = document.querySelectorAll('section');

    // DISCRETE SCROLL NAVIGATION
    // Each scroll action moves exactly one scene
    function handleWheel(e) {
        if (isScrolling) {
            e.preventDefault();
            return;
        }

        const direction = e.deltaY > 0 ? 1 : -1;
        const newIndex = Math.max(0, Math.min(totalScenes - 1, currentSceneIndex + direction));

        if (newIndex !== currentSceneIndex) {
            e.preventDefault();
            goToScene(newIndex);
        }
    }

    // Navigate to specific scene
    function goToScene(newIndex) {
        if (newIndex === currentSceneIndex || isScrolling) return;
        if (newIndex < 0 || newIndex >= totalScenes) return;

        isScrolling = true;

        const oldScene = sceneGroups[currentSceneIndex];
        const newScene = sceneGroups[newIndex];

        // Instant hide old scene
        if (oldScene) {
            oldScene.visible = false;
            setGroupOpacity(oldScene, 0);
        }

        // Show new scene
        if (newScene) {
            newScene.visible = true;
            setGroupOpacity(newScene, 1);
        }

        // Snap camera to new position
        gsap.to(camera.position, {
            z: SCENE_POSITIONS[newIndex] + 10,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                isScrolling = false;
            }
        });

        // Scroll DOM to section
        if (sections[newIndex] && lenis) {
            lenis.scrollTo(sections[newIndex], { immediate: true });
        }

        // Update content visibility
        sections.forEach((section, i) => {
            const content = section.querySelector('.content');
            if (content) {
                content.classList.toggle('visible', i === newIndex);
            }
        });

        // Update dots
        updateActiveDot(newIndex);

        currentSceneIndex = newIndex;
    }

    // Disable Lenis smooth scroll and use discrete navigation
    if (lenis) {
        lenis.stop();
    }

    // Add wheel listener for discrete scrolling
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Touch support for discrete navigation
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
            const direction = diff > 0 ? 1 : -1;
            goToScene(currentSceneIndex + direction);
        }
    }, { passive: true });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
            e.preventDefault();
            goToScene(currentSceneIndex + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            goToScene(currentSceneIndex - 1);
        } else if (e.key === 'Home') {
            e.preventDefault();
            goToScene(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            goToScene(totalScenes - 1);
        }
    });

    // Progress bar
    const progressBar = document.querySelector('.progress-bar');

    function updateProgress() {
        if (progressBar) {
            const progress = currentSceneIndex / (totalScenes - 1);
            gsap.to(progressBar, { scaleX: progress, duration: 0.3 });
        }
    }

    // Scene indicator dots
    function updateActiveDot(activeIndex) {
        const dots = document.querySelectorAll('.scene-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
        updateProgress();
    }

    // Initial content visibility
    const firstContent = sections[0]?.querySelector('.content');
    if (firstContent) {
        firstContent.classList.add('visible');
    }
    updateActiveDot(0);

    // Hide scroll cue after first navigation
    const scrollCue = document.querySelector('.scroll-cue');
    if (scrollCue) {
        window.addEventListener('wheel', () => {
            gsap.to(scrollCue, { opacity: 0, duration: 0.3 });
        }, { once: true });
    }

    // Expose goToScene for dot navigation
    window.voyageGoToScene = goToScene;
}

// Helper: Set opacity for all materials in a group
function setGroupOpacity(group, opacity) {
    group.traverse((child) => {
        if (child.material) {
            if (Array.isArray(child.material)) {
                child.material.forEach(mat => {
                    mat.transparent = true;
                    mat.opacity = mat.userData?.baseOpacity !== undefined
                        ? mat.userData.baseOpacity * opacity
                        : opacity;
                });
            } else {
                child.material.transparent = true;
                child.material.opacity = child.material.userData?.baseOpacity !== undefined
                    ? child.material.userData.baseOpacity * opacity
                    : opacity;
            }
        }
    });
}

// Click navigation on dots
export function setupDotNavigation() {
    const dots = document.querySelectorAll('.scene-dot');

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (window.voyageGoToScene) {
                window.voyageGoToScene(i);
            }
        });
    });
}
