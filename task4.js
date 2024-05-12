// Importing necessary modules from three.js
import * as Three from "three";

// Getting the width and height of the window
const winW = window.innerWidth;
const winH = window.innerHeight;

// Creating the scene
const scene = new Three.Scene();

// Creating a camera
const camera = new Three.PerspectiveCamera(
  45, // field of view
  winW / winH, // aspect ratio
  0.1, // near clipping plane
  1000 // far clipping plane
);

// Setting the initial camera position
camera.position.z = 12;

// Creating a renderer
const renderer = new Three.WebGLRenderer();
renderer.setSize(winW, winH);
renderer.setClearColor(0xffffff, 0); // transparent background
document.body.appendChild(renderer.domElement);

// Loading a texture
const textureLoader = new Three.TextureLoader();
const texture1 = textureLoader.load("images/task4/task3_1.bmp");
const texture2 = textureLoader.load("images/task4/task3_2.bmp");
const animalTexture = textureLoader.load("images/task4/ai.png"); // Load your animal image

// Size of a chessboard cell
const cellSize = 1;

// Creating geometry for a chessboard cell
const squareGeometry = new Three.PlaneGeometry(cellSize, cellSize);

// Creating materials for the white and black cells
const material1 = new Three.MeshBasicMaterial({ map: texture1 });
const material2 = new Three.MeshBasicMaterial({ map: texture2 });
const animalMaterial = new Three.MeshBasicMaterial({
  map: animalTexture,
  transparent: true,
}); // Create material with transparent property

// Function to create a chessboard on a single face of a cube
function createChessboard() {
  const group = new Three.Group();

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const squareMaterial = (i + j) % 2 === 0 ? material1 : material2;
      const square = new Three.Mesh(squareGeometry, squareMaterial);
      square.position.set(i - 1.5 + cellSize / 2, j - 1.5 + cellSize / 2, 0);
      group.add(square);
    }
  }

  return group;
}

// Creating a cube with 6 faces
const cubeGeometry = new Three.BoxGeometry(4, 4, 4);

// Creating a material for the cube
const cubeMaterial = new Three.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});

// Creating a cube
const cube = new Three.Mesh(cubeGeometry, cubeMaterial);

// Adding chessboard cells to each face of the cube
const chessboards = [];
// проходимо по кожній грані куба
for (let i = 0; i < 6; i++) {
  // Створюється шахова дошка
  const chessboard = createChessboard();
  /**
   * Перевірки. Встановлюють позицію і обертання кожної
   * шахової дошки відповідно до грані куба (i = 0 –> 1 грань куба)
   */
  if (i === 0) {
    chessboard.position.set(-0.5, -2, -0.5); // позиція шахової дошки на грані куба
    chessboard.rotation.x = Math.PI / 2; // обертання шахової дошки навколо осі X (90 degree) проти годинникової стрілки
    const animalSide = new Three.Mesh(squareGeometry, animalMaterial);
    animalSide.position.set(0, 0, 2); // Adjusting the position of the ornament
    animalSide.scale.set(4, 4, 4);
    cube.add(animalSide);
  } else if (i === 1) {
    chessboard.position.set(-0.5, 2, 0.5);
    chessboard.rotation.x = -Math.PI / 2; // обертання за годинниковою стрілкою
  } else if (i === 2) {
    chessboard.position.set(-0.5, -0.5, -2);
  } else if (i === 3) {
    chessboard.position.set(-0.5, -0.5, 2);
  } else if (i === 4) {
    chessboard.position.set(-2, -0.5, -0.5);
    chessboard.rotation.y = -Math.PI / 2;
  } else if (i === 5) {
    chessboard.position.set(2, -0.5, 0.5);
    chessboard.rotation.y = Math.PI / 2;
  }
  cube.add(chessboard); // додати створену шахову дошку до куба
}

// Adding the cube to the scene
scene.add(cube);

const h1 = document.createElement("h1");
h1.innerHTML = "Завдання 4.4. Текстура з прозорими ділянками.";
h1.style.textAlign = "center";
h1.style.marginTop = "20px";
document.body.insertBefore(h1, renderer.domElement);

// Animation function
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// Starting the animation
animate();
