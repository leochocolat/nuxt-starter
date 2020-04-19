import { TweenLite, Power3 } from 'gsap';
import bindAll from '../utils/bindAll';

import { EffectComposer, EffectPass, RenderPass } from "postprocessing";

// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

const DRAGDISTANCE = 500;
const DURATION = 1.5;

class ThreeScene {
    constructor(el) {
        bindAll(
            this,
            '_tickHandler',
            '_resizeHandler'
        );

        this.el = el;
        this.canvas = this.el;

        this._setup();
    }

    _setup() {
        this._setupThree();
        // this._createCylinder();
        this._resize();
        this._setupEventListeners();
    }

    _resize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        this._renderer.setSize(this._width, this._height);
        this._renderer.setPixelRatio(window.devicePixelRatio);

        this._camera.aspect = this._width/this._height;
        this._camera.updateProjectionMatrix();

        // this._composer = new EffectComposer(this._renderer);
        // console.log(EffectComposer);
    }

    _setupThree() {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this._renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true
        });
        
        this._renderer.setSize(window.innerWidth,window.innerHeight);
        this._renderer.setPixelRatio(window.devicePixelRatio);
    }

    _createCylinder() {
        let cylinderGeometry = new THREE.CylinderGeometry(5, 5, 50, 32);
        let cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xE31543 });
        this._cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        this._cylinderMesh.position.z = -30;
        this._cylinderMesh.rotation.z = Math.PI/2;

        this._scene.add(this._cylinderMesh);
    }

    _tick() {
        this._renderer.render(this._scene, this._camera);
    }

    _setupEventListeners() {
        window.addEventListener('resize', this._resizeHandler);
        TweenLite.ticker.addEventListener('tick', this._tickHandler);
    }

    _tickHandler() {
        this._tick();
    }

    _resizeHandler() {
        this._resize();
    }

    _mod(n, m) {
        return ((n % m) + m) % m;
    }
}

export default ThreeScene;