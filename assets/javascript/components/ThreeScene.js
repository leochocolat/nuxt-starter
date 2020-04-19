import { TweenLite, Power3 } from 'gsap';
import bindAll from '../utils/bindAll';

import { EffectComposer, RenderPass, ShaderPass } from "postprocessing";
import vertex from '../shaders/afterImage/vertex.glsl';
import fragment from '../shaders/afterImage/fragment.glsl';

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
        this._setupDeltaTime();
        this._setupThree();
        this._setupLights();
        this._createCylinder();
        this._resize();
        this._setupEventListeners();
    }

    _setupDeltaTime() {
        this._dateNow = Date.now()
        this._lastTime = this._dateNow;
        this._deltaTime = 16;
    }

    _resize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        this._uniforms.iResolution.value.set(this._width, this._height, 1);
        this._renderer.setSize(this._width, this._height);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._composer.setSize(this._width, this._height);

        this._camera.aspect = this._width/this._height;
        this._camera.updateProjectionMatrix();
    }

    _setupThree() {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        this._renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true
        });

        this._uniforms = {
            tDiffuse: { value: new THREE.Uniform(null) },
            iChannel1: { value: new THREE.Uniform(null) },
            opacity: { value: 1 },
            u_delta_time: { value: 0 },
            iResolution: { value: new THREE.Vector3() },
        }

        this._shaderMaterial = new THREE.ShaderMaterial({
            uniforms: this._uniforms,
            vertexShader: vertex,
            fragmentShader: fragment
        });

        this._renderer.setSize(window.innerWidth,window.innerHeight);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._uniforms.iResolution.value.set(window.innerWidth,window.innerHeight, 1);
        
        this._composer = new EffectComposer(this._renderer);
        this._composer.addPass(new RenderPass(this._scene, this._camera));        
        this._shaderPass = new ShaderPass(this._shaderMaterial, 'tDiffuse');
        this._composer.addPass(this._shaderPass);
    }

    _setupLights() {
        this._light = new THREE.DirectionalLight(0xffffff, 1);
        this._light.position.z = 10;
        this._scene.add(this._light);
    }

    _createCylinder() {
        let cylinderGeometry = new THREE.CylinderGeometry(3, 3, 40, 32);
        let cylinderMaterial = new THREE.MeshLambertMaterial({ color: 0xE31543 });
        this._cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        this._cylinderMesh.position.z = -30;
        this._cylinderMesh.rotation.z = Math.PI/2;

        this._scene.add(this._cylinderMesh);
    }

    _updateDeltaTime() {
        this._dateNow = Date.now();
        this._deltaTime = this._dateNow - this._lastTime;
        this._uniforms.u_delta_time.value = this._deltaTime;
        this._lastTime = this._dateNow;
    }

    _tick() {
        this._updateDeltaTime();
        this._cylinderMesh.rotation.z += 0.01;
        
        this._composer.render();
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