import * as THREE from 'three';

export class Atom {
    constructor(x, y, ringCount, scene){
        this.x = x;
        this.y = y;
        this.ringCount = ringCount;
        this.scene = scene
        this.icosahedron = this.makeIcosahedron();
        this.rings = [];
        this.makeRings();
    }

    makeIcosahedron(){
        // --------------- Ico Geometry -----------------
        const geo = new THREE.IcosahedronGeometry(1.0, 3);
        const mat = new THREE.MeshStandardMaterial({
            flatShading: true,
            color: 0x00ffff
        });
        const mesh = new THREE.Mesh(geo, mat);
        this.scene.add(mesh);
        mesh.position.x = this.x;
        mesh.position.y = this.y;

        // ---------------- Wire Mesh Geometry for Ico __
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe:true
        });
        const wireMesh = new THREE.Mesh(geo, wireMat);
        wireMesh.scale.setScalar(1.001);
        mesh.add(wireMesh);
        return mesh;
    }

    makeRings() {
        for (let i = 0; i < this.ringCount; i++) {
            const torus1Geo = new THREE.TorusGeometry( 2, .1, 4, 10 );
            const torus1Mat = new THREE.MeshStandardMaterial( { color:0xff00ff } );
            const torus1 = new THREE.Mesh(torus1Geo, torus1Mat);
            this.icosahedron.add(torus1);
            this.rings.push(torus1);
        }
    }

    spin() {
        this.icosahedron.rotation.x += .005;
        this.icosahedron.rotation.y += .005;
        for (let i = 0; i < this.rings.length; i++) {
            this.rings[i].rotation.x += i*.001;
        }

    }
}
