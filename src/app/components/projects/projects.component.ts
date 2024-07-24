import { Component } from '@angular/core';
import { WrapperComponent } from '../wrapper/wrapper.component';

@Component({
  standalone: true,
  selector: 'projects',
  templateUrl: './projects.component.html',
  imports: [WrapperComponent],
})
export class ProjectsComponent {}
