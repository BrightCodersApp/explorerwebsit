const modeTitle = document.getElementById('mode-title');
const modeDescription = document.getElementById('mode-description');
const buttons = document.querySelectorAll('.mode-btn');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threejs-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

const loader = new THREE.GLTFLoader();

// Function to Switch Between Modes
function switchMode(mode) {
    buttons.forEach(button => button.classList.remove('active'));
    const activeButton = [...buttons].find(button => button.textContent === mode);
    activeButton.classList.add('active');

    modeTitle.textContent = `${mode} Mode`;

    if (mode === '3D') {
        modeDescription.textContent = 'Explore interactive models in 3D.';
        loadGLTFModel('models/planet.glb');
    } else if (mode === 'Cube') {
        modeDescription.textContent = 'Explore a rotating cube.';
        createCubeScene();
    } else if (mode === 'World') {
        modeDescription.textContent = 'Explore large worlds.';
    } else if (mode === 'Headset') {
        modeDescription.textContent = 'Experience AR and VR integration.';
    }
}

// Create a Rotating Cube for Cube Mode
function createCubeScene() {
    scene.clear();
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function animateCube() {
        requestAnimationFrame(animateCube);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        controls.update();
        renderer.render(scene, camera);
    }
    animateCube();
}

// Load GLTF Models for 3D Mode
function loadGLTFModel(modelPath) {
    scene.clear();
    loader.load(modelPath, (gltf) => {
        scene.add(gltf.scene);
        gltf.scene.scale.set(2, 2, 2);
    });
}

// Adjusting the Canvas on Window Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Initialize with Default Mode
switchMode('3D');
