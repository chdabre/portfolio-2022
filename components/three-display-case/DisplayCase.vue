<template>
  <div ref="container" class="display-case">
    <loading-indicator v-if="loading" :progress="progress"></loading-indicator>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {ShaderPass} from "three/examples/jsm/postprocessing/ShaderPass";
// import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

import {CustomOutlinePass} from './shaders/CustomOutlinePass';
import {DitherShader} from "./shaders/dither4x4";
import {onMounted, ref} from "#imports";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import LoadingIndicator from "~/components/LoadingIndicator.vue";

const loading = ref<boolean>(false);
const progress = ref<number>(0);

const container = ref<HTMLElement>();
const canvas = ref<HTMLCanvasElement>();
const scene = ref<DisplayCaseScene>();

const material = new THREE.MeshPhongMaterial({
  side: THREE.DoubleSide,
  color: '#aaa',
  specular: '#fff',
  //wireframe: true,
  wireframeLinewidth: 10,
});

class DisplayCaseScene extends THREE.Scene {
  private object: THREE.Object3D;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private composer: EffectComposer;
  private size: THREE.Vector2;
  private canvas: HTMLCanvasElement;

  private followMouse: boolean = false;
  private mousePos: THREE.Vector2;
  private target: THREE.Vector3 = new THREE.Vector3();

  constructor(canvas: HTMLCanvasElement, width: number, height: number, object: THREE.Object3D, ) {
    super();

    this.object = object;
    this.canvas = canvas;
    this.size = new THREE.Vector2(width, height);
    this.add(object);
    this._setupLights();
    this._setupCamera();
    this._setupRenderer(canvas);
    this._setupEventListeners(canvas);

    this.mousePos = new THREE.Vector2(width / 2, height / 2);

    this._render();
  }

  _setupLights() {
    this.add(new THREE.AmbientLight(0xffffff, 10));

    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 10, 10);
    light.lookAt(this.object.position)
    light.intensity = 5;
    this.add(light);
  }

  _setupCamera() {
    this.camera = new THREE.PerspectiveCamera(70, 1, 1, 5000);
    this.camera.position.z = 2.5;
  }

  _setupRenderer(canvas: HTMLCanvasElement) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(.5 * devicePixelRatio)
    renderer.setSize(this.size.x, this.size.y);
    renderer.setClearColor(0x000000, 0); // the default
    renderer.physicallyCorrectLights = true;

    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(.5 * devicePixelRatio)

    composer.addPass(new RenderPass(this, this.camera));

    const outlinePass = new CustomOutlinePass(this.size, this, this.camera);
    composer.addPass(outlinePass);

    const ditherPass = new ShaderPass(DitherShader);
    ditherPass.renderToScreen = true;
    composer.addPass(ditherPass);

    this.renderer = renderer;
    this.composer = composer;
    this._resize();
  }

  _setupEventListeners(canvas: HTMLCanvasElement) {
    canvas.addEventListener('mouseenter', () => {
      this.followMouse = true;

      const heading = new THREE.Vector3()
      this.object.getWorldDirection(heading);
      this.target.set(heading.x, heading.y, heading.z * 300);
    });

    canvas.addEventListener('mouseout', () => {
      this.followMouse = false;
    });

    canvas.addEventListener('mousemove', (e) => {
      this.mousePos.set(
          e.offsetX - this.size.x / 2,
          e.offsetY - this.size.y / 2
      );
    });
  }

  _resize() {
    this.camera.aspect = this.size.x / this.size.y;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.size.x, this.size.y, true);
    //this.composer.setSize(this.size.x, this.size.y);
    this.composer.passes.forEach(pass => {
      pass.setSize(this.size.x, this.size.y);
    });
  }

  _render() {
    requestAnimationFrame(() => this._render());

    if (!this.followMouse) {
      this.object.rotation.x += .005;
      this.object.rotation.y += 0.01;
    } else {
      this.target.x += (-this.mousePos.x - this.target.x) * .02;
      this.target.y += (this.mousePos.y - this.target.y) * .02;
      this.target.z = -300; // assuming the camera is located at ( 0, 0, z );
      this.object.lookAt(this.target);
    }

    this.renderer.clear();
    this.composer.render();
  }

  setSize(width: number, height: number) {
    this.size.set(width, height);
    this._resize();
  }
}

function onResize() {
  if (scene.value && container.value) {
    scene.value.setSize(container.value.clientWidth, container.value.clientWidth);
  }
}

onMounted(() => {
  new ResizeObserver(onResize).observe(container.value)

  container.value?.addEventListener('resize', onResize);


  // objLoader.load(
  //     "/models/photobox.obj",
  //     (object) => {
  //       (object.children[0] as THREE.Mesh).material = material;
  //       object.traverse(function (child) {
  //         if (child.type === 'Mesh') {
  //           (child as THREE.Mesh).material = material;
  //         }
  //       });
  //       setupScene(object);
  //     },
  //     (xhr) => {
  //       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  // );

  const loader = new GLTFLoader();

  loading.value = true;
  loader.load('/models/photobox.glb', function (gltf) {
    loading.value = false;
    scene.value = new DisplayCaseScene(canvas.value, container.value.clientWidth, container.value.clientWidth, gltf.scene);
  }, (xhr) => {
    progress.value = (xhr.loaded / xhr.total);
  },
  (error) => {
    console.log(error);
  });
})
</script>

<style lang="scss" scoped>
.display-case {
  position: relative;
  padding-bottom: 100%;

  canvas {
    position: absolute;
    image-rendering: pixelated;
  }
}
</style>
