import { PROJECTS } from "./projects.js";
import { openModal, isModalOpen, tooltip } from "./ui.js";
import {
  initLights,
  createStarfield,
  createNebulae,
  createProjectMeshes,
} from "./sceneComponents.js";

// Setup de la escena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  innerWidth / innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x00000a);
document.body.appendChild(renderer.domElement);
camera.position.z = 28;

// Inyección de componentes modulares
initLights(scene);
createStarfield(scene);
createNebulae(scene);
const { projectMeshes, orbitRadius } = createProjectMeshes(scene, PROJECTS);

// Interacciones y Raycasting
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hoveredMesh = null;

function updatePointer(e) {
  const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  const y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
  pointer.x = (x / innerWidth) * 2 - 1;
  pointer.y = -(y / innerHeight) * 2 + 1;

  tooltip.style.left = x + 16 + "px";
  tooltip.style.top = y + 16 + "px";
}

window.addEventListener("mousemove", updatePointer);

window.addEventListener("click", (e) => {
  if (isModalOpen()) return;
  updatePointer(e);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(projectMeshes, true);
  if (hits.length) {
    const obj = hits[0].object;
    const root = obj.parent?.userData?.project ? obj.parent : obj;
    if (root.userData?.project) openModal(root.userData.project);
  }
});

// Parallax de cámara
let camTargetX = 0,
  camTargetY = 0;
let mouseX = 0,
  mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = (e.clientX / innerWidth - 0.5) * 2;
  mouseY = (e.clientY / innerHeight - 0.5) * 2;
});

window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// Loop de animación principal
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Animación física de las mallas
  projectMeshes.forEach((mesh, i) => {
    const speed = 0.06 + i * 0.008;
    const orbitAngle = mesh.userData.baseAngle + t * speed;
    mesh.position.x = Math.cos(orbitAngle) * orbitRadius;
    mesh.position.z = Math.sin(orbitAngle) * orbitRadius;
    mesh.position.y += Math.sin(t * 0.4 + i * 1.2) * 0.004;
    mesh.rotation.x += 0.007;
    mesh.rotation.y += 0.01;

    if (mesh.userData.hovered) {
      mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, 1.35, 0.12));
      mesh.material.emissiveIntensity = 0.55 + Math.sin(t * 4) * 0.1;
    } else {
      mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, 1.0, 0.12));
      mesh.material.emissiveIntensity = 0.22;
    }
  });

  // Manejo lógico del Hovering
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(projectMeshes, true);
  const newHover = hits.length
    ? hits[0].object.parent?.userData?.project
      ? hits[0].object.parent
      : hits[0].object
    : null;

  if (newHover !== hoveredMesh) {
    if (hoveredMesh) hoveredMesh.userData.hovered = false;
    hoveredMesh = newHover;
    if (hoveredMesh) {
      hoveredMesh.userData.hovered = true;
      tooltip.style.display = "block";
      tooltip.textContent = hoveredMesh.userData.project.title;
      document.body.style.cursor = "pointer";
    } else {
      tooltip.style.display = "none";
      document.body.style.cursor = "default";
    }
  }

  // Desplazamiento dinámico de cámara
  camTargetX += (mouseX * 3 - camTargetX) * 0.04;
  camTargetY += (-mouseY * 2 - camTargetY) * 0.04;
  camera.position.x = camTargetX;
  camera.position.y = camTargetY;
  camera.lookAt(0, 0, 0);

  // Rotación espacial de nebulosas
  scene.children.forEach((obj) => {
    if (obj instanceof THREE.Points && obj !== scene.children[0]) {
      obj.rotation.y += 0.00015;
    }
  });

  renderer.render(scene, camera);
}

animate();
