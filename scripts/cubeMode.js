// scripts/cubeMode.js

document.addEventListener('DOMContentLoaded', () => {
    const cubeContainer = document.getElementById('cubeMode');
    if (!cubeContainer) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        cubeContainer.clientWidth / cubeContainer.clientHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(cubeContainer.clientWidth, cubeContainer.clientHeight);
    cubeContainer.appendChild(renderer.domElement);

    // Cube Geometry and Material
    const geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshStandardMaterial({ color: 0x007bff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

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
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        }

        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        const width = cubeContainer.clientWidth;
        const height = cubeContainer.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // Button Controls
    const toggleRotationBtn = document.getElementById('toggleRotation');
    const changeColorBtn = document.getElementById('changeColor');

    if (toggleRotationBtn) {
        toggleRotationBtn.addEventListener('click', () => {
            isRotating = !isRotating;
            toggleRotationBtn.textContent = isRotating ? 'Disable Rotation' : 'Enable Rotation';
        });
    }

    if (changeColorBtn) {
        changeColorBtn.addEventListener('click', () => {
            // Change cube color randomly
            const randomColor = Math.floor(Math.random() * 16777215).toString(16);
            cube.material.color.set(`#${randomColor}`);
        });
    }
});
