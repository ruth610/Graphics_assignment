import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Initializes the scene, camera, renderer, and controls.
 * @param {Object} state - Shared application state
 */
export function initScene(state) {
    // Create scene with light background
    state.scene = new THREE.Scene();
    state.scene.background = new THREE.Color(0x000000);

    // Set up perspective camera
    state.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    state.camera.position.set(0, 5, 8);

    // Set rotation target and compute initial angle
    state.target = new THREE.Vector3(0, 0, 0);
    const dx = state.camera.position.x - state.target.x;
    const dz = state.camera.position.z - state.target.z;
    state.rotationAngle = Math.atan2(dz, dx);

    // Configure renderer
    state.renderer = new THREE.WebGLRenderer({ antialias: true });
    state.renderer.setSize(window.innerWidth, window.innerHeight);
    state.renderer.shadowMap.enabled = true;
    state.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(state.renderer.domElement);

    // Set up orbit controls (damped, rotation disabled)
    state.controls = new OrbitControls(state.camera, state.renderer.domElement);
    state.controls.enableDamping = true;
    state.controls.dampingFactor = 0.05;
    state.controls.enableRotate = false;

    // Initialize raycaster and mouse vector
    state.raycaster = new THREE.Raycaster();
    state.mouse = new THREE.Vector2();

    // Handle window resizing
    window.addEventListener('resize', () => {
        state.camera.aspect = window.innerWidth / window.innerHeight;
        state.camera.updateProjectionMatrix();
        state.renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
