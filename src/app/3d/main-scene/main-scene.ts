import * as THREE from 'three';
import { ScreenSize } from '../../components/engine/engine.service';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainScene {
  scene = new THREE.Scene();

  cube: THREE.Mesh;

  camera = new THREE.PerspectiveCamera(75, ScreenSize.aspect, 0.1, 1000);

  constructor() {
    this.camera.position.set(2, 2, 2);
    this.scene.add(this.camera);

    this.camera.lookAt(0, 0, 0);

    // const axesHelper = new THREE.AxesHelper(10);
    // this.scene.add(axesHelper);

    this.createCube();
    this.addLights();

    // this.createSkybox();
  }

  resize() {
    console.log('resize from main-scene');
    this.camera.aspect = ScreenSize.aspect;
    this.camera.updateProjectionMatrix();
  }

  update() {
    this.rotateCube();
  }

  createSkybox() {
    const loader = new THREE.CubeTextureLoader();
    loader.setPath('assets/textures/skybox/');

    const textureCube = loader.load([
      'arid2_ft.jpg',
      'arid2_bk.jpg',

      'arid2_up.jpg',
      'arid2_dn.jpg',

      'arid2_rt.jpg',
      'arid2_lf.jpg',
    ]);

    this.scene.background = textureCube;
    // we can use it to add envMap to MeshBasicMaterials
  }

  createCube() {
    const cube = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshPhongMaterial({
      color: 0xffaabb,
    });

    this.cube = new THREE.Mesh(cube, mat);

    this.scene.add(this.cube);
  }

  addLights() {
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 3, 0);
    dirLight.lookAt(0, 0, 0);
    this.scene.add(dirLight);
  }

  rotateCube() {
    this.cube.rotation.z += 0.01;
    this.cube.rotation.x += 0.01;
  }
}
