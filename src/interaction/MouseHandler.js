// Mouse interaction handler
export function createMouseHandler() {
    const mouse = { x: 0, y: 0 };
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX - windowHalfX) / windowHalfX;
        mouse.y = -(event.clientY - windowHalfY) / windowHalfY;
    });

    // Touch support for mobile
    document.addEventListener('touchmove', (event) => {
        if (event.touches.length > 0) {
            const touch = event.touches[0];
            mouse.x = (touch.clientX - windowHalfX) / windowHalfX;
            mouse.y = -(touch.clientY - windowHalfY) / windowHalfY;
        }
    });

    // Reset mouse position on resize
    window.addEventListener('resize', () => {
        const newHalfX = window.innerWidth / 2;
        const newHalfY = window.innerHeight / 2;
        // Re-normalize current position
        mouse.x = mouse.x * (windowHalfX / newHalfX);
        mouse.y = mouse.y * (windowHalfY / newHalfY);
    });

    return mouse;
}
