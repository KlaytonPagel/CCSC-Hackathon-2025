import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

//Set up scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

//Set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Camera controls
const controls = new OrbitControls( camera, renderer.domElement );

//Quaternion and quaternion rotation axes
const quat = new THREE.Quaternion();
const quatData = {
    vx: 0,
    vy: 0,
    vz: 0,
    w: 1
} //An unit quaternion should be x^2+y^2+z^2+w^2=1

function updateQuatData(){
    //Quaternion should stay as an unit quaternion to be applied for rotation.
    quat.set(quatData.vx, quatData.vy, quatData.vz, quatData.w).normalize();
    sph.setRotationFromQuaternion(quat); // Apply the quaternion to the sphere

    const radius = 2.3;
    const rotatedPoint = new THREE.Vector3(radius, 0, 0); // a specific point on x axis.
    rotatedPoint.applyQuaternion(quat); // apply current quaternion on the point to rotate it.
    rotatedPoint.add(sph.position); //convert coordinates considering the position of the sphere.
    
    points.push(rotatedPoint.clone());
    if (points.length > 100) points.shift(); //limit the length of trajectory

    updateTrajectory();
}

//gui cp
const gui = new GUI();
gui.title("Quaternion Controls");
const QuatParam = gui.addFolder("Parameters");
const param = [];
function resetQuaternion() {
    quatData.vx = 0;
    quatData.vy = 0;
    quatData.vz = 0;
    quatData.w = 1;
    points = [];
    updateQuatData();
    param.forEach(control => control.updateDisplay());
}
param.push(QuatParam.add(quatData, "vx", -1, 1, 0.01).onChange(updateQuatData));
param.push(QuatParam.add(quatData, "vy", -1, 1, 0.01).onChange(updateQuatData));
param.push(QuatParam.add(quatData, "vz", -1, 1, 0.01).onChange(updateQuatData));
param.push(QuatParam.add(quatData, "w", -1, 1, 0.01).onChange(updateQuatData));
QuatParam.add({ reset: resetQuaternion }, "reset").name("Reset Quaternion");

//Rotation Trajectory
//Line
function updateTrajectory() {
    //generate new Buffer geometry
    const trajectoryGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(points.flatMap(p => [p.x, p.y, p.z]));
    trajectoryGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    //remove previous lines for memory
    if (trajectoryLine.geometry) {
        trajectoryLine.geometry.dispose();
    }
    
    trajectoryLine.geometry = trajectoryGeometry;
}
const trajectoryMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 4 });
const trajectoryLine = new THREE.Line(new THREE.BufferGeometry(), trajectoryMaterial);
scene.add(trajectoryLine);
// const trajectoryGeometry = new THREE.BufferGeometry();  
// trajectoryGeometry.setFromPoints([new THREE.Vector3(0, 0, 0)]);
// const trajectoryMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
// const trajectoryLine = new THREE.Line(trajectoryGeometry, trajectoryMaterial);
// scene.add(trajectoryLine);
//Array for Trajectory
let points = [];

//Making a grid plane
const gridp = new THREE.GridHelper(10, 10);
scene.add(gridp);

//Making axes (x: red, y: green, z: blue)
const axes = new THREE.AxesHelper(6);
scene.add(axes);

//A sphere
const geo1 = new THREE.SphereGeometry( 2, 32, 32 );
const mat1 = new THREE.MeshBasicMaterial( { color: 0xb77cef, transparent: true, opacity: 0.7 } );
const wiremat = new THREE.MeshBasicMaterial( { color: 0x050505, wireframe: true } );
const sph = new THREE.Mesh( geo1, mat1 );
const sphwir = new THREE.Mesh( geo1, wiremat );
scene.add( sph );
sph.add( sphwir );

camera.position.set( 4, 3, 4 );
controls.update();

function animate() {
    controls.update();
    renderer.render( scene, camera );
    
}
renderer.setAnimationLoop( animate );
