import * as THREE from 'three';

// SCENE 10: MIRROR REALM - Premium Reflective Space
// Clean symmetry with floating geometric shapes

export function createMirrorRealm() {
    const group = new THREE.Group();
    group.position.z = -225;

    // Central vertical mirror plane
    const mirrorGeo = new THREE.PlaneGeometry(20, 25);
    const mirrorMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.05,
        side: THREE.DoubleSide
    });
    mirrorMat.userData = { baseOpacity: 0.05 };
    const mirror = new THREE.Mesh(mirrorGeo, mirrorMat);
    group.add(mirror);

    // Hexagonal frame
    const frameShape = new THREE.Shape();
    const sides = 6;
    const outerRadius = 10;
    const innerRadius = 9.5;

    for (let i = 0; i <= sides; i++) {
        const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * outerRadius;
        const y = Math.sin(angle) * outerRadius;
        if (i === 0) frameShape.moveTo(x, y);
        else frameShape.lineTo(x, y);
    }

    const frameHole = new THREE.Path();
    for (let i = 0; i <= sides; i++) {
        const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * innerRadius;
        const y = Math.sin(angle) * innerRadius;
        if (i === 0) frameHole.moveTo(x, y);
        else frameHole.lineTo(x, y);
    }
    frameShape.holes.push(frameHole);

    const frameGeo = new THREE.ShapeGeometry(frameShape);
    const frameMat = new THREE.MeshBasicMaterial({
        color: 0xff3c00,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
    });
    frameMat.userData = { baseOpacity: 0.4 };
    const frame = new THREE.Mesh(frameGeo, frameMat);
    group.add(frame);

    // Floating geometric objects on both sides
    const objects = [];
    const geometries = [
        new THREE.TetrahedronGeometry(0.6),
        new THREE.OctahedronGeometry(0.5),
        new THREE.DodecahedronGeometry(0.4),
        new THREE.IcosahedronGeometry(0.45)
    ];

    for (let i = 0; i < 16; i++) {
        const geo = geometries[i % geometries.length];
        const isLeft = i < 8;
        const idx = i % 8;

        const mat = new THREE.MeshBasicMaterial({
            color: idx % 3 === 0 ? 0x00ff88 : (idx % 3 === 1 ? 0xff3c00 : 0xffffff),
            transparent: true,
            opacity: 0.7,
            wireframe: true
        });
        mat.userData = { baseOpacity: 0.7 };

        const obj = new THREE.Mesh(geo, mat);
        const angle = (idx / 8) * Math.PI * 2;
        const radius = 4 + (idx % 3) * 1.5;
        const zOffset = isLeft ? 3 : -3;

        obj.position.set(
            Math.cos(angle) * radius * (isLeft ? 1 : -1) * 0.3 + (isLeft ? -5 : 5),
            Math.sin(angle) * radius * 0.8,
            zOffset
        );
        obj.userData = { offset: i * 0.3, isLeft };
        group.add(obj);
        objects.push(obj);
    }

    // Shimmer particles
    const shimmerCount = 500;
    const shimmerPositions = new Float32Array(shimmerCount * 3);
    const shimmerColors = new Float32Array(shimmerCount * 3);

    for (let i = 0; i < shimmerCount; i++) {
        shimmerPositions[i * 3] = (Math.random() - 0.5) * 25;
        shimmerPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        shimmerPositions[i * 3 + 2] = (Math.random() - 0.5) * 15;

        const isOrange = Math.random() > 0.8;
        shimmerColors[i * 3] = isOrange ? 1 : 1;
        shimmerColors[i * 3 + 1] = isOrange ? 0.24 : 1;
        shimmerColors[i * 3 + 2] = isOrange ? 0 : 1;
    }

    const shimmerGeo = new THREE.BufferGeometry();
    shimmerGeo.setAttribute('position', new THREE.BufferAttribute(shimmerPositions, 3));
    shimmerGeo.setAttribute('color', new THREE.BufferAttribute(shimmerColors, 3));

    const shimmerMat = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    shimmerMat.userData = { baseOpacity: 0.4 };
    const shimmer = new THREE.Points(shimmerGeo, shimmerMat);
    group.add(shimmer);

    return { group, mirror, frame, objects, shimmer };
}

export function updateMirrorRealm(data, mouse, time) {
    const { mirror, frame, objects, shimmer } = data;

    // Subtle mirror breathing
    mirror.scale.setScalar(1 + Math.sin(time * 0.5) * 0.02);
    mirror.rotation.y = mouse.x * 0.05;

    // Rotating frame
    frame.rotation.z = time * 0.05;

    // Animate objects - mirrored motion
    objects.forEach((obj) => {
        const baseRotation = time * 0.3 + obj.userData.offset;
        obj.rotation.x = baseRotation;
        obj.rotation.y = baseRotation * 0.7;

        // Float up and down
        obj.position.y += Math.sin(time + obj.userData.offset) * 0.002;
    });

    // Shimmer drift
    shimmer.rotation.y = time * 0.01 + mouse.x * 0.05;
    shimmer.rotation.x = mouse.y * 0.05;
}
