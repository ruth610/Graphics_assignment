import * as THREE from 'three';
// Application state container
export const state = {
    THREE,
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    productGroup: null,
    raycaster: null,
    mouse: null,
    infoPanel: document.getElementById('infoPanel') || document.createElement('div'),
    autoRotate: true,
    INTERSECTED: null,
    clickedPart: null
};

state.autoRotate = true;
// radians per second
state.autoRotateSpeed = 0.5; 
state.autoRotateTimeout = null;
// in radians
state.rotationAngle = 0; 
// radians per frame
state.rotationSpeed = 0.01; 


// Import modules
import { initScene } from './components/initScene.js';
import { createProduct } from './components/createProduct.js';
import { addLighting } from './components/addLighting.js';
import { setupInteraction } from './components/interaction.js';
import { animate } from './components/animate.js';

// Initialize application
function init() {
    initScene(state);
    state.productGroup = createProduct(state);
    addLighting(state);
    setupInteraction(state);
    animate(state);
}

// Start the app
init();