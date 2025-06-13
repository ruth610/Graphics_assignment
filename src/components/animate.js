import { updateCameraRotation } from './cameraAnimation.js';

/**
 * Main animation loop - Application state object
 * @param {Object} state 
 */
let previousTime = performance.now();

export function animate(state) {
    requestAnimationFrame(() => animate(state));

    const currentTime = performance.now();
     // in seconds
    const deltaTime = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    // Auto-Rotate camera
    if (state.autoRotate && state.target) {
        state.rotationAngle += state.autoRotateSpeed * deltaTime;

         // Distance from target
        const radius = 5;
        const x = state.target.x + radius * Math.sin(state.rotationAngle);
        const z = state.target.z + radius * Math.cos(state.rotationAngle);
        // Maintain current Y
        const y = state.camera.position.y; 

        state.camera.position.set(x, y, z);
        state.camera.lookAt(state.target);
    }

    // Raycasting for hover
    updateHoverEffects(state);

    // Render
    state.renderer.render(state.scene, state.camera);
}

/**
 * Update hover highlight effects  - Application state object
 * @param {Object} state
 */
function updateHoverEffects(state) {
    state.raycaster.setFromCamera(state.mouse, state.camera);
    const intersects = state.raycaster.intersectObjects(state.productGroup.children, true);
    
    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;

        if (state.INTERSECTED !== intersectedObject) {
            // Reset old highlight (if not the clicked object)
            if (state.INTERSECTED && state.INTERSECTED !== state.clickedPart) {
                if (state.INTERSECTED.material.emissive) {
                    state.INTERSECTED.material.emissive.setHex(0x000000);
                }
            }

            // Highlight new object (if not the clicked one)
            if (intersectedObject.material.emissive && intersectedObject !== state.clickedPart) {
                intersectedObject.material.emissive.setHex(0x111111);
            }

            state.INTERSECTED = intersectedObject;
        }
    } else {
        // No hover – reset if not clicked
        if (state.INTERSECTED && state.INTERSECTED !== state.clickedPart) {
            if (state.INTERSECTED.material.emissive) {
                state.INTERSECTED.material.emissive.setHex(0x000000);
            }
        }
        state.INTERSECTED = null;
    }
}
