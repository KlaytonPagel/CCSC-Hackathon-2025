import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { Spherical } from './Spherical.js';
import { Coords } from './3Dcoords.js';

 
// -------------------------------------------------------- Setting up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// -------------------------------------------------------- Setting up the Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.z = 100;
camera.position.y = 1;
camera.position.x = 1;

// -------------------------------------------------------- Setting up the scene
const scene = new THREE.Scene();

// -------------------------------------------------------- Set up orbiting controls
const controls = new OrbitControls(camera, renderer.domElement);

// -------------------------------------------------------- Lights
//const icoLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
//mesh.add(icoLight);

const pointLight01 = new THREE.DirectionalLight(0xffffff, 1);
pointLight01.position.set(10, 10, 50);
scene.add(pointLight01);

//const pointLight01Helper = new THREE.DirectionalLightHelper(pointLight01);
//scene.add(pointLight01Helper);
const SPACE_SIZE = 1;
const POINT_SIZE = .8;

const geometry = new THREE.BoxGeometry(POINT_SIZE, POINT_SIZE, POINT_SIZE); 
const material = new THREE.MeshStandardMaterial( {color: 0x00ff00} );


for (let x = -SPACE_SIZE; x < SPACE_SIZE; x+=.05) {
    for (let y = -SPACE_SIZE; y < SPACE_SIZE; y+=.05) {
        for (let z = -SPACE_SIZE; z < SPACE_SIZE; z+=.05) {
            
            let zeta = new Coords(0, 0, 0);

            let n = 8;
            let maxIter = 20;
            let iter = 0;
            while (true) {

                
                let sphericalZ = new Spherical(zeta.x, zeta.y, zeta.z);

                let newx = Math.pow(sphericalZ.r, n) * Math.sin(sphericalZ.theta*n) * Math.cos(sphericalZ.phi*n);
                let newy = Math.pow(sphericalZ.r, n) * Math.sin(sphericalZ.theta*n) * Math.sin(sphericalZ.phi*n);
                let newz = Math.pow(sphericalZ.r, n) * Math.cos(sphericalZ.theta*n);

                zeta.x = newx + x;
                zeta.y = newy + y;
                zeta.z = newz + z;
                iter ++;
                if (sphericalZ.r > 128) {
                    break;
                }
                if (iter > maxIter) {
                    const cube = new THREE.Mesh( geometry, material ); 
                    cube.position.x = x*20;
                    cube.position.y = y*20;
                    cube.position.z = z*20;
                    scene.add(cube);
                    break;
                }
            }
        }
    }
}




// -------------------------------------------------------- Animation Loop
function animate() {

    renderer.render( scene, camera );

}
