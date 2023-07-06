<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

onMounted(() => {
  let donut = null;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    400 / 400, // Adjusted width and height
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(400, 400); // Adjusted width and height
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
    donut.scene.scale.set(35, 35, 35);
    scene.add(donut.scene);

    // Access the 'glaze' object directly
  const glazeObject = donut.scene.getObjectByName('glaze');

  // Check if the 'glaze' object is found and is an object3D
  if (glazeObject && glazeObject.isObject3D) {
    // Traverse the children of the 'glaze' object
    glazeObject.traverse(function (child) {
      if (child.name === 'topping' && child.isMesh) {
        // Hide the topping by default
        child.visible = false;
      }
    });
  }
  });

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //spin
    if (donut) {
      donut.scene.rotation.y += 0.01;
      //angle the donut a bit towards the camera
      donut.scene.rotation.x += 0.005;
    }
  }

  animate();

var elements = document.querySelectorAll('.recolour');
elements.forEach(function(element) {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    var colour = this.dataset.colour;
    console.log(colour);

    // Access the 'glaze' object directly
    const glazeMesh = donut.scene.getObjectByName('glaze');

    // Check if the 'glaze' object is found and is a mesh
    if (glazeMesh && glazeMesh.isMesh) {
      // Modify properties of the 'glaze' mesh (Torus.004)
      glazeMesh.material.color.setHex(colour);
    }
  });
});


var elements = document.querySelectorAll('.topping');
elements.forEach(function(element) {
  
  element.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Access the 'glaze' object directly
    const glazeObject = donut.scene.getObjectByName('glaze');
    
    // Check if the 'glaze' object is found and is an object3D
    if (glazeObject && glazeObject.isObject3D) {
      // Traverse the children of the 'glaze' object
      glazeObject.traverse(function (child) {
        if (child.name === 'topping' && child.isMesh) {
          // Modify properties of the 'topping' mesh
          child.visible = !child.visible;
          if (child.visible) {
            // Show the topping colors HTML
            element.nextElementSibling.style.display = 'block';
            //colour the topping
            //parse the colour from topping-colour
          var elements = document.querySelectorAll('.topping-colour');
            elements.forEach(function(element) {
              element.addEventListener('click', function(e) {
              e.preventDefault();
              var colour = this.dataset.colour;
              console.log(colour);
              child.material.opacity = 1;
              child.material.color.setHex(colour);
              });
            });
          } else {
            // Hide the topping colors HTML
            element.nextElementSibling.style.display = 'none';
          }
        }
      });
    }
  });
});


});
</script>

<template>
  <div> 
    <p>Glazing Colour</p> 
    <div>
      <a href="#" class="recolour" data-colour="0xd52417">Red </a>
      <a href="#" class="recolour" data-colour="0x54A232">Green </a>
      <a href="#" class="recolour" data-colour="0x6fa8dc">Blue </a>
    </div>
  </div>
  <div>
  <div>
    <p>Topping</p>
    <div>
      <a href="#" class="topping">topping </a>
      <div class="topping-colors">
        <a href="#" class="topping-colour" data-colour="0xd52417">Red Topping </a>
        <a href="#" class="topping-colour" data-colour="0x54A232">Green Topping </a>
        <a href="#" class="topping-colour" data-colour="0x6fa8dc">Blue Topping </a>
      </div>
    </div>
  </div>
</div>

  <a href="#">Send</a>

  <div id="container" style="width: 400px; height: 400px;"></div>
</template>

<style>
#container {
  width: 400px;
  height: 400px;
}
.topping-colors {
  display: none;
}
</style>
