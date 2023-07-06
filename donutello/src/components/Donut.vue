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

            // Change the topping text
            element.innerHTML = 'Remove topping';
              // Add class for styling
            element.classList.add('removed');
            element.classList.remove('added');

            // Show the topping colors HTML
            element.nextElementSibling.style.display = 'flex';
            element.nextElementSibling.style.flexDirection = 'column';
            element.nextElementSibling.style.alignItems = 'flex-start';
            element.nextElementSibling.style.justifyContent = 'flex-start';
            element.nextElementSibling.style.marginTop = '10px';
            element.nextElementSibling.style.padding = '10px';
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
            // Change the topping text
            element.innerHTML = 'Add topping';

            // Add class for styling
            element.classList.add('added');
            element.classList.remove('removed');

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

  <div class="everything">
    <div id="container" style="width: 400px; height: 400px;"></div>

    <div class="buttons">
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
        <p class="topping">Topping</p>
        <div>
          <a href="#" class="topping added">Add topping</a>
          <div class="topping-colors">
            <a href="#" class="topping-colour" data-colour="0xd52417">Red Topping </a>
            <a href="#" class="topping-colour" data-colour="0x54A232">Green Topping </a>
            <a href="#" class="topping-colour" data-colour="0x6fa8dc">Blue Topping </a>
          </div>
        </div>
      </div>
    </div>
    <a href="#" class="send">Order</a>
    </div>
  </div>

</template>

<style scoped>
.everything {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

#container {
  width: 400px;
  height: 400px;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 20px;
}

.topping {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

.topping a {
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: aqua;
  color: white;
}

.topping.added {
  background-color: darkblue;
  color: white;

}

.topping.removed {
  color: white;
  background-color: red;
}

.topping-colors {
  display: none;
}

.send {
  margin-top: 20px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #d517a9;
  color: white;
  text-decoration: none;
  border-radius: 15px;
}
</style>
