import * as Three from "https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js";

document.addEventListener("DOMContentLoaded", function () {
  const scene = new Three.Scene();

  const camera = new Three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const renderer = new Three.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);

  const textureLoader = new Three.TextureLoader();
  const texture = textureLoader.load("images/task2/panoram2.bmp");
  texture.wrapS = Three.RepeatWrapping;
  texture.wrapT = Three.RepeatWrapping;

  const material = new Three.MeshBasicMaterial({ map: texture });

  const grayMaterial = new Three.MeshBasicMaterial({ color: 0xcccccc });

  const transparentMaterial = new Three.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
  });

  const materials = [
    material, // Front side
    material, // Back side
    transparentMaterial, // Top side (transparent)
    transparentMaterial, // Bottom side (transparent)
    material, // Left side
    material, // Right side
  ];

  // Set the mapping for the left and right sides
  materials[4].map.offset.x = 0.25; // Offset for left side
  materials[5].map.offset.x = 0; // Offset for right side
  materials[4].map.repeat.x = 0.5; // Repeat only half of the panoramic texture
  materials[5].map.repeat.x = 0.5; // Repeat only half of the panoramic texture

  // Set side: Three.DoubleSide for all materials except transparent ones
  materials.forEach((mat) => {
    if (!mat.transparent) {
      mat.side = Three.DoubleSide;
    }
  });

  const geometry = new Three.BoxGeometry();
  const cube = new Three.Mesh(geometry, materials);
  cube.scale.set(3, 3, 3);
  scene.add(cube);

  const h1 = document.createElement("h1");
  h1.innerHTML = "Завдання 4.2. Панорамні текстури";
  h1.style.textAlign = "center";
  h1.style.marginTop = "20px";
  document.body.insertBefore(h1, renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
});
