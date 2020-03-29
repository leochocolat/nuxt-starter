import * as THREE from 'three';
import { TweenLite, Power3 } from 'gsap';
import _ from 'underscore';

const DRAGDISTANCE = 500;
const DURATION = 1.5;

class ThreeScene {
    constructor(el) {
        _.bindAll(
            this,
            '_dragHandler'
        );

        this.el = el;
        this.canvas = this.el;

        this._setup();
    }

    _setup() {
        this._setupThree();
        // this._setupSlider();
        this._resize();
        this._setupEventListeners();
    }

    _loadTextures() {
        const loader = new THREE.TextureLoader();
        let promises = [];
        let urls = [
            'https://images.unsplash.com/photo-1501441858156-e505fb04bfbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80',
            'https://images.unsplash.com/photo-1482424917728-d82d29662023?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1331&q=80',
            'https://images.unsplash.com/photo-1504626877899-b3670586ac9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
            'https://images.unsplash.com/photo-1542745177-dbb39b41df3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1301&q=80',
        ];

        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const promise = new Promise(resolve => {
                loader.load(url, resolve);
            });

            promises.push(promise);
        }

        return Promise.all(promises);
    }

    _resize() {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        this._renderer.setSize(this._width, this._height);
        this._renderer.setPixelRatio(window.devicePixelRatio);

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
        
        this._renderer.setSize(window.innerWidth,window.innerHeight);
        this._renderer.setPixelRatio(window.devicePixelRatio);
    }

    _setupSlider() {
        this._slider = {
            currentIndex: 0,
            nextIndex: 0
        };

        this._loadTextures().then(textures => {
            this._textures = textures;
            this._setupPlane();
        });;
    }

    _setupPlane() {
        const vertex = this.el.querySelector('.vertex').textContent;
        const fragment = this.el.querySelector('.fragment').textContent;

        this._currentTexture = this._textures[this._slider.currentIndex];
        this._nextTexture = this._textures[this._slider.nextIndex];

        this._uniforms = {
            time: { value: 1.0 },
            resolution: { value: new THREE.Vector2() },
            u_direction: { value: 1.0 },
            u_transition: { value: 0.0 },
            u_texture: { type: 't', value: this._currentTexture },
            u_next_texture: { type: 't', value: this._nextTexture }
        }

        const geometry = new THREE.PlaneGeometry(1, 1, 1);
        const material = new THREE.ShaderMaterial({
            uniforms: this._uniforms,
            vertexShader: vertex,
            fragmentShader: fragment,
        });
        this.plane = new THREE.Mesh(geometry, material);
        this.plane.position.z = -10;
        this.plane.scale.set(10, 13, 10);
        this._scene.add(this.plane);
    }

    _resetProgress() {
        TweenLite.to(this._uniforms.u_transition, .3, { value: 0, ease: Power3.easeOut, onComplete: () => {
            this._isTweening = false;
        } });
    }

    _slide() {
        const duration = DURATION * (1 - Math.abs(this._dragProgress));
        TweenLite.to(this._uniforms.u_transition, duration, { value: 1, ease: Power3.easeOut, onComplete: () => {
            this._slider.currentIndex = this._slider.nextIndex;
            this._uniforms.u_texture.value = this._textures[this._slider.currentIndex];
            this._uniforms.u_transition.value = 0;
            this._isTweening = false;
        }});
    }

    _setupEventListeners() {
        window.addEventListener('resize', this._resize.bind(this));
        document.addEventListener('mousedown', this._mousedownHandler.bind(this));
        document.addEventListener('mouseup', this._mouseupHandler.bind(this));
        this._tick();
    }

    _mousedownHandler(e) {
        if (!this._uniforms) return;

        this._dragEvent = {
            startPos: { x: e.clientX, y: e.clientY },
            delta: { x: 0, y: 0 }
        }

        window.addEventListener('mousemove', this._dragHandler);
    }

    _mouseupHandler(e) {
        this._dragendHandler();
        window.removeEventListener('mousemove', this._dragHandler);
    }

    _dragHandler(e) {
        if (this._isTweening) return;

        const mousePos = { x: e.clientX, y: e.clientY };
        this._dragEvent.delta.x = this._dragEvent.startPos.x - mousePos.x;
        this._dragProgress = this._dragEvent.delta.x / DRAGDISTANCE;

        if (this._dragProgress >= 1 || this._dragProgress <= -1) return;

        this._uniforms.u_direction.value = Math.sign(this._dragProgress);
        this._uniforms.u_transition.value = Math.abs(this._dragProgress);
        this._slider.nextIndex = this._mod(this._slider.currentIndex + Math.sign(this._dragProgress), this._textures.length);
        this._uniforms.u_next_texture.value = this._textures[this._slider.nextIndex];
    }

    _dragendHandler() {
        this._isTweening = true;

        if (this._dragProgress > 0.2 || this._dragProgress < -0.2) {
            this._slide();
        } else {
            this._resetProgress();
        }
    }

    _tick() {
        window.requestAnimationFrame(this._tick.bind(this));

        this._renderer.render(this._scene, this._camera);
    }

    _mod(n, m) {
        return ((n % m) + m) % m;
    }
}

export default ThreeScene;