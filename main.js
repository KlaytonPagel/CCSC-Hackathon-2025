import * as THREE from 'three';
import { color, emissive } from 'three/tsl';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set(0,500,0);
camera.lookAt(0,0,0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxDistance = 500;
controls.minDistance = 1;

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
sunMesh.scale.set(3,3,3);
solarSystem.add(sunMesh);

//mercuryOrbit
const mercuryOrbit = new THREE.Object3D();
mercuryOrbit.position.set(0.8,0,0);
scene.add(mercuryOrbit);

const mercuryMaterial = new THREE.MeshPhongMaterial({
    color : 0x808080,
    flatShading: true,
});

const mercuryMesh = new THREE.Mesh(sphereGeometry, mercuryMaterial);
mercuryMesh.scale.set(0.4,0.4,0.4);
mercuryOrbit.add(mercuryMesh);


//VenusOrbit
const venusOrbit = new THREE.Object3D();
venusOrbit.position.set(0.049,0,0);
scene.add(venusOrbit);

const venusMaterial = new THREE.MeshPhongMaterial({
    color : 0xFFD700,
    flatShading: true,
});

const venusMesh = new THREE.Mesh(sphereGeometry, venusMaterial);
venusMesh.scale.set(0.9,0.9,0.9);
venusOrbit.add(venusMesh);

//
//earthOrbit
const earthOrbit = new THREE.Object3D();
earthOrbit.position.set(0.16,0,0);
scene.add(earthOrbit);

const earthMaterial = new THREE.MeshPhongMaterial({
    color : 0x0000ff,
    flatShading: true,
});

const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthMesh.scale.set(1,1,1);
earthOrbit.add(earthMesh);


//moon
const moonOrbit = new THREE.Object3D();
moonOrbit.position.set(2,0,0);
earthOrbit.add(moonOrbit);

const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    flatShading: true,
});

const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(0.3, 0.3, 0.3);
moonOrbit.add(moonMesh);


//MarsOrbit
const marsOrbit = new THREE.Object3D();
// marsOrbit.position.set(13.95,0,0);
scene.add(marsOrbit);

const marsMaterial = new THREE.MeshPhongMaterial({
    color : 0xFF0000,
    flatShading: true,
});

const marsMesh = new THREE.Mesh(sphereGeometry, marsMaterial);
marsMesh.scale.set(0.5,0.5,0.5);
marsOrbit.add(marsMesh);


//JupiterOrbit
const jupiterOrbit = new THREE.Object3D();
// jupiterOrbit.position.set(2.544,0,0);
scene.add(jupiterOrbit);

const jupiterMaterial = new THREE.MeshPhongMaterial({
    color : 0x8B4513,
    flatShading: true,
});

const jupiterMesh = new THREE.Mesh(sphereGeometry, jupiterMaterial);
jupiterMesh.scale.set(11.2,11.2,11.2);
jupiterOrbit.add(jupiterMesh);


//SaturnOrbit
const saturnOrbit = new THREE.Object3D();
// SaturnOrbit.position.set(5.4,0,0);
scene.add(saturnOrbit);

const saturnMaterial = new THREE.MeshPhongMaterial({
    color : 0xA52A2A,
    flatShading: true,
});

const saturnMesh = new THREE.Mesh(sphereGeometry, saturnMaterial);
saturnMesh.scale.set(9.4,9.4,9.4);
saturnOrbit.add(saturnMesh);


//UranusOrbit
const uranusOrbit = new THREE.Object3D();
// UranusOrbit.position.set(8.93,0,0);
scene.add(uranusOrbit);

const uranusMaterial = new THREE.MeshPhongMaterial({
    color : 0x008B8B,
    flatShading: true,
});

const uranusMesh = new THREE.Mesh(sphereGeometry, uranusMaterial);
uranusMesh.scale.set(4,4,4);
uranusOrbit.add(uranusMesh);


//NeptuneOrbit
const neptuneOrbit = new THREE.Object3D();
// NeptuneOrbit.position.set(2.4,0,0);
scene.add(neptuneOrbit);

const neptuneMaterial = new THREE.MeshPhongMaterial({
    color : 0x000080,
    flatShading: true,
});

const neptuneMesh = new THREE.Mesh(sphereGeometry, neptuneMaterial);
neptuneMesh.scale.set(3.9,3.9,3.9);
neptuneOrbit.add(neptuneMesh);


//Light

const ambientLight = new THREE.AmbientLight(0x404040); 
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); 
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);


function animate() {
    requestAnimationFrame(animate);

    solarSystem.rotation.y += 0.01;

    const time = Date.now() * 0.0001;

    const xMercury = 4 * Math.cos(time + 1) + 0.8;
    const zMercury = 3.9 * Math.sin(time+ 1);
    mercuryOrbit.position.set(xMercury,0,zMercury);
    mercuryMesh.rotation.y += 0.01; 

    const xVenus = 7 * Math.cos(time+2) + 0.049;
    const zVenus = 6.8 * Math.sin(time+2);
    venusOrbit.position.set(xVenus,0,zVenus);
    venusMesh.rotation.y += 0.005;

    const xEarth = 10* Math.cos(time+3) + 0.16;  
    const zEarth = 9.9* Math.sin(time+3);  
    earthOrbit.position.set(xEarth, 0, zEarth);  
    earthMesh.rotation.y += 0.02;

    moonMesh.rotation.y += 0.05;

    const xMars = 15* Math.cos(time+4) +1.395;  
    const zMars = 14.9* Math.sin(time+4);  
    marsOrbit.position.set(xMars, 0, zMars);  
    marsMesh.rotation.y += 0.01;

    const xJupiter = 53* Math.cos(time+5) +2.544;  
    const zJupiter = 52* Math.sin(time+5);  
    jupiterOrbit.position.set(xJupiter, 0, zJupiter);
    jupiterMesh.rotation.y += 0.001;

    const xSaturn = 100* Math.cos(time+6) +5.4;  
    const zSaturn = 99.8* Math.sin(time+6);  
    saturnOrbit.position.set(xSaturn, 0, zSaturn);
    saturnMesh.rotation.y += 0.002;

    const xUranus = 200* Math.cos(time+7) +8.93;  
    const zUranus = 199.7* Math.sin(time+7);  
    uranusOrbit.position.set(xUranus, 0, zUranus);
    uranusMesh.rotation.y += 0.003;

    const xNeptune = 300* Math.cos(time+8) +2.4;  
    const zNeptune = 299.9* Math.sin(time+8);  
    neptuneOrbit.position.set(xNeptune, 0, zNeptune);
    neptuneMesh.rotation.y += 0.004;

    controls.update();

    renderer.render(scene, camera);
}

animate();
