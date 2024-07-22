import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { EngineService } from './engine.service';

@Component({
  selector: 'engine',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,

  template: ` <canvas #rendererCanvas></canvas> `,
})
export class EngineComponent implements OnInit {
  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  public engineSvc = inject(EngineService);

  public ngOnInit(): void {
    this.engineSvc.createScene(this.rendererCanvas);
    this.engineSvc.animate();
  }
}
