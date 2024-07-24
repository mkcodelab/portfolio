import { Component } from '@angular/core';
import { WrapperComponent } from '../wrapper/wrapper.component';

@Component({
  standalone: true,
  selector: 'about',
  templateUrl: './about.component.html',
  imports: [WrapperComponent],
})
export class AboutComponent {}
