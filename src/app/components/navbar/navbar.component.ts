import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'navbar',
  imports: [RouterLink],
  template: `
    @for(route of routes; track route) {
    <button
      [routerLink]="route.path"
      class="text-white p-1 hover:text-green-400"
      routerLinkActive="underline"
    >
      {{ route.title }}
    </button>
    }
  `,
})
export class NavbarComponent {
  routes = [
    { title: 'About', path: 'about' },
    { title: 'Projects', path: 'projects' },
    { title: 'Contact', path: 'contact' },
  ];
}
