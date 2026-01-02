import * as THREE from 'three';

// SCENE 12: GOLDEN SPIRAL - Elegant Fibonacci Visualization
// Mathematical beauty with flowing curves

export function createGoldenSpiral() {
    const group = new THREE.Group();
    group.position.z = -275;

    // Create golden spiral using points
    const spiralPoints = [];
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio: 1.618...

    for (let i = 0; i < 300; i++) {
        const angle = i * 0.12;
        const radius = Math.pow(phi, angle / (Math.PI * 2)) * 0.2;
        spiralPoints.push(new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            (i / 300) * 3 - 1.5
        ));
    }

    // Main spiral tube
    const spiralCurve = new THREE.CatmullRomCurve3(spiralPoints);
    const spiralGeo = new THREE.TubeGeometry(spiralCurve, 300, 0.1, 12, false);
    const spiralMat = new THREE.MeshBasicMaterial({
        color: 0xffcc00,
        transparent: true,
        opacity: 0.7
    });
    spiralMat.userData = { baseOpacity: 0.7 };
    const spiral = new THREE.Mesh(spiralGeo, spiralMat);
    group.add(spiral);

    // Fibonacci rectangles as wireframe
    const rectangles = [];
    const fibSequence = [1, 1, 2, 3, 5, 8, 13];
    let posX = 0, posY = 0;

    for (let i = 0; i < fibSequence.length; i++) {
        const size = fibSequence[i] * 0.4;
        const rectGeo = new THREE.PlaneGeometry(size, size);
        const edges = new THREE.EdgesGeometry(rectGeo);
        const rectMat = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.2
        });
        rectMat.userData = { baseOpacity: 0.2 };
        const rect = new THREE.LineSegments(edges, rectMat);

        // Position following Fibonacci pattern
        rect.position.set(posX, posY, -i * 0.3);
        rect.userData = { index: i };
        group.add(rect);
        rectangles.push(rect);

        // Update position for next rectangle
        const dir = i % 4;
        if (dir === 0) posX += size / 2 + fibSequence[Math.min(i + 1, fibSequence.length - 1)] * 0.2;
        else if (dir === 1) posY -= size / 2 + fibSequence[Math.min(i + 1, fibSequence.length - 1)] * 0.2;
        else if (dir === 2) posX -= size / 2 + fibSequence[Math.min(i + 1, fibSequence.length - 1)] * 0.2;
        else posY += size / 2 + fibSequence[Math.min(i + 1, fibSequence.length - 1)] * 0.2;
    }

    // Golden ratio particles following spiral path
    const particleCount = 600;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const t = i / particleCount;
        const angle = t * Math.PI * 16;
        const radius = Math.pow(phi, (angle / (Math.PI * 2))) * 0.15 + Math.random() * 2;

        particlePositions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
        particlePositions[i * 3 + 1] = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
        particlePositions[i * 3 + 2] = (t - 0.5) * 10;

        // Gold to white gradient
        particleColors[i * 3] = 1;
        particleColors[i * 3 + 1] = 0.8 + t * 0.2;
        particleColors[i * 3 + 2] = t;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
    });
    particleMat.userData = { baseOpacity: 0.7 };
    const goldenParticles = new THREE.Points(particleGeo, particleMat);
    group.add(goldenParticles);

    // Central phi symbol (simplified as glowing sphere)
    const phiGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const phiMat = new THREE.MeshBasicMaterial({
        color: 0xffcc00,
        transparent: true,
        opacity: 0.5
    });
    phiMat.userData = { baseOpacity: 0.5 };
    const phiCore = new THREE.Mesh(phiGeo, phiMat);
    group.add(phiCore);

    return { group, spiral, rectangles, goldenParticles, phiCore };
}

export function updateGoldenSpiral(data, mouse, time) {
    const { spiral, rectangles, goldenParticles, phiCore } = data;

    // Slow elegant rotation
    spiral.rotation.z = time * 0.08 + mouse.x * 0.2;
    spiral.rotation.x = mouse.y * 0.1;

    // Animate rectangles - subtle rotation
    rectangles.forEach((rect) => {
        rect.rotation.z = time * 0.02 * (rect.userData.index % 2 ? 1 : -1);
        rect.material.opacity = rect.material.userData.baseOpacity * (0.8 + Math.sin(time + rect.userData.index) * 0.2);
    });

    // Particles follow spiral motion
    goldenParticles.rotation.z = time * 0.03 + mouse.x * 0.1;

    // Pulsing phi core
    phiCore.scale.setScalar(1 + Math.sin(time * 2) * 0.15);
    phiCore.rotation.y = time * 0.2;
}
