import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CameraService } from '../../3d/main-scene/camera.service';
import * as THREE from 'three';

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
  `,
  template: `
    <div class="mb-5 p-2 navbar-gradient">
      @for(item of navItems; track item) {
      <button
        [routerLink]="item.url"
        class="text-white p-1 hover:text-green-400 text-orbitron text-lg"
        routerLinkActive="underline"
        (click)="moveCamera(item.coords)"
      >
        {{ item.name }}
      </button>
      }
    </div>
  `,
})
export class NavbarComponent {
  navItems: NavItem[] = [
    { name: 'About', url: 'about', coords: new THREE.Vector3(10, 20, 1) },
    { name: 'Projects', url: 'projects', coords: new THREE.Vector3(5, 2, -10) },
    { name: 'Contact', url: 'contact', coords: new THREE.Vector3(10, 10, 10) },
  ];

  cameraSvc = inject(CameraService);

  moveCamera(coords?: THREE.Vector3) {
    if (coords) {
      this.cameraSvc.changeCoords(coords);
    }
  }
}
