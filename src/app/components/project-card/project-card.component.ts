import { Component, Input } from '@angular/core';
import { Project } from '../projects/projects.component';

@Component({
  standalone: true,
  selector: 'project-card',
  templateUrl: './project-card.component.html',
  styles: `
    .neon-button {
        transition: box-shadow 0.2s ease;
        &:hover {
            box-shadow: 0 0 5px 5px var(--main-color);
        }
    }
  `,
})
export class ProjectCardComponent {
  @Input({ required: true }) project: Project;
}
