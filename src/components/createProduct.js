/**
 * Create 3D chair product
 * @param {Object} state - Application state object
 * @returns {THREE.Group} Chair group
 */
export function createProduct(state) {
    const chairGroup = new state.THREE.Group();
    
    // Materials
    const woodMaterial = new state.THREE.MeshStandardMaterial({
        color: 0x8b5e3c,
        roughness: 0.7,
        metalness: 0.2
    });
    
    const cushionMaterial = new state.THREE.MeshStandardMaterial({
        color: 0x654321,
        roughness: 0.9,
        metalness: 0.0
    });

    // Seat
    const seatGeo = new state.THREE.BoxGeometry(4.5, 0.4, 4);
    const seat = new state.THREE.Mesh(seatGeo, cushionMaterial);
    seat.name = "Seat";
    seat.position.y = 0.2;
    seat.castShadow = true;
    seat.receiveShadow = true;
    chairGroup.add(seat);

    // Backrest
    const backrestGeo = new state.THREE.BoxGeometry(4.5, 3.5, 0.5);
    const backrest = new state.THREE.Mesh(backrestGeo, cushionMaterial);
    backrest.name = "Backrest";
    backrest.position.set(0, 2.2, -1.9);
    backrest.rotation.x = Math.PI / 7;
    backrest.castShadow = true;
    backrest.receiveShadow = true;
    chairGroup.add(backrest);

    // Legs (front and back)
    const legGeo = new state.THREE.BoxGeometry(0.4, 1.8, 0.4);
    const backLegGeo = new state.THREE.BoxGeometry(0.4, 2.2, 0.4);
    
    const positions = [
        { x: 2, y: -0.9, z: 1.5, name: "Front Leg Right" },
        { x: -2, y: -0.9, z: 1.5, name: "Front Leg Left" },
        { x: 2, y: -1.1, z: -1.5, name: "Back Leg Right", geo: backLegGeo },
        { x: -2, y: -1.1, z: -1.5, name: "Back Leg Left", geo: backLegGeo }
    ];
    
    positions.forEach(pos => {
        const leg = new state.THREE.Mesh(pos.geo || legGeo, woodMaterial);
        leg.name = pos.name;
        leg.position.set(pos.x, pos.y, pos.z);
        leg.castShadow = true;
        chairGroup.add(leg);
    });

    // Armrests
    const armrestGeo = new state.THREE.BoxGeometry(0.5, 0.2, 2.5);
    const armSupportGeo = new state.THREE.BoxGeometry(0.3, 1.5, 0.3);
    
    [2.25, -2.25].forEach((x, i) => {
        const side = i === 0 ? "Right" : "Left";
        
        // Armrest
        const armrest = new state.THREE.Mesh(armrestGeo, woodMaterial);
        armrest.name = `Armrest ${side}`;
        armrest.position.set(x, 1.2, 0);
        armrest.castShadow = true;
        chairGroup.add(armrest);
        
        // Arm support
        const support = new state.THREE.Mesh(armSupportGeo, woodMaterial);
        support.name = `Arm Support ${side}`;
        support.position.set(x, 0.25, 1.1);
        support.castShadow = true;
        chairGroup.add(support);
    });

    // Cross supports
    const supportGeo = new state.THREE.BoxGeometry(4, 0.2, 0.2);
    
    [1.5, -1.5].forEach(z => {
        const support = new state.THREE.Mesh(supportGeo, woodMaterial);
        support.name = z > 0 ? "Front Support" : "Back Support";
        support.position.set(0, -0.5, z);
        support.rotation.y = Math.PI / 2;
        support.castShadow = true;
        chairGroup.add(support);
    });

    state.scene.add(chairGroup);
    return chairGroup;
}