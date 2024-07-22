import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EngineComponent } from './components/engine/engine.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EngineComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio-website';
}
