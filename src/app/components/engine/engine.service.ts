import {
  ElementRef,
  Injectable,
  NgZone,
  OnDestroy,
  inject,
} from '@angular/core';
import * as THREE from 'three';
import { MainScene } from '../../3d/main-scene/main-scene';
import { CameraService } from '../../3d/main-scene/camera.service';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';

export const ScreenSize = {
  width: window.innerWidth,
  height: window.innerHeight,
  get aspect(): number {
    return this.width / this.height;
  },

  update() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  },
};

@Injectable({ providedIn: 'root' })
export class EngineService {
  private canvas: HTMLCanvasElement;

  private renderer: THREE.WebGLRenderer;

  private mainScene = inject(MainScene);

  private cameraSvc = inject(CameraService);

  private ngZone = inject(NgZone);

  private postProcessingOn = false;
  private composer: EffectComposer;

  private renderPass: RenderPass;
  private unrealBloomPass: UnrealBloomPass;
  private outputPass: OutputPass;

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.setSize(ScreenSize.width, ScreenSize.height);

    this.renderer.setClearColor(0x000000);

    // post-processing

    this.composer = new EffectComposer(this.renderer);

    this.renderPass = new RenderPass(
      this.mainScene.scene,
      this.mainScene.camera
    );

    this.unrealBloomPass = new UnrealBloomPass(
      new THREE.Vector2(ScreenSize.width, ScreenSize.height),
      0.5,
      1,
      0.1
    );
    this.outputPass = new OutputPass();

    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.unrealBloomPass);
    this.composer.addPass(this.outputPass);
  }

  public animate(): void {
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    requestAnimationFrame(() => {
      this.render();
    });

    this.mainScene.update();
    this.mainScene.lerpCamera(this.cameraSvc.currentCoords);
    if (this.postProcessingOn) {
      this.composer.render();
    } else {
      this.renderer.render(this.mainScene.scene, this.mainScene.camera);
    }
  }

  public resize(): void {
    // main scene camera resize (aspect)
    ScreenSize.update();
    this.mainScene.resize();
    this.renderer.setSize(ScreenSize.width, ScreenSize.height);
  }

  public togglePostProcessing() {
    this.postProcessingOn = !this.postProcessingOn;
  }

  get postProcessing() {
    return this.postProcessingOn;
  }
}
