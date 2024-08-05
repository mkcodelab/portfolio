import { Component } from '@angular/core';
import { WrapperComponent } from '../wrapper/wrapper.component';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { NgClass } from '@angular/common';

export interface Project {
  projectUrl: string;
  githubUrl: string;
  name: string;
  description: string;
  imageUrl: string;
}

@Component({
  standalone: true,
  selector: 'projects',
  templateUrl: './projects.component.html',
  imports: [WrapperComponent, ProjectCardComponent, NgClass],
  styles: `
    .backdrop-noise {
        background-image: url('/assets/svg_filter.svg');
        background-position: center;
        background-size: cover;
        backdrop-filter: blur(4px);
    }
  `,
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      projectUrl: 'https://mkcodelab.github.io/soundlab/',
      githubUrl: 'https://github.com/mkcodelab/soundlab',
      name: 'Soundlab',
      description:
        'Angular / Tone.js sound creation application, with Synthesizer and Sequencer.',
      imageUrl: 'assets/project_images/soundlabScreenShot.png',
    },
    {
      projectUrl: 'https://mkcodelab.github.io/BinauralBeats2/',
      githubUrl: 'https://github.com/mkcodelab/BinauralBeats2',
      name: 'Binaural Beats',
      description:
        'Binaural Beats app, where you can use different frequencies to manipulate your mood',
      imageUrl: 'assets/project_images/binauralScreenShot.png',
    },
  ];
}
