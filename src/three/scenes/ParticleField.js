import * as THREE from 'three';

// Scene 1: Interactive Particle Field (Nebula)
export function createParticleField() {
    const group = new THREE.Group();
    group.position.set(0, 0, 0);

    const count = 2500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 18;
        positions[i + 1] = (Math.random() - 0.5) * 18;
        positions[i + 2] = (Math.random() - 0.5) * 18;

        originalPositions[i] = positions[i];
        originalPositions[i + 1] = positions[i + 1];
        originalPositions[i + 2] = positions[i + 2];

        // Cyan to blue gradient
        colors[i] = 0;
        colors[i + 1] = 0.8 + Math.random() * 0.2;
        colors[i + 2] = 0.9 + Math.random() * 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    group.add(particles);

    return { group, particles, originalPositions, count };
}

export function updateParticleField(data, mouse, time) {
    const { particles, originalPositions, count } = data;
    const positions = particles.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // Spring back to original
        positions[i3] += (originalPositions[i3] - positions[i3]) * 0.04;
        positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.04;
        positions[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.04;

        // Repel from mouse
        const dx = positions[i3] - mouse.x * 12;
        const dy = positions[i3 + 1] - mouse.y * 12;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2.5) {
            const force = (2.5 - dist) * 0.12;
            positions[i3] += (dx / dist) * force;
            positions[i3 + 1] += (dy / dist) * force;
        }
    }

    particles.geometry.attributes.position.needsUpdate = true;
    particles.rotation.y = time * 0.03;
    particles.rotation.x = Math.sin(time * 0.2) * 0.05;
}
