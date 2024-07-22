import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EngineComponent } from './components/engine/engine.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EngineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio-website';
}
