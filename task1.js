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
  renderer.setSize(window.innerWidth * 1, window.innerHeight * 1); // Зменшуємо розміри вікна
  renderer.setClearColor(0xffffff); // Встановлюємо колір фону (білий)
  document.body.style.margin = "0"; // Встановлюємо margin відступ для body
  document.body.appendChild(renderer.domElement);

  const textureLoader = new Three.TextureLoader();
  const texture = textureLoader.load(
    "images/task1/ornament.bmp",
    function (loadedTexture) {
      // Після завантаження текстури
      loadedTexture.generateMipmaps = true; // Встановлюємо параметр generateMipmaps в true

      // Використання gluBuild2DMipmaps для автоматичної генерації пірамідальних рівнів текстури
      loadedTexture.minFilter = Three.LinearMipmapLinearFilter;

      const geometry = new Three.BoxGeometry();
      const material = new Three.MeshBasicMaterial({ map: loadedTexture });
      const cube = new Three.Mesh(geometry, material);
      cube.scale.set(3, 3, 3); // Змінюємо розмір куба
      scene.add(cube);

      const h1 = document.createElement("h1");
      h1.innerHTML = "Завдання 4.1. Пірамідальні текстури";
      h1.style.textAlign = "center";
      h1.style.marginTop = "20px"; // Зменшуємо відступ від тексту зверху
      document.body.insertBefore(h1, renderer.domElement);

      function animate() {
        requestAnimationFrame(animate); //швидкість обертання
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate();
    }
  );
});
