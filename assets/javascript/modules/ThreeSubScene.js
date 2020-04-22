const PESPECTIVE = 800;


class ThreeSubScene {
    constructor(options) {
        this.width = options.width;
        this.height = options.height;

        this.renderTarget = null;

        this._setup();
    }

    //public
    update(time, deltaTime, fps) {
        this._tube.rotation.x = time * 0.001;
        this._tube.rotation.y = time * 0.001;
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
        this._createTube();
    }

    _createScene() {
        this.renderTarget = new THREE.WebGLRenderTarget(this.width, this.height);

        const fov = (180 * (2 * Math.atan(this.height / 2 / PESPECTIVE))) / Math.PI;
        
        this._camera = new THREE.PerspectiveCamera(fov, this.width / this.height, 1, 1000);
        this._camera.position.set(0, 0, PESPECTIVE);
        
        this._scene = new THREE.Scene();
        // this._scene.background = new THREE.Color(0x1d1b1c);
        // this._scene.background = new THREE.Color(0x000000);
        // this._scene.background = new THREE.Color(0x181617);
    }

    _createLight() {
        this._light = new THREE.DirectionalLight(0xffffff, 1);
        this._light.position.z = 10;

        this._scene.add(this._light);
    }

    _createTube() {
        let cylinderGeometry = new THREE.CylinderGeometry(80, 80, this.width * 0.5, 60);
        let cylinderMaterial = new THREE.MeshLambertMaterial({ color: 0xE31543 });
        
        this._tube = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        this._tube.position.z = 10;
        this._tube.rotation.z = Math.PI/2;

        // this._scene.add(this._tube);
    }
}

export default ThreeSubScene;