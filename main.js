import * as THREE from 'three';


// -------------------------------------------------------- Setting up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// -------------------------------------------------------- Setting up the Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 2;

// -------------------------------------------------------- Setting up the scene
const scene = new THREE.Scene();

// -------------------------------------------------------- Geometries

const geo = new THREE.IcosahedronGeometry(1.0, 0);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

// -------------------------------------------------------- Lights
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000);
scene.add(hemiLight);


// -------------------------------------------------------- Animation Loop
function animate() {

    mesh.rotation.x += .01;
    mesh.rotation.y += .01;

    renderer.render( scene, camera );

}
