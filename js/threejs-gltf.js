// Importing Three.js components and loaders
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threejs-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adding orbit controls for user interaction (zoom & rotate)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Smooth movement
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 20;

// Adding lighting
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 20, 0);
scene.add(light);

// Loading the GLTF model (replace with your own model path)
const loader = new THREE.GLTFLoader();
loader.load('../models/planet.glb', function (gltf) {
    const model = gltf.scene;
    model.scale.set(2, 2, 2);  // Adjust model size
    scene.add(model);
}, undefined, function (error) {
    console.error('An error occurred loading the model:', error);
});

// Setting the camera position
camera.position.z = 5;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();  // Enable smooth control movement
    renderer.render(scene, camera);
}

animate();

// Responsive Design for 3D Canvas
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
