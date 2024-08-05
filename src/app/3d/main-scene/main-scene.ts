import * as THREE from 'three';
import { ScreenSize } from '../../components/engine/engine.service';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainScene {
  scene = new THREE.Scene();

  cube: THREE.Mesh;

  mergedSpheres: THREE.Mesh;

  camera = new THREE.PerspectiveCamera(55, ScreenSize.aspect, 0.1, 1000);
  zoom = 9;

  textureCube: THREE.CubeTexture;

  clock = new THREE.Clock();

  constructor() {
    this.camera.position.set(this.zoom, this.zoom, this.zoom);
    this.scene.add(this.camera);

    this.camera.lookAt(0, 0, 0);

    // const axesHelper = new THREE.AxesHelper(10);
    // this.scene.add(axesHelper);

    this.createSkybox();

    this.addMergedSpheres();

    this.addLights();
  }

  resize() {
    this.camera.aspect = ScreenSize.aspect;
    this.camera.updateProjectionMatrix();
  }

  update() {
    const deltaTime = this.clock.getDelta();
    if (this.mergedSpheres) {
      this.rotateSpheres(deltaTime);
    }
  }

  createSkybox() {
    const loader = new THREE.CubeTextureLoader();
    loader.setPath('assets/textures/skybox/');

    this.textureCube = loader.load([
      //   'space_ft.png',
      //   'space_bk.png',

      //   'space_up.png',
      //   'space_dn.png',

      //   'space_rt.png',
      //   'space_lf.png',
      'bkg1_right.png',
      'bkg1_left.png',

      'bkg1_top.png',
      'bkg1_bot.png',

      'bkg1_front.png',
      'bkg1_back.png',
    ]);

    this.scene.background = this.textureCube;
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xccccff, 0.8);
    this.scene.add(ambientLight);
    this.addCentralLight();
  }

  generateSpheresGeom(material: THREE.Material): THREE.Mesh {
    const spheres: THREE.BufferGeometry[] = [];
    const quantity = 50;
    const spread = 10;

    for (let i = 0; i < quantity; i++) {
      const radius = Math.sin(i / quantity);
      const x = Math.random() * spread * (Math.random() > 0.5 ? -1 : 1);
      const y = Math.random() * 15;
      const z = Math.random() * spread * (Math.random() > 0.5 ? -1 : 1);
      const geom = new THREE.SphereGeometry(radius);
      geom.translate(x, y, z);
      spheres.push(geom);
    }

    const mergedGeoms = mergeGeometries(spheres);
    return new THREE.Mesh(mergedGeoms, material);
  }

  addMergedSpheres() {
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.99,
      roughness: 0.2,
      envMap: this.textureCube,
    });

    // const material2 = new THREE.MeshPhysicalMaterial({
    //   envMap: this.textureCube,
    //   roughness: 0.15,
    //   clearcoat: 1,
    //   transmission: 0.95,
    //   thickness: 4,
    // });

    this.mergedSpheres = this.generateSpheresGeom(material);
    this.mergedSpheres.position.set(0, -8, 0);
    this.scene.add(this.mergedSpheres);
  }

  rotateSpheres(deltaTime: number) {
    this.mergedSpheres.rotation.y += 0.2 * deltaTime;
  }

  addCentralLight() {
    const sphere = new THREE.SphereGeometry(0.5);
    const mat = new THREE.MeshPhongMaterial({
      emissive: 0x55ff88,
    });
    const mesh = new THREE.Mesh(sphere, mat);
    this.scene.add(new THREE.PointLight(0x55ff88, 10, 50));
    this.scene.add(mesh);
  }

  lerpCamera(coords: THREE.Vector3) {
    this.camera.position.lerp(coords, 0.02);
    this.camera.lookAt(0, 0, 0);
  }
}
