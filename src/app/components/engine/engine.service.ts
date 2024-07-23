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

  private frameId: number = 0;

  private ngZone = inject(NgZone);

  //   public ngOnDestroy(): void {
  //     if (this.frameId != null) {
  //       cancelAnimationFrame(this.frameId);
  //     }
  //     if (this.renderer != null) {
  //       this.renderer.dispose();
  //       //   this.renderer = null;
  //       //   this.canvas = null;
  //     }
  //   }

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
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });

    this.mainScene.update();
    this.mainScene.lerpCamera(this.cameraSvc.currentCoords);
    this.renderer.render(this.mainScene.scene, this.mainScene.camera);
  }

  public resize(): void {
    // main scene camera resize (aspect)
    this.mainScene.resize();
    ScreenSize.update();
    this.renderer.setSize(ScreenSize.width, ScreenSize.height);
  }
}
