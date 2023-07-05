<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

onMounted(() => {
  let donut = null;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  // add light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 1);
  scene.add(light);

  // load donut.glb
  const loader = new GLTFLoader();
    loader.load('../../public/model/donut.glb', function (gltf) {
        // scale
        donut = gltf;
        donut.scene.scale.set(10, 10, 10);
        scene.add(donut.scene);
    });

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();

  document.querySelector('#recolor').addEventListener('click', function (e) {
    e.preventDefault();
    // recolor
    donut.scene.traverse(function (child) {
      if (child.isMesh) {
        child.material.color.setHex(Math.random() * 0xffffff);
      }
    });
  });
});
</script>
  
  <template>
    <a href="#" id="recolor">Recolor!</a>
    <div id="container" style="width: 400px; height: 400px;"></div>
  </template>
  

  <style>
  #container {
    width: 400px;
    height: 400px;
  }
  </style>
  