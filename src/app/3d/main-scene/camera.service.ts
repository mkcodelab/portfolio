import { inject, Injectable } from '@angular/core';
import * as THREE from 'three';
import { MainScene } from './main-scene';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  mainScene = inject(MainScene);

  camera = this.mainScene.camera;

  currentCoords = new THREE.Vector3(10, 10, 10);

  changeCoords(coords: THREE.Vector3) {
    this.currentCoords = coords;
  }
}
// todo: add camera movement with mouse move (slightly)
