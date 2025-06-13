/**
 * Update camera for auto-rotation  - Application state object
 * @param {Object} state 
 */
export function updateCameraRotation(state) {
    if (state.autoRotate) {
        const time = Date.now() * 0.0005;
        const radius = 7;
        state.camera.position.x = Math.sin(time) * radius;
        state.camera.position.z = Math.cos(time) * radius;
        state.camera.position.y = 3;
        state.camera.lookAt(state.scene.position);
        state.controls.update();
    }
}