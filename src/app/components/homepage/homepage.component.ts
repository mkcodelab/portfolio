import { Component } from '@angular/core';
import { WrapperComponent } from '../wrapper/wrapper.component';

@Component({
  standalone: true,
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  imports: [WrapperComponent],
})
export class HomepageComponent {}
