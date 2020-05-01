import vertex from '../shaders/noise/vertex.glsl';
import fragment from '../shaders/noise/fragment.glsl';

import ThreeSubScene from './ThreeSubScene';

const PESPECTIVE = 800;

class ThreeScene {
    constructor(options) {
        this.canvas = options.canvas;
        this.width = options.width;
        this.height = options.height;

        this.sceneEntities = {};

        this._setup();
    }

    //public
    update(time, deltaTime, fps) {
        // this._plane.rotation.y = time * 0.001;
        
        for (let i in this.sceneEntities) {
            this.sceneEntities[i].update(time, deltaTime, fps);
        }
        
        this._renderer.setRenderTarget(this.sceneEntities.subScene.renderTarget);
        //before renderTarget.render() : prev texture 
        this._uniforms.tOld.value = this.sceneEntities.subScene.renderTarget.texture;
        this._uniforms.iChannel0.value = this.sceneEntities.subScene.renderTarget.texture;
        this.sceneEntities.subScene.render(this._renderer);
        this._uniforms.tNew.value = this.sceneEntities.subScene.renderTarget.texture;
        this._uniforms.iChannel1.value = this.sceneEntities.subScene.renderTarget.texture;

        this._renderer.setRenderTarget(null);
        this._renderer.render(this._scene, this._camera);

        this._uniforms.iTime.value = time;
        this._uniforms.iTimeDelta.value = deltaTime;
        this._uniforms.iFrame.value = fps;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;

        this._renderer.setSize(this.width, this.height);
        this._renderer.setPixelRatio(window.devicePixelRatio);

        this._camera.fov = (180 * (2 * Math.atan(this.height / 2 / PESPECTIVE))) / Math.PI;
        this._camera.aspect = this.width/this.height;
        this._camera.updateProjectionMatrix();

        this._plane.scale.set(this.width, this.height, 1);
        this._uniforms.iResolution.value.set(this.width, this.height, 1);

        for (let i in this.sceneEntities) {
            this.sceneEntities[i].resize(width, height);
        }
    }

    _setup() {
        this._createScene();
        this._createSubScene();
        this._createPlane();
        this._createLight();
    }

    _createScene() {
        this._scene = new THREE.Scene();

		this._renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true
        });
        
        this._renderer.setSize(this.width, this.height);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        
        const fov = (180 * (2 * Math.atan(this.height / 2 / PESPECTIVE))) / Math.PI;
        
        this._camera = new THREE.PerspectiveCamera(fov, this.width / this.height, 1, 1000);
        this._camera.position.set(0, 0, PESPECTIVE);
    }

    _createPlane() {
        const geometry = new THREE.PlaneGeometry(1, 1, 1);

        this._uniforms = {
            //base
            iResolution: { value: new THREE.Vector3(this.width, this.height, 1) },
            iTime: { value: 0 },
            iTimeDelta: { value: 16 },
            iFrame: { value: 60 },
            //custom
            tOld: { value: new THREE.Uniform(null) },
            tNew: { value: new THREE.Uniform(null) },
            iChannel0: { value: new THREE.Uniform(null) },
            iChannel1: { value: new THREE.Uniform(null) },
            damp: { value: 0.99 }
        }
        
        const material = new THREE.ShaderMaterial({
            uniforms: this._uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
        });

        this._plane = new THREE.Mesh(geometry, material);
        this._plane.scale.set(this.width, this.height, 1);
        this._plane.position.z = 0;

        this._scene.add(this._plane);
    }

    _createLight() {
        this._light = new THREE.DirectionalLight(0xffffff, 1);
        this._light.position.z = 150;
        this._scene.add(this._light);
    }

    _createSubScene() {
        this.sceneEntities.subScene = new ThreeSubScene({
            width: this.width,
            height: this.height
        });
    }
}

export default ThreeScene;