import * as THREE from 'three';
import { color, emissive } from 'three/tsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(0,30,30);
camera.lookAt(0,0,0);

const solarSystem = new THREE.Object3D();
scene.add(solarSystem);

const radius = 1;
const widthSegements = 12;
const heightSegments = 12;

const sphereGeometry = new THREE.SphereGeometry(
    radius,
    widthSegements,
    heightSegments
);

//SUN
const sunMaterial = new THREE.MeshPhongMaterial({
    emissive: 0xffff00,
    flatShading: true,
});

const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(1,1,1);
solarSystem.add(sunMesh);


// const mercuryOrbit = new THREE.Object3D();
// mercuryOrbit.position.set(7,0,0);
// solarSystem.add(mercuryOrbit);

// const mercuryMaterial = new THREE.MeshPhongMaterial({
//     color : 0x0000ff,
//     flatShading: true,
// });

// const mercuryMesh = new THREE.Mesh(sphereGeometry, mercuryMaterial);
// mercuryMesh.scale.set(1.5,1.5,1.5);
// mercuryOrbit.add(mercuryMesh);


const earthOrbit = new THREE.Object3D();
earthOrbit.position.set(1.6,0,0);
scene.add(earthOrbit);

const earthMaterial = new THREE.MeshPhongMaterial({
    color : 0x0000ff,
    flatShading: true,
});

const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthMesh.scale.set(1.5,1.5,1.5);
earthOrbit.add(earthMesh);

const moonOrbit = new THREE.Object3D();
moonOrbit.position.set(3,0,0);
earthOrbit.add(moonOrbit);

const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    flatShading: true,
});

const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(0.5, 0.5, 0.5);
moonOrbit.add(moonMesh);

const ambientLight = new THREE.AmbientLight(0x404040); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); 
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);


function animate() {
    requestAnimationFrame(animate);

    solarSystem.rotation.y += 0.01;

    const time = Date.now() * 0.0001;

    // const xMercury = 3*Math.cos(time);
    // const zMercury = 2*Math.sin(time);
    // mercuryOrbit.position.set(xMercury,0,zMercury);

    const xEarth = 10.3* Math.cos(time);  
    const zEarth = 10* Math.sin(time);  
    earthOrbit.position.set(xEarth, 0, zEarth);  

    const xMoon = 3 * Math.cos(time); 
    const zMoon = 3 * Math.sin(time);  
    moonOrbit.position.set(xMoon, 0, zMoon); 

    earthOrbit.rotation.y += 0.01;
    moonOrbit.rotation.y += 0.05;
    // mercuryOrbit.rotation.y += 0.03;

    renderer.render(scene, camera);
}

animate();
