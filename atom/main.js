import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Atom } from './atom.js';

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

// -------------------------------------------------------- Lights
//const icoLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
//mesh.add(icoLight);

const pointLight01 = new THREE.DirectionalLight(0xffffff, 1);
pointLight01.position.set(10, 10, 10);
scene.add(pointLight01);

//const pointLight01Helper = new THREE.DirectionalLightHelper(pointLight01);
//scene.add(pointLight01Helper);

// -------------------------------------------------------- Makeing Le Atoms
let atoms = [];
let rootAtom = new Atom(0, 0, 10, scene);
atoms.push(rootAtom);
function makeAtoms(amount){
    for (let i = 1; i <= amount; i++){
        atoms.push(new Atom(i*5, 0, 10, rootAtom.icosahedron));
        atoms.push(new Atom(-i*5, 0, 10, rootAtom.icosahedron));
        atoms.push(new Atom(0, i*5, 10, rootAtom.icosahedron));
        atoms.push(new Atom(0, -i*5, 10, rootAtom.icosahedron));
    }
}
makeAtoms(50);

function updateAtoms(atoms){
    for (let i = 0; i < atoms.length; i++){
        atoms[i].spin();
    }
}

// -------------------------------------------------------- Animation Loop
function animate() {
    updateAtoms(atoms);

    renderer.render( scene, camera );

}
