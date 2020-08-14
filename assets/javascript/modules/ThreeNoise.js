import * as THREE from 'three';
import frag from '../shaders/noise/fragment.glsl';
import vert from '../shaders/noise/vertex.glsl';

const PESPECTIVE = 800;

class ThreeNoise {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;

        this._setup();
    }

    resize(width, height) {
        this.width = width;
        this.height = height;

        this._renderer.setSize(this.width, this.height, false);

        this._fov = (180 * (2 * Math.atan(this.height / 2 / PESPECTIVE))) / Math.PI;
        this._camera.fov = this._fov;
        this._camera.aspect = this.width/this.height;
        this._camera.updateProjectionMatrix();

        this._plane.scale.set(this.width, this.height, 1);
        this._uniforms.iResolution.value.set(this.width, this.height, 1);
    }

    update() {
        this._updateDeltaTime();
        this._render();
    }

    close() {
        
    }

    _setup() {
        this._setupDeltaTime();
        this._setupScene();
        this._setupPlane();
    }

    _setupDeltaTime() {
        this._time = 0;
        this._startTime = Date.now();
        this._dateNow = this._startTime;
        this._lastTime = this._dateNow;
        this._deltaTime = 16;
        this._fps = Math.round(1000 / this._deltaTime);
    }

    _setupScene() {
        this._renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: false
        });

        this._renderer.setClearColor(0x000000);
        this._renderer.setSize(this.width, this.height, false);

        this._scene = new THREE.Scene();

        this._fov = (180 * (2 * Math.atan(this.height / 2 / PESPECTIVE))) / Math.PI;

        this._camera = new THREE.PerspectiveCamera(this._fov, this.width / this.height, 1, 1000);
        this._camera.position.set(0, 0, PESPECTIVE);
    }

    _setupPlane() {
        this._uniforms = {
            //base
            iResolution: { value: new THREE.Vector3(this.width, this.height, 1) },
            iTime: { value: 0 },
            iTimeDelta: { value: 16 },
            iFrame: { value: 60 },
            //custom
            u_alpha: { value: 1 }
        }

        const geometry = new THREE.PlaneGeometry(1, 1, 1);
        const material = new THREE.ShaderMaterial({
            uniforms: this._uniforms,
            fragmentShader: frag,
            vertexShader: vert
        });

        this._plane = new THREE.Mesh(geometry, material);
        this._plane.scale.set(this.width, this.height, 1);

        this._scene.add(this._plane);
    }

    _updateDeltaTime() {
        this._dateNow = Date.now();
        this._time = this._dateNow - this._startTime;
        this._deltaTime = this._dateNow - this._lastTime;
        this._lastTime = this._dateNow;
        this._fps = Math.round(1000 / this._deltaTime);
        
        if (!this._uniforms) return;
        this._uniforms.iTime.value = this._time;
        this._uniforms.iTimeDelta.value = this._deltaTime;
        this._uniforms.iFrame.value = this._fps;
    }

    _render() {
        this._renderer.render(this._scene, this._camera);
    }
}

export default ThreeNoise;