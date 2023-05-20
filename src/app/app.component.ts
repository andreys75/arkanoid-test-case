import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Scene } from './game/scene';
import { config } from './configs/game.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent implements OnInit {
  title = 'Arkanoid';

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  public scene!: Scene;

  @HostListener('window:keydown', ['$event'])
  keyPressEvent($event: KeyboardEvent) {
    this.scene.movePlayer($event.key);
  }

  ngOnInit(): void {
    this.scene = new Scene(this.canvas);
    this.scene.initGameFromConfig(config);
  }
}
