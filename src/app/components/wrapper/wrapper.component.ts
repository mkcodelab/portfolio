import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'wrapper',
  template: `
    <div class="flex justify-center w-full">
      <div
        class="p-4 lg:w-1/2 text-justify text-white text-orbitron text-md lg:text-xl"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class WrapperComponent {}
