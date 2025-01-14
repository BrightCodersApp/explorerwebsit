// scripts/worldMode.js

document.addEventListener('DOMContentLoaded', () => {
    const worldContainer = document.getElementById('worldMode');
    if (!worldContainer) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        45,
        worldContainer.clientWidth / worldContainer.clientHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(worldContainer.clientWidth, worldContainer.clientHeight);
    worldContainer.appendChild(renderer.domElement);

    // Load Earth Texture
    const textureLoader = new THREE.TextureLoader();
    let earthTexture = textureLoader.load('assets/images/earth.jpg');

    const geometry = new THREE.SphereGeometry(2, 32, 32);
    let material = new THREE.MeshStandardMaterial({ map: earthTexture });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    camera.position.z = 5;

    // OrbitControls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Rotation Control
    let isRotating = true;

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        if (isRotating) {
            earth.rotation.y += 0.001;
        }

        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        const width = worldContainer.clientWidth;
        const height = worldContainer.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // Button Controls
    const toggleRotationWorldBtn = document.getElementById('toggleRotationWorld');
    const changeTextureBtn = document.getElementById('changeTexture');

    if (toggleRotationWorldBtn) {
        toggleRotationWorldBtn.addEventListener('click', () => {
            isRotating = !isRotating;
            toggleRotationWorldBtn.textContent = isRotating ? 'Disable Rotation' : 'Enable Rotation';
        });
    }

    if (changeTextureBtn) {
        changeTextureBtn.addEventListener('click', () => {
            // Change Earth texture randomly
            const textures = [
                'assets/images/earth.jpg',
                'assets/images/earth2.jpg', // Ensure these images exist in assets/images/
                'assets/images/earth3.jpg'
            ];
            const randomTexture = textures[Math.floor(Math.random() * textures.length)];
            earthTexture = textureLoader.load(randomTexture);
            earth.material.map = earthTexture;
            earth.material.needsUpdate = true;
        });
    }
});
