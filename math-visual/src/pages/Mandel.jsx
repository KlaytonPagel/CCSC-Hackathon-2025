import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'lil-gui';

import { Spherical } from '../mandel/Spherical.js';
import { Coords } from '../mandel/3Dcoords.js';

const Mandel = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // -------------------------------------------------------- Setting up the renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setAnimationLoop( animate );
        //document.body.appendChild( renderer.domElement );
        mountRef.current.appendChild(renderer.domElement);

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
        function addLight() {
            const pointLight01 = new THREE.DirectionalLight(0xffffff, 1);
            pointLight01.position.set(10, 10, 50);
            scene.add(pointLight01);
        }
        addLight();

        //const pointLight01Helper = new THREE.DirectionalLightHelper(pointLight01);
        //scene.add(pointLight01Helper);

        // -------------------------------------------------------- lil gui
        const gui = new GUI();

        let state = {
            power: 8,
        };
        gui.add(state, "power").onChange(function(){
            clearScreen(scene);
            addLight();
            mandelBulb(state.power);
        });
        // -------------------------------------------------------- clear scene
        function clearScreen(scene) {
            while (scene.children.length > 0) {
                scene.remove(scene.children[0])
            }
        }

        // -------------------------------------------------------- MandelBulb
        function mandelBulb(power) {
            const SPACE_SIZE = 1;
            const POINT_SIZE = 1;

            const geometry = new THREE.BoxGeometry(POINT_SIZE, POINT_SIZE, POINT_SIZE); 

            for (let x = -SPACE_SIZE; x < SPACE_SIZE; x+=.06) {
                for (let y = -SPACE_SIZE; y < SPACE_SIZE; y+=.06) {
                    for (let z = -SPACE_SIZE; z < SPACE_SIZE; z+=.06) {

                        let zeta = new Coords(0, 0, 0);

                        let n = power;
                        let maxIter = 40;
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
                            if (sphericalZ.r > 2) {
                                break;
                            }
                            if (iter > maxIter) {
                                let red = .2;
                                let green = .8;
                                let blue = .2;
                                const material = new THREE.MeshStandardMaterial( { 
                                    color:new THREE.Color().setRGB( red, green, blue ),
                                    flatShading: true
                                } );
                                const cube = new THREE.Mesh( geometry, material ); 
                                cube.position.x = x*30;
                                cube.position.y = y*30;
                                cube.position.z = z*30;
                                scene.add(cube);
                                break;
                            }
                        }
                    }
                }
            }
        }
        mandelBulb(8);



        // -------------------------------------------------------- Animation Loop
        function animate() {

            renderer.render( scene, camera );

        }
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
export default Mandel;
