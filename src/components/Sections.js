// Scene definitions for 14 unique cosmic scenes
export const SCENES = [
    {
        id: 'nebula',
        title: 'Nebula<br>Genesis',
        description: 'The beginning of the journey. We are surrounded by a field of reactive stardust. Move your cursor to disturb the field.',
        button: 'Enter System',
        layout: 'left'
    },
    {
        id: 'crystal',
        title: 'Crystal<br>Artifact',
        description: 'A massive geometric structure suspended in the void. It pulses with energy, observing your passage through space.',
        button: 'Scan Object',
        layout: 'right'
    },
    {
        id: 'grid',
        title: 'Digital<br>Terrain',
        description: 'The endless horizon of a synthetic world. The ground beneath us is alive, shifting in a rhythmic pattern.',
        button: 'Analyze Terrain',
        layout: 'center'
    },
    {
        id: 'void',
        title: 'Event<br>Horizon',
        description: 'We have reached the edge of the simulation. Nothing exists here but silence and the echo of creation.',
        button: 'Continue',
        layout: 'left'
    },
    {
        id: 'aurora',
        title: 'Aurora<br>Veil',
        description: 'Ethereal waves of light dance across the cosmos. The aurora pulses with ancient energy from distant stars.',
        button: 'Absorb Light',
        layout: 'right'
    },
    {
        id: 'solar',
        title: 'Solar<br>Forge',
        description: 'The heart of a dying star. Solar flares erupt in magnificent arcs, painting the void with fire.',
        button: 'Harness Energy',
        layout: 'center'
    },
    {
        id: 'quantum',
        title: 'Quantum<br>Realm',
        description: 'Reality fractures into infinite possibilities. Particles exist in all states simultaneously, defying comprehension.',
        button: 'Observe State',
        layout: 'left'
    },
    {
        id: 'fractal',
        title: 'Fractal<br>Dimension',
        description: 'Infinite complexity emerges from simple rules. Each zoom reveals new patterns within patterns.',
        button: 'Zoom Deeper',
        layout: 'right'
    },
    {
        id: 'pulse',
        title: 'Neural<br>Pulse',
        description: 'The synaptic network of a cosmic consciousness. Thoughts travel as light between infinite neurons.',
        button: 'Connect Mind',
        layout: 'center'
    },
    {
        id: 'mirror',
        title: 'Mirror<br>Realm',
        description: 'A dimension where reality reflects upon itself. What is real and what is reflection becomes indistinguishable.',
        button: 'Step Through',
        layout: 'left'
    },
    {
        id: 'storm',
        title: 'Cosmic<br>Storm',
        description: 'Electromagnetic chaos tears through the fabric of space. Lightning arcs between worlds.',
        button: 'Weather Storm',
        layout: 'right'
    },
    {
        id: 'spiral',
        title: 'Golden<br>Spiral',
        description: 'The mathematical blueprint of existence. Galaxies, shells, and souls all follow this sacred geometry.',
        button: 'Follow Pattern',
        layout: 'center'
    },
    {
        id: 'warp',
        title: 'Warp<br>Tunnel',
        description: 'Faster than light, we pierce through dimensions. The universe stretches into infinite streaks.',
        button: 'Engage Drive',
        layout: 'left'
    },
    {
        id: 'genesis',
        title: 'Genesis<br>Core',
        description: 'The origin point. Where all journeys begin and end. The seed of infinite universes awaits.',
        button: 'Restart Voyage',
        layout: 'center'
    }
];

export function createSections() {
    return SCENES.map((scene, index) => `
        <section id="scene-${index + 1}" class="layout-${scene.layout}" data-scene="${scene.id}">
            <div class="content">
                <h1>${scene.title}</h1>
                <p>${scene.description}</p>
                <div class="btn" data-action="${scene.id}">${scene.button}</div>
            </div>
        </section>
    `).join('');
}

export function createSceneIndicator() {
    return `
        <div class="scene-indicator">
            ${SCENES.map((_, i) => `<div class="scene-dot" data-index="${i}"></div>`).join('')}
        </div>
    `;
}
