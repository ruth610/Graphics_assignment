/**
 * Add lighting to the scene
 * @param {Object} state - Application state object
 */
export function addLighting(state) {
    // Ambient light
    const ambient = new state.THREE.AmbientLight(0xffffff, 0.6);
    state.scene.add(ambient);

    // Main directional light
    const directional = new state.THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 10, 7);
    directional.castShadow = true;
    directional.shadow.mapSize.width = 2048;
    directional.shadow.mapSize.height = 2048;
    state.scene.add(directional);

    // Fill light
    const fillLight = new state.THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -7);
    state.scene.add(fillLight);
}