import * as THREE from 'three';
import { color, emissive } from 'three/tsl';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500 );

const renderer = new THREE.WebGLRenderer();
// const loader = new GLTFLoader();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.set(0,0,15);
camera.lookAt(0,0,0);

// points.push(new THREE.Vector3(-10, 0, 0));
// points.push(new THREE.Vector3(0,10,0));
// points.push(new THREE.Vector3(10,0,0));
// points.push(new THREE.Vector3(-10,0,0));

// const geometry = new THREE.BufferGeometry().setFromPoints(points);
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// const geometry = new THREE.CircleGeometry(1,100,Math.PI, Math.PI);
// const geometry = new THREE.ConeGeometry(1,1,32,1,false,0,2*Math.PI);
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material);
// scene.add(cube);

// const line = new THREE.Line(geometry, material);
// scene.add(line);
// renderer.render(scene , camera);

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

const sunMaterial = new THREE.MeshPhongMaterial({
    emissive: 0xffff00,
    flatShading: true,
});

const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(3,3,3);
solarSystem.add(sunMesh);

const earthOrbit = new THREE.Object3D();
earthOrbit.position.set(10,0,0);
solarSystem.add(earthOrbit);

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

// function animate() {
//     requestAnimationFrame(animate);
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//     renderer.render( scene, camera );
// }
// animate();
// renderer.setAnimationLoop( animate );

// 조명 추가
const ambientLight = new THREE.AmbientLight(0x404040); // 부드러운 주변광
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 강한 방향광
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// 애니메이션 함수
function animate() {
    requestAnimationFrame(animate);

    // 태양계 회전 (전체)
    solarSystem.rotation.y += 0.01;

    // 태양 회전

    // 지구 회전
    earthOrbit.rotation.y += 0.01;

    // 달 회전
    moonOrbit.rotation.y += 0.05;

    renderer.render(scene, camera);
}

animate();
