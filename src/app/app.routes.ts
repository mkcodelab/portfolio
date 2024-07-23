import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
  { title: 'Home', path: 'home', component: HomepageComponent },
  { title: 'About', path: 'about', component: AboutComponent },
  { title: 'Projects', path: 'projects', component: ProjectsComponent },
  { title: 'Contact', path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: 'home' },
];
