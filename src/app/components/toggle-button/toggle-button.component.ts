import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.scss'],
  imports: [NgClass],
})
export class ToggleButtonComponent {
  @Output() toggleEvent = new EventEmitter();
  @Input() initialState: boolean = true;
  @Input() description: string | undefined;

  state: boolean;

  onToggle() {
    this.state = !this.state;
    this.toggleEvent.emit(this.state);
  }

  ngOnInit() {
    this.state = this.initialState;
  }
}
