import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// -------------------------------------------------------- Setting up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// -------------------------------------------------------- Setting up the Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// -------------------------------------------------------- Setting up the scene
const scene = new THREE.Scene();

// -------------------------------------------------------- Set up orbiting controls
const controls = new OrbitControls(camera, renderer.domElement);

// -------------------------------------------------------- Geometries


// --------------- Ico Geometry -----------------
const geo = new THREE.IcosahedronGeometry(1.0, 3);
const mat = new THREE.MeshStandardMaterial({
    flatShading: true,
    color: 0xffffff
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// ---------------- Wire Mesh Geometry for Ico __
const wireMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe:true
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

// ---------------- Torus Geometry --------------
const torusGeo = new THREE.TorusGeometry( 3, .5, 10, 100 );
const torusMat = new THREE.MeshStandardMaterial( { color:0xffffff } );
const torus = new THREE.Mesh(torusGeo, torusMat);
scene.add(torus);


// -------------------------------------------------------- Lights
const hemiLight = new THREE.HemisphereLight(0xff0000, 0x0000ff);
scene.add(hemiLight);


// -------------------------------------------------------- Animation Loop
function animate() {

    mesh.rotation.x += .005;
    mesh.rotation.y += .005;

    renderer.render( scene, camera );

}
