import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CameraService } from '../../3d/main-scene/camera.service';
import * as THREE from 'three';
import { EngineService } from '../engine/engine.service';

export interface NavItem {
  name: string;
  url: string;
  coords?: THREE.Vector3;
}

@Component({
  standalone: true,
  selector: 'navbar',
  imports: [RouterLink, RouterLinkActive],
  styles: `

    .navbar-gradient {
        background: linear-gradient(to left, transparent, #333)
    }
    .navbar-button {
        transition: transform 0.3s ease;
        &:hover {
            transform: translateY(-5px) rotateZ(5deg);
            color: var(--main-color);
        }
    }
  `,
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  navItems: NavItem[] = [
    { name: 'Home', url: 'home', coords: new THREE.Vector3(10, 10, 10) },
    { name: 'About', url: 'about', coords: new THREE.Vector3(10, 20, 1) },
    { name: 'Projects', url: 'projects', coords: new THREE.Vector3(5, 2, -10) },
    { name: 'Contact', url: 'contact', coords: new THREE.Vector3(-10, -10, 1) },
  ];

  private cameraSvc = inject(CameraService);
  private engineSvc = inject(EngineService);

  get postProcessingOn() {
    return this.engineSvc.postProcessing;
  }

  togglePostProcessing() {
    this.engineSvc.togglePostProcessing();
  }

  moveCamera(coords?: THREE.Vector3) {
    if (coords) {
      this.cameraSvc.changeCoords(coords);
    }
  }
}
