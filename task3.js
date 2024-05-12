import * as Three from "https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.module.js";

document.addEventListener("DOMContentLoaded", function () {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new Three.Scene();

  const camera = new Three.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new Three.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);

  // Paths to the images for the cube sides
  const texturePaths = [
    "images/task3/1.jpg",
    "images/task3/2.jpg",
    "images/task3/3.jpg",
    "images/task3/4.jpg",
    "transparent.jpg", // Texture for the transparent side
    "transparent.jpg", // Texture for the transparent side
  ];

  // Function to load texture from JPG
  function loadJpegTexture(filename) {
    const textureLoader = new Three.TextureLoader();
    return textureLoader.load(filename);
  }

  // Array to store loaded textures
  const textures = texturePaths.map((path) => loadJpegTexture(path));

  const geometry = new Three.BoxGeometry();

  // Array of materials for each side of the cube
  const materials = [
    new Three.MeshBasicMaterial({ map: textures[0] }), // Side 1
    new Three.MeshBasicMaterial({ map: textures[1] }), // Side 2
    new Three.MeshBasicMaterial({ map: textures[2] }), // Side 3
    new Three.MeshBasicMaterial({ map: textures[3] }), // Side 4
    new Three.MeshBasicMaterial({ transparent: true, opacity: 0 }), // Transparent top side
    new Three.MeshBasicMaterial({ transparent: true, opacity: 0 }), // Transparent bottom side
  ];

  // Set side: Three.DoubleSide for all materials except transparent ones
  materials.forEach((mat) => {
    if (!mat.transparent) {
      mat.side = Three.DoubleSide;
    }
  });

  const cube = new Three.Mesh(geometry, materials);
  cube.scale.set(3, 3, 3);
  scene.add(cube);

  const h1 = document.createElement("h1");
  h1.innerHTML =
    "Завдання 4.3. Завантаження зображень довільного розміру із чотирьох JPEG-файлів в одну велику текстуру.";
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
