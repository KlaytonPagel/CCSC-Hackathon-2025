import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'lil-gui';

import { Spherical } from '../mandel/Spherical.js';
import { Coords } from '../mandel/3Dcoords.js';

const Quaternions = () => {
    const mountRef = useRef(null);

    useEffect(() => {




        //Set up scene and camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.set( 0, 0, 100 );
        camera.lookAt( 0, 0, 0 );

        //Set up renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        mountRef.current.appendChild(renderer.domElement);

        //Camera controls
        const controls = new OrbitControls(camera, renderer.domElement);

        //Quaternion Rotation
        const quat = new THREE.Quaternion();
        const quatData = {
            vx: 0,
            vy: 0,
            vz: 0,
            w: 0
        }

        //gui cp
        const gui = new GUI();
        let state = {
            name: "Quaternion",
            shadow: true,
        };

        function updateQuatData(){
            quat.setFromEuler(new THREE.Euler(quatData.vx, quatData.vy, quatData.vz));
            cube1.setRotationFromQuaternion(quat); // Apply the quaternion to the cube
        }

        gui.add(state, "name");
        const QuatParam = gui.addFolder("Quaternion Parameters");
        QuatParam.add(quatData, "vx", -(Math.PI), Math.PI).onChange(updateQuatData);
        QuatParam.add(quatData, "vy", -(Math.PI), Math.PI).onChange(updateQuatData);
        QuatParam.add(quatData, "vx", -(Math.PI), Math.PI).onChange(updateQuatData);
        gui.add(state, "shadow").onChange(function(){
            model.traverse((object) => {
                if (object.isMesh) {
                    const map =
                        object.material && object.material.map ? object.material.map : null;
                    const material = new THREE.MeshStandardMaterial();
                    material.map = map;
                    object.material = material;
                    material.castShadow = state.shadow;
                    object.castShadow = state.shadow;
                }
            });
        });

        //Making a grid plane
        const gridp = new THREE.GridHelper(10, 10);
        scene.add(gridp);

        //Making axes (x: red, y: green, z: blue)
        const axes = new THREE.AxesHelper(5);
        scene.add(axes);

        //make a box
        const geometry1 = new THREE.BoxGeometry( 1, 2, 1 );
        const material1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const materialwire1 = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
        const cube1 = new THREE.Mesh( geometry1, material1 );
        const cubewire1 = new THREE.Mesh( geometry1, materialwire1 );
        scene.add( cube1 );
        cube1.add( cubewire1 );

        //make a box - head
        const geometry2 = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube2 = new THREE.Mesh( geometry2, material2 );
        cube1.add( cube2 );

        //make feets
        const foot1 = new THREE.BoxGeometry(0.4, 0.6, 0.4);
        const foot2 = new THREE.BoxGeometry(0.4, 0.6, 0.4);
        const foot3 = new THREE.BoxGeometry(0.4, 0.6, 0.4);
        const foot4 = new THREE.BoxGeometry(0.4, 0.6, 0.4);
        const material3 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const ft1 =  new THREE.Mesh( foot1, material3 );
        const ft2 =  new THREE.Mesh( foot2, material3 );
        const ft3 =  new THREE.Mesh( foot3, material3 );
        const ft4 =  new THREE.Mesh( foot4, material3 );
        const feet = new THREE.Group();
        feet.add( ft1, ft2, ft3, ft4 );
        cube1.add( feet );

        camera.position.set( 4, 3, 4 );
        controls.update();

        function animate() {
            controls.update();
            renderer.render( scene, camera );
            //cube2.translateY( 0.01 );
            cube2.position.y = 1;
            ft1.position.set(0.6, 0, 0.3);
            ft2.position.set(0.6, 0, -0.3);
            ft3.position.set(-0.6, 0, 0.3);
            ft4.position.set(-0.6, 0, -0.3);

            feet.position.y = -1;


            //cube1.rotation.x += 0.01;
            // cube1.rotation.y += 0.01;
            // cube2.rotation.y += 0.01;
        }
        renderer.setAnimationLoop( animate );







        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            gui.destroy();
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            //geometry.dispose();
        };
    }, []);

    return <div ref={mountRef} />;
};
export default Quaternions;
