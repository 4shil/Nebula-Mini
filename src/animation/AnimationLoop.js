import * as THREE from 'three';

// Animation loop manager
export function createAnimationLoop(renderer, scene, camera, updateFunctions) {
    const clock = new THREE.Clock();

    function tick() {
        const elapsedTime = clock.getElapsedTime();

        // Call all update functions
        updateFunctions.forEach(fn => fn(elapsedTime));

        // Render
        renderer.render(scene, camera);

        // Next frame
        requestAnimationFrame(tick);
    }

    return tick;
}
