import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );

const renderer = new THREE.WebGLRenderer();
// const loader = new GLTFLoader();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.set(0,0,5);
camera.lookAt(0,0,0);


// points.push(new THREE.Vector3(-10, 0, 0));
// points.push(new THREE.Vector3(0,10,0));
// points.push(new THREE.Vector3(10,0,0));
// points.push(new THREE.Vector3(-10,0,0));

// const geometry = new THREE.BufferGeometry().setFromPoints(points);
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// const geometry = new THREE.CircleGeometry(1,100,Math.PI, Math.PI);
const geometry = new THREE.ConeGeometry(1,1,32,1,false,0,2*Math.PI);
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material);
scene.add(cube);

// const line = new THREE.Line(geometry, material);
// scene.add(line);
// renderer.render(scene , camera);

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
}

animate();
// renderer.setAnimationLoop( animate );
