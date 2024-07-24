import { Component } from '@angular/core';
import { WrapperComponent } from '../wrapper/wrapper.component';

@Component({
  standalone: true,
  selector: 'contact',
  templateUrl: './contact.component.html',
  imports: [WrapperComponent],
})
export class ContactComponent {}
