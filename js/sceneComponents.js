export function initLights(scene) {
  scene.add(new THREE.AmbientLight(0x111133, 1.5));
  const dirLight = new THREE.DirectionalLight(0x3366ff, 1.2);
  dirLight.position.set(5, 10, 5);
  scene.add(dirLight);
  const pinkLight = new THREE.PointLight(0x8844aa, 1.5, 60);
  pinkLight.position.set(-10, -5, 5);
  scene.add(pinkLight);
}

export function createStarfield(scene) {
  const starGeo = new THREE.BufferGeometry();
  const starCount = 3500;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    starPos[i] = (Math.random() - 0.5) * 300;
  }
  starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.18,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.75,
  });
  scene.add(new THREE.Points(starGeo, starMat));
}

export function createNebulae(scene) {
  function makeNebula(color, count, spread) {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * spread;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color,
      size: 0.55,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return new THREE.Points(geo, mat);
  }
  scene.add(makeNebula(0x2244aa, 600, 120));
  scene.add(makeNebula(0x882266, 400, 100));
  scene.add(makeNebula(0x113355, 500, 140));
}

export function createProjectMeshes(scene, projects) {
  const GEOMETRIES = [
    new THREE.TorusKnotGeometry(1.0, 0.35, 100, 16),   // MonGit
    new THREE.DodecahedronGeometry(1.8, 0),              // Colordary
    new THREE.TetrahedronGeometry(2.2, 0),               // EZBar
    new THREE.IcosahedronGeometry(1.9, 0),               // DopiGame
    new THREE.OctahedronGeometry(2.0, 0),                // Montimod
    new THREE.TorusGeometry(1.3, 0.5, 16, 80),          // Odoo
  ];

  const projectMeshes = [];
  const orbitRadius = 9;

  projects.forEach((proj, i) => {
    const angle = (i / projects.length) * Math.PI * 2;
    const geo = GEOMETRIES[i];

    const mat = new THREE.MeshPhongMaterial({
      color: proj.color,
      emissive: proj.color,
      emissiveIntensity: 0.22,
      shininess: 80,
      transparent: true,
      opacity: 0.92,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: proj.color,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    const mesh = new THREE.Mesh(geo, mat);
    const wire = new THREE.Mesh(geo, wireMat);
    mesh.add(wire);

    mesh.position.set(
      Math.cos(angle) * orbitRadius,
      (Math.random() - 0.5) * 5,
      Math.sin(angle) * orbitRadius,
    );

    mesh.userData = {
      project: proj,
      index: i,
      baseAngle: angle,
      hovered: false,
    };
    scene.add(mesh);
    projectMeshes.push(mesh);
  });

  return { projectMeshes, orbitRadius };
}
