import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styles: `
  @keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
  }
    .fade-in {
        opacity: 0;
        animation: 5s ease fadeIn;
        animation-fill-mode: forwards;
    }
    .delay-1 {
        animation-delay: 1s;
    }
    .delay-2 {
        animation-delay: 2s;
    }
  `,
})
export class HomepageComponent {}
