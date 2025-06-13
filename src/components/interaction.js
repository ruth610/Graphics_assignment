/**
 * Sets up mouse interaction, including hover and click handling.
 * @param {Object} state - Shared application state
 */
export function setupInteraction(state) {
    const infoPanel = document.getElementById("infoPanel");

    // Track mouse movement for raycasting and pause auto-rotate
    window.addEventListener('mousemove', (event) => {
        state.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        state.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        resetAutoRotateTimeout(state);
    });

    // Handle object click: highlight part, show label, animate
    window.addEventListener('click', (event) => {
        state.raycaster.setFromCamera(state.mouse, state.camera);
        const intersects = state.raycaster.intersectObjects(state.productGroup.children, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            handleObjectClick(state, clickedObject);

            // Show part label near cursor
            const partName = clickedObject.name || "Unknown Part";
            infoPanel.innerText = partName;
            infoPanel.style.left = `${event.clientX + 10}px`;
            infoPanel.style.top = `${event.clientY + 10}px`;
            infoPanel.style.display = "block";
            setTimeout(() => infoPanel.style.display = "none", 2000);

            // Pulse scale feedback
            const originalScale = clickedObject.scale.clone();
            clickedObject.scale.setScalar(1.2);
            setTimeout(() => clickedObject.scale.copy(originalScale), 200);
        }

        resetAutoRotateTimeout(state);
    });

    // Start auto-rotate timeout on load
    resetAutoRotateTimeout(state);
}

/**
 * Highlights clicked object and animates feedback.
 * @param {Object} state - App state
 * @param {THREE.Object3D} object - Clicked mesh
 */
function handleObjectClick(state, object) {
    // Reset previous highlight
    if (state.clickedPart) {
        state.clickedPart.material.emissive?.setHex(0x000000);
    }

    // Highlight new part
    state.clickedPart = object;
    if (state.clickedPart.material.emissive) {
        state.clickedPart.material.emissive.setHex(0x333333);
    }

    // Optional info panel
    if (state.infoPanel) {
        state.infoPanel.style.display = 'block';
        state.infoPanel.textContent = `Clicked: ${state.clickedPart.name}`;
        setTimeout(() => state.infoPanel.style.display = 'none', 2000);
    }

    // Animate scale
    const originalScale = state.clickedPart.scale.clone();
    state.clickedPart.scale.multiplyScalar(1.1);
    setTimeout(() => state.clickedPart.scale.copy(originalScale), 200);
}

/**
 * Resets timeout to re-enable auto-rotation after inactivity.
 * @param {Object} state - App state
 */
function resetAutoRotateTimeout(state) {
    clearTimeout(state.autoRotateTimeout);
    state.autoRotate = false;
    state.controls.enableRotate = true;

    state.autoRotateTimeout = setTimeout(() => {
        state.autoRotate = true;
        state.controls.enableRotate = false;
    }, 1000);
}
