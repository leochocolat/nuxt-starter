const PESPECTIVE = 800;

import {
    Scene, 
    PerspectiveCamera, 
    DirectionalLight,
    WebGLRenderTarget
} from 'three';

class ThreeSubScene {
    constructor(options) {
        this.width = options.width;
        this.height = options.height;

        this.renderTarget = null;

        this._setup();
    }

    //public
    update(time, deltaTime, fps) {
        
    }

    render(renderer) {
        renderer.render(this._scene, this._camera);
    }

    resize(width, height) {
        this.width = width;
        this.height = height;

        this.renderTarget.setSize(this.width, this.height);

        this._camera.aspect = this.width/this.height;
        this._camera.updateProjectionMatrix();
    }

    //private
    _setup() {
        this._createScene();
        this._createLight();
    }

    _createScene() {
        this.renderTarget = new WebGLRenderTarget(this.width, this.height);

        const fov = (180 * (2 * Math.atan(this.height / 2 / PESPECTIVE))) / Math.PI;
        
        this._camera = new PerspectiveCamera(fov, this.width / this.height, 1, 1000);
        this._camera.position.set(0, 0, PESPECTIVE);
        
        this._scene = new Scene();
    }

    _createLight() {
        this._light = new DirectionalLight(0xffffff, 1);
        this._light.position.z = 10;

        this._scene.add(this._light);
    }
}

export default ThreeSubScene;