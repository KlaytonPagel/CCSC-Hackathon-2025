import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// -------------------------------------------------------- Setting up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// -------------------------------------------------------- Setting up the Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 10;

// -------------------------------------------------------- Setting up the scene
const scene = new THREE.Scene();

// -------------------------------------------------------- Set up orbiting controls
const controls = new OrbitControls(camera, renderer.domElement);

// -------------------------------------------------------- Geometries


// --------------- Ico Geometry -----------------
const geo = new THREE.IcosahedronGeometry(1.0, 3);
const mat = new THREE.MeshStandardMaterial({
    flatShading: true,
    color: 0x00ffff
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
const torus1Geo = new THREE.TorusGeometry( 2, .1, 4, 10 );
const torus1Mat = new THREE.MeshStandardMaterial( { color:0xff00ff } );
const torus1 = new THREE.Mesh(torus1Geo, torus1Mat);
mesh.add(torus1);

const torus2Geo = new THREE.TorusGeometry( 2, .1, 4, 10 );
const torus2Mat = new THREE.MeshStandardMaterial( { color:0x00ff00 } );
const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
mesh.add(torus2);

const torus3Geo = new THREE.TorusGeometry( 2, .1, 4, 10 );
const torus3Mat = new THREE.MeshStandardMaterial( { color:0x0000ff } );
const torus3 = new THREE.Mesh(torus3Geo, torus3Mat);
mesh.add(torus3);

const torus4Geo = new THREE.TorusGeometry( 2, .1, 4, 10 );
const torus4Mat = new THREE.MeshStandardMaterial( { color:0xff0000 } );
const torus4 = new THREE.Mesh(torus4Geo, torus4Mat);
mesh.add(torus4);

// -------------------------------------------------------- Lights
//const icoLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
//mesh.add(icoLight);

const pointLight01 = new THREE.DirectionalLight(0xffffff, 1);
pointLight01.position.set(10, 10, 10);
scene.add(pointLight01);

//const pointLight01Helper = new THREE.DirectionalLightHelper(pointLight01);
//scene.add(pointLight01Helper);

// -------------------------------------------------------- Animation Loop
function animate() {

    mesh.rotation.x += .005;
    mesh.rotation.y += .005;
    torus1.rotation.y -= .01;
    torus1.rotation.x -= .01;
    torus2.rotation.y -= .02;
    torus2.rotation.x -= .02;
    torus3.rotation.y -= .03;
    torus3.rotation.x -= .03;
    torus4.rotation.y -= .04;
    torus4.rotation.x -= .04;

    renderer.render( scene, camera );

}
