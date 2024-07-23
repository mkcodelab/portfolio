import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  name: string;
  url: string;
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
      >
        {{ item.name }}
      </button>
      }
    </div>
  `,
})
export class NavbarComponent {
  navItems: NavItem[] = [
    { name: 'About', url: 'about' },
    { name: 'Projects', url: 'projects' },
    { name: 'Contact', url: 'contact' },
  ];
}
