import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  { title: 'About', path: 'about', component: AboutComponent },
  { title: 'Projects', path: 'projects', component: AboutComponent },
  { title: 'Contact', path: 'contact', component: AboutComponent },
];
