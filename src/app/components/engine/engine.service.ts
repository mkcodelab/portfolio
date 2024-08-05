import { ElementRef, Injectable, NgZone, inject } from '@angular/core';
import * as THREE from 'three';
import { MainScene } from '../../3d/main-scene/main-scene';
import { CameraService } from '../../3d/main-scene/camera.service';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

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

  private postProcessingOn = true;
  private renderingOn = true;

  private composer: EffectComposer;

  private renderPass: RenderPass;
  private unrealBloomPass: UnrealBloomPass;

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 2;
    this.renderer.setSize(ScreenSize.width, ScreenSize.height);

    this.renderer.setClearColor(0x000000);

    // post-processing
    this.initPostprocessing();
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

    if (this.renderingOn) {
      if (this.postProcessingOn) {
        this.composer.render();
      } else {
        this.renderer.render(this.mainScene.scene, this.mainScene.camera);
      }
    }
  }

  private initPostprocessing() {
    this.composer = new EffectComposer(this.renderer);

    this.renderPass = new RenderPass(
      this.mainScene.scene,
      this.mainScene.camera
    );

    this.unrealBloomPass = new UnrealBloomPass(
      new THREE.Vector2(ScreenSize.width, ScreenSize.height),
      3,
      1,
      0.1
    );

    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.unrealBloomPass);
  }

  public resize(): void {
    // main scene camera resize (aspect)
    ScreenSize.update();
    this.mainScene.resize();
    this.renderer.setSize(ScreenSize.width, ScreenSize.height);
  }

  public togglePostProcessing(to: boolean) {
    this.postProcessingOn = to;
  }

  public toggleRendering(to: boolean) {
    this.renderingOn = to;
  }

  get rendering() {
    return this.renderingOn;
  }

  get postProcessing() {
    return this.postProcessingOn;
  }
}
